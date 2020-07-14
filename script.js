const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Enabling/Disabling Button
function toggleButton() {
    button.disabled = !button.disabled;
    button.disabled ? (button.style.cursor = 'default') : (button.style.cursor = '');
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';

    try {
        const apiKey = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
        const response = await fetch(apiKey);
        const data = await response.json();
        joke = (data.setup) ? (`${data.setup} ... ${data.delivery}`) : data.joke;
    } catch (error) {
        console.log('oops', error);
    }

    // Text to speech
    tellMe(joke);

    // Disabling button while audio playing
    toggleButton();
}

// Passing jokes to VoiceRSS API
function tellMe(joke) {
    console.log('joke: ', joke);

    VoiceRSS.speech({
        key: '733c95418e3a4e4e93c5fcc52ac4b857',
        src: joke,
        hl: 'en-gb',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
