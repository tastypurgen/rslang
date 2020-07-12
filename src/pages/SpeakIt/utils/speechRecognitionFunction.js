window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const speechRecognitionFunction = () => {
    window.recognition = new window.SpeechRecognition();
    window.recognition.interimResults = false;
    window.recognition.lang = 'en-EN';
    window.recognition.continuous = true;
    window.recognition.start();
    return new Promise((res) => {
        const recognitionEventFunction = (evt) => {
            const resultArray = Array.from(evt.results);
            res(resultArray[0][0].transcript);
            console.log(evt);
        }

        window.recognition.addEventListener('result', recognitionEventFunction);
    })
}

export default speechRecognitionFunction;