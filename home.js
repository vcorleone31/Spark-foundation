function setCustomer() {
    for (let i = 0; i < custData.length; i++) {
    let customer = {
        account_no: custData[i].account_no,
        name: custData[i].name,
        email: custData[i].email,
        balance: custData[i].balance
    }
    localStorage.setItem(custData[i].account_no, JSON.stringify(customer));
}
}

function loader(){
    setCustomer();
}

window.onload = loader;
