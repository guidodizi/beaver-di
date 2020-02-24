// change to beaver-di
import beaver from '../../src';

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
      todos: {
        xghZJCZbqAFz7z3TpsZgj: {
          id: 'xghZJCZbqAFz7z3TpsZgj',
          todo: 'Write some awesome code',
          done: false,
        },
        M5vefSdc4ukRi1qjCj25S: {
          id: 'M5vefSdc4ukRi1qjCj25S',
          todo: 'Do the laundry',
          done: false,
        },
        E8pO1Q0DrbkG00gQssDRe: {
          id: 'E8pO1Q0DrbkG00gQssDRe',
          todo: 'Bake a cake',
          done: true,
        },
      },
    },
  },
);
