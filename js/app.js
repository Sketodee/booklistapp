// Book Class:  Create a book class (step 1)
class Book {
    constructor(name, author, isbn) {
        this.name = name;
        this.author = author; 
        this.isbn = isbn 
    }
}


//UI class to handle UI tasks (create a dummy array -step 2)
class UI {
    static displayBooks() {

        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book)); // loop through each book in array, step 4
    }

    static addBookToList(book) { //create an addbook to list function, step 5
        const list = document.querySelector('#book-list'); 

        const newRow = document.createElement('tr'); 
        newRow.innerHTML = `
            <td> ${book.name} </td> 
            <td> ${book.author} </td> 
            <td> ${book.isbn} </td> 
            <td> <button class="btn  btn-danger"> X </button> </td> 
        `
        list.appendChild(newRow);
    }

    static clearFields() {
        document.querySelector("#name").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }

    static deleteBook(el) {
        if(el.classList.contains('btn-danger')) {
            el.parentElement.parentElement.remove();
        }
    }

    static validate(message, className) {
        const p = document.createElement('p'); 
        p.className = `p-3 text-white ${className}`;
        p.appendChild(document.createTextNode(message));

        const myform = document.querySelector("#myForm");
        const warning = document.querySelector(".warning");
        myform.insertBefore(p,warning);
        setTimeout(() => {
            p.remove()
        }, 3000);
        
        /*const warning = document.querySelector('.warning');
        const p = document.createElement('p');
        warning.appendChild(p);
        p.className = `p-3 text-white ${className}`;
        p.innerHTML = `${message}`; 
*/
    }
}

// Storage class: local storage 

class Store {
    static getBooks() {
        let books; 
        if(localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

    static addBook(book) {
        let books;
        books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        let books;
        books = Store.getBooks(); 

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        }); 
        localStorage.setItem('books', JSON.stringify(books))
    }
}


// Display book in the UI 
document.addEventListener('DOMContentLoaded', UI.displayBooks) //this shows the books in the UI, step 6

// Add a book 
document.querySelector("#myForm").addEventListener("submit", onSubmit) // this add books to exisiting list, step 7

function onSubmit(e) {
    e.preventDefault(); 


    //Get form values  
    //get the inputs and assign them to name, author and isbn, step 8

    const name = document.querySelector("#name").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value; 


    //Validate form

    if (name === '' || author === '' || isbn === '') {
        UI.validate('Please fill in all fields', 'bg-danger');
    } else {
             //Instantiate Book Class

    const book = new Book (name, author, isbn); //very important, add it to the book class in step1, step 9

    //aDD Book to UI
    UI.validate('Book Added Successfully!', 'bg-success');
    UI.addBookToList(book); 

    //Add book to store
        Store.addBook(book);

    UI.clearFields();
    }
} 

//Event to remove a book
document.querySelector('#book-list').addEventListener('click', clicked);

function clicked(e) {
    e.preventDefault(); 

    UI.validate('Book Deleted', 'bg-success');
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
}
