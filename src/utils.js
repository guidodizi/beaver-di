/* eslint-disable import/prefer-default-export */

export function keying(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, curr) => {
    if (Array.isArray(obj[curr])) {
      throw new Error('Cannot define a dependency as an array');
    } else if (typeof obj[curr] === 'object' && obj[curr] !== null) {
      return [...acc, ...keying(obj[curr], `${prefix + curr}.`)];
    } else {
      return [...acc, prefix + curr];
    }
  }, []);
}
