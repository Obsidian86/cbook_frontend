import { apiCall } from '../helper/apiCall';  
 
export const logOut = () =>{ 
    return (dispatch) => {
        localStorage.removeItem("user");
        dispatch({type: "LOGOUT_USER" });
    };    
};
export const checkLoggedIn = () =>{
    return (dispatch) =>{
        if(localStorage.getItem("user") !== null){
            dispatch(setLoginUser(localStorage.getItem("user")));
        };
    }
};

const setLoginUser = (userId) => {
    localStorage.setItem("user", userId);
    return{ type: "LOGIN_USER", payload: {userId} }
};
export const loginUser = (userInfo) => {  
    return async (dispatch) =>{ 
        let data = await apiCall({ 
            method: "POST", 
            url: "user/login",
            body: JSON.stringify(userInfo)
        });
        
        if(!data.error){
            dispatch(setLoginUser(data.userId))
        }else{
            dispatch({type: "SET_MESSAGE", payload:{message: data.error}});
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
        if(data.synced){ 
            dispatch(setLoginUser((data.userAccount._id)));
        }else{ 
            dispatch({type: "SET_MESSAGE", payload:{message: ""}});
        }
    }
}
 
export const deleteUser = (userId) =>{
    return async (dispatch) =>{
        dispatch({type: "SET_MESSAGE", payload:{message: "Deleting user"}});
        let data = await apiCall({
            method: "DELETE", 
            url: `user/${userId}` 
        });
        if(data.synced > 0){
            dispatch({type: "SET_MESSAGE", payload:{message: ""}});
            dispatch( logOut() );
        }
    }
}