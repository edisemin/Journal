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



  var myText = document.getElementById("my-text");
  


  var limit = 100;

  


  myText.addEventListener("input",function(){

    var textLength = myText.value.length;

    result.textContent = textLength + "/" + limit;

    if(textLength > limit){
        myText.style.borderColor = "#ff2851";
        result.style.color = "#ff2851";
    }
    else{
        myText.style.borderColor = "#31821b";
        result.style.color = "#31821b";
    }
});

var result = document.getElementById("result");
result.textContent = 0 + "/" + limit;
