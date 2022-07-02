const form= document.getElementById("form")
const input= document.getElementById("input")
const todos=document.getElementById("todos")

const notes=JSON.parse(localStorage.getItem("todos"))
if(notes){
    notes.forEach(note=>{
        addTodo(note)
    })
}

function updateLS(){
    const todosEl=document.querySelectorAll("li")

    const todos=[]

    todosEl.forEach(todoEl=>{
        todos.push({
            text:todoEl.innerHTML,
            completed:todoEl.classList.contains("completed")
        })
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}

function addTodo(note=""){
    let text = input.value;
    if(note){
        text=note.text
    }
    if(text){
        const todoEl=document.createElement("li")
        todoEl.innerHTML=text
        if(note.completed){
            todoEl.classList.add("completed")
        }

        todoEl.addEventListener("click",()=>{
            todoEl.classList.toggle("completed")
            updateLS()
        })
        todoEl.addEventListener("contextmenu",(e)=>{
            e.preventDefault();
            todoEl.remove()
            updateLS()
        })
        todos.appendChild(todoEl)
        input.value=""
        updateLS();
    }
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    //form 안에 submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않게 하고싶을 경우 (submit은 작동됨)
    
    addTodo();
})

