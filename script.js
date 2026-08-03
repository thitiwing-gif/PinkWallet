// โหลดข้อมูลจาก Local Storage
let balance = Number(localStorage.getItem("balance")) || 10000;

let history = JSON.parse(localStorage.getItem("history")) || [
    "💰 เริ่มต้นระบบ ฿10,000"
];

let hideBalance = false;

function saveData(){
    localStorage.setItem("balance", balance);
    localStorage.setItem("history", JSON.stringify(history));
}

function updateUI(){

    document.getElementById("balance").innerHTML =
        hideBalance ? "฿••••••" : "฿" + balance.toLocaleString("th-TH") + ".00";

    const list = document.getElementById("historyList");

    list.innerHTML="";

    history.slice().reverse().forEach(item=>{

        list.innerHTML += `<li>${item}</li>`;

    });

    saveData();

}

function toggleBalance(){

    hideBalance=!hideBalance;

    updateUI();

}

function deposit(){

    balance+=100;

    history.push("➕ ฝาก +100 บาท");

    updateUI();

}

function withdraw(){

    balance-=100;

    history.push("➖ ถอน -100 บาท");

    updateUI();

}

function transfer(){

    balance-=50;

    history.push("↗️ โอน -50 บาท");

    updateUI();

}

function receive(){

    balance+=50;

    history.push("📥 รับ +50 บาท");

    updateUI();

}

document.addEventListener("DOMContentLoaded", updateUI);
function changeName(){

let name = prompt("ใส่ชื่อใหม่");

if(name){
document.getElementById("username").innerHTML = name;

localStorage.setItem("username", name);

}

}


window.onload=function(){

let savedName = localStorage.getItem("username");

if(savedName){

document.getElementById("username").innerHTML = savedName;

}

}
const imageUpload = document.getElementById("imageUpload");

if(imageUpload){

imageUpload.addEventListener("change",function(){

const file = this.files[0];

if(file){

const reader = new FileReader();

reader.onload=function(e){

document.getElementById("profileImage").src = e.target.result;

localStorage.setItem("profileImage", e.target.result);

}

reader.readAsDataURL(file);

}

});

}


window.addEventListener("load",function(){

const savedImage = localStorage.getItem("profileImage");

if(savedImage){

document.getElementById("profileImage").src = savedImage;

}

});
