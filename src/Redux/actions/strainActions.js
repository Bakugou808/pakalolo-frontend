import { headers } from "../../services/api";

// ----------FETCH ALL STRAINS REQUEST-------  *****************************

export const fetchStrainsRequest = () => {
  return {
    type: "FETCH_STRAINS_REQUEST",
  };
};

export const fetchStrainsSuccess = (strains) => {
  return {
    type: "FETCH_STRAINS_SUCCESS",
    strains: strains,
  };
};

export const fetchStrainsFailure = (error) => {
  return {
    type: "FETCH_STRAINS_FAILURE",
    error: error,
  };
};

// ----------SELECT STRAIN FOR VIEW-------  *****************************

export const selectStrain = (strain) => {
  return {
    type: "SELECT_SERVICE_FOR_VIEW",
    strain: strain,
  };
};

// --------API CALLS---------  *********************************************************************************************************************************

// --------FETCH ALL STRAINS---------  ********************************

export const fetchStrains = (dispatch) => {
  dispatch(fetchStrainsRequest());
  fetch(`https://pakalolo-api.herokuapp.com/strains`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(fetchStrainsFailure(data.error));
      } else {
        dispatch(fetchStrainsSuccess(data));
      }
    });
};
