export const apiCall = async (callParams) =>{
    let URL = `https://cbook-backend.herokuapp.com/${callParams.url && callParams.url}`; 
    let callFilter = {
        method: callParams.method || "GET",
        headers: {"content-type": "application/json"},
    } 
    if(callParams.applyAuth){ callFilter.headers.Authorization = `Bearer: ${localStorage.getItem("authToken")}`}
    if(callParams.body){ callFilter.body = callParams.body };  
    return fetch(URL, callFilter)
    .then(data => data.json())
    .then(data => data)
    .catch(err => {  
        return({ synced: 0 });
    })
}