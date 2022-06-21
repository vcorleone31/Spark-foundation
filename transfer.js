let custLists = document.getElementById("cs_lists");
let crLists = document.getElementById("cr_lists");
let sEmail = document.getElementById("s_email");
let rEmail = document.getElementById("r_email");
let transferAmount = document.getElementById("transfer_amount");
let submit = document.getElementById("submit");
let msg = document.getElementById("msg");



let transactionHistory = JSON.parse(localStorage.getItem('transactionHistory'));
if(transactionHistory == null){
    transactionHistory = [];
}
document.querySelector('#cList_s_name').addEventListener('input', optionSelects);
document.querySelector('#cList_r_name').addEventListener('input', optionSelectr);

// fuction to fetch customer list
function getCustomerList() {
    //custLists.innerHTML = "";
    for (let i = 0; i < custData.length ; i++) {
        let customer = JSON.parse(localStorage.getItem(custData[i].account_no));
        renderDataList(customer);
        renderRDataList(customer);
    }

}

// funtion to put fetched list into datalist for sender 
function renderDataList(customer) {
    let listCustomers = `<option value="${customer.account_no}"></option>`;
    custLists.insertAdjacentHTML('beforeend', listCustomers);
}

// funtion to put fetched list into datalist for receiver
function renderRDataList(customer) {
    let listRCustomers = `<option value="${customer.account_no}"></option>`;
    crLists.insertAdjacentHTML('beforeend', listRCustomers);
}

// function to get emailid automatically for sender
function optionSelects(e){
    let input = e.target;
    val = input.value;
    list = input.getAttribute('list');
    options = document.getElementById(list).childNodes;
    for(let i = 0; i < options.length; i++) {
        autofillInfos(val);
        break;
    }
}

// function to get emailid automatically for receiver
function optionSelectr(e){
    let input = e.target;
    val = input.value;
    list = input.getAttribute('list');
    options = document.getElementById(list).childNodes;
    for(let i = 0; i < options.length; i++) {
        autofillInfor(val);
        break;
    }
}

// function to put emailid into form automatically for sender
function autofillInfos(id){
    let idx = custData.findIndex(x => x.account_no == id);
    sEmail.value = custData[idx].email;
}

// function to put emailid into form automatically for receiver
function autofillInfor(id){
    let idx = custData.findIndex(x => x.account_no == id);
    rEmail.value = custData[idx].email;
}

  // function for amount transfer
  submit.addEventListener("click", function amountTransferFunc() {

    let s = document.getElementById("cList_s_name").value;
    let r = document.getElementById("cList_r_name").value;
    let sender = JSON.parse(localStorage.getItem(s));
    let receiver = JSON.parse(localStorage.getItem(r));
    if( s == sender.account_no && r == receiver.account_no){
        if(sender.balance > transferAmount.value && sender.account_no != receiver.account_no){
            let bal1 = parseInt(sender.balance) - parseInt(transferAmount.value);
            let customer_s = {
                account_no: sender.account_no,
                name: sender.name,
                email: sender.email,
                balance: bal1
            }
            localStorage.setItem(sender.account_no, JSON.stringify(customer_s));

            let bal2 = parseInt(receiver.balance) + parseInt(transferAmount.value);
            let customer_r = {
                account_no: receiver.account_no,
                name: receiver.name,
                email: receiver.email,
                balance: bal2
            }
            localStorage.setItem(receiver.account_no, JSON.stringify(customer_r));


            msg.innerHTML = `<div class="alert alert-success" role="alert" >
            Your transaction is Successful.
          </div>`

        // this code is to set list of transaction history
        let tid = Math.floor(100000 + Math.random() * 900000);
        let currentDate = new Date().toLocaleString("en-US", {timeZone: 'Asia/Kolkata'});
        transactionHistory.push(tid);
          let trans_hist = {
              transaction_id: tid,
              sender_name: sender.name,
              receiver_name: receiver.name,
              trans_amount: transferAmount.value,
              timestamp: currentDate             
          }
          localStorage.setItem(tid, JSON.stringify(trans_hist));
        //   code for transaction history ends
        localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));

    
        }
        else{
            msg.innerHTML = `<div class="alert alert-danger" role="alert" >
            Your transaction can not be executed.
          </div>
          `
          
        }
    }
   
    document.getElementById("form-money-transfer").reset();
   
})

setInterval(() => {
    msg.innerHTML = "";
}, 5000);

function loaders() {
    getCustomerList();
}

window.onload = loaders();