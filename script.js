const notesContainer=document.querySelector(".notes-container");
const createBtn=document.querySelector("#btn");
const thmBtn=document.getElementById("thm");
const con = document.querySelector(".container");
let notes=document.querySelectorAll(".input-box");

function showNotes(){
    notesContainer.innerHTML=localStorage.getItem("notes");
}

showNotes();

function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", ()=>{

    let note=document.createElement("div");
    let inputBox=document.createElement("p");
    let dateElement=document.createElement("div");
    let img=document.createElement("img");

    note.className="note";
    inputBox.className="input-box";
    inputBox.setAttribute("contenteditable", "true");

    dateElement.className="date";
    dateElement.innerText=getCurrentDate();

    img.src="Images/delete.png";

    notesContainer.appendChild(note);
    note.appendChild(inputBox);
    note.appendChild(dateElement);
    note.appendChild(img);
});

function getCurrentDate(){
    let now=new Date();

    let date=now.toLocaleDateString("en-GB",{
        day:"2-digit",
        month:"short",
        year:"numeric"
    });

    let time=now.toLocaleTimeString("en-US",{
        hour:"2-digit",
        minute:"2-digit"
    });
    return `Created: ${date} | ${time}`;
}

notesContainer.addEventListener("click", function(e){

    if(e.target.tagName==="IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName==="P"){
        notes=document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup=function(){
                updateStorage();
            }
        })
    }
});

document.addEventListener("keydown", event =>{
    if(event.key==="Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
}); 


thmBtn.addEventListener("click", function(){
    con.classList.toggle("dark-theme");

    if(con.classList.contains("dark-theme")){
        thmBtn.innerHTML="🔆";
        localStorage.setItem("theme","dark");
    }
    else{
        thmBtn.innerHTML="🌙";
        localStorage.setItem("theme","light")
    }
});

if(localStorage.getItem("theme")==="dark"){
    con.classList.add("dark-theme");
    thmBtn.innerHTML="🔆";
}
