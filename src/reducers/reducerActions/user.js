export const loginUser = (state, action) => {
    return {...state, message: "", user: action.payload.userId, page: "All Accounts" }; 
}

export const deleteUser = (state, action) => {
    return state;
}
 
