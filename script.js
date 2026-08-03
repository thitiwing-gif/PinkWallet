let balance = 10000;

const history = [
    "💰 เริ่มต้นระบบ ฿10,000"
];

function updateUI() {
    document.getElementById("balance").innerHTML =
        "฿" + balance.toLocaleString("th-TH") + ".00";

    const list = document.getElementById("historyList");
    list.innerHTML = "";

    history.slice().reverse().forEach(item => {
        list.innerHTML += `<li>${item}</li>`;
    });
}

function deposit() {
    balance += 100;
    history.push("➕ ฝากเงิน +100 บาท");
    updateUI();
}

function withdraw() {
    balance -= 100;
    history.push("➖ ถอนเงิน -100 บาท");
    updateUI();
}

function transfer() {
    balance -= 50;
    history.push("↗️ โอนเงิน -50 บาท");
    updateUI();
}

function receive() {
    balance += 50;
    history.push("📥 รับเงิน +50 บาท");
    updateUI();
}

document.addEventListener("DOMContentLoaded", updateUI);
