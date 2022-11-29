const form = document.querySelector("form");
const guessBtn = document.querySelector("guess-btn");
const guessDiv = document.querySelector(".last-guesses");
const result = document.querySelector("#result");
const guess = document.getElementById("guess");
const restartBtn = document.getElementById("restart-btn");


let number = Math.floor(Math.random() * 100 + 1);
let lastGuesses = [];


form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(guess.value == "" || lastGuesses.includes(guess.value)){
        //hata vericek
        result.style.color = "tomato";
        result.textContent = lastGuesses.includes(guess.value) ? "Bu tahmini daha önceden yaptın" : "Lütfen bir sayı giriniz";
        
        setTimeout(() => {
            result.textContent = "";
        }, 1000);
    }else{
        //devam edicek
        result.style.color = "black";
        lastGuesses.push(guess.value);
        let diff = Math.abs(guess.value - number);
        printLastGuess();
        getDiff(diff);
        
    }
})

restartBtn.addEventListener("click",restartGame);

function getDiff(diff){
    //tahminle sayıyı kıyasla
    if(diff == 0){
        result.textContent = "helal knk";
        restartBtn.style.display = "block";
    }else if(diff < 5){
        result.textContent = "yanıyosun fuat abi";
    }else if(diff < 10){
        result.textContent = "sıcağh";
    }else if(diff < 20){
        result.textContent = "ılık";
    }else if(diff < 40){
        result.textContent = "soğuk knk";
    }else if(diff < 70){
        result.textContent = "üşütüceksin kafasız";
    }else{
        result.textContent = "kutuplardasın allaha emanet";
    }
}

function printLastGuess(){
    //son tahminleri yazdır
    let index = lastGuesses.length - 1;
    let li = document.createElement("li");
    li.textContent = lastGuesses[index];
    guessDiv.appendChild(li);
}

function restartGame(){
    //oyunu bastan baslat
    
    result.textContent = "";
    guessDiv.textContent = "";
    restartBtn.style.display = "none";
    form.reset();
    number = Math.floor(Math.random() * 100 + 1);

}