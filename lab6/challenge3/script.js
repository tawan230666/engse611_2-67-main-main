 const element1 = document.querySelectorAll("nav a");

 for(const element2 of element1) {
    element2.addEventListener("click",function(event){
        event.preventDefault();
        alert("clicked!")
    });
 }