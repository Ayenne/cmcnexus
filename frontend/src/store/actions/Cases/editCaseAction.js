import Axios from "../../../axios/authenticated";
import { UPDATE_CASE } from "../actionTypes";


export const editCase = cases => {
    return {
      type: UPDATE_CASE,
      payload: cases, 
    }
  };

export const editCaseFunction = (data, case_id, history) => async (dispatch) => {
    const response = await Axios.patch(`cases/${case_id}/`, data)
    dispatch(editCase(response.data))
    const caseId = response.data.id;
    history.push(`/cases/details/${caseId}`);
}