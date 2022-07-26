
const form = document.querySelector(".form_main");
const input = document.querySelector(".input");
const main = document.querySelector('#blog-posts')
const newPostButton = document.getElementById('btn-two')

// const url = "https://community-journaling.herokuapp.com";
const url = "http://localhost:3000";



document.addEventListener('submit', (e)=> e.preventDefault())
newPostButton.addEventListener('click', writeNewPost)



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
  for (let i = blogLength; i > 0; i--) {

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
                  function incrementFunny() {
                      console.log('im within incrementFunny function')
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
                  funnyCounter.textContent = data[i]['funny']['number']
            }
        console.log('Im the imported funny checker')
        }   

        funnyChecker()

        const angryButton = document.createElement('button')
        replyForm.appendChild(angryButton)
        angryButton.setAttribute('type', 'submit')
        angryButton.setAttribute('id', `angry-button-${i}`)
        angryButton.textContent = 'Angry'

        const createAngryEmoji = document.createElement('img')
        createAngryEmoji.setAttribute('src', '/client/assets/emojis/angry.svg')
        createAngryEmoji.setAttribute('class', 'svg-angry')

        const angryCounter = document.createElement('div')
        blogPostContainer.appendChild(angryCounter)
        angryCounter.setAttribute('class', 'angry-counter')
        angryCounter.textContent = data[i]['angry']['number']

        function angryChecker () {
          if (!data[i]['angry']['is-there']) {
              console.log('There is no "angry" emoji')
                      
              document.getElementById(`angry-button-${i}`).addEventListener('click', 
                        function addAngry() {
                        console.log('im within addAngry function')
                        replyForm.appendChild(createAngryEmoji)
                          
                  const http = new XMLHttpRequest();
                  
                  const params = `angry-button-${i}=clicked`;
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

                document.getElementById(`angry-button-${i}`).addEventListener('click', 
                  function incrementAngry() {
                      console.log('im within incrementAngry function')
                      replyForm.appendChild(createAngryEmoji)
                              
                      const http = new XMLHttpRequest();
                      
                      const params = `angry-button-${i}=clicked`;
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
                  replyForm.appendChild(createAngryEmoji)
                  angryCounter.textContent = data[i]['angry']['number']
            }
        }

        angryChecker()

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


getData()
