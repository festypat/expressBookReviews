const Axios = require("axios")
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

	const doesExist = (username)=>{
        const uservalues = Object.values(users);
       // const userresult = uservalues.filter(userid => userid.username === username);
    	  let userswithsamename = uservalues.filter((user)=>{
    	    return user.username === username
    	  });
    	  if(userswithsamename.length > 0){
    	    return true;
    	  } else {
    	    return false;
      }
    	}
    

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
        return res.status(404).json({message: "Username or password is expected"});
      }    

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});


// Get the book list available in the shop
//public_users.get('/',function (req, res) {
   // res.send(JSON.stringify(books,null,4));
  //return res.status(300).json({message: "Success"});
//});


// Get the book list available in the shop using async await
public_users.get('/', (req, res) => {
    const getBooks = () => {
        return new Promise((resolve,reject) => {
          setTimeout(() => {
            resolve(books)
            ,1000})
    
    getBooks().then((books) => {
        res.json(books);
    }).catch((err) =>{
      res.status(500).json({error: "An error occured"});
    });
})
}});      
    //await res.send(JSON.stringify(books,null,4));
  
// Get book details based on ISBN
//public_users.get('/isbn/:isbn',function (req, res) {
 //   const isbn = req.params.isbn;
 //     res.send(books[isbn])
//    return res.status(300).json({message: "Success"});
//   });


// Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', (req, res) =>{
    
    const ISBN = req.params.isbn;
    const booksBasedOnIsbn = (ISBN) => {
        return new Promise((resolve,reject) =>{
          setTimeout(() =>{
            const book = books.find((b) => b.isbn === ISBN);
            if(book){
              resolve(book);
            }else{
              reject(new Error("Book not found"));
            }},1000);
        });
    
            
    }
    booksBasedOnIsbn(ISB).then((book) =>{
      res.json(book);
    }).catch((err)=>{
      res.status(400).json({error:"Book not found"})
    });
      
    //await res.send(books[ISBN]);    
   
   });


// Get book details based on author
//public_users.get('/author/:author',function (req, res) {
 //   const author = req.params.author;
  //  const values = Object.values(books);
  //  const result = values.filter(book => book.author === author);
   
  //  res.send(result);
 //return res.status(300).json({message: "Success"});
//});

public_users.get('/author/:author',async (req, res) => {

    //using promises
    const author = req.params.author;
    const booksBasedOnAuthor = (auth) => {
          return new Promise((resolve,reject) =>{
            setTimeout(() =>{
              const filteredbooks = books.filter((b) => b.author === auth);
              if(filteredbooks>0){
                resolve(filteredbooks);
              }else{
                reject(new Error("Book not found"));
              }},1000);
          });
      
              
      }
      booksBasedOnAuthor(author).then((book) =>{
        res.json(book);
      }).catch((err)=>{
        res.status(400).json({error:"Book not found"})
      });
   
  });


// Get all books based on title
//public_users.get('/title/:title',function (req, res) {
 //   const title = req.params.title;
 //   const values = Object.values(books);
 //   const result = values.filter(book => book.title === title);
   
 //   res.send(result);
// return res.status(300).json({message: "Success"});
//});

// Get all books based on title using promise
public_users.get('/title/:title',async (req, res) => {
  
    const title = req.params.title;
    const booksBasedOnTitle = (booktitle) => {
          return new Promise((resolve,reject) =>{
            setTimeout(() =>{
              const filteredbooks = books.filter((b) => b.title === booktitle);
              if(filteredbooks>0){
                resolve(filteredbooks);
              }else{
                reject(new Error("Book not found"));
              }},1000);
          });     
              
      }
      booksBasedOnTitle(title).then((new_books) =>{
        res.json(new_books);
      }).catch((err)=>{
        res.status(400).json({error:"Book not found"})
      });
  
  });



//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
  return res.status(300).json({message: "Success"});
});

module.exports.general = public_users;
