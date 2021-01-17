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

// ----------FETCH ALL Strain REQUEST-------  *****************************

// export const fetchServiceRequest = () => {
//     return {
//         type: 'FETCH_SERVICE_REQUEST'
//     }
// }

// export const fetchServiceSuccess = (service) => {
//     return {
//         type: 'FETCH_SERVICE_SUCCESS',
//         service: service,
//     }
// }

// export const fetchServiceFailure = (error) => {
//     return {
//         type: 'FETCH_SERVICE_FAILURE',
//         error: error,
//     }
// }

// ----------SELECT STRAIN FOR VIEW-------  *****************************

export const selectStrain = (strain) => {
  return {
    type: "SELECT_SERVICE_FOR_VIEW",
    strain: strain,
  };
};

// --------API CALLS---------  *********************************************************************************************************************************

// --------FETCH ALL SERVICES---------  ********************************

export const fetchStrains = (dispatch) => {
  dispatch(fetchStrainsRequest());
  fetch(`http://localhost:3000/strains`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        dispatch(fetchStrainsFailure(data.error));
      } else {
        dispatch(fetchStrainsSuccess(data));
      }
    });
};

// --------FETCH SINGLE SERVICE---------  ********************************

// export const fetchService = (serviceId, dispatch) => {
//     dispatch(fetchServiceRequest())
//     fetch(`https://localhost:3000/services/${serviceId}`)
//         .then(res=>res.json())
//         .then(data => {
//             if (data.error){
//                 dispatch(fetchServiceFailure(data.error))
//             } else {
//                 dispatch(fetchServiceSuccess(data))
//                 dispatch(setGigsForService(data.gigs))
//             }
//         })
// }
