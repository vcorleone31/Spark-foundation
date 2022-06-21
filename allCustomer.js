const tableRow = document.getElementById("table-row");

//let allCustomers = [];

function getCustomer() {
    tableRow.innerHTML = "";
    for (let i = 0; i < custData.length; i++) {
        let customer = JSON.parse(localStorage.getItem(custData[i].account_no));
        renderData(customer);
    }
}

function renderData(customer) {
    let listCustomers = `
        <tr>
            <td>${customer.account_no}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.balance}</td>
            <td><button type="buttpn"  class="btn btn-info" id="${customer.account_no}" data-toggle="modal" data-target="#popupcustomerdetails">Details</Button></td>        
        </tr>    
        `;
    tableRow.insertAdjacentHTML('beforeend', listCustomers);


}

function btnDetails() {
    for (let i = 0; i < custData.length; i++) {
        let btnDetail = document.getElementById(`${custData[i].account_no}`);
        btnDetail.onclick = function () {
            renderUserInfo(custData[i]);
        }
    }
}

function renderUserInfo(userdata) {
    let user_acc = document.getElementById('prf-acc-no');
    let user_name = document.getElementById('prf-name');
    let user_email = document.getElementById('prf-email');
    let user_balance = document.getElementById('prf-balance');
    let user_nameCard = document.getElementById("prf-name-card");
    user_acc.innerHTML = userdata.account_no;
    user_name.innerHTML = userdata.name;
    user_email.innerHTML = userdata.email;
    user_balance.innerHTML = userdata.balance;
    user_nameCard.innerHTML = userdata.name;
}


function loader() {
    getCustomer();
    btnDetails();
}

window.onload = loader;

