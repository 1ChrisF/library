
const booksContainer = document.getElementById("books");
let library = [];
let libraryJson = "";

if (localStorage.myLibrary) {
    loadLibrary();
}

function loadLibrary() {
    library = JSON.parse(localStorage.myLibrary);
    
    library.forEach(element => {
        createCard(element);
    })

}
function isRead() {
    const bookIndex = this.getAttribute("data-book");
    let isReadProp = library[bookIndex].read;
    let read = (isReadProp === "yes") ? "no" : "yes";
    library[bookIndex].read = read;
    const isItReadDiv = document.querySelectorAll(".readCard")
    isItReadDiv.forEach(element => {
        if (element.getAttribute("data-book") === bookIndex) {
            element.innerText = `${read}`
        }

    });    
    libraryJson = JSON.stringify(library);
    localStorage.myLibrary = libraryJson;
}

function book(title, author, read, pages) {
    {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

}



renderCallForm();

function createDiv(divClass, divId) {
    const div = document.createElement('div');
    if (divId != "") { div.id = divId };
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
    if (document.getElementById("newBook") === null) {
        callForm = createDiv("button", "newBook");
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
    if (document.getElementById("containerForm")) { return }
    containerForm = createDiv("form", "containerForm");
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

function createCard(newbook) {

    containerCard = booksContainer.appendChild(createDiv("card", `containerCard${library.indexOf(newbook)}`))
    containerCard.setAttribute("data-book", `${library.indexOf(newbook)}`);
    books.appendChild(containerCard);
    imageCard = createDiv("imageCard");
    containerCard.appendChild(imageCard)
    image = document.createElement('img')
    image.src = "images/bookDefault.png";
    imageCard.appendChild(image);
    const cardDivs = [
        {
            id: "",
            class: "titleCard",
            text: newbook.title
        },
        {
            id: "",
            class: "authorCard",
            text: newbook.author
        },
        {
            id: "",
            class: "pagesCard",
            text: newbook.pages
        },
        {
            id: "",
            
            class: "readCard",
            text: newbook.read
        }
    ];
    cardDivs.forEach(element => {
        const newDiv = createDiv(element.class, element.id)
        newDiv.innerText = `${element.text}`
        newDiv.setAttribute("data-book", `${library.indexOf(newbook)}`);
        if (element.class === "pagesCard") newDiv.type = "number";
        containerCard.appendChild(newDiv)
    });
    const buttonsDiv = createDiv("buttons", "")
    containerCard.appendChild(buttonsDiv)
    //buttonsDiv.setAttribute("data-book", `${library.indexOf(newbook)}`);

    button = document.createElement("button");
    button.innerText = "delete";
    button.setAttribute("data-book", `${library.indexOf(newbook)}`)
    button.classList.add("delete")
    buttonsDiv.appendChild(button)
    button.addEventListener("click", deleteCard);

    button2 = document.createElement("button");
    button2.innerText = "read";
    button2.setAttribute("data-book", `${library.indexOf(newbook)}`)
    button2.classList.add("read")
    buttonsDiv.appendChild(button2)
    button2.addEventListener("click", isRead);
    renderCallForm();

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

function clearForm() {
    const formEl = document.querySelectorAll(".form")
    formEl.forEach(element => {
        console.log(formEl);
        element.remove();
    });
}

function deleteCard() {
    bookid = this.getAttribute("data-book");
    library.splice(bookid, 1);
    libraryJson = JSON.stringify(library);
    localStorage.myLibrary = libraryJson;


    card = document.querySelectorAll(".card")
    card.forEach(element => {
        if (element.getAttribute("data-book") === bookid) {
            element.remove();
        }
    });

    const cards = document.querySelectorAll(".card");
    const btn = document.querySelectorAll(".delete");
    const btn2 = document.querySelectorAll(".read");
    const outPut = document.querySelectorAll(".readCard")

    for (i = 0; i < cards.length; ++i) {
        cards[i].setAttribute("data-book", `${i}`);


    }
    for (i = 0; i < btn.length; ++i) {
        btn[i].setAttribute("data-book", `${i}`);


    }
    for (i = 0; i < btn2.length; ++i) {
        btn2[i].setAttribute("data-book", `${i}`);


    }
    for (i = 0; i < btn2.length; ++i) {
        outPut[i].setAttribute("data-book", `${i}`);


    }

}