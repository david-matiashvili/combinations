const getSuffix = (str) => {
  return str.replace(/[^A-Z]/g, '');
};

const combinationGeneration = (allCombo, arr, res, start, end, index, r) => {
  if (index === r) {
    allCombo.push(res.slice(0, r));
  }

  for (let i = start; i <= end && end - i + 1 >= r - index; ++i) {
    res[index] = arr[i];

    let space = 1;
    for (let j = i + 1; j <= end; ++j) {
      if (getSuffix(arr[i]) === getSuffix(arr[j])) {
        ++space;
        continue;
      }

      break;
    }

    combinationGeneration(allCombo, arr, res, i + space, end, index + 1, r);
  }
};

export const generateItems = (data) => {
  const result = [];

  for (let i = 0; i < data.length; ++i) {
    for (let j = 0; j < data[i]; ++j) {
      result.push(`${String.fromCharCode(65 + i)}${j + 1}`);
    }
  }

  return result;
};

export const calculateCombinations = (items, length) => {
  const result = [];
  combinationGeneration(result, items, new Array(3), 0, items.length - 1, 0, length);

  return result;
};