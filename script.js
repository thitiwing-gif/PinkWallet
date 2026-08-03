
// Pink Wallet v6.0 Ultimate


let balance =
Number(localStorage.getItem("balance")) || 10000;



let username =
localStorage.getItem("username") || "Pink User";



let mode =
localStorage.getItem("mode") || "simulation";



let history =
JSON.parse(
localStorage.getItem("history")
) || [];



let notifications =
JSON.parse(
localStorage.getItem("notifications")
) || [];



let receivers =
JSON.parse(
localStorage.getItem("receivers")
) || [];



let income =
Number(
localStorage.getItem("income")
) || 0;



let expense =
Number(
localStorage.getItem("expense")
) || 0;



let hideBalance=false;



function saveData(){


localStorage.setItem(
"balance",
balance
);



localStorage.setItem(
"username",
username
);



localStorage.setItem(
"mode",
mode
);



localStorage.setItem(
"history",
JSON.stringify(history)
);



localStorage.setItem(
"notifications",
JSON.stringify(notifications)
);



localStorage.setItem(
"receivers",
JSON.stringify(receivers)
);



localStorage.setItem(
"income",
income
);



localStorage.setItem(
"expense",
expense
);



}








function getTime(){


return new Date()
.toLocaleString("th-TH");


}








function addNotification(text){


notifications.push({

text:text,

time:getTime()

});


saveData();


}








function addHistory(type,amount){


let item={


type:type,

amount:amount,

time:getTime()


};



history.push(item);



if(type==="income"){


income+=amount;


}

else{


expense+=amount;


}



addNotification(
type+
" "+
amount+
" บาท"
);



saveData();



updateUI();


}



function updateUI(){



let money =
document.getElementById(
"balance"
);



if(money){


money.innerHTML =

hideBalance

?

"฿••••••"

:

"฿"+
balance.toLocaleString("th-TH")
+".00";


}






let user =
document.getElementById(
"username"
);



if(user){


user.innerHTML=username;


}






let badge =
document.getElementById(
"modeBadge"
);



let status =
document.getElementById(
"modeStatus"
);




if(badge){


badge.innerHTML =

mode==="real"

?

"REAL"

:

"SIMULATION";


}





if(status){


status.innerHTML =

mode==="real"

?

"🔵 โหมดเงินจริง (เตรียมเชื่อมต่อ)"

:

"🟢 โหมดจำลอง";


}







let incomeBox =
document.getElementById(
"income"
);



if(incomeBox){

incomeBox.innerHTML=
"฿"+income.toLocaleString();

}






let expenseBox =
document.getElementById(
"expense"
);



if(expenseBox){

expenseBox.innerHTML=
"฿"+expense.toLocaleString();

}







let count =
document.getElementById(
"transactionCount"
);



if(count){

count.innerHTML=
history.length;

}






renderHistory();

renderReceivers();

renderNotifications();



saveData();


}










function login(){


let name =
document.getElementById(
"loginName"
).value;



let pin =
document.getElementById(
"loginPin"
).value;





if(name==="" || pin.length!==4){


alert(
"กรุณาใส่ชื่อและ PIN 4 หลัก"
);


return;


}





username=name;



localStorage.setItem(
"login",
"true"
);



localStorage.setItem(
"pin",
pin
);



document.getElementById(
"loginPage"
).style.display="none";



document.getElementById(
"app"
).style.display="block";



updateUI();



}



function toggleBalance(){


hideBalance =
!hideBalance;


updateUI();


}








function setMode(type){


mode=type;



if(type==="real"){


alert(
"Real Mode เปิดใช้งานแล้ว (ต้องเชื่อมต่อผู้ให้บริการจริงในอนาคต)"
);


}
else{


alert(
"เปลี่ยนเป็นโหมดจำลอง"
);


}



updateUI();


}









function deposit(){


let amount=100;


balance+=amount;



addHistory(
"income",
amount
);


}









function withdraw(){


let amount=100;



if(balance<amount){


alert(
"ยอดเงินไม่พอ"
);


return;


}



balance-=amount;



addHistory(
"expense",
amount
);


}









function transfer(){


let amount=50;



if(balance<amount){


alert(
"ยอดเงินไม่พอ"
);


return;


}



balance-=amount;



addHistory(
"expense",
amount
);



showReceipt(
"โอนเงิน",
amount
);


}









function receive(){


let amount=50;



balance+=amount;



addHistory(
"income",
amount
);



showReceipt(
"รับเงิน",
amount
);


}









function changeName(){


let name =
prompt(
"ชื่อใหม่",
username
);



if(name){


username=name;


saveData();


updateUI();


}


}



