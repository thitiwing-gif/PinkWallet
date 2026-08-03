
// Pink Wallet v2.0


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

"฿"+
balance.toLocaleString("th-TH")
+".00";


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








function addTransaction(text){


history.push(

text+
" | "+
getTime()

);



notifications++;


updateUI();


}







function deposit(){


balance+=100;


addTransaction(
"➕ ฝาก +100 บาท"
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


addTransaction(
"➖ ถอน -100 บาท"
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



addTransaction(
"↗️ โอน -50 บาท"
);


}







function receive(){


balance+=50;


addTransaction(
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
"คุณมี "+
notifications+
" รายการแจ้งเตือน"
);



notifications=0;



updateUI();


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



let reader=
new FileReader();




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



});



}





let savedImage=
localStorage.getItem(
"profileImage"
);



let img=
document.getElementById(
"profileImage"
);



if(savedImage && img){


img.src=savedImage;


}




updateUI();


});









// PAGE SYSTEM



function hidePages(){



let pages=[

"historyPage",
"qrPage",
"settingsPage"

];



pages.forEach(function(id){



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
".box"
).style.display="block";



document.querySelector(
".menu"
).style.display="grid";


}








function showHistory(){


hidePages();



let page=
document.getElementById(
"historyPage"
);



if(page){


page.style.display="block";



let list=
document.getElementById(
"historyList"
);



list.innerHTML="";



history.slice().reverse()
.forEach(function(item){



list.innerHTML +=
"<li>"+item+"</li>";



});



}


}








function showQR(){


hidePages();



let page=
document.getElementById(
"qrPage"
);



if(page){

page.style.display="block";

}


}


function showSettings(){


hidePages();



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








function changePin(){


let pin =
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

else{


alert(
"PIN ต้องมี 4 หลัก"
);


}


}








function clearData(){


let ok =
confirm(
"ต้องการล้างข้อมูลทั้งหมดหรือไม่?"
);



if(ok){


localStorage.clear();



alert(
"ล้างข้อมูลแล้ว"
);



location.reload();


}


}








// LOAD APP



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
