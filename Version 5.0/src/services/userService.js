import axios from 'axios';

class UserService {
   static getAllRecentProducts = (userId, scb, ecb) => {
       //process.env.REACT_APP_GET_RECENT_PRODUCTS_URL
        axios
            .get(`${process.env.REACT_APP_GET_RECENT_PRODUCTS_URL}?userId=${localStorage.getItem("REACT_APP_USER_ID")}`)
            .then(response => {
                let data = response.data;
                if(data != null && data.status === false){
                    throw data.errorMessage;
                }
                scb(response.data);
            })
            .catch(e => {
                if (typeof e === 'string') {
                    return ecb(e);
                }
                ecb('Cannot contact server. Please try again.');
            });
    };

    static getAllUserRecomm = (scb, ecb) => {
        //process.env.REACT_APP_GET_RECENT_PRODUCTS_URL
         axios
             .get(`${process.env.REACT_APP_GET_USER_RECOMENTATION_URL}?userId=${localStorage.getItem("REACT_APP_USER_ID")}`)
             .then(response => {
                 let data = response.data;
                 if(data != null && data.status === false){
                     throw data.errorMessage;
                 }
                 scb(response.data);
             })
             .catch(e => {
                 if (typeof e === 'string') {
                     return ecb(e);
                 }
                 ecb('Cannot contact server. Please try again.');
             });
     };


     static getContentRecommendations = (scb, ecb) => {
        //process.env.REACT_APP_GET_RECENT_PRODUCTS_URL
         axios
             .get(`${process.env.REACT_APP_GET_CONTENT_RECOMENTATION_URL}?cookieId=${localStorage.getItem("REACT_APP_USER_ID")}`)
             .then(response => {
                 let data = response.data;
                 console.log(data)
                 scb(response.data);
             })
             .catch(e => {
                 if (typeof e === 'string') {
                     return ecb(e);
                 }
                 ecb('Cannot contact server. Please try again.');
             });
     };
     static getAllExtrnProdRecomm = (search, scb, ecb) => {
        //process.env.REACT_APP_GET_RECENT_PRODUCTS_URL
         axios
             .get(`${process.env.REACT_APP_GET_EXTR_PRODUCT_RECOMENNTATION_URL}${search}`)
             .then(response => {
                 let data = response.data;
                 if(data != null && data.status === false){
                     throw data.errorMessage;
                 }
                 scb(response.data);
             })
             .catch(e => {
                 if (typeof e === 'string') {
                     return ecb(e);
                 }
                 ecb('Cannot contact server. Please try again.');
             });
     };
     static getAllProdRecomm = (scb, ecb) => {
        //process.env.REACT_APP_GET_RECENT_PRODUCTS_URL
         axios
             .get(`${process.env.REACT_APP_GET_PRODUCT_RECOMENNTATION_URL}?userId=${ localStorage.getItem("REACT_APP_USER_ID")}`)
             .then(response => {
                 let data = response.data;
                 if(data != null && data.status === false){
                     throw data.errorMessage;
                 }
                 scb(response.data);
             })
             .catch(e => {
                 if (typeof e === 'string') {
                     return ecb(e);
                 }
                 ecb('Cannot contact server. Please try again.');
             });
     };

     static clearUserData = (scb, ecb) => {
        //process.env.REACT_APP_GET_RECENT_PRODUCTS_URL
         axios
             .get(`${process.env.REACT_APP_USER_RESET_URL}?userId=${ localStorage.getItem("REACT_APP_USER_ID")}`)
             .then(response => {
                 let data = response.data;
                 if(data != null && data.status === false){
                     throw data.errorMessage;
                 }
                 scb(response.data);
             })
             .catch(e => {
                 if (typeof e === 'string') {
                     return ecb(e);
                 }
                 ecb('Cannot contact server. Please try again.');
             });
     };

     
     static clearApplicationData = (scb, ecb) => {
        //process.env.REACT_APP_GET_RECENT_PRODUCTS_URL
         axios
             .get(`${process.env.REACT_APP_APPLICATION_RESET_URL}`)
             .then(response => {
                 let data = response.data;
                 if(data != null && data.status === false){
                     throw data.errorMessage;
                 }
                 scb(response.data);
             })
             .catch(e => {
                 if (typeof e === 'string') {
                     return ecb(e);
                 }
                 ecb('Cannot contact server. Please try again.');
             });
     };


     
     static updateRecommnedations = (scb, ecb) => {
        //process.env.REACT_APP_GET_RECENT_PRODUCTS_URL
         axios
             .get(`${process.env.REACT_APP_UPDATE_RECOMMENDATION_URL}`)
             .then(response => {
                 let data = response.data;
                 if(data != null && data.status === false){
                     throw data.errorMessage;
                 }
                 scb(response.data);
             })
             .catch(e => {
                 if (typeof e === 'string') {
                     return ecb(e);
                 }
                 ecb('Cannot contact server. Please try again.');
             });
     };


     static getAllProducts = (scb, ecb) => {
        //process.env.REACT_APP_GET_RECENT_PRODUCTS_URL
         axios
             .get(`${process.env.REACT_APP_GET_ALL_PRODUCTS_URL}`)
             .then(response => {
                 let data = response.data;
                 if(data != null && data.status === false){
                     throw data.errorMessage;
                 }
                 scb(response.data);
             })
             .catch(e => {
                 if (typeof e === 'string') {
                     return ecb(e);
                 }
                 ecb('Cannot contact server. Please try again.');
             });
     };
   
     static postActivity = (params, scb, ecb) => {
        //process.env.REACT_APP_GET_RECENT_PRODUCTS_URL
         axios
             .post(`${process.env.REACT_APP_POST_ACTIVITY_URL}`, params)
             .then(response => {
                 let data = response.data;
                 if(data != null && data.status === false){
                     throw data.errorMessage;
                 }
                // scb(response.data);
             })
             .catch(e => {
                 if (typeof e === 'string') {
                     return ecb(e);
                 }
                 ecb('Cannot contact server. Please try again.');
             });
     };

     static postContentActivity = (params, scb, ecb) => {
        axios
             .post(`${process.env.REACT_APP_ACTIVITY_URL}`, params )
             .then(response => {
                 
                scb(response);
             })
             .catch(e => {
                 if (typeof e === 'string') {
                     return ecb(e);
                 }
                 ecb('Cannot contact server. Please try again.');
             });
     };
   
}


export default UserService;