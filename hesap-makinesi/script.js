var btnNumber = document.querySelectorAll("#btnNumber");
var screen = document.querySelector("#screen");
var btnOpt = document.querySelectorAll("#btnOpt");
var mustafa = false;
var opt = "";
var final = 0;

btnNumber.forEach(number => {
    number.addEventListener("click",showNumber);

    function showNumber(){
        if(screen.textContent == "0" || mustafa){
            screen.textContent = "";
        }

        screen.textContent += this.textContent;
        mustafa = false;
    }
});

btnOpt.forEach(operator => {
    operator.addEventListener("click",calculator);

    function calculator(){
        mustafa = true;
        var newOpt = this.textContent;

        switch(opt){
            case "+":
                 screen.textContent = final + Number(screen.textContent);
            break;

            case "-":
                 screen.textContent = final - Number(screen.textContent);
            break;

            case "*":
                 screen.textContent = final * Number(screen.textContent);
            break;

            case "/":
                 screen.textContent = final / Number(screen.textContent);
            break;

            case "=":
                 final = Number(screen.textContent);
            break;
        }

        final = Number(screen.textContent);
        opt = newOpt;
    }
});