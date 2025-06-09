// "use client";

// import React,{ useEffect, useState } from "react";
// import axios from "axios";

// const book = () => {
//   const [books, setBooks] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBooks = () => {
//       axios
//         .get("http://localhost:1337/api/books")
//         .then((response) => {
//           setBooks(response.data.data);
//         })
//         .catch((err) => {
//           setError("Failed to fetch books data.");
//           console.error(err);
//         });
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div>
//       <h1>Books List</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <ul>
//         {books.map((book) => (
//           <li key={book.id}>
//             <h2>{book.attributes.title}</h2>
//             <p>{book.attributes.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default book;
