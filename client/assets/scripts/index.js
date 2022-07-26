
const form = document.querySelector(".form_main");
const input = document.querySelector(".input");
const main = document.querySelector('#blog-posts')
const newPostButton = document.getElementById('btn-two')

console.log('hello')

document.addEventListener('submit', (e)=> e.preventDefault())
newPostButton.addEventListener('click', writeNewPost)

    

///// this will post data to the server////////////////////////

// function postNewPost(form) {
//    const prePayload = new FormData(form);
//    const payload = new URLSearchParams(prePayload);

//    //console.log([...payload]);

//    fetch('http://localhost:3000/', {
//     method: "post",
//     body: payload, ['key', 'blogpost']
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// }


///// This function adds elements and the data returned from the server
// function addElements (data) {
   

//    let commentContainer = document.createElement("div");
// /////////////////////////////////////// we need to replace input.value with the latest data that was posted////////////
//    const commentForm = commentContainer.innerHTML =  `<p>${input.value}</p><form id='form'>

//    <input name='userpost' type="text" class="inputTwo" placeholder='write a comment ...'required>
//    <button type="submit" id='btn'>Post Comment</button></form>` 
//    return commentForm

// }
 

// submits the index.html form
// form.addEventListener("submit", (e) => {
//     /// call postdata function and pass in the form////////////////////////
//    PostData(e.target);
   
//    content.innerHTML += addElements() 

//    input.value = "";
  
// });


// submits all other forms using the event.
// content.addEventListener("submit", (e) => {
 
//    PostData(e.target);

//    const targ = e.target.querySelector('.inputTwo').value

//   /// we need to replace targ with the latest data that was posted on the comment reply///////////////////
//    let html = `<p id='p'>${targ}</p>`;
//    e.target.previousSibling.insertAdjacentHTML("afterend", html)

//    e.target.querySelector('.inputTwo').value = ''
// });







/// planning on using this function to make a get request 

function writeNewPost() {
   
   const prePayload = new FormData(form);
   const payload = new URLSearchParams(prePayload);

   console.log([...payload]);

   fetch(url, {
    method: "post",
    body: payload,        // ['userpost', 'the new post here']
    })
    .then((res) => res.json())
    .then((data) => console.log('newBlogPost entry data here: ', data))
    .catch((err) => console.log(err));
    window.location.reload()
}

