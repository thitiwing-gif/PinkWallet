
// Pink Wallet v1.0


let balance =
Number(localStorage.getItem("balance")) || 10000;


let history =
JSON.parse(localStorage.getItem("history")) || 
[
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






function updateUI(){


let money =
document.getElementById(
"balance"
);


if(money){


money.innerHTML =

hideBalance ?

"฿••••••"

:

"฿"+
balance.toLocaleString("th-TH")
+".00";


}



let name =
document.getElementById(
"username"
);


if(name){

name.innerHTML=username;

}




let count =
document.getElementById(
"notifyCount"
);


if(count){

count.innerHTML=notifications;

}



let list =
document.getElementById(
"historyList"
);



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
document.getElementById(
"loginName"
).value;


let pin =
document.getElementById(
"loginPin"
).value;



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
text
);


notifications++;


saveData();


}

function deposit(){


balance += 100;


addHistory(
"➕ ฝากเงิน +100 บาท"
);


updateUI();


}





function withdraw(){


if(balance < 100){


alert(
"ยอดเงินไม่พอ"
);


return;


}



balance -= 100;


addHistory(
"➖ ถอนเงิน -100 บาท"
);


updateUI();


}





function transfer(){


if(balance < 50){


alert(
"ยอดเงินไม่พอ"
);


return;


}



balance -= 50;


addHistory(
"↗️ โอนเงิน -50 บาท"
);


updateUI();


}





function receive(){


balance += 50;


addHistory(
"📥 รับเงิน +50 บาท"
);


updateUI();


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







function showNotification(){


alert(
"มีรายการใหม่ "
+
notifications
+
" รายการ"
);


notifications=0;


saveData();


updateUI();


}







function showHome(){


document.getElementById(
"qrPage"
).style.display="none";


document.getElementById(
"settingsPage"
).style.display="none";


document.querySelector(
".card"
).style.display="block";


document.querySelector(
".menu"
).style.display="grid";


document.querySelector(
".history"
).style.display="block";


}







function showQR(){


document.getElementById(
"qrPage"
).style.display="block";


document.getElementById(
"settingsPage"
).style.display="none";


}







function showSettings(){


document.getElementById(
"settingsPage"
).style.display="block";


document.getElementById(
"qrPage"
).style.display="none";


}







function copyAccount(){


navigator.clipboard.writeText(
"123-4-56789-0"
);


alert(
"คัดลอกเลขบัญชีแล้ว"
);


}







window.onload=function(){


let login =
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


};
