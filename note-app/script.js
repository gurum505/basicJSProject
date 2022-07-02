const addBtn =document.getElementById("add");

const notes=JSON.parse(localStorage.getItem("notes"))
if (notes){
    notes.forEach(note=>{
        addNewNote(note)
    })
}else{

}

function addNewNote(text =""){
    const note=document.createElement("div");
    note.classList.add("note")
    
    note.innerHTML=`
    <div class="notes">
        <div class="tools">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="main ${text ? "":"hidden"}">
        </div>
        <textarea class="${text ? "hidden":""}"></textarea>
    </div>
    `

    const editBtn= note.querySelector(".edit");
    const deleteBtn=note.querySelector(".delete")
    const main= note.querySelector(".main")
    const textArea= note.querySelector("textarea")
    textArea.value=text;
    main.innerHTML=marked.parse(text);

    editBtn.addEventListener("click",()=>{
        main.classList.toggle("hidden") //이해가 안됌
        textArea.classList.toggle("hidden")
    })

    deleteBtn.addEventListener("click",()=>{
        note.remove();// id없어도 바로 note가 특정이 되는구나
        updateLS()
    })
    
    textArea.addEventListener("input",(e)=>{
        const {value} =e.target //이부분도 
        main.innerHTML=marked.parse(value);
        updateLS()
    })

    document.body.appendChild(note)
}

addBtn.addEventListener("click",()=>{
    addNewNote();
})

function updateLS(){
    const notesText= document.querySelectorAll("textarea");
    const notes=[]
    notesText.forEach((note)=>{
        notes.push(note.value)
    })
    localStorage.setItem("notes",JSON.stringify(notes));
}
