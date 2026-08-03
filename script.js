
// Pink Wallet v3.0


let balance =
Number(localStorage.getItem("balance")) || 10000;


let history =
JSON.parse(localStorage.getItem("history")) || [
"💰 เริ่มต้นระบบ ฿10,000"
];


let username =
localStorage.getItem("username") || "Pink User";


let mode =
localStorage.getItem("mode") || "simulation";


let hideBalance = false;







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
"mode",
mode
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

"฿"+
balance.toLocaleString("th-TH")
+".00";


}





let name =
document.getElementById("username");



if(name){

name.innerHTML=username;

}






let status =
document.getElementById("modeStatus");



if(status){


if(mode==="real"){


status.innerHTML=
"🔵 โหมดเงินจริง (เตรียมเชื่อมต่อ)";


}

else{


status.innerHTML=
"🟢 โหมดจำลอง";


}


}




saveData();


}









function login(){


let name =
document.getElementById("loginName").value;



let pin =
document.getElementById("loginPin").value;




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


hideBalance=!hideBalance;


updateUI();


}









function setMode(type){


mode=type;


if(type==="real"){


alert(
"โหมดเงินจริงต้องเชื่อมต่อผู้ให้บริการที่ได้รับอนุญาต"
);


}


updateUI();


}








function addHistory(text){


history.push(

text+
" | "+
getTime()

);


updateUI();


}







function deposit(){


balance+=100;


addHistory(
"➕ ฝากเงิน +100 บาท"
);


}







function withdraw(){


if(balance<100){


alert(
"ยอดเงินไม่พอ"
);


return;


}



balance-=100;


addHistory(
"➖ ถอนเงิน -100 บาท"
);


}


function transfer(){


if(balance<50){


alert(
"ยอดเงินไม่พอ"
);


return;


}



balance-=50;


addHistory(
"↗️ โอนเงิน -50 บาท"
);


}








function receive(){


balance+=50;


addHistory(
"📥 รับเงิน +50 บาท"
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








// BANK SYSTEM


function saveBank(){


let bank =
document.getElementById(
"bankName"
).value;



let account =
document.getElementById(
"accountNumber"
).value;




localStorage.setItem(
"bankName",
bank
);



localStorage.setItem(
"accountNumber",
account
);



alert(
"บันทึกข้อมูลบัญชีแล้ว"
);


}









// TRUE MONEY SYSTEM


function saveTrueMoney(){


let number =
document.getElementById(
"trueMoney"
).value;




localStorage.setItem(
"trueMoney",
number
);



document.getElementById(
"connectStatus"
).innerHTML =

"🟢 เชื่อมต่อจำลองแล้ว";


}








// PROFILE IMAGE


document.addEventListener(
"DOMContentLoaded",
function(){



let upload =
document.getElementById(
"imageUpload"
);



if(upload){



upload.addEventListener(
"change",
function(){


let file=this.files[0];



if(file){



let reader =
new FileReader();



reader.onload=function(e){



localStorage.setItem(
"profileImage",
e.target.result
);



let img =
document.getElementById(
"profileImage"
);



if(img){

img.src=e.target.result;

}



};



reader.readAsDataURL(file);



}



});



}






let savedImage =
localStorage.getItem(
"profileImage"
);



let img =
document.getElementById(
"profileImage"
);



if(savedImage && img){


img.src=savedImage;


}





updateUI();


});







function showHome(){


hideAllPage();



}








function hideAllPage(){


let pages=[

"settingsPage",

"historyPage",

"qrPage"

];



pages.forEach(function(id){


let page =
document.getElementById(id);



if(page){


page.style.display="none";


}


});



}


function showHistory(){


hideAllPage();



let page =
document.getElementById(
"historyPage"
);



if(page){


page.style.display="block";


let list =
document.getElementById(
"historyList"
);



if(list){


list.innerHTML="";



history.slice().reverse()
.forEach(function(item){



list.innerHTML +=

"<li>"+item+"</li>";



});


}



}



}









function showQR(){


hideAllPage();



let page =
document.getElementById(
"qrPage"
);



if(page){


page.style.display="block";


}



}









function showSettings(){


hideAllPage();



let page =
document.getElementById(
"settingsPage"
);



if(page){


page.style.display="block";


}



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









function clearData(){


let ok =
confirm(
"ต้องการล้างข้อมูลทั้งหมดหรือไม่?"
);



if(ok){


localStorage.clear();



location.reload();


}



}








// LOAD SYSTEM


window.onload=function(){



let login =
localStorage.getItem(
"login"
);



if(login==="true"){



let loginPage =
document.getElementById(
"loginPage"
);



let app =
document.getElementById(
"app"
);



if(loginPage){

loginPage.style.display="none";

}



if(app){

app.style.display="block";

}


}



updateUI();



};
