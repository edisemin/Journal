
const form = document.querySelector(".form_main");
const content = document.querySelector(".content");
const input = document.querySelector(".input");



document.addEventListener('submit', (e)=> e.preventDefault())
    


function PostData(form) {
   const prePayload = new FormData(form);
   const payload = new URLSearchParams(prePayload);

   //console.log([...payload]);

   fetch('http://localhost:3000/', {
    method: "post",
    body: payload,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}



function addElements (e) {
   
   let commentContainer = document.createElement("div");
   
   const commentForm = commentContainer.innerText =  `<p>${input.value}</p><form id='form'>

   <input name='userpost' type="text" class="inputTwo" placeholder='write a comment ...'required>
   <button type="submit" id='btn'>Comment on post</button></form>` 

   return commentForm

}
 


form.addEventListener("submit", (e) => {
    
   PostData(e.target);

   content.innerHTML += addElements()

   input.value = "";
  
});



content.addEventListener("submit", (e) => {
 
   PostData(e.target);

   const targ = e.target.querySelector('.inputTwo').value

   let html = `<p id='p'>${targ}</p>`;
   e.target.previousSibling.insertAdjacentHTML("afterend", html)

   e.target.querySelector('.inputTwo').value = ''
});


