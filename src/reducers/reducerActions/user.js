export const loginUser = (state, action) => {
    return {...state, message: "", user: action.payload.userId, page: "All Accounts" }; 
}
