button = document.createElement("button");

function loadLibrary() {
    someBooks.forEach(element => {
        mylibrary.push(element);
        createCard(element);
    })

}
booksContainer = document.getElementById("books");
let mylibrary = [
];//Title Author Isbn read
const someBooks = [{

    title: "something else0",
    author: "something0",
    read: "yes",
    pages: "22"
},
]
loadLibrary();

function book(title, author, read, pages) {
    this.title = title;
    this.author = author;
    //  this.isbn = isbn; 
    this.pages = pages;
    this.read = read;

}
renderCallForm();

/* let bookCard = [];
createDiv("containerCard", "card")
createDiv("titleCard", "card")
createDiv("authorCard", "card")
createDiv("isbnCard", "card")
createDiv("readCard", "card")
 */
function createDiv(divClass, divId) {
    const div = document.createElement('div');
    if(divId != ""){div.id = divId};
    div.classList.add(divClass);
    div.type = "text";
    return div;
}

function createInput(inputId, inputClass) {
    const input = document.createElement('input')
    input.id = inputId;
    input.classList.add(inputClass);
    input.type = "text";
    input.lable = inputId;
    return input;
}

function renderCallForm() {
    if(document.getElementById("newBook") === null)
    callForm = createDiv("button", "newBook");
    booksContainer.appendChild(callForm);
    document.getElementById("newBook")
            .addEventListener('click', createForm);
    callForm.innerText = "+"
}

function createForm() {
    let newBookButton = document.getElementById("newBook")
    newBookButton.remove();
    if (document.getElementById("containerForm")) { return }
    booksContainer.appendChild(createDiv("form", "containerForm"))
    /*   const formInputs = [
         createInput("authorForm", "form"),
         createInput("authorForm", "form"),
         createInput("isbnForm", "form"),
         document.createElement("button").id = "submitBookData"
     ];  */
    const formInputs = [
        {
            id: "authorForm",
            class: "form"
        },
        {
            id: "titleForm",
            class: "form"
        },
        {
            id: "pagesForm",
            class: "form"
        },
        {
            id: "readForm",
            class: "form"
        }
        /*  {id : "isbnForm",
         class : "form"}   */
    ];
    formInputs.forEach(element => {
        const inp = createInput(element.id, element.class)
        if (element.id === "pagesForm")inp.type = "number";
        containerForm.appendChild(inp)

    });
    button = document.createElement("button");
    button.id = "submitBookData";
    containerForm.appendChild(button)
    document.getElementById("submitBookData")
        .addEventListener("click", addBookToLibrary);

}
/* function createForm(){
    booksContainer.appendChild(createDiv("containerForm", "form"))
} */

function createCard(book) {
    containerCard = booksContainer.appendChild(createDiv("Card", `containerCard${mylibrary.indexOf(book)}`))
    imageCard = createDiv("imageCard");
    containerCard.appendChild(imageCard)
    image = document.createElement('img')
    image.src = "images/open.png";
    imageCard.appendChild(image);
    const cardDivs = [
        {
            id: "",
            class: "titleCard",
            text: book.title
        },
        {
            id: "",
            class: "authorCard",
            text: book.author
        },
        {
            id: "",
            class: "pagesCard",
            text: book.pages
        },
        {
            id: `readCard${mylibrary.indexOf(book)}`,
            class: "readCard",
            text: book.read
        }
        /*   {id : "isbnCard",
          class : "Card",
          innerText : }   */
    ];
    cardDivs.forEach(element => {
        const newDiv = createDiv(element.class, element.id)
        newDiv.innerText = `${element.text}`
        if (element.class === "pagesCard")newDiv.type = "number";
        containerCard.appendChild(newDiv)
    });
    button = document.createElement("button");
    button.id = `${mylibrary.indexOf(book)}`
    button.innerText = "delete";
    button.setAttribute("data-bookid", `${mylibrary.indexOf(book)}`)
    button.classList.add("buttonSmall")
    containerCard.appendChild(button)
    document.getElementById(`${mylibrary.indexOf(book)}`)
        .addEventListener("click", deleteCard);
    button2 = document.createElement("button");
    button2.id = `${mylibrary.indexOf(book)}`
    button2.innerText = "read";
    button2.setAttribute("data-bookid", `${mylibrary.indexOf(book)}`)
    button2.classList.add("buttonSmall")
    containerCard.appendChild(button2)
    
    button2.addEventListener("click", isRead);
   renderCallForm();

}

function addBookToLibrary() {

    title = document.getElementById("titleForm").value;
    author = document.getElementById("authorForm").value;
    pages = document.getElementById("pagesForm").value
    read = document.getElementById("readForm").value
    

    /*  isbn = document.getElementById("isbnForm").value; */
    /* read = document.getElementById("readForm").value; */
    newBook = new book(title, author, read, pages);
    console.log(newBook, "ffff");
    mylibrary.push(newBook);

    clearForm();
    createCard(newBook);

}

function clearForm() {
    const formEl = document.querySelectorAll(".form")
    formEl.forEach(element => {
        console.log(formEl);
        element.remove();
    });
}

function deleteCard() {
    cardId = document.getElementById(`containerCard${this.getAttribute("data-bookid")}`);
    cardId.remove();
}
function isRead() {
    let isReadProp = mylibrary[this.getAttribute("data-bookid")].read;
    isReadProp = (isReadProp === "yes")  ?  "no" :  "yes";
    mylibrary[this.getAttribute("data-bookid")].read = isReadProp;
    const isItReadDiv = document.getElementById(`readCard${this.getAttribute("data-bookid")}`);
    isItReadDiv.innerText = `${isReadProp}`
}