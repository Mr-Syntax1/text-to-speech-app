let textplace = document.querySelector('#TextBox');
let touch = document.querySelector('#dokme');

touch.addEventListener('click', () => {
    let text = textplace.value;
    let utterance = new SpeechSynthesisUtterance(text)
        speechSynthesis.speak(utterance)
})