function renderHistory(){


let list =
document.getElementById(
"historyList"
);



if(!list){

return;

}



list.innerHTML="";



history
.slice()
.reverse()
.forEach(function(item){



let li =
document.createElement(
"li"
);



li.innerHTML=

item.type+
" ฿"+
item.amount.toLocaleString()
+
"<br>"
+
item.time;



list.appendChild(li);



});



}









function showHistory(){


hideAllPages();



let page =
document.getElementById(
"historyPage"
);



if(page){


page.style.display="block";


}



let full =
document.getElementById(
"fullHistory"
);



if(full){


full.innerHTML="";



history
.slice()
.reverse()
.forEach(function(item){



full.innerHTML +=

"<li>"+
item.type+
" ฿"+
item.amount+
"<br>"+
item.time+
"</li>";



});



}



}









function filterHistory(type){



let full =
document.getElementById(
"fullHistory"
);



if(!full){

return;

}



full.innerHTML="";



history
.filter(function(item){



if(type==="all"){

return true;

}



if(type==="income"){

return item.type==="income";

}



if(type==="expense"){

return item.type==="expense";

}



})
.forEach(function(item){



full.innerHTML +=

"<li>"+
item.type+
" ฿"+
item.amount+
"<br>"+
item.time+
"</li>";



});



}








function hideAllPages(){


let pages=[

"settingsPage",

"historyPage",

"qrPage",

"receiverPage",

"receiptPage",

"kycPage",

"analyticsPage",

"notificationPage",

"apiPage"

];



pages.forEach(function(id){


let el =
document.getElementById(id);



if(el){


el.style.display="none";


}


});



}



function showHome(){


hideAllPages();



let cards=[

".wallet-card",

".system-mode",

".quick-actions",

".summary-card",

".chart-card",

".search-card",

".transaction-card",

".bank-card",

".connection-card"

];



cards.forEach(function(c){


let el =
document.querySelector(c);



if(el){


el.style.display="block";


}



});



}









function showQR(){


hideAllPages();



let page =
document.getElementById(
"qrPage"
);



if(page){


page.style.display="block";


}


}








function showSettings(){


hideAllPages();



let page =
document.getElementById(
"settingsPage"
);



if(page){


page.style.display="block";


}



}



function showAnalytics(){


hideAllPages();



let page =
document.getElementById(
"analyticsPage"
);



if(page){


page.style.display="block";


}



updateAnalytics();



}









function updateAnalytics(){


let totalIncome =
document.getElementById(
"totalIncome"
);



let totalExpense =
document.getElementById(
"totalExpense"
);



let totalBalance =
document.getElementById(
"totalBalance"
);





if(totalIncome){


totalIncome.innerHTML=

"฿"+
income.toLocaleString();


}



if(totalExpense){


totalExpense.innerHTML=

"฿"+
expense.toLocaleString();


}



if(totalBalance){


totalBalance.innerHTML=

"฿"+
balance.toLocaleString();


}



}









function showNotification(){


hideAllPages();



let page =
document.getElementById(
"notificationPage"
);



if(page){


page.style.display="block";


}



renderNotifications();


}









function renderNotifications(){


let list =
document.getElementById(
"notificationList"
);



if(!list){

return;

}



list.innerHTML="";



notifications
.slice()
.reverse()
.forEach(function(n){



list.innerHTML +=

"<li>"+
n.text+
"<br>"+
n.time+
"</li>";



});



}



function clearNotifications(){


notifications=[];


saveData();


renderNotifications();



updateUI();



}








function addReceiver(){



let name =
prompt(
"ชื่อผู้รับเงิน"
);



let account =
prompt(
"เลขบัญชีหรือเบอร์ Wallet"
);





if(name && account){



receivers.push({

name:name,

account:account

});



saveData();



renderReceivers();



alert(
"เพิ่มผู้รับเงินแล้ว"
);



}



}









function renderReceivers(){


let box =
document.getElementById(
"receiverList"
);



let manage =
document.getElementById(
"receiverManageList"
);





function draw(target){


if(!target){

return;

}



target.innerHTML="";



receivers.forEach(function(r,index){



target.innerHTML +=


"<div class='receiver-item'>"+
r.name+
"<br>"+
r.account+
"</div>";



});



}





draw(box);

draw(manage);



}









function searchHistory(){


let keyword =
document.getElementById(
"searchTransaction"
).value
.toLowerCase();




let list =
document.getElementById(
"historyList"
);



if(!list){

return;

}



list.innerHTML="";



history
.filter(function(item){


return JSON.stringify(item)
.toLowerCase()
.includes(keyword);


})
.reverse()
.forEach(function(item){



list.innerHTML +=


"<li>"+
item.type+
" ฿"+
item.amount+
"<br>"+
item.time+
"</li>";



});



}



