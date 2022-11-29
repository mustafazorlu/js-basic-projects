const clickableBoxes = document.querySelectorAll(".clickable");
const full = false;
let boxValue;
const purple = "#663399";
let color = "white";

function startGame(){
    let colors = [];
    clickableBoxes.forEach(box => box.style.backgroundColor = "white");
    clickableBoxes.forEach(box => box.addEventListener("click", () => chooseBox(box)));
    clickableBoxes.forEach(() => {
        colors.push(full);
    });
    console.log(colors);
}


function chooseBox(box){
    clickableBoxes.forEach((box) => {
        
    });
    
    
}

function colorWhite(box){
    
    
       
}

startGame();