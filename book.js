const addbtn = document.querySelector("#addBook");
const titlefield = document.querySelector("input[name='Title']");
const authorfield = document.querySelector("input[name='Author']");
const pagesfield = document.querySelector("input[name='Pages']");
const radiobtns = document.getElementsByName("Read");
let myLibrary = [];

//constructor for book
function Book(title, author, pages, isread){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
    this.info = function (){
      return this.title, this.author, this.pages, this.isread 
    }
  }

//get all the info and store the object into the library
  function addBooktoLibrary(title, author, pages, isread){
    myLibrary.push(new Book(title, author, pages, isread));
  }

//this function displays each book on the page
function render(){
    let lastindex = (myLibrary.length-1);
    let unit = myLibrary[lastindex];
    let card = document.createElement("div");
    card.className = "book-card";
    if(unit.isread == "Read"){
      card.classList.toggle("read");
    }
    card.innerHTML =
        ` <div>Title: ${unit.title}</div>
          <div>Author: ${unit.author}</div>
          <div>Pages: ${unit.pages}</div>
          <div id="Status">Status: ${unit.isread}</div>
          <button type="button" id="remove" data-stuff=${lastindex}>Remove</button>
          <button type="button" id="toggleread" data-stuff=${lastindex}>Read</button>
        `;
    document.getElementById("items").appendChild(card);
}

//this function lets user add new books
function newbook(){
    let isread = (document.getElementById("Read").checked)? "Read" : "Unread"
    //checks if fields are filled
    if(!titlefield.value || !authorfield.value || !pagesfield.value){
        alert("You did not fill out all of the fields!")
        return null;
    }
    addBooktoLibrary(titlefield.value, authorfield.value, pagesfield.value, isread);
    render();
}

//this function removes a book
//finds the index according to the data-stuff attribute for the button and splices it out of the library
function removebook(e){
    index = e.target.dataset.stuff;
    myLibrary.splice(index,1);
    let deletedelement = e.target.parentElement;
    deletedelement.parentElement.removeChild(deletedelement);
}


//this function changes the read status of your book
function toggleread(e){
    index = e.target.dataset.stuff;
    unit = myLibrary[index];
    let toggledbook = e.target.parentElement; 
    unit.isread = unit.isread == "Read" ? unit.isread = "Unread" : unit.isread = "Read";
    let togglestatus = toggledbook.lastElementChild; 
    togglestatus.innerHTML = `${unit.isread}`;
    toggledbook.classList.toggle("read");
}

//event listener to add a new book
addbtn.addEventListener("click",newbook);
//event listener for removing or toggling read status
document.body.addEventListener("click", function (e){
    if(e.srcElement.id == "remove"){
        removebook(e);
    };
    if(e.srcElement.id == "toggleread"){
        toggleread(e);
    };
  });

