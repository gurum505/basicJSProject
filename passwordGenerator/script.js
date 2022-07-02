const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters="abcdefghijklmnopqrstuvwxyz";
const numbers="0123456789";
const symbols="!#$%^&*()_+=";

generateEl.addEventListener("click",()=>{
    generatePW();
})

function getLowercase(){
    return lowerLetters[Math.floor(Math.random()*lowerLetters.length)]
}

function getUppercase(){
    return upperLetters[Math.floor(Math.random()*upperLetters.length)]

}
function getNumber(){
    return numbers[Math.floor(Math.random()*numbers.length)]
}
function getSymbol(){
    return symbols[Math.floor(Math.random()*symbols.length)]
}

function generatePW(){
    const len =lenEl.value;
    let password=""
    for( let i=0; i<len;i++){
        const x=generate();
        password+=x
    }

    pwEl.innerText=password;
}

function generate(){
    const x=[]

    if(upperEl.checked){
        x.push(getUppercase())
    }
    if(lowerEl.checked){
        x.push(getLowercase())
    }
    if(numberEl.checked){
        x.push(getNumber())
    }
    if(symbolEl.checked){
        x.push(getSymbol())
    }
    if(x.length==0){
        return ""
    }

    return x[Math.floor(Math.random()*x.length)]
}

copyEl.addEventListener("click",()=>{
    const textarea= document.createElement("textarea")
    const password= pwEl.innerText;
    if(!password){return;}
    textarea.value=password;
    document.body.appendChild(textarea)
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    
})