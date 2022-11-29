var ball = document.querySelector("#ball");


ball.addEventListener("click",changeTheme);

var leftSide = true;
function changeTheme(){
    if(leftSide){
        ball.style.left = "40px";
        ball.style.backgroundColor = "#111";
        leftSide = false;
        document.querySelector(".mode").style.backgroundColor = "#fff";
        document.querySelector("body").style.backgroundColor = "#111";
    }else{
        ball.style.left = "5px";
        ball.style.backgroundColor = "#fff";
        leftSide = true;
        document.querySelector(".mode").style.backgroundColor = "#111";
        document.querySelector("body").style.backgroundColor = "#fff";
    }
}