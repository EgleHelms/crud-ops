//import packages
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const objectId = require("mongodb").ObjectID;

//MongoDB setup

mongoose.connect("mongodb://127.0.0.1:27017/bookstore", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const bookSchema = new mongoose.Schema({
    author: String,
    title: String,
    year: Number,
    price: Number
}, {collection: "books"})

const BookData = mongoose.model("BookData", bookSchema);


//book route functions
const getBooks = (req, res) => {
    BookData.find().lean().then((docs) =>{
        res.json(docs)
    })
}

const addBook = (req, res) => {
    const bookObj = {
        author: req.body.author,
        title: req.body.title,
        year: req.body.year,        
        price: req.body.price,
    }

    const book = new BookData(bookObj)
    book.save().then(() => {
    res.json({success: true});
    })
}

const getBookById = (req, res) => {
    const id =req.params.id;
    BookData.findById(id).lean().then((docs => {
        res.json(docs)
    }))
}

const updateBookById = (req, res) => {
    const id =req.params.id;
    BookData.findById(id, (err, doc) =>{
        doc.author = req.body.author || doc.author
        doc.title = req.body.title || doc.title
        doc.year = req.body.year || doc.year
        doc.price = req.body.price ||doc.price
     
        doc.save().then(()=>{
            res.json({success: true})
        })    
    })
}


const deleteBookById = (req, res) => {
    bookData.findOneAndDelete(id ,function(err,doc){
        if(err) res.json({error: err})
        else {
          res.redirect("/books")  
        }
    });   
}

//user functions

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
}, {collection: "users"})

const UserData = mongoose.model("UserData", userSchema)

const getUsers= (req, res) => {
    UserData.find().lean().then((docs) =>{
        res.json(docs)
    })
}

const newUser = (req, res) => {
    const userObj = req.body;

    const user = new UserData(userObj)
    user.save().then(() => {
    res.json({success: true});
    })
}

const getUserById = (req, res) => {
    const id =req.params.id;
    UserData.findById(id).lean().then((docs => {
        res.json(docs)
    }))
}

const updateUserById = (req, res) => {
    const id =req.params.id;
       UserData.findById(id, (err, doc) =>{
        doc.fname = req.body.fname || doc.fname
        doc.lname = req.body.lname || doc.lname
        doc.email = req.body.email || doc.email
        doc.password = req.body.password ||doc.password
     
        doc.save().then(()=>{
        res.json({success: true})
    })    
  })
}

const deleteUserById = (req, res) => {
    UserData.findOneAndDelete(id ,function(err,doc){
        if(err) res.json({error: err})
        else {
          res.redirect("/users")  
        }
    });   
}

//orders functions

const orderSchema = new mongoose.Schema({
    bookId: String,
    quantity: String
}, {collection: "orders"})

const OrderData = mongoose.model("OrderData", orderSchema)

const getOrders = (req, res) => {
    OrderData.find().lean().then((docs) =>{
        res.json(docs)
    })
}

const newOrder = (req, res) => {
    const orderObj = req.body;
    const order = new OrderData(orderObj)
    order.save().then(() => {
    res.json({success: true});
    })
}

const getOrderById = (req, res) => {
    const id =req.params.id;
    OrderData.findById(id).lean().then((docs => {
        res.json(docs)
    }))
}

const updateOrderById = (req, res) => {
    const id =req.params.id;
       OrderData.findById(id, (err, doc) =>{
        doc.bookId = req.body.bookId || doc.bookId
        doc.quantity = req.body.quantity || doc.quantity
     
        doc.save().then(()=>{
        res.json({success: true})
    })    
  })
}

const deleteOrderById = (req, res) => {
    const id =req.params.id;
    OrderData.findOneAndDelete(id ,function(err,doc){
        if(err) res.json({error: err})
        else {
          res.redirect("/orders")  
        }
    });
}

//export functions
exports.getBooks = getBooks;
exports.addBook = addBook;
exports.getBookById = getBookById;
exports.updateBookById = updateBookById;
exports.deleteBookById = deleteBookById;

//export user functions
exports.getUsers = getUsers;
exports.newUser = newUser;
exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;

//export orsers functions
exports.getOrders= getOrders;
exports.newOrder = newOrder;
exports.getOrderById = getOrderById;
exports.updateOrderById = updateOrderById;
exports.deleteOrderById = deleteOrderById;