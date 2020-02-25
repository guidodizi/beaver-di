# Beaver - Dependency Injection Container for NodeJS
[![](https://img.shields.io/npm/v/beaver-di)](https://www.npmjs.com/package/beaver-di)

Lean dependency injection container for NodeJS based on parameter naming, which helps instantiating and referencing dependencies.
  
<p align="center">
  <img src="https://media2.giphy.com/media/8ZlAW7PcMSnDy/giphy.gif?cid=5a38a5a24bdd640f726494f54d4cd99fddda3a779d2c1014&rid=giphy.gif">
</p>



## Installation
You can get the latest release using:
```bash
$ npm install beaver-di
```
or: 
```bash
$ yarn add beaver-di
```

## Terminology

There are two type of values we are going to hold in our Dependency Injection Container

|Name|Description|
|:------|:--------|
|**factories**| functions used to instantiate a dependency, tipically you will use a factory when instantianting a dependency depends on other dependencies|
|**dependencies** | values that are fixed dependencies, typically environment variables or constant values|


## Usage

Define a `beaver.config.js` file where we instantiate the Dependency Injection Container. **This will be the only place where coupling occurs**

Here you can define either a factory (used to instantiate a dependency) or a plain dependency that doesn't require any other dependency. 

```javascript
// ./beaver.config.js
import userController from './userController';
import userService from './userService';
import database from './database';
import beaver from 'beaver-di';

export default beaver(
  {
    userController,
    userService,
    database,
  }, 
  {
    helloString: 'helloWorld',
    db: {
      connectionString: 'postgres://',
    },
  },
);

```

Now just require this file at the top level of you application. 

Remember that as this is a property naming based dependency injection, meaning that you will need to match your dependency by name on the object passed to beaver. If you need more control over the naming of parameters passed to a factory, you can make use of the [`connect(factory, dependencies)` API](#connect-api)

```javascript
// ./userController.js

// we defined on beaver.config.js userService module on the property userService
export default (userService, helloString) => {
  // this module does not depend on '/userService.js' but it uses it by the dependecy injected argument
  
  const createUser = async (name) => {
    await userService.create({name})
    ...
  };
  
  const salute = () => helloString;
  
  return {
    createUser,
    salute,
  };
};

```


## Examples

You can find a simple example of how to build an [Express](https://github.com/expressjs/express) app using Beaver DI [in the examples directory](https://github.com/guidodizi/beaver-di/tree/master/examples/expressServer)

<p align="center">
  <img src="https://camo.githubusercontent.com/fc61dcbdb7a6e49d3adecc12194b24ab20dfa25b/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67"/>
</p>

### Walkthrough
We first define the `beaver.config.js` file

```javascript
import todo from './api/todo';
import todoController from './api/todo/todo.controller';
import todoService from './api/todo/todo.service';

export default beaver(
  {
    todo,
    todoController,
    todoService,
  },
  {
    database: {
      ...
    },
  },
);
```

To continue, in our routes module, we get from beaver the instance of `todo` factory
```javascript
import beaver from './beaver.config';

export default (app) => {
  const todo = beaver.get('todo');
  app.use('/api/todo', todo);
};
```
As `todo` factory dependes on `todoController` and `todoController` depends on `todoService`, all instances are created when executing `const todo = beaver.get('todo');`

#### `todo` module
```javascript
import { Router } from 'express';

export default (todoController) => {
  const router = Router();

  router.get('/', todoController.getAll);
  router.post('/', todoController.create);
  router.get('/:id', todoController.get);
  router.delete('/:id', todoController.delete);

  return router;
};
```
#### `todoController` module
```javascript
export default (todoService) => {
  ...
  return {
    getAll,
    get,
    create,
    delete: deleteTodo,
  };
};
```

#### `todoService` module
```javascript
export default (database) => {
  ...
  return {
    getAll,
    getById,
    create,
    delete: deleteTodo,
  };
};
```

## API
### Creating an instance
Core functionality. Used to instantiate Beaver Dependency Injection Container
```javascript
import beaver from 'beaver-di';

beaver(factories, dependencies)
```

### Connect API
Used to provide flexibility when injecting properties into a factory.

**Notes**

- You will need to restructure the parameters in factory to be an **object** (this object will contain the dependencies).
- Values in connect method **need to be a string** to access dependency injected in a object-like structure.
- When trying to access a dependency which is in a object-like structure, you will always need the `connect` API (in this example, the `connectString` parameter.
```javascript
import { connect } from 'beaver-di';


const factory = ({ service, controller, connectionString }) => {
  ...
};

export default connect(factory, { service: 'userService', controller: 'userController', connectionString: 'databases.postgres.connectionString' });

```

### Instance methods
#### `beaver.get(name)`
Retrieve instance of dependency


#### `beaver.factory(name, factory)`
Assign dynamically to a specific name a factory function that when executed will create an instance of dependency


#### `beaver.register(name, dependency)`
Assign dynamically to a specific name, an instance of a dependency. This can also be used to register constants i.e. beaver.register('TOKEN', 'secretToken!').
