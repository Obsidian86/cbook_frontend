export const convMoney = (amount) =>{
    amount = parseFloat(amount).toFixed(2); 
    let chunks = amount.split(".");
    let newAmount = "";
    let count = 0;
    for(let i=chunks[0].length -1; i>-1; i--){
        newAmount += chunks[0][i];
        count++;
        if(count === 3 && i !== 0){
            newAmount += ",";
            count = 0;
        };
    }  
    amount = newAmount.split("").reverse().join("") + "." + chunks[1];
    return `$${amount}`;
}