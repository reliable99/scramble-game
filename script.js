const wordElement = document.querySelector('.word')
const hintElement = document.querySelector('.hint span')
const refreshButton = document.querySelector('.refresh-word')
const checkButton = document.querySelector('.check-word')
const input = document.querySelector('input')
const timeElement = document.querySelector('.time span b')
const scoreElement = document.querySelector('.score span')
const numOfplays = document.querySelector('.num span')

const displayResult = document.querySelector('.alert')
//initial variables
let word = '';
let timer;
let score = 0;
let num = 3;
let time = 20;

// initial game

const initGame = () => {
    //random word
    let randomIndex = Math.floor(Math.random() * words.length);
    // console.log(randomIndex)
    let randomObj = words[randomIndex];
    word =randomObj.word.toLowerCase();
    // console.log(randomObj)
    

    //shuffles characters in a string
    let wordArr = word.split('').sort(() => Math.random() - 0.5);
    let scrambleWord = wordArr.join('');
    console.log(wordArr)
    // console.log(scrambleWord)

    //if the characters are not shuffled successfully, call the init function again
    if(scrambleWord === word)
    return initGame()
    console.log(scrambleWord)

    //render html
    numOfplays.innerText = num;
    scoreElement.innerText = score;
    wordElement.innerText = scrambleWord;
    hintElement.innerText = randomObj.hint;
    timeElement.innerText = time;
    input.value = '';
    // displayResult.innerHTML = `<p>`
    checkButton.setAttribute('disabled', true)
    
    //initial timer 
    timer = setInterval(()=> {
        if (time > 0){
            time--;
            return timeElement.innerText = time;
        }
        loseGame(`Time Out! ${word.toUpperCase()} is a correct word`)
    },2000) 

    
}

const showResult = () => {
    displayResult.innerHTML = msg
}

initGame()

//refresh game => reset all values except `score` and number of plays
refreshButton.addEventListener('click', () => loseGame())
const refreshGame = (msg) =>{

    if(msg) alert(msg);
    word = '';
    time = 10;
    clearInterval(timer);
    initGame()
}

//gameOver
const gameOver = () => {
    let msg = `Game Over! You get ${score} points, play again`;
    num = 3;
    score = 0;
    refreshGame(msg)
}

//loose game
const loseGame = (msg) => {
    num--;
    if(num < 0)
    return gameOver();
    refreshGame(msg)
}

//win Game 
const winGame = (msg) => {
    score++;
    refreshGame(msg)
}

//check input is disabled
input.addEventListener('input', (e) => {
    if(!e.target.value.trim()){
        checkButton.setAttribute('disabled', true);
    }else{
        checkButton.removeAttribute('disabled');
    }
})




//check the word
checkButton.addEventListener('click', () => {
    let answerText = input.value.toLowerCase().trim();
    if(answerText !== word) 
        return loseGame(`oops! ${answerText.toUpperCase()} is not a correct word`)
        return winGame(`congrats! ${answerText.toUpperCase()}is a correct word`)
    
    // console.log(answerText)
})



