document.addEventListener("DOMContentLoaded", function () {});
const booksURL = `http://localhost:3000/books`;
const booksList = document.querySelector("#list");
const detailsPanel = document.querySelector("#show-panel");

fetch(booksURL)
  .then((response) => response.json())
  .then((books) =>
    books.forEach((book) => {
      const li = document.createElement("li");

      li.addEventListener("click", () => {
        detailsPanel.replaceChildren();
        const title = (h2 = document.createElement("h2"));
        const subtitle = (h2 = document.createElement("h3"));
        const author = (h2 = document.createElement("h3"));
        const description = (h2 = document.createElement("p"));
        const img = document.createElement("img");
        const likesList = document.createElement("ul");
        const likeButton = document.createElement("button");

        title.textContent = book.title;
        subtitle.textContent = book.subtitle;
        author.textContent = book.author;
        description.textContent = book.description;
        img.src = book.img_url;
        likeButton.textContent = "Like!";

 
        renderUserList(book, likesList)
  

        likeButton.addEventListener("click", () => {
          const updatedArray = [...book.users];
          const newUserLike = {
            id: 5,
            username: "personWhoLiked",
          };
          updatedArray.push(newUserLike);

          fetch(`${booksURL}/${book.id}`, {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              users: updatedArray,
            }),
          })
            .then((response) => response.json())
            .then((updatedBook) => renderUserList(updatedBook, likesList ));
        });

        

        detailsPanel.append(
          img,
          title,
          subtitle,
          author,
          description,
          likesList,
          likeButton
        );
      });

      li.textContent = book.title;
      booksList.appendChild(li);
    })
  );


  function renderUserList(updatedBook, likesList){
    likesList.replaceChildren();
    updatedBook.users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = user.username;
      likesList.append(li);
    });
  }