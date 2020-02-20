# Beaver - Dependency Injection Container for NodeJS
Lean dependency injection container for NodeJS based on parameter naming, which helps instantiating dependencies and can hold up environmental or constant values


[![](https://img.shields.io/npm/v/beaver-di)](https://www.npmjs.com/package/beaver-di)
  
<p align="center">
  <img src="https://media2.giphy.com/media/8ZlAW7PcMSnDy/giphy.gif?cid=5a38a5a24bdd640f726494f54d4cd99fddda3a779d2c1014&rid=giphy.gif">
</p>

## Installation
You can get the latest release using npm:
```bash
$ npm install beaver-di
```

## Usage

Define a `beaver.config.js` file where we instantiate the Dependency Injection Container. **This will be the only place where coupling occurs**

```javascript
// ./beaver.config.js
import userController from './userController';
import userService from './userService';
import database from './database';
import beaver from 'beaver';

export default beaver({
  userController,
  userService,
  database,
  helloString: 'helloWorld',
  db: {
    connectionString: 'postgres://',
  },
});

```

Now just require this file at the top level of you application. 

Remember that as this is a property naming based dependency injection, meaning that you will need to match your dependency by name on the object passed to beaver

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
### Examples

You can find a simple example of how to build an [Express](https://github.com/expressjs/express) app using Beaver DI [in the examples directory](https://github.com/guidodizi/beaver-di/tree/master/examples/expressServer)

<p align="center">
  <img src="https://camo.githubusercontent.com/fc61dcbdb7a6e49d3adecc12194b24ab20dfa25b/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67"/>
</p>

## Methods
#### `beaver.get(name)`
Retrieve instance of dependency


#### `beaver.factory(name, factory)`
Assign to a specific name a factory function that when executed will create an instance of dependency


#### `beaver.register(name, dependency)`
Assign to a specific name an instance of a dependency. This can also be used to register constants i.e. beaver.register('TOKEN', 'secretToken!').
