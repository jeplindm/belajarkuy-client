export const ascending = (list, props) => {
  return list.sort(function compare(a, b) {
    if (a[props] < b[props]) {
      return -1;
    }
    if (a[props] > b[props]) {
      return 1;
    }
    return 0;
  });
};

export const descending = (list, props) => {
  return list.sort(function compare(b, a) {
    if (a[props] < b[props]) {
      return -1;
    }
    if (a[props] > b[props]) {
      return 1;
    }
    return 0;
  });
};
