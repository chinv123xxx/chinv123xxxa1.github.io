let orders = JSON.parse(localStorage.getItem("orders_chanfood")) || [];

const product = document.getElementById("product");
const unit = document.getElementById("unit");
const orderList = document.getElementById("orderList");
const summaryModal = document.getElementById("summaryModal");
const summaryList = document.getElementById("summaryList");
const dt = document.getElementById("dt");
const summaryBox = document.getElementById("summaryBox");

/* ===== ถามเมื่อเปิดหน้า ===== */
window.onload = () => {
  if (orders.length > 0) {
    const useOld = confirm(
      "พบข้อมูลเดิมอยู่\n\nตกลง = ใช้ข้อมูลเดิม\nยกเลิก = เริ่มใหม่"
    );
    if (!useOld) {
      orders = [];
      localStorage.removeItem("orders_chanfood");
    }
  }
  render();
};

function saveData() {
  localStorage.setItem("orders_chanfood", JSON.stringify(orders));
}

function addOrder() {
  if (!qty.value || qty.value <= 0) {
    alert("กรุณาใส่จำนวน");
    return;
  }

  orders.push({
    name: product.value,
    qty: qty.value + " " + unit.value,
    note: note.value
  });

  qty.value = "";
  note.value = "";

  saveData();
  render();
}

function render() {
  orderList.innerHTML = "";
  orders.forEach((o, i) => {
    orderList.innerHTML += `
      <tr>
        <td>${o.name}</td>
        <td>${o.qty}</td>
        <td>${o.note || "-"}</td>
        <td><button class="danger" onclick="removeItem(${i})">❌</button></td>
      </tr>
    `;
  });
}

function removeItem(i) {
  orders.splice(i, 1);
  saveData();
  render();
}

function clearAll() {
  if (!confirm("ล้างทั้งหมด?")) return;
  orders = [];
  localStorage.removeItem("orders_chanfood");
  render();
}

function openSummary() {
  if (!orders.length) return alert("ไม่มีรายการ");
  summaryList.innerHTML = "";
  orders.forEach(o => {
    summaryList.innerHTML += `
      <tr>
        <td>${o.name}</td>
        <td>${o.qty}</td>
        <td>${o.note || "-"}</td>
      </tr>
    `;
  });
  dt.innerText = "วันที่ " + new Date().toLocaleString("th-TH");
  summaryModal.style.display = "flex";
}

function closeSummary() {
  summaryModal.style.display = "none";
}

function saveImg() {
  document.querySelector(".capture-buttons").classList.add("hide-for-capture");
  html2canvas(summaryBox).then(canvas => {
    const a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = "chanfood-order.png";
    a.click();
    document.querySelector(".capture-buttons").classList.remove("hide-for-capture");
  });
}