function showReceipt(type,amount){


let receiptType =
document.getElementById(
"receiptType"
);



let receiptAmount =
document.getElementById(
"receiptAmount"
);



let receiptTime =
document.getElementById(
"receiptTime"
);



let receiptStatus =
document.getElementById(
"receiptStatus"
);





if(receiptType){

receiptType.innerHTML=type;

}



if(receiptAmount){

receiptAmount.innerHTML=
"฿"+amount.toLocaleString();

}



if(receiptTime){

receiptTime.innerHTML=
getTime();

}



if(receiptStatus){

receiptStatus.innerHTML=
"สำเร็จ";

}



}









function saveProfile(){


let input =
document.getElementById(
"newUsername"
);



if(input && input.value){



username=input.value;



saveData();



updateUI();



alert(
"บันทึกชื่อแล้ว"
);



}



}









function saveBankAccount(){


let bank =
document.getElementById(
"bankSelect"
).value;



let account =
document.getElementById(
"settingAccount"
).value;




localStorage.setItem(
"bankName",
bank
);



localStorage.setItem(
"accountNumber",
account
);



let bankText =
document.getElementById(
"bankName"
);



let accountText =
document.getElementById(
"accountNumber"
);




if(bankText){

bankText.innerHTML=bank;

}



if(accountText){

accountText.innerHTML=account;

}



alert(
"บันทึกบัญชีแล้ว"
);



}









function connectTrueMoney(){


let number =
document.getElementById(
"trueMoneyNumber"
).value;



if(number){


localStorage.setItem(
"trueMoney",
number
);



let status =
document.getElementById(
"trueMoneyStatus"
);



if(status){

status.innerHTML=
"เชื่อมต่อแล้ว";

}



alert(
"เชื่อมต่อ TrueMoney สำเร็จ (จำลอง)"
);



}


}



function changePIN(){


let oldPin =
localStorage.getItem(
"pin"
);



let newPin =
prompt(
"ใส่ PIN ใหม่ 4 หลัก"
);



if(newPin && newPin.length===4){



localStorage.setItem(
"pin",
newPin
);



alert(
"เปลี่ยน PIN แล้ว"
);



}



}








function logout(){



localStorage.setItem(
"login",
"false"
);



location.reload();



}









function toggleTheme(){



document.body.classList.toggle(
"dark"
);



}








function clearData(){



let confirmDelete =
confirm(
"ต้องการล้างข้อมูลทั้งหมดหรือไม่?"
);



if(confirmDelete){


localStorage.clear();



alert(
"ล้างข้อมูลเรียบร้อย"
);



location.reload();



}



}









function copyAccount(){


let account =
document.getElementById(
"qrAccount"
);



let text =
account
?
account.innerHTML
:
"123-4-56789-0";



navigator.clipboard.writeText(
text
);



alert(
"คัดลอกเลขบัญชีแล้ว"
);



}








function submitKYC(){



let id =
document.getElementById(
"idCard"
).value;



if(id){



localStorage.setItem(
"kyc",
"verified"
);



let status =
document.getElementById(
"kycStatus"
);



if(status){

status.innerHTML=
"✅ ยืนยันแล้ว";

}



}



}



function createChart(){



let canvas =
document.getElementById(
"moneyChart"
);



if(!canvas){

return;

}





let ctx =
canvas.getContext(
"2d"
);





if(window.moneyChartInstance){


window.moneyChartInstance.destroy();


}






window.moneyChartInstance =
new Chart(
ctx,
{

type:"doughnut",


data:{


labels:[

"รายรับ",

"รายจ่าย"

],


datasets:[{

data:[

income,

expense

]


}]


},


options:{


responsive:true,


plugins:{


legend:{


position:"bottom"


}


}


}



}

);





}









function updateBankInfo(){


let bank =
localStorage.getItem(
"bankName"
);



let account =
localStorage.getItem(
"accountNumber"
);





let bankName =
document.getElementById(
"bankName"
);



let accountNumber =
document.getElementById(
"accountNumber"
);





if(bank && bankName){


bankName.innerHTML=bank;


}



if(account && accountNumber){


accountNumber.innerHTML=account;


}



}









function loadProfileImage(){


let image =
localStorage.getItem(
"profileImage"
);



let img =
document.getElementById(
"profileImage"
);





if(image && img){


img.src=image;


}



}




window.onload=function(){



let login =
localStorage.getItem(
"login"
);




let loginPage =
document.getElementById(
"loginPage"
);



let app =
document.getElementById(
"app"
);






if(login==="true"){



if(loginPage){

loginPage.style.display="none";

}



if(app){

app.style.display="block";

}



}





updateUI();


};



function openAPIStatus(){


hideAllPages();



let page =
document.getElementById(
"apiPage"
);



if(page){


page.style.display="block";


}


}








function connectBankAPI(){



alert(
"ระบบ Bank API เตรียมเชื่อมต่อ"
);



}









function connectWalletAPI(){



alert(
"ระบบ Wallet API เตรียมเชื่อมต่อ"
);



}









