module.exports = sizes => property => val => {
  if (!property) {
    throw new Error('You must provide a property');
  }

  if (!val) {
    throw new Error('You must provide a value');
  }

  if (!sizes) {
    return {
      [property]: val
    };
  }

  if (!Array.isArray(val)) {
    return {
      [property]: val
    };
  }

  if ((Object.keys(sizes).length + 1) < (val.length)) {
    throw new Error('You provided more values than sizes');
  }

  const entries = Object.entries(sizes);

  return val.reduce((acc, size, i) => {
    if (i === 0) {
      return {
        ...acc,
        [property]: val[i]
      };
    }
    return {
      ...acc,
      [`@media (${entries[i - 1][1]})`]: {
        [property]: val[i]
      }
    };
  }, {});
};
