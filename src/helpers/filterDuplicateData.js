export const filterDuplicateData = (arr1, arr2) => {
  let res = [];
  res = arr1.filter((el) => {
    return !arr2.find((element) => {
      return element.id === el.id;
    });
  });
  return res;
};
