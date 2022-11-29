const text = document.getElementById('text');
const btn = document.getElementById('btn');

const codesArray = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];

const randomColorCode = () =>{
    let hexCode = '#';

    for(let x = 0; x < 6; x++){
        hexCode += codesArray[Math.floor(Math.random()* codesArray.length)]
    }
    return hexCode;
}

btn.addEventListener('click', () => {
    text.innerText = randomColorCode();
    document.body.style.backgroundColor = randomColorCode();
});

console.log(randomColorCode());


// codesArray[Math.floor(Math.random()* codesArray.length)]