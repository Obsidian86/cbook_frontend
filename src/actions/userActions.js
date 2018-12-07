import { apiCall } from '../helper/apiCall';  
 
export const logOut = () =>{ 
    return (dispatch) => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        dispatch({type: "LOGOUT_USER" });
    };    
};
export const checkLoggedIn = () =>{
    return (dispatch) =>{
        if(localStorage.getItem("user") !== null && localStorage.getItem("authToken") !== null){
            dispatch(setLoginUser(localStorage.getItem("user")));
        };
    }
};

const setLoginUser = (userId) => { 
    return{ type: "LOGIN_USER", payload: {userId} }
};
export const loginUser = (userInfo) => {  
    return async (dispatch) =>{ 
        let data = await apiCall({ 
            method: "POST", 
            url: `user/login`,
            body: JSON.stringify(userInfo)
        }); 
        if(!data.error){
            localStorage.setItem("user", data.userId);
            localStorage.setItem("authToken", data.authToken);
            dispatch(setLoginUser(data.userId))
        }else{ 
            dispatch({type: "ERROR", payload: data.error.error })
        }
    }
}

export const createUser = (createInfo) =>{
    return async (dispatch) =>{
        let data = await apiCall({ 
            method: "POST", 
            url: "user/newuser",
            body: JSON.stringify(createInfo)
        });
        if(!data.error){
            localStorage.setItem("user", data.userId);
            localStorage.setItem("authToken", data.authToken);
            dispatch(setLoginUser((data.userAccount._id)));
        }else{
            dispatch({type: "ERROR", payload: data.error.error })
        }
    }
}
 
export const deleteUser = (userId) =>{
    return async (dispatch) =>{
        dispatch({type: "SET_MESSAGE", payload:{message: "Deleting user"}});
        let data = await apiCall({
            method: "DELETE", 
            url: `user/${userId}`,
            applyAuth: true
        });
        if(!data.error){ 
            dispatch( logOut() );
            dispatch({type: "SET_MESSAGE", payload: "Account deleted"});
        }else{
            dispatch({type: "ERROR", payload: data.error.error })
        }
    }
}