//Services
import combinationService from '../services/combination_service.js';
//Helpers
import { sendResponse } from '../helpers/message_sender.js';
// Utils
import pickProperties from '../utilities/pick_properties.js';

const combinationController = {
  postCombination: async (req, res) => {
    try {
      const keys = ['data', 'length'];
      const dataObj = pickProperties(req.body, keys);

      const result = await combinationService.postCombination(dataObj.data, dataObj.length);

      if (result.status === 'error') {
        throw new Error(result.message);
      }

      sendResponse(res, 200, true, result.message, result.combinations);
    } catch (error) {
      sendResponse(res, 400, false, error.message);
    }
  }
};

export default combinationController;