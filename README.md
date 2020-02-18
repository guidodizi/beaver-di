# Beaver - Dependency Injection Container for NodeJS
Lean dependency injection container for NodeJS, which helps instantiating dependencies and can hold up environmental or constant values

<p align="center">
  <img src="https://media2.giphy.com/media/8ZlAW7PcMSnDy/giphy.gif?cid=5a38a5a24bdd640f726494f54d4cd99fddda3a779d2c1014&rid=giphy.gif">
</p>

## Usage


```javascript
// ./userController.js
export default (userService) => {
  userService.method1();
  ...
}
```

```javascript
import beaver from '../src';
// example
import userController from './userController';
import userService from './userService';

beaver.factory('userController', userController);
beaver.factory('userService', userService);

const ctrl = beaver.get('userController')
// ctrl is now instantiated with all its dependencies
```

## Methods

#### `beaver.factory(name, factory)`
Assign to a specific name a factory function that when executed will create an instance of dependency


#### `beaver.register(name, dependency)`
Assign to a specific name an instance of a dependency. This can also be used to register constants i.e. beaver.register('TOKEN', 'secretToken!').


#### `beaver.get(name)`
Retrieve instance of dependency
