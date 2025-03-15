// const element1 = document.querySelectorAll("nav a");
// element1.forEach(element2 => {
//     element2.addEventListener("click",
//         function(event) {
//             event.preventDefault();
//             alert(this.textContent);
//         }
//     )
// })


const navlink = document.querySelectorAll("nav a");

for(const alink of navlink) {
    alink.addEventListener("click", function
        (ok) {ok.preventDefault();
        alert(this.textContent);
    });
}