const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timerCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line")

start_btn.onclick = () =>{
    info_box.classList.add("activeInfo");
    console.log("true");
}
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestion(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

//next btn
const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () =>{
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestion(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(15);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
}

quit_quiz.onclick = () =>{
    window.location.reload();
}

next_btn.onclick = () =>{
    
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestion(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(15);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
    }else{
        console.log("else girdi");
        showResultBox();
    }
    console.log(que_count);
    
    
}

function showQuestion(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = "<span>"+ questions[index].numb + ". " + questions[index].question + "</span>";
    
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>' +
                     '<div class="option"><span>'+ questions[index].options[1] +'</span></div>' +
                     '<div class="option"><span>'+ questions[index].options[2] +'</span></div>' +
                     '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    
    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");
        console.log("answer is correct");
        answer.insertAdjacentHTML("beforeend",tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("answer is wrong");
        answer.insertAdjacentHTML("beforeend",crossIcon);

        for(let i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }
    }

    for(let i = 0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display = "block";
}


function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<span>and congrats!, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }else if(userScore > 1){
        let scoreTag = '<span>and nice, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }else{
        let scoreTag = '<span>and sorry, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timerCount.textContent = time;
        time--;
        if(time < 0){
            clearInterval(counter);
        }
        
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer,29);
    function timer(){
        
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
        
    }
}



function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuestCountTag = "<span><p>"+ index +"</p>Of<p>"+ questions.length +"</p>Questions</span>";
    bottom_ques_counter.innerHTML = totalQuestCountTag;
}