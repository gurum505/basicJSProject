const quizData=[
    {
        question:'how old are you?',
        a:'10',
        b:'20',
        c:'30',
        d:'40',
        correct:'b'
    },{
        question:"what are you doing?",
        a:'gaming',
        b:'reading',
        c:'exercising',
        d:'playing',
        correct:'a'
    },{
        question:"what is the best game?",
        a:'dark souls',
        b:'skyrim',
        c:'portal',
        d:'zelda',
        correct:'d'
    },{
        question:"what is the best book?",
        a:'11ways to live',
        b:'what is critism',
        c:'about love',
        d:'islam culture',
        correct:'c'
    },{
        question:"what year today?",
        a:'2020',
        b:'2021',
        c:'2022',
        d:'2023',
        correct:'c'
    }
    
]

const questionEl=document.getElementById("question")
const a_text = document.getElementById("a_text")
const b_text = document.getElementById("b_text")
const c_text = document.getElementById("c_text")
const d_text = document.getElementById("d_text")
const submitBtn=document.getElementById("submit")


let currentQuiz=0;
let correct_answer=0;

function loadQuiz(){
    const currentQuizData=quizData[currentQuiz];
    
    questionEl.innerHTML=currentQuizData.question;
    a_text.innerHTML=currentQuizData.a
    b_text.innerHTML=currentQuizData.b
    c_text.innerHTML=currentQuizData.c
    d_text.innerHTML=currentQuizData.d
}

loadQuiz();

function getSelected(){
    let answer_text="none"
    if (document.getElementById("a").checked){
        answer_text="a";
        document.getElementById("a").checked=false;
    }else if (document.getElementById("b").checked){
        answer_text="b";
        document.getElementById("b").checked=false;
    }else if (document.getElementById("c").checked){
        answer_text="c";
        document.getElementById("c").checked=false;
    }else if (document.getElementById("d").checked){
        answer_text="d";
        document.getElementById("d").checked=false;
    }
    return answer_text
}

submitBtn.addEventListener("click",()=>{
    const currentQuizData=quizData[currentQuiz];
    let answer= currentQuizData.correct
    let answer_text=getSelected();

    if (answer_text != "none"){
        if (answer_text === answer){
            correct_answer+=1
        }
        currentQuiz++;
        if(currentQuiz>=quizData.length){
            alert("you finished! you get "+correct_answer+" of "+ quizData.length);
            currentQuiz=0
            correct_answer=0;
        }
        loadQuiz();
    }
})
