// const mainDiv = document.getElementById("main");

// const p = mainDiv.getElementsByTagName("p");

// for(i = 0; i < p.length; i++) {
//   if(p[i].textContent.includes("Llamas and Chickens!")) {
//     p[i].style.color = "red";
//   }
// }


const mainDiv = document.getElementById("main");

const p = mainDiv.getElementsByTagName("p");

for(i = 0; i < p.length; i++) {
  if(p[i].textContent.includes("Llamas and Chickens!")){
    p[i].style.color = "red";
  }
}