const form = document.querySelector(".form_main");
const input = document.querySelector(".input");
const main = document.querySelector('#blog-posts')
const newPostButton = document.getElementById('btn-two')
const newGIFPostButton = document.getElementById('gif-btn')

const url = "https://community-journaling.herokuapp.com";   // uncomment to use the backend server to fetch data
// const url = "http://localhost:3000";                // uncomment to use the localhost to fetch data



document.addEventListener('submit', (e)=> e.preventDefault())

/******************************************This makes the "New Post" button clickable and send the entered text to backend to store the data  */
newPostButton.addEventListener('click', writeNewPost)
function writeNewPost() {
   
   const prePayload = new FormData(form);
   const payload = new URLSearchParams(prePayload);

   console.log([...payload]);

   fetch(url, {
    method: "post",
    body: payload,        
    })
    .then((res) => res.json())
    .then((data) => console.log('newBlogPost entry data here: ', data))
    .catch((err) => console.log(err));
    window.location.reload()
}

/************************This makes the "Post a GIF" button clickable and send the entered text to backend to store the data  */
   newGIFPostButton.addEventListener('click', async (e) => {

        e.preventDefault()

        document.getElementById('loading-box').textContent = 'Loading...'

        const userInput = await document.getElementById(`gif-input-field`).value
        const gifResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=zdlCdp0EGvd7yxHXu5B7ywlPueKFWe5w&q=${userInput}`)
        const gifs = await gifResponse.json()
        // const bodyToSend = JSON.stringify(gifs.data[0]['embed_url'])
        fetch(url, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(gifs.data[Math.floor(Math.random() * Object.entries(gifs.data).length)])
            }).catch(err => {
                console.log('error while fetching / sending gif: ', err);
                // document.getElementById('loading-box').textContent = ''
                window.location.reload()
            })
        }
   )


/********************************************************************** Here the webpage is getting loaded */
function loadInitialPage (data) {
  const blogLength = Object.keys(data).length

/************** Loop through the database JSON file in the backend. All elements will be created as many times as many posts are saved in the database */
  for (let i = blogLength; i > 0; i--) {       // 

    /**************************************************************This creates the main blog post container */
    const blogPostContainer = document.createElement('p')
    blogPostContainer.setAttribute('class', 'content');

    if (/giphy.com/.test(data[i]['body'])) {
      const gifImageTag = document.createElement('img')
      gifImageTag.setAttribute('src', data[i]['body']);
      gifImageTag.setAttribute('alt', 'GIF');
      gifImageTag.setAttribute('class', 'gif-class');
      blogPostContainer.appendChild(gifImageTag)
        
    } else {
        blogPostContainer.textContent = data[i]['body']
    }

    main.appendChild(blogPostContainer)
    
    /************************************************************This creates the container with replies and the reply input form */
    const replyBox = document.createElement('div')
    replyBox.setAttribute('class', 'reply-box')

        const repliesAmount = data[i]['replies'].length
        for (let j = 0; j < repliesAmount; j++) {
            const replySubBox =  document.createElement('div')
            replySubBox.textContent = data[i]['replies'][j]
            replyBox.appendChild(replySubBox)
          }

    const replyForm = document.createElement("form"); // The form itself
    replyForm.setAttribute('id', `reply-form-${i}`)
    replyForm.setAttribute('class', `reply-form`)
    blogPostContainer.appendChild(replyForm)

    const inputField = document.createElement('input'); // The input field
    inputField.setAttribute('type', 'text')
    inputField.setAttribute('name', `reply-${i}`)
    inputField.setAttribute('class', `reply-field`)
    inputField.setAttribute('placeholder', 'write a COMMENT...')
    replyForm.appendChild(inputField)
    
    const submitButton = document.createElement('button') // The submit button
    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('id', `btn-${i}`)
    submitButton.setAttribute('class', `reply-btn`)
    submitButton.textContent = 'Reply'
    replyForm.appendChild(submitButton)
    
    /************************************************************Append the reply container to the main blogpost text */
    blogPostContainer.appendChild(replyBox)


    /************************************************************This creates the like button */

    const likeButton = document.createElement('button')
    replyForm.appendChild(likeButton)
    likeButton.setAttribute('type', 'submit')
    likeButton.setAttribute('id', `like-button-${i}`)
    likeButton.setAttribute('class', `like-button`)
    likeButton.textContent = 'Like'

    /************************************************************This creates the like emoji */

    const createLikeEmoji = document.createElement('img')
    createLikeEmoji.setAttribute('src', '/client/assets/emojis/like.svg')
    createLikeEmoji.setAttribute('class', 'svg-like')

    /************************************************************This creates the like counter */
        const likeCounter = document.createElement('div')
        blogPostContainer.appendChild(likeCounter)
        likeCounter.setAttribute('class', 'like-counter')
        likeCounter.textContent = data[i]['like']['number']

      if (!data[i]['like']['is-there']) {                 // This conditional comes true if there is no "like" at this the blogpost for now
      
              
    /*************************This makes the like button clickable and let the backend know if this button is clicked */
      document.getElementById(`like-button-${i}`).addEventListener('click', 
                function addLike() {
                console.log('im within addLike function')
                replyForm.appendChild(createLikeEmoji)
                  
          const http = new XMLHttpRequest();
          
          const params = `like-button-${i}=clicked`;
          console.log('params:', params)
          http.open('POST', url, true);
          console.log('after the http open')

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
    
    } else { // This branch is executed when there is at least one "like" at this the blogpost

        document.getElementById(`like-button-${i}`).addEventListener('click', 
          function incrementLike() {
              console.log('im within addLike function')
              replyForm.appendChild(createLikeEmoji)
                      
              const http = new XMLHttpRequest();
              
              const params = `like-button-${i}=clicked`;
              console.log('params:', params) //*****
              http.open('POST', url, true);
              console.log('after the http open') 

              
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
    
    /*************************************************************From here the same procedures for the "funny" and the "angry emojis and their containers" */
        const funnyButton = document.createElement('button')
        replyForm.appendChild(funnyButton)
        funnyButton.setAttribute('type', 'submit')
        funnyButton.setAttribute('id', `funny-button-${i}`)
        funnyButton.setAttribute('class', `funny-button`)
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
              
                      
              document.getElementById(`funny-button-${i}`).addEventListener('click', 
                        function addFunny() {
                        console.log('im within addFunny function')
                        replyForm.appendChild(createFunnyEmoji)
                          
                  const http = new XMLHttpRequest();
                  
                  const params = `funny-button-${i}=clicked`;
                  console.log('params:', params) 
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
        }   

        funnyChecker()
        /*****************************************************Here starts with the "angry" button and emoji */
        const angryButton = document.createElement('button')
        replyForm.appendChild(angryButton)
        angryButton.setAttribute('type', 'submit')
        angryButton.setAttribute('id', `angry-button-${i}`)
        angryButton.setAttribute('class', `angry-button`)
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
    /******************************************This makes the "Reply" button clickable and send the reply text to backend to store the data  */
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


/************ This fetches the data from the backend json file and pass it to the loadInitalData function to make appear all existing elements*/

function getData() {

  fetch(url)
    .then(res => res.json())
    .then(data => {
      loadInitialPage(data)
    })
    .catch(err => {
      console.log("Sorry! Your request could not be granted!", err)

      alert("Sorry! Your request could not be granted!", err)
    })
}


getData()
