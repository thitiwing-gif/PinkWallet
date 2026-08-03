
let balance =
Number(localStorage.getItem("balance")) || 10000;


let history =
JSON.parse(localStorage.getItem("history")) || [
"💰 เริ่มต้นระบบ ฿10,000"
];


let username =
localStorage.getItem("username") || "Pink User";


let notifications =
Number(localStorage.getItem("notifications")) || 0;


let hideBalance=false;




function saveData(){

localStorage.setItem(
"balance",
balance
);


localStorage.setItem(
"history",
JSON.stringify(history)
);


localStorage.setItem(
"username",
username
);


localStorage.setItem(
"notifications",
notifications
);

}





function getTime(){

return new Date()
.toLocaleString("th-TH");

}





function updateUI(){


let money =
document.getElementById("balance");


if(money){

money.innerHTML =

hideBalance

?

"฿••••••"

:

"฿"+balance.toLocaleString("th-TH")+".00";

}





let name =
document.getElementById("username");


if(name){

name.innerHTML=username;

}





let count =
document.getElementById("notifyCount");


if(count){

count.innerHTML=notifications;

}





let list =
document.getElementById("historyList");


if(list){

list.innerHTML="";


history.slice().reverse()
.forEach(item=>{


list.innerHTML +=

"<li>"+item+"</li>";


});


}


saveData();


}







function login(){


let name =
document.getElementById("loginName").value;


let pin =
document.getElementById("loginPin").value;



if(name=="" || pin.length!=4){

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



document.getElementById(
"loginPage"
).style.display="none";


document.getElementById(
"app"
).style.display="block";


updateUI();


}







function toggleBalance(){

hideBalance=!hideBalance;

updateUI();

}





function addHistory(text){


history.push(
text+" | "+getTime()
);


notifications++;


updateUI();


}






function deposit(){

balance+=100;

addHistory(
"➕ ฝาก +100 บาท"
);

}





function withdraw(){


if(balance<100){

alert("ยอดเงินไม่พอ");

return;

}


balance-=100;


addHistory(
"➖ ถอน -100 บาท"
);


}


function transfer(){

if(balance<50){

alert("ยอดเงินไม่พอ");

return;

}


balance-=50;


addHistory(
"↗️ โอน -50 บาท"
);


}





function receive(){


balance+=50;


addHistory(
"📥 รับ +50 บาท"
);


}





function changeName(){


let name =
prompt(
"ใส่ชื่อใหม่",
username
);



if(name){

username=name;

updateUI();

}


}







function showNotification(){


alert(
"มีแจ้งเตือน "+notifications+" รายการ"
);


notifications=0;


updateUI();


}







// รูปโปรไฟล์


document.addEventListener(
"DOMContentLoaded",
function(){



let upload =
document.getElementById(
"imageUpload"
);



if(upload){


upload.onchange=function(){


let file=this.files[0];


if(file){


let reader=new FileReader();



reader.onload=function(e){


localStorage.setItem(
"profileImage",
e.target.result
);



let img=
document.getElementById(
"profileImage"
);



if(img){

img.src=e.target.result;

}



};



reader.readAsDataURL(file);


}


}


}



let saved =
localStorage.getItem(
"profileImage"
);



if(saved){


let img =
document.getElementById(
"profileImage"
);


if(img){

img.src=saved;

}


}



updateUI();


});









function hidePages(){


[
"historyPage",
"qrPage",
"settingsPage"

].forEach(id=>{


let page=
document.getElementById(id);


if(page){

page.style.display="none";

}


});


}







function showHome(){


hidePages();


document.querySelector(
".wallet-card"
).style.display="block";


document.querySelector(
".menu"
).style.display="grid";


document.querySelector(
".chart-card"
).style.display="block";


}








function showHistory(){


hidePages();


let page=
document.getElementById(
"historyPage"
);


page.style.display="block";


let list=
document.getElementById(
"fullHistory"
);


list.innerHTML="";


history.slice().reverse()
.forEach(item=>{


list.innerHTML+=
"<li>"+item+"</li>";

});


}








function showQR(){


hidePages();


document.getElementById(
"qrPage"
).style.display="block";


}








function showSettings(){


hidePages();


document.getElementById(
"settingsPage"
).style.display="block";


}








function copyAccount(){


navigator.clipboard.writeText(
"123-4-56789-0"
);


alert(
"คัดลอกเลขบัญชีแล้ว"
);


}








function toggleTheme(){

document.body.classList.toggle(
"dark"
);

}







function changePin(){


let pin=
prompt(
"ใส่ PIN ใหม่ 4 หลัก"
);



if(pin && pin.length==4){


localStorage.setItem(
"pin",
pin
);


alert(
"เปลี่ยน PIN แล้ว"
);


}


}







function clearData(){


if(confirm(
"ต้องการล้างข้อมูลทั้งหมดหรือไม่?"
)){


localStorage.clear();


location.reload();


}


}







window.onload=function(){


let login=
localStorage.getItem(
"login"
);



if(login==="true"){


document.getElementById(
"loginPage"
).style.display="none";


document.getElementById(
"app"
).style.display="block";


}



updateUI();


}
