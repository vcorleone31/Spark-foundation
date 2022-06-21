let transactionHistoryTableData = document.getElementById("transaction_history_table_data");
let tHistory = JSON.parse(localStorage.getItem('transactionHistory'));



//   this code is for transaction History here begins
console.table(tHistory);
function fetchListHistory() {
    transactionHistoryTableData.innerHTML = ""       
   for (let i = 0; i < tHistory.length; i++) {
       let historydata = JSON.parse(localStorage.getItem(tHistory[i]));
       renderListHistory(historydata);
   }

   }

 function renderListHistory(historydata)
 {
 let transactiondata = `<tr>
                           <td>${historydata.transaction_id}</td>
                           <td>${historydata.sender_name}</td>
                           <td>${historydata.receiver_name}</td>
                           <td>${historydata.trans_amount}</td>
                           <td>${historydata.timestamp}</td>
                       </tr>`
 transactionHistoryTableData.insertAdjacentHTML( 'beforeend' , transactiondata );
}
 

//   transaction history data code ends here


function loaders() {
   fetchListHistory();
}

window.onload = loaders();