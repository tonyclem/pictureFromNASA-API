let books = [
  {
    title: "The Republic",
    author: "by Plato",
    alreadyRead: true,
  },
  {
    title: "The Obstacle is the way",
    author: "by Ryan Holiday",
    alreadyRead: true,
  },
  {
    title: "Creativity & Problem Solving",
    author: "by Brian Tracy",
    alreadyRead: false,
  },
];

// Loop through the array of books

//   for (let i = 0; i < books.length; i++) {
//     console.log(books[i]);
//   }

//  For each books, log the book title and book author like so: " The Republic by Plato".

//   for (let i = 0; i < books.length; i++) {
//     console.log(books[i].title, books[i].author);
//   }

// outPrint
// The Republic by Plato
// The Obstacle is the way by Ryan Holiday
// Creativity & Problem Solving by Brian Tracy

// Create a conditional statement to change the log depending on weather you read it yet or not. if you read it, log a string like you already read "Creativity & Problem Solving" right after the log of the book details

for (let i = 0; i < books.length; i++) {
  if (books[i].alreadyRead == true) {
    console.log(`You already read ${books[i].title} ${books[i].author}`);
  }
  // If you haven't read it log a string like you still need to read "Creativity & Problem Solving"
  else if (books[i].alreadyRead !== true) {
    console.log(
      `So Sorry you still need to read ${books[i].title} ${books[i].author}`
    );
  }
}
