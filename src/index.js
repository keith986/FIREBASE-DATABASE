import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot} from 'firebase/firestore'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

  //initializing app
  initializeApp(firebaseConfig)

  //connect to database
  const db = getFirestore()

  //collecting data from data=base
  const colRef = collection(db, 'books')

  //fetch data
  //getDocs(colRef)
         //.then((snapshot) => {
           // let books = [];

           // snapshot.docs.forEach((doc) => {
              //  books.push({...doc.data()}, doc.id);
            //})

          //  console.log(books)
        // })
      //   .catch((err) => {
    //        console.log(err);
  //       })

//real time data collection
onSnapshot(colRef, (snapshot) => {
    let books = [];

    snapshot.docs.forEach((doc) => {
        books.push({...doc.data()}, doc.id);
    })

    console.log(books)
})

//add Books
let addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    addDoc(colRef, {
        title : addBookForm.title.value,
        author: addBookForm.author.value,      
    })
    .then((result) => {
        addBookForm.reset()
        console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })
})


//delete book
let deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let deleteDocument = doc(db, 'books', deleteBookForm.refid.value)
    deleteDoc(deleteDocument)
             .then(() => {
                deleteBookForm.reset()
             })
             .catch((err) => {
                console.log(err)
             })
})