function verifySecurity(){



let result =
localStorage.getItem(
"login"
);



if(result==="true"){


return true;


}



return false;



}








function checkLogin(){



let login =
localStorage.getItem(
"login"
);



if(login!=="true"){


return false;


}



return true;


}









function requireLogin(){



if(!checkLogin()){


alert(
"กรุณาเข้าสู่ระบบก่อน"
);



return false;


}



return true;


}









function exportData(){



let data={


balance:balance,

username:username,

history:history,

income:income,

expense:expense


};





let file =
JSON.stringify(
data,
null,
2
);





let blob =
new Blob(
[file],
{
type:"application/json"
}
);



let url =
URL.createObjectURL(
blob
);



let a =
document.createElement(
"a"
);



a.href=url;



a.download=
"pink-wallet-data.json";



a.click();



}



function importDemoData(){



balance = 10000;



income = 0;



expense = 0;



history=[

{

type:"income",

amount:10000,

time:getTime()

}

];



notifications=[

{

text:"เริ่มต้น Pink Wallet v6.0",

time:getTime()

}

];



saveData();



updateUI();



alert(
"โหลดข้อมูลตัวอย่างแล้ว"
);



}









function resetWallet(){



let ok =
confirm(
"รีเซ็ตกระเป๋าเงินหรือไม่?"
);




if(ok){



balance=10000;



income=0;



expense=0;



history=[];



notifications=[];



saveData();



updateUI();



}



}








function calculateBalance(){



return balance;


}









function getTransactionCount(){



return history.length;


}









function getWalletStatus(){



if(mode==="real"){



return "REAL MODE";


}



return "SIMULATION MODE";


}









function showWalletInfo(){



alert(

"Pink Wallet v6.0\n"+
"ผู้ใช้: "+username+
"\nยอดเงิน: ฿"+
balance.toLocaleString()+
"\nโหมด: "+
getWalletStatus()

);



}



function validateAmount(amount){


amount =
Number(amount);



if(isNaN(amount) || amount<=0){



return false;


}



return true;


}









function customDeposit(){



let amount =
prompt(
"จำนวนเงินฝาก"
);




if(!validateAmount(amount)){



alert(
"จำนวนเงินไม่ถูกต้อง"
);



return;


}





amount=Number(amount);



balance+=amount;



addHistory(
"income",
amount
);



}









function customWithdraw(){



let amount =
prompt(
"จำนวนเงินถอน"
);





if(!validateAmount(amount)){



alert(
"จำนวนเงินไม่ถูกต้อง"
);



return;


}




amount=Number(amount);





if(amount>balance){



alert(
"ยอดเงินไม่พอ"
);



return;


}





balance-=amount;



addHistory(
"expense",
amount
);



}









function saveAppSettings(){



let theme =
document.body.classList.contains(
"dark"
)
?
"dark"
:
"light";



localStorage.setItem(
"theme",
theme
);



}








function loadAppSettings(){



let theme =
localStorage.getItem(
"theme"
);




if(theme==="dark"){



document.body.classList.add(
"dark"
);



}



}



function createTransactionID(){


return (

"PW"+
Date.now()

);


}









function addSecureHistory(type,amount){



let transaction={


id:createTransactionID(),

type:type,

amount:amount,

time:getTime(),

status:"SUCCESS"


};




history.push(transaction);



saveData();



updateUI();



}








function getLatestTransaction(){



if(history.length===0){



return null;


}



return history[
history.length-1
];


}









function showLatestTransaction(){



let item =
getLatestTransaction();



if(!item){



alert(
"ยังไม่มีรายการ"
);



return;


}





alert(

"รายการล่าสุด\n"+
item.type+
"\n฿"+
item.amount+
"\n"+
item.time

);



}









function securityCheck(){



let pin =
localStorage.getItem(
"pin"
);



if(!pin){



return false;


}



return true;


}









function appReady(){



loadAppSettings();


updateBankInfo();


loadProfileImage();


updateUI();



console.log(
"Pink Wallet v6.0 Ready"
);



}



/* START APPLICATION */


document.addEventListener(
"DOMContentLoaded",
function(){

appReady();


let loading =
document.getElementById("loading");


if(loading){

loading.style.display="none";

}


});








/* GLOBAL ERROR PROTECTION */


window.onerror =
function(
message,
source,
line
){



console.log(
"Pink Wallet Error:",
message,
"Line:",
line
);



};








/* FINAL VERSION */


console.log(
"=============================="
);



console.log(
"Pink Wallet v6.0 Ultimate Loaded"
);



console.log(
"Simulation Wallet System Active"
);



console.log(
"=============================="
);
function closeModal(){

let modal=document.getElementById("modalBox");

if(modal){

modal.style.display="none";

}

}