/********************************************************************** This is for trying methods (not working now) */
function loadInitialPage (data) {
  const blogLength = Object.keys(data).length
  for (let i = 1; i <= blogLength; i++) {

    const blogPostContainer = document.createElement('p')
    blogPostContainer.setAttribute('class', 'content');
    blogPostContainer.textContent = data[i]['body']
    main.appendChild(blogPostContainer)

    const replyBox = document.createElement('div')
    replyBox.setAttribute('class', 'reply-box')

        const repliesAmount = data[i]['replies'].length
        for (let j = 0; j < repliesAmount; j++) {
            const replySubBox =  document.createElement('div')
            replySubBox.textContent = data[i]['replies'][j]
            replyBox.appendChild(replySubBox)
          }
    blogPostContainer.appendChild(replyBox)


    const replyForm = document.createElement("form");
    replyForm.setAttribute('id', `reply-form-${i}`)
    blogPostContainer.appendChild(replyForm)

    const inputField = document.createElement('input');
    inputField.setAttribute('type', 'text')
    inputField.setAttribute('name', `reply-${i}`)
    inputField.setAttribute('placeholder', 'write a COMMENT...')
    replyForm.appendChild(inputField)

    const submitButton = document.createElement('button')
    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('id', `btn-${i}`)
    submitButton.textContent = 'Reply'
    replyForm.appendChild(submitButton)

    const likeButton = document.createElement('button')
    replyForm.appendChild(likeButton)
    likeButton.setAttribute('type', 'submit')
    likeButton.setAttribute('id', `like-button-${i}`)
    likeButton.textContent = 'Like'

    const createLikeEmoji = document.createElement('img')
    createLikeEmoji.setAttribute('src', '/client/assets/emojis/like.svg')
    createLikeEmoji.setAttribute('class', 'svg-like')

        const likeCounter = document.createElement('div')
        blogPostContainer.appendChild(likeCounter)
        likeCounter.setAttribute('class', 'like-counter')
        likeCounter.textContent = data[i]['like']['number']

      if (!data[i]['like']['is-there']) {
      console.log('There is no "like" emoji')
              
      document.getElementById(`like-button-${i}`).addEventListener('click', 
                function addLike() {
                console.log('im within addLike function')
                replyForm.appendChild(createLikeEmoji)
                  
          const http = new XMLHttpRequest();
          
          const params = `like-button-${i}=clicked`;
          console.log('params:', params) //*****
          http.open('POST', url, true);
          console.log('after the http open') //*****

          //Send the proper header information along with the request
          http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          http.onreadystatechange = function() {//Call a function when the state changes.
              if(http.readyState == 4 && http.status == 200) {
                  alert(http.responseText);
              }
          }
          http.send(params);
          window.location.reload()
          }
      )
               
    } else {

        document.getElementById(`like-button-${i}`).addEventListener('click', 
          function incrementLike() {
              console.log('im within addLike function')
              replyForm.appendChild(createLikeEmoji)
                      
              const http = new XMLHttpRequest();
              
              const params = `like-button-${i}=clicked`;
              console.log('params:', params) //*****
              http.open('POST', url, true);
              console.log('after the http open') //*****

              //Send the proper header information along with the request
              http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
              http.onreadystatechange = function() {//Call a function when the state changes.
                  if(http.readyState == 4 && http.status == 200) {
                      alert(http.responseText);
                  }
              }
              http.send(params);
              window.location.reload()
          }
      )
          replyForm.appendChild(createLikeEmoji)
          likeCounter.textContent = data[i]['like']['number']
    }
    
        const funnyButton = document.createElement('button')
        replyForm.appendChild(funnyButton)
        funnyButton.setAttribute('type', 'submit')
        funnyButton.setAttribute('id', `funny-button-${i}`)
        funnyButton.textContent = 'Funny'

        const createFunnyEmoji = document.createElement('img')
        createFunnyEmoji.setAttribute('src', '/client/assets/emojis/funny.svg')
        createFunnyEmoji.setAttribute('class', 'svg-funny')

        const funnyCounter = document.createElement('div')
        blogPostContainer.appendChild(funnyCounter)
        funnyCounter.setAttribute('class', 'funny-counter')
        funnyCounter.textContent = data[i]['funny']['number']

        function funnyChecker() {

        if (!data[i]['funny']['is-there']) {
              console.log('There is no "funny" emoji')
                      
              document.getElementById(`funny-button-${i}`).addEventListener('click', 
                        function addFunny() {
                        console.log('im within addFunny function')
                        replyForm.appendChild(createFunnyEmoji)
                          
                  const http = new XMLHttpRequest();
                  
                  const params = `funny-button-${i}=clicked`;
                  console.log('params:', params) //*****
                  http.open('POST', url, true);
                  console.log('after the http open') //*****

                  //Send the proper header information along with the request
                  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                  http.onreadystatechange = function() {//Call a function when the state changes.
                      if(http.readyState == 4 && http.status == 200) {
                          alert(http.responseText);
                      }
                  }
                  http.send(params);
                  window.location.reload()
                  }
              )
                      
            } else {

                document.getElementById(`funny-button-${i}`).addEventListener('click', 
                  function incrementLike() {
                      console.log('im within addFunny function')
                      replyForm.appendChild(createFunnyEmoji)
                              
                      const http = new XMLHttpRequest();
                      
                      const params = `funny-button-${i}=clicked`;
                      console.log('params:', params) //*****
                      http.open('POST', url, true);
                      console.log('after the http open') //*****

                      //Send the proper header information along with the request
                      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                      http.onreadystatechange = function() {//Call a function when the state changes.
                          if(http.readyState == 4 && http.status == 200) {
                              alert(http.responseText);
                          }
                      }
                      http.send(params);
                      window.location.reload()
                  }
              )
                  replyForm.appendChild(createFunnyEmoji)
                  likeCounter.textContent = data[i]['funny']['number']
            }
        console.log('Im the imported funny checker')
        }   

        funnyChecker()

   document.getElementById(`btn-${i}`).addEventListener('click',
   function submitReply() {
   
     const prePayload = new FormData(replyForm);
     const payload = new URLSearchParams(prePayload);
   
     fetch(url, {
      method: "post",
      body: payload,
     })
      .then((res) => res.json())
      .then((data) => console.log('how does the data look like after fetching: ', data))
      .catch((err) => console.log('Error while post fetching: ', err));
      window.location.reload()
   })
  
}
}


/********************************************************************************************* End of trying block*/





// const url = "https://community-journaling.herokuapp.com";
const url = "http://localhost:3000";

function getData() {

  fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      loadInitialPage(data)
    })
    .catch(err => {
      alert("Sorry! Your request could not be granted!", err)
    })
}

// async function getData() {
//   try {
//     const response = fetch(url);
//     const data = await response.json();
    
//     console.log(data[1].body)
//   } catch (error) {
//     alert("Sorry! Your request could not be granted!");
//   }
// }

getData()






/// this is the data being returned 


//{
  // "1":{
    //  "body":"This is the first comment",
    //  "replies":[
    //     "first reply",
    //     "second reply"
   //   ],
    //  "like":{
   //      "is-there":true,
   //      "number":1
   //   },
   //   "funny":{
    //     "is-there":true,
    //     "number":4
    //  },
    //  "angry":{
     //    "is-there":false,
     //    "number":0
     // }
   //},
   //"2":{
    //  "body":"This is the second comment",
    //  "replies":[
     //    "first reply",
    //     "second reply",
    //     "third reply"
    //  ],
    //  "like":{
     //    "is-there":false,
     //    "number":0
    //  },
     // "funny":{
     //    "is-there":true,
     //    "number":2
    //  },
     // "angry":{
     //    "is-there":true,
     //    "number":5
     // }
   //}
//}

