// Pink Wallet v0.8

let balance =
Number(localStorage.getItem("balance")) || 10000;


let history =
JSON.parse(localStorage.getItem("history")) || [
"💰 เริ่มต้นระบบ ฿10,000"
];


let username =
localStorage.getItem("username") || "Pink User";


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


}





function getTime(){

let now = new Date();

return now.toLocaleString("th-TH");

}






function updateUI(){


let balanceBox =
document.getElementById("balance");


if(balanceBox){

balanceBox.innerHTML =
hideBalance
?
"฿••••••"
:
"฿" +
balance.toLocaleString("th-TH") +
".00";

}



let nameBox =
document.getElementById("username");


if(nameBox){

nameBox.innerHTML =
username;

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


alert("กรุณาใส่ชื่อและ PIN 4 หลัก");


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
// ซ่อน / แสดงยอดเงิน

function toggleBalance(){

hideBalance = !hideBalance;

updateUI();

}





// ฝากเงิน

function deposit(){

balance +=100;


history.push(
"➕ ฝาก +100 บาท | " + getTime()
);


updateUI();

}






// ถอนเงิน

function withdraw(){


if(balance < 100){

alert("ยอดเงินไม่พอ");

return;

}


balance -=100;


history.push(
"➖ ถอน -100 บาท | " + getTime()
);


updateUI();


}







// โอนเงิน

function transfer(){


if(balance < 50){

alert("ยอดเงินไม่พอ");

return;

}


balance -=50;


history.push(
"↗️ โอน -50 บาท | " + getTime()
);


updateUI();


}






// รับเงิน

function receive(){


balance +=50;


history.push(
"📥 รับ +50 บาท | " + getTime()
);


updateUI();


}







// เปลี่ยนชื่อ

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







// อัปโหลดรูปโปรไฟล์

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


let file =
this.files[0];



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



let img2 =
document.getElementById(
"profileImageCard"
);



if(img){

img.src=e.target.result;

}



if(img2){

img2.src=e.target.result;

}



};



reader.readAsDataURL(file);


}


});


}


});

// โหลดรูปเดิม

window.addEventListener(
"load",
function(){

let savedImage =
localStorage.getItem(
"profileImage"
);


if(savedImage){


let img =
document.getElementById(
"profileImage"
);


let img2 =
document.getElementById(
"profileImageCard"
);



if(img){

img.src=savedImage;

}



if(img2){

img2.src=savedImage;

}


}


updateUI();


});







// แสดงหน้ารายการ

function showHistory(){


hidePages();


let page =
document.getElementById(
"historyPage"
);


if(page){


page.style.display="block";


let list =
document.getElementById(
"fullHistory"
);


list.innerHTML="";


history.slice().reverse()
.forEach(item=>{


list.innerHTML +=
"<li>"+item+"</li>";


});


}


}






// หน้า Home

function showHome(){


hidePages();


document.querySelector(".card").style.display="block";

document.querySelector(".profile-card").style.display="flex";

document.querySelector(".menu").style.display="grid";

document.querySelector(".history").style.display="block";

document.querySelector(".chart-card").style.display="block";


}






// หน้า QR

function showQR(){


hidePages();


let qr =
document.getElementById(
"qrPage"
);


if(qr){

qr.style.display="block";

}


}







// หน้า Settings

function showSettings(){


hidePages();


let setting =
document.getElementById(
"settingsPage"
);



if(setting){

setting.style.display="block";

}


}







function hidePages(){


let pages=[

"#historyPage",
"#qrPage",
"#settingsPage"

];


pages.forEach(function(item){


let page =
document.querySelector(item);


if(page){

page.style.display="none";

}


});


}







// คัดลอกบัญชี

function copyAccount(){


navigator.clipboard.writeText(
"123-4-56789-0"
);


alert(
"คัดลอกเลขบัญชีแล้ว"
);


}








// เปลี่ยนธีม

function toggleTheme(){


document.body.classList.toggle(
"dark"
);


}








// ล้างข้อมูล

function clearData(){


let ok =
confirm(
"ต้องการล้างข้อมูลทั้งหมดหรือไม่?"
);



if(ok){


localStorage.clear();


alert(
"ล้างข้อมูลเรียบร้อย"
);


location.reload();


}


}







// ตรวจ PIN ตอนเปิดใหม่

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



};
