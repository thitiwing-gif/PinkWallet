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
const ctx = document.getElementById('moneyChart');

if(ctx){

new Chart(ctx, {

type:'doughnut',

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

});

}
function saveTransaction(text){

let data = JSON.parse(localStorage.getItem("history")) || [];

data.push(text);

localStorage.setItem(
"history",
JSON.stringify(data)
);

}


function showHistory(){

document.querySelector(".card").style.display="none";
document.querySelector(".menu").style.display="none";
document.querySelector(".chart-card").style.display="none";

document.getElementById("historyPage").style.display="block";


let data = JSON.parse(localStorage.getItem("history")) || [];

let list = document.getElementById("fullHistory");

list.innerHTML="";


data.forEach(item=>{

let li=document.createElement("li");

li.innerHTML=item;

list.appendChild(li);

});

}


function showHome(){

location.reload();

}
function showQR(){

document.querySelector(".card").style.display="none";
document.querySelector(".menu").style.display="none";
document.querySelector(".chart-card").style.display="none";
document.querySelector(".history").style.display="none";

document.getElementById("qrPage").style.display="block";

}


function copyAccount(){

navigator.clipboard.writeText(
"123-4-56789-0"
);

alert("คัดลอกเลขบัญชีแล้ว");

}
