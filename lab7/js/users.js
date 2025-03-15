// Exercise 1: Changing Text Content
function exercise1() {
    showPopup("This is Exercise 1: Changing Text Content");
}

// Exercise 2: Modifying CSS Styles
function exercise2() {
    document.body.style.backgroundColor = "lightblue";
    showPopup("Background color changed!");
}

// Exercise 3: Adding and Removing Classes
function exercise3() {
    let btn = document.querySelector("button");
    btn.classList.toggle("active");
    showPopup("Button class toggled!");
}

// ฟังก์ชันแสดง Pop-up
function showPopup(message) {
    document.getElementById("popup-text").innerText = message;
    document.getElementById("popup").classList.remove("hidden");
}

// ฟังก์ชันปิด Pop-up
function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}
