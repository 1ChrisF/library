const booksContainer = document.getElementById("books");
let library = [];
sampleBooks = [
    theThing = new book("The thing", "This Guy", 287, true, "1"),
    theThing2 = new book("The thing 2 ", "That Guy", 302, false, "2")
];

function randomId() {
    function s5() {
      let string = Math.random().toString(16).substring(2, 7);
      return string;
    }
    ranID = `${s5()}-${s5()}-${s5()}`;
    return ranID;
}

if (localStorage.getItem("myLibrary").length < 3) {
    sampleBooks.forEach(element =>
        library.push(element));
    library.forEach(element => {

        createCard(element);
    });
    renderCallForm()
} else {
    loadLibrary();
};

function loadLibrary() {
    library = JSON.parse(localStorage.myLibrary);
    library.forEach(ele => {
        ele.readToggle = function () {
            this.read = !this.read;
        };
        createCard(ele);

    })
    const btn2 = document.querySelectorAll(".read");
    for (i = 0; i < btn2.length; ++i) {
        btn2[i].setAttribute("data-book", `${i}`);
    }
}
function books() {

}

function isRead() {
    let bookId = this.getAttribute("data-book");
    library[library.findIndex((ele)=> ele.id == bookId)].readToggle();
    read = library[library.findIndex((ele)=> ele.id == bookId)].read
    red = "background-Color:rgb(100, 30, 39);"
    green = "background-Color:rgb(30, 100, 39);"
    this.style = (read === true) ? `${green}` : `${red}`;
    libraryJson = JSON.stringify(library);
    localStorage.myLibrary = libraryJson;
}

function book(title, author, pages, read, id) {
    {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }
}

book.prototype.readToggle = function () {
    this.read = !this.read;
};

function addBookToLibrary() {

    title = document.getElementById("title").value;
    author = document.getElementById("author").value;
    pages = document.getElementById("pages").value
    read = document.getElementById("read").checked
    id = randomId();
    /* if(title.value){ */
    newBook = new book(title, author, pages, read, id);
    library.push(newBook);
    libraryJson = JSON.stringify(library);
    localStorage.myLibrary = libraryJson;
    clearForm();
    createCard(newBook);
    /* } */
}

function createCard(newbook) {

    containerCard = booksContainer.appendChild(createDiv("card"))
    booksContainer.appendChild(containerCard);
    imageCard = createDiv("imageCard");
    containerCard.appendChild(imageCard)
    image = document.createElement('img')
    image.src = "images/bookDefault.png";
    imageCard.appendChild(image);

    const cardDivs = [
        createDiv("titleCard", newbook.title),
        createDiv("authorCard", newbook.author),
        createDiv("pagesCard", `pages: ${newbook.pages}`),
        createDiv("buttons", "")
    ];
    cardDivs.forEach(element => {        
        containerCard.appendChild(element);
    });
    buttonsDiv = containerCard.lastChild;
    button = document.createElement("button");
    button.innerText = "delete";
    button.setAttribute("data-book", `${newbook.id}`)
    button.classList.add("delete")
    buttonsDiv.appendChild(button)
    button.addEventListener("click", deleteCard);

    button2 = document.createElement("button");
    button2.innerText = "read";
    button2.setAttribute("data-book", `${newbook.id}`)
    red = "background-Color:rgb(100, 30, 39);"
    green = "background-Color:rgb(30, 100, 39);"
    button2.style = (newbook.read === true) ? green : red;
    button2.classList.add("read")
    buttonsDiv.appendChild(button2)
    button2.addEventListener("click", isRead)
    renderCallForm();
}

function deleteCard() {
    bookid = this.getAttribute("data-book");
    
    library.splice(library.findIndex((ele)=> ele.id == bookid), 1);
    localStorage.myLibrary = JSON.stringify(library);
    this.parentNode.parentNode.remove()

    
}

function createDiv(divClass, innerText) {
    const div = document.createElement('div');
    div.classList.add(divClass);
    if (innerText) div.innerText = innerText;
    return div;
}

function createInput(inputId, inputClass, html, type, innerText) {
    const formEle = document.createElement(html)
    formEle.id = inputId;
    formEle.classList.add(inputClass);
    formEle.type = type;
    formEle.innerText = innerText;
    return formEle;
}

function renderCallForm() {
    if (!document.getElementById("newBook")) {
        callForm = createDiv("button");
        callForm.id = "newBook"
        booksContainer.appendChild(callForm);
        document.getElementById("newBook")
            .addEventListener('click', renderForm);
        plus = document.createElement("p")
        plus.innerText = "+"
        callForm.appendChild(plus);
    }
}

function renderForm() {
    let newBookButton = document.getElementById("newBook")
    newBookButton.remove();
    containerForm = createDiv("form");
    containerForm.id = "containerForm"
    booksContainer.appendChild(containerForm);
    addImage = createDiv("addImage");
    addImage.innerText = "add \n image!"
    containerForm.appendChild(addImage);
    const form = document.createElement("form")
    containerForm.appendChild(form);
    const formInputs = [
        createInput("", "form", "lable", "text", "Author"),
        createInput("author", "form", "input", "text"),
        createInput("", "form", "lable", "text", "Title"),
        createInput("title", "form", "input", "text"),
        createInput("", "form", "lable", "text", "Pages"),
        createInput("pages", "form", "input", "number"),
        createInput("", "form", "lable", "text", "Have you read it?"),
        createInput("read", "form", "input", "checkbox"),

    ];
    temp = new DocumentFragment()
    formInputs.forEach(element => {
        element.setAttribute("autoComplete", "off")
        temp.appendChild(element)
    });
    form.appendChild(temp);
    button = document.createElement("button");
    button.id = "submitBookData";
    button.innerText = "Add Book"
    button.classList.add("buttonSmall")
    form.appendChild(button)
    document.getElementById("submitBookData")
        .addEventListener("click", addBookToLibrary);
}

function clearForm() {
    const formEl = document.querySelectorAll(".form")
    formEl.forEach(element => {
        console.log(formEl);
        element.remove();
    });
}

