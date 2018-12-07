export const back = () => ({ type: "HOME_PAGE" });

export const toggleDrawer = (drawer) =>({
    type: "TOGGLE_DRAWER",
    payload: { drawer: !drawer }
});

export const viewAccount = (account) => ({
    type: "VIEW_PAGE",
    payload: {
        page: "View Account",
        accountView: account
    } 
});
export const setMessage = (message) => ({
    type: "SET_MESSAGE",
    payload: message 
});
export const toggleSettings = () => ({ 
    type: "TOGGLE_SETTINGS" 
});