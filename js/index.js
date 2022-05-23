document.addEventListener("DOMContentLoaded", function() {});
const booksURL = `http://localhost:3000/books`
const booksList = document.querySelector('#list')
const detailsPanel = document.querySelector('#show-panel')

fetch(booksURL)
    .then(response => response.json())
    .then(books => books.forEach(book => {
        const li = document.createElement('li')



li.addEventListener('click', () => {
    detailsPanel.innerHTML = ""
    const title = h2 = document.createElement('h2')
    const subtitle = h2 = document.createElement('h3')
    const author = h2 = document.createElement('h3')
    const description = h2 = document.createElement('p')
    const img = document.createElement('img')
    const likesList = document.createElement('ul')

    title.textContent = book.title
    subtitle.textContent = book.subtitle
    author.textContent = book.author
    description.textContent = book.description
    img.src = book.img_url


    const useresWhoLikesStuff = book.users
    useresWhoLikesStuff.forEach(user =>{
        const userLi = document.createElement('li')
        userLi.textContent = user.username
        likesList.append(userLi)
    })

    const likeButton = document.createElement('button')
    likeButton.textContent = "Like!"
    

    likeButton.addEventListener('click', () => {
       

        const updatedArray = [...book.users]
        const newUserLike = {
            id: 5,
            username: "personWhoLiked"
        }
        updatedArray.push(newUserLike)
        
       
        fetch(`${booksURL}/${book.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                users: updatedArray})
        }).then(response => response.json())
          .then(() => {
            const userLi = document.createElement('li')
            userLi.textContent = newUserLike.username
            likesList.append(userLi)
            console.log(li.textContent)

          })  
    })



    detailsPanel.append(img,title, subtitle, author, description, likesList, likeButton)

})





        li.textContent = book.title
        booksList.appendChild(li)


        

    }))


    
 