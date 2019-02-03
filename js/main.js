/* Techdegree project 5  Random Employee directory
author: Luc de Brouwer
startProject: 3-2-2019
*/

/* global variables */
const gallery = document.querySelector('#gallery');



/**
 * gets users from the RandomUserAPI
 * Returns a card gallery filled with random users
 * @returns {Object} Employee data formatted as JSON
 */
const getRandomerUser = () => {
    const url = "https://randomuser.me/api/?results=12"; // Limits the results to retrieve to 12 users only
    fetch(url)
    .then(res => {
        let myJson = res.json();
        return myJson;
    })
    .then(data => {
        const users = data.results;
        return users.map((user)=> {
            // Create card gallery
            const cardDiv = document.createElement('div');
            const cardImgContainer = document.createElement('div');
            const img = document.createElement('img');

            const cardInfoDiv = document.createElement('div');
            const nameH3 = document.createElement('h3');
            const email = document.createElement('p');
            const location = document.createElement('p');

            // Set classes
            cardDiv.classList.add('card');
            cardImgContainer.classList.add('card-img-container');
            img.classList.add('card-img');
            cardInfoDiv.classList.add('card-info-container');
            nameH3.classList.add('card-name', 'cap');
            email.classList.add('card-text');
            location.classList.add('card-text', 'cap');

            // Set attributes
            img.alt = 'profile picture';
            nameH3.id = 'name';

            // Set content
            img.src = user.picture.thumbnail;
            nameH3.textContent = `${user.name.first} ${user.name.last}`;
            email.textContent = `${user.email}`;
            location.textContent = `${user.location.city}, ${user.location.state}`;

            // Append to DOM
            cardImgContainer.appendChild(img);
            cardInfoDiv.appendChild(nameH3);
            cardInfoDiv.appendChild(email);
            cardInfoDiv.appendChild(location);
            cardDiv.appendChild(cardImgContainer);
            cardDiv.appendChild(cardInfoDiv);

            // Finally append all to gallery div
            gallery.appendChild(cardDiv);
        });
    });
}
getRandomUser();
// Modal markup:

// You can use the commented out markup below as a template
// for your modal, but you must use JS to create and append 
// it to `body`.

// IMPORTANT: Altering the arrangememnt of the markup and the 
// attributes used may break the styles or functionality.

// <div class="modal-container">
//     <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//         <div class="modal-info-container">
//             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//             <h3 id="name" class="modal-name cap">name</h3>
//             <p class="modal-text">email</p>
//             <p class="modal-text cap">city</p>
//             <hr>
//             <p class="modal-text">(555) 555-5555</p>
//             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//             <p class="modal-text">Birthday: 10/21/2015</p>
//         </div>
//     </div>

//     // IMPORTANT: Below is only for exceeds tasks 
//     <div class="modal-btn-container">
//         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//         <button type="button" id="modal-next" class="modal-next btn">Next</button>
//     </div>
// </div>