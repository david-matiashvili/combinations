// Model
import Combination from '../models/Combination.js';

import { generateItems, calculateCombinations } from '../helpers/combinations.js';

const combinationService = {
  postCombination: async (data, length) => {
    const items = generateItems(data);
    const combinations = calculateCombinations(items, length);

    return await Combination.postCombination(items, combinations);
  }
};

export default combinationService;