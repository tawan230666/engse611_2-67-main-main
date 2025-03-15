const maindiv = document.getElementById("main");

const p = maindiv.getElementsByTagName("p");

for(i = 0; i < p.length;i++) {
    p[i].style.fontSize = "24px";
    p[i].style.color = "red";
}
