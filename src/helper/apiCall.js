export const apiCall = async (callParams) =>{
    let URL = `http://localhost:3089/${callParams.url && callParams.url}`; 
    let callFilter = {
        method: callParams.method || "GET",
        headers: {"content-type": "application/json"},
    } 
    if(callParams.body){ callFilter.body = callParams.body }; 
    return fetch(URL, callFilter)
    .then(data => data.json())
    .then(data => data)
    .catch(err => { 
        console.log(err);
        return({ synced: 0 });
    })
}