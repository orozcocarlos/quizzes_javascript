const question = document.getElementById("question");
const choice = Array.from(document.getElementsByClassName("choice-text"));

const questionCounters = document.getElementById("progress-text");
const scores = document.getElementById("score")

const progressBar = document.getElementById("progress-bar-full")

let currentQuestion = {};
let AceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is your name ?",
    choice1: "<carlos>",
    choice2: "<luis>",
    choice3: "<diego>",
    choice4: "<felipe>",
    answer: 1,
  },
  {
    question: "What is your colour ?",
    choice1: "<carlos>",
    choice2: "<luis>",
    choice3: "<diego>",
    choice4: "<felipe>",
    answer: 2,
  },
  {
    question: "What is your last name ?",
    choice1: "<carlos>",
    choice2: "<luis>",
    choice3: "<diego>",
    choice4: "<felipe>",
    answer: 3,
  },
];

//constantes

const correct_bonus = 10
const max_questions = 3

StarGame = ()=>{
    questionCounter=0
    score = 0 ;
    availableQuestions = [...questions]
    console.log(availableQuestions);
    getNewQuestion();


}


getNewQuestion = () =>{
    if(availableQuestions.length===0 || questionCounter > max_questions){
        localStorage.setItem("mostRecentScore",score)
        return window.location.assign('/end.html')
    }
    questionCounter++;
    questionCounters.innerText = ` Question : ${questionCounter}/${max_questions}`;

    //updete de progress bar

    progressBar.style.width= `${(questionCounter/max_questions)*100}%`;



    const questionIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;
    choice.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionIndex,1)
    AceptingAnswer = true



}
choice.forEach(choice =>{
    choice.addEventListener("click", e =>{
        if(!AceptingAnswer) return;

        AceptingAnswer = false
        const selectChoice = e.target
        const selectAnswer = selectChoice.dataset["number"]

      

        const classToApply = selectAnswer ==currentQuestion.answer ? 'correct':'incorrect';

        if (classToApply === 'correct'){
            incrementScore(correct_bonus);
        }

        selectChoice.parentElement.classList.add(classToApply);

        setTimeout(()=>{
            selectChoice.parentElement.classList.remove(classToApply);
            
        getNewQuestion()

        },1000)
    


    

    })
})

incrementScore = num => {
    score += num;
    scores.innerText =score;
}
StarGame();


