const playAudioFunction = (path) => {
    window.isClickEnabled = false;
    const audio = new Audio(path);
    audio.play();
    audio.addEventListener('ended', () => {
        window.isClickEnabled = true;
    })
}

export default playAudioFunction;