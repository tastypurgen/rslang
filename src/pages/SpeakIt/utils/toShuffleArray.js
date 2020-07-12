const toShuffleArray = array => {
    const copiedArray = array.slice();
    const shuffledArray = [];
    for (let i = 10; i > 0; i--) {
        const randomNum = Math.ceil(Math.random() * i);
        shuffledArray.push(copiedArray[randomNum]);
        copiedArray.splice(randomNum, 1);
    }
    return shuffledArray;
}

export default toShuffleArray;