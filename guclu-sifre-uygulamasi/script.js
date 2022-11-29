const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); 
}


const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65); 
}

const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);  
}

const getRandomSymbol = () =>{
    const symbols = '!@#$%&*';
    return symbols[Math.floor(Math.random() * symbols.length)]
    
}

const randomFunctions = {
    getRandomLower,
    getRandomUpper,
    getRandomNumber,
    getRandomSymbol
}



const generatePassword = () =>{
    const length = 16;
    let generatedPassword = '';
    for(let x = 0; x < length; x++){
        generatedPassword += Object.values(randomFunctions)[Math.floor(Math.random() * 4)]();
    }

    return generatedPassword;

}

console.log(getRandomSymbol());
console.log(generatePassword());
console.log(randomFunctions);
console.log(Object.values(randomFunctions)[Math.floor(Math.random() * 4)])

const spanResult = document.getElementById('result');
const generateButton = document.getElementById('generate');
const clipboardButton = document.getElementById('clipboard');

generateButton.addEventListener('click', () =>{
    spanResult.innerText = generatePassword();
})

clipboardButton.addEventListener('click', () =>{
    const password = spanResult.innerText;
    if(!password){
        return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('kopyalandı');

})









//String.fromCharCode(Math.floor(Math.random()*26 + 97))