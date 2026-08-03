// Pink Wallet v0.7

let balance = Number(localStorage.getItem("balance")) || 10000;

let history = JSON.parse(
localStorage.getItem("history")
) || [
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





function updateUI(){


let balanceBox =
document.getElementById("balance");


if(balanceBox){

balanceBox.innerHTML =
hideBalance
?
"฿••••••"
:
"฿" + balance.toLocaleString("th-TH") + ".00";

}



let nameBox =
document.getElementById("username");


if(nameBox){

nameBox.innerHTML = username;

}



let list =
document.getElementById("historyList");


if(list){

list.innerHTML="";


history.slice().reverse().forEach(item=>{


list.innerHTML +=
`<li>${item}</li>`;


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







function deposit(){


balance +=100;


history.push(
"➕ ฝาก +100 บาท"
);


updateUI();


}







function withdraw(){


if(balance<100){

alert("ยอดเงินไม่พอ");

return;

}


balance -=100;


history.push(
"➖ ถอน -100 บาท"
);


updateUI();


}






function transfer(){


if(balance<50){

alert("ยอดเงินไม่พอ");

return;

}


balance-=50;


history.push(
"↗️ โอน -50 บาท"
);


updateUI();


}






function receive(){


balance+=50;


history.push(
"📥 รับ +50 บาท"
);


updateUI();


}

// เปลี่ยนชื่อผู้ใช้

function changeName(){

let name = prompt(
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


let file=this.files[0];


if(file){


let reader =
new FileReader();



reader.onload=function(e){


let img =
e.target.result;


let profile =
document.getElementById(
"profileImage"
);


let card =
document.getElementById(
"profileImageCard"
);



if(profile){

profile.src=img;

}



if(card){

card.src=img;

}



localStorage.setItem(
"profileImage",
img
);



};



reader.readAsDataURL(file);


}


});


}



let savedImage =
localStorage.getItem(
"profileImage"
);



if(savedImage){


let profile =
document.getElementById(
"profileImage"
);



let card =
document.getElementById(
"profileImageCard"
);



if(profile){

profile.src=savedImage;

}



if(card){

card.src=savedImage;

}


}


updateUI();


});







// กราฟ

document.addEventListener(
"DOMContentLoaded",
function(){


let ctx =
document.getElementById(
"moneyChart"
);



if(ctx && typeof Chart !== "undefined"){


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
7000,
3000
]

}]

},


options:{

responsive:true

}


}

);


}


});








// หน้าเมนู


function hideAll(){


let pages=[

".card",
".menu",
".chart-card",
".history",
"#historyPage",
"#qrPage",
"#settingsPage"

];



pages.forEach(function(p){


let el=document.querySelector(p);


if(el){

el.style.display="none";

}


});


}





function showHome(){


hideAll();


document.querySelector(".card").style.display="block";

document.querySelector(".menu").style.display="grid";

document.querySelector(".chart-card").style.display="block";

document.querySelector(".history").style.display="block";


}






function showHistory(){


hideAll();


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


history.forEach(function(item){


list.innerHTML +=
`<li>${item}</li>`;


});


}


}






function showQR(){


hideAll();


let page =
document.getElementById(
"qrPage"
);



if(page){

page.style.display="block";

}


}







function showSettings(){


hideAll();


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


let confirmDelete =
confirm(
"ต้องการล้างข้อมูลทั้งหมดหรือไม่?"
);



if(confirmDelete){


localStorage.clear();


alert(
"ล้างข้อมูลแล้ว"
);



location.reload();


}


}







// เปิดแอปอัตโนมัติถ้าเคย Login

window.addEventListener(
"load",
function(){


let login =
localStorage.getItem(
"login"
);



if(login==="true"){


let lp =
document.getElementById(
"loginPage"
);


let app =
document.getElementById(
"app"
);



if(lp){

lp.style.display="none";

}



if(app){

app.style.display="block";

}


}



updateUI();


});
