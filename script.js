const startBtn=document.querySelector('.btn-start');
const popinfo=document.querySelector('.pop-info');
const scoreCard=document.querySelector('.scoreCard');
const exitBtn=document.querySelector('.ext-btn');
const homeBtn=document.querySelector('.home-btn');
const Main=document.querySelector('.main');
const continueBtn=document.querySelector('.cont-btn');
const tryBtn=document.querySelector('.try-btn');
const quizSection=document.querySelector('.quiz-section');
const nextBtn=document.querySelector('.next-btn');
const checker=document.querySelector('.quest-grp');
let myScore=document.getElementById('myScore');
checker.onclick=()=>{
    checkAnswer();
    
}

startBtn.onclick=()=>{
    popinfo.classList.add('active');
    Main.classList.add('active');
    
}
exitBtn.onclick=()=>{
    popinfo.classList.remove('active');
    Main.classList.remove('active');
}
continueBtn.onclick=()=>{
    quizSection.classList.add('active');
    popinfo.classList.remove('active');
    Main.classList.remove('active');
    
}
homeBtn.onclick=()=>{
    quizSection.classList.remove('active');
    scoreCard.classList.remove('active');
    Main.classList.remove('active');
    
}

tryBtn.onclick=()=>{
    quizSection.classList.add('active');
    scoreCard.classList.remove('active');
    Main.classList.remove('active');
    correctScore=0;
    questionCount=0;
    _correctScore.innerHTML=correctScore;
    loadQuestion();
    
}

nextBtn.onclick=()=>{
    if(questionCount<maxCount){
        loadQuestion();
    }
    checker.classList.remove('active');
    if(questionCount==maxCount){
        scoreCard.classList.add('active');
        Main.classList.add('active');
        myScore.innerHTML=`<h3> you scored ${correctScore} from ${maxCount}<h3>`
    }
}

//https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple
const _questions=document.getElementById('quiz-question');
const _options=document.querySelector('.quest-grp');
const _correctScore=document.getElementById('current-question');
const _totalQuestion=document.getElementById('total-question');
const questionNumber=document.getElementById('questionNumber');
let correctAnswer="";
let correctScore=0;
const maxCount=5;
let questionCount=0;
_totalQuestion.innerHTML=maxCount;

document.addEventListener('DOMContentLoaded',()=>{
    loadQuestion();
    _totalQuestion.textContent=maxCount;
    _correctScore.textContent=correctScore;

})

async function loadQuestion(){
    const ApiUrl=`https://opentdb.com/api.php?amount=${maxCount}&category=19&difficulty=medium&type=multiple`;
    const result= await fetch(`${ApiUrl}`);
    const data= await result.json();
    //console.log(data);


    showQuestions(data.results[0]);
    if(questionCount>=maxCount){
        scoreCard.classList.add('active');
        Main.classList.add('active');
    }
    questionCount++;
    questionNumber.innerHTML="Question: "+questionCount;
}



function showQuestions(data){
     correctAnswer=data.correct_answer;
    let incorrectAnswer=data.incorrect_answers;
    let optionList=incorrectAnswer;
    optionList.splice(Math.floor(Math.random()*(incorrectAnswer.length+1)),0,correctAnswer);
    console.log(optionList);
    console.log(correctAnswer);
    //console.log(data.question);
    

    _questions.innerHTML=`<h3>${data.question}</h3>`;
    _options.innerHTML=`
    ${optionList.map((option)=>`
    <button>${option}</button>
    `).join('')}
    `;
selectOption();
}

function selectOption(){
    nextBtn.classList.add('closed');
    _options.querySelectorAll('button').forEach((option)=>{
        option.addEventListener('click',()=>{
            if(_options.querySelector('.selected')){
                const activeOption=_options.querySelector('.selected');
                activeOption.classList.remove('selected');
                
            }
            nextBtn.classList.remove('closed');
            option.classList.add('selected');
        });
    });
}
function checkAnswer(data) {
    const selectedOption = _options.querySelector('.selected');
    
    if (selectedOption) {
        const selectedAnswer= selectedOption.textContent;
        if(selectedAnswer===correctAnswer){
            selectedOption.classList.add('correct_ans');
            console.log("correct");
            correctScore+=1;
            _correctScore.innerHTML=correctScore;
            checker.classList.add('active');

            //loadQuestion();
               
        }
        else{
            selectedOption.classList.add('incorrect_ans');
            _options.querySelectorAll('button').forEach((option)=>{
                if(option.textContent===correctAnswer){
                    option.classList.add('correct_ans');
                checker.classList.add('active');
                }
            });
            console.log('ayyo');
        }
        selectedOption.classList.remove('selected');
        //checker.classList.remove('active');
        //loadQuestion();

    }
    else{
        alert("choose option");
    }
}





