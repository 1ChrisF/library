const booksContainer = document.getElementById("books");
let library = [];
let libraryJson = "";

if (localStorage.myLibrary === null || localStorage.myLibrary === "[]") {
    renderCallForm()
} else {
    loadLibrary();
};

function loadLibrary() {
    library = JSON.parse(localStorage.myLibrary);
    library.forEach(element => {
        createCard(element);
    })
}
function books() {

}

function isRead() {
    let bookIndex = this.getAttribute("data-book");
    read = (library[bookIndex].read === "yes") ? "no" : "yes";
    library[bookIndex].read = read;
    red = "background-Color:rgb(100, 30, 39);"
    green = "background-Color:rgb(30, 100, 39);"
    this.style = (read === "yes") ? `${green}` : `${red}`;
    libraryJson = JSON.stringify(library);
    localStorage.myLibrary = libraryJson;
}

books.prototype.info = function () {
    message = `${this.title} by ${this.author}, ${this.pages} long, not yet ${this.read}`
    return message;
}
book.prototype = Object.create(books.prototype)

function book(title, author, read, pages) {
    {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;

    }
}

function addBookToLibrary() {

    title = document.getElementById("titleForm").value;
    author = document.getElementById("authorForm").value;
    pages = document.getElementById("pagesForm").value
    read = document.getElementById("readForm").value
    newBook = new book(title, author, read, pages);
    library.push(newBook);
    libraryJson = JSON.stringify(library);
    localStorage.myLibrary = libraryJson;
    clearForm();
    createCard(newBook);
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
        {
            class: "titleCard",
            text: newbook.title
        },
        {
            class: "authorCard",
            text: newbook.author
        },
        {
            class: "pagesCard",
            text: `pages: ${newbook.pages}`
        },
        {
            class: "buttons",
            text: ""
        }
    ];
    cardDivs.forEach(element => {
        const newDiv = createDiv(element.class)
        newDiv.innerText = `${element.text}`
        newDiv.setAttribute("data-book", `${library.indexOf(newbook)}`);
        if (element.class === "pagesCard") newDiv.type = "number";
        containerCard.appendChild(newDiv)
    });
    buttonsDiv = containerCard.lastChild;
    button = document.createElement("button");
    button.innerText = "delete";
    button.setAttribute("data-book", `${library.indexOf(newbook)}`)
    button.classList.add("delete")
    buttonsDiv.appendChild(button)
    button.addEventListener("click", deleteCard);

    button2 = document.createElement("button");
    button2.innerText = "read";
    button2.setAttribute("data-book", `${library.indexOf(newbook)}`)
    red = "background-Color:rgb(100, 30, 39);"
    green = "background-Color:rgb(30, 100, 39);"
    button2.style = (newbook.read === "yes") ? green : red;
    button2.classList.add("read")
    buttonsDiv.appendChild(button2)
    button2.addEventListener("click", isRead)

    renderCallForm();
}

function deleteCard() {
    bookid = this.getAttribute("data-book");
    library.splice(bookid, 1);
    libraryJson = JSON.stringify(library);
    localStorage.myLibrary = libraryJson;
    this.parentNode.parentNode.remove()

    const btn2 = document.querySelectorAll(".read");
    for (i = 0; i < btn2.length; ++i) {
        btn2[i].setAttribute("data-book", `${i}`);
    }
}

function createDiv(divClass) {
    const div = document.createElement('div');
    div.classList.add(divClass);
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
    if (!document.getElementById("newBook")) {
        callForm = createDiv("button");
        callForm.id = "newBook"
        booksContainer.appendChild(callForm);
        document.getElementById("newBook")
            .addEventListener('click', createForm);
        plus = document.createElement("p")
        plus.innerText = "+"
        callForm.appendChild(plus);
    }
}

function createForm() {
    let newBookButton = document.getElementById("newBook")
    newBookButton.remove();
    /* if (document.getElementById("containerForm")) { return } */
    containerForm = createDiv("form");
    containerForm.id = "containerForm"
    booksContainer.appendChild(containerForm);
    const formInputs = [
        {
            id: "authorForm",
            class: "form",
            auto: "off"
        },
        {
            id: "titleForm",
            class: "form",
            auto: "off"
        },
        {
            id: "pagesForm",
            class: "form",
            auto: "off"
        },
        {
            id: "readForm",
            class: "form",
            auto: "off"
        }
    ];
    formInputs.forEach(element => {
        const input = createInput(element.id, element.class)
        if (element.id === "pagesForm") input.type = "number";
        input.autocomplete = element.auto
        containerForm.appendChild(input)

    });
    button = document.createElement("button");
    button.id = "submitBookData";
    button.innerText = "Add Book"
    button.classList.add("buttonSmall")
    containerForm.appendChild(button)
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

