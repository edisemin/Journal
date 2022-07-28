addEventListener('load', (event) => {});

window.onload = (event) => {  let scrollY = this.scrollY;
    let scrollX = this.scrollX;
    console.log(scrollY);
    console.log(scrollX);
    document.documentElement.scrollTop = document.body.scrollTop
    document.documentElement.scrollTop = document.body.scrollTop = 400
    }


window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    let scrollX = this.scrollX;
    console.log(scrollY);
    console.log(scrollX);
   
});





    window.scrollTo(0, 500);
  
    function Scrolldown() {
        window.scroll(0,470); 
       }
       
       
       window.onload = Scrolldown;
       

  sessionStorage.setItem("lastname", "Smith");
  let personName = sessionStorage.getItem("lastname");
  document.getElementById("demo").innerHTML = personName;
