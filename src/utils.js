/* eslint-disable import/prefer-default-export */

export function keying(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, curr) => {
    if (Array.isArray(obj[curr])) {
      return [...acc, prefix + curr];
    }
    if (typeof obj[curr] === 'object' && obj[curr] !== null) {
      return [...acc, ...keying(obj[curr], `${prefix + curr}.`)];
    }
    return [...acc, prefix + curr];
  }, []);
}
