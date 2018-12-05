import { apiCall } from '../helper/apiCall';  
 
const setLoginUser = (userId) => { 
    return{ type: "LOGIN_USER", payload: {userId} }
};
export const loginUser = (userInfo) => {  
    return async (dispatch) =>{ 
        let data = await apiCall({ 
            method: "POST", 
            url: "user/login",
            body: JSON.stringify(userInfo)
        });
        if(data.userId){dispatch(setLoginUser(data.userId))}
    }
}   