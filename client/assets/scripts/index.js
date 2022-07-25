let button = document.querySelector("#gif-button")

button.addEventListener('click', () => {
    sendApiRequest()
})

async function sendApiRequest() {
    let userInput = document.querySelector("#gif-input").value
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=zdlCdp0EGvd7yxHXu5B7ywlPueKFWe5w&q=${userInput}`)
    // console.log(response)
    let gifs = await response.json()
    // console.log(gifs)
    useApiData(gifs)
};

function useApiData(gifs) {
    document.querySelector('#post-gif').innerHTML = 
    `<img src = "${gifs.data[0].images.original.url}">`
}
