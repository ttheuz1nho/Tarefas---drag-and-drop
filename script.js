const columns = document.querySelectorAll(".column__cards");

let draggedCard;

const dragStart = (event) => {
    draggedCard = event.target;
    //console.log(draggedCard);
    event.dataTransfer.effectAllowed = "move"
};

const dragOver = (event) => {
    event.preventDefault();
    //console.log("drag over");
};

const dragEnter = ({target}) => {
    //console.log(target);
    if(target.classList.contains("column__cards")){
        target.classList.add("column--highlight")
    }
};

const dragLeave = ({target}) => {
    target.classList.remove("column--highlight")
};

const drop = ({target}) => {
    if(target.classList.contains("column__cards")){
        target.classList.remove("column--highlight")
        target.append(draggedCard);
    }
};

const createCard = ({target}) => {
    if(!target.classList.contains("column__cards")) return;
    
    const card = document.createElement("section");

    card.className = "card";
    card.draggable = "true";
    card.contentEditable = "true";
    
        card.addEventListener("focusout", () =>{
            card.contentEditable = "false";
            if(!card.textContent) card.remove();
        })
    card.addEventListener("dragstart", dragStart);

    target.append(card);
    card.focus()

    card.addEventListener("dblclick", () =>{
        card.remove();
    })
}

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", createCard);
});

