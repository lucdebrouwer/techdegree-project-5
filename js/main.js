/* Techdegree project 5  Random Employee directory
author: Luc de Brouwer
startProject: 3-2-2019
*/

/* global variables */
const gallery = document.querySelector('#gallery');
const body = document.getElementsByTagName('body')[0];


/**
 * gets users from the RandomUserAPI
 * Returns a card gallery filled with random users
 * @returns {Object} Employee data formatted as JSON
 */

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

        // MODAL PART

        /* create required HTML elements dynamically */
        const modalContainer = document.createElement('div');
        const modal = document.createElement('div');
        const modalInfoContainer = document.createElement('div');
        const closeButton = document.createElement('button');
        const modalImage = document.createElement('img');
        const modalH3 = document.createElement('h3');
        const modalEmail = document.createElement('p');
        const modalCity = document.createElement('p');
        const hr = document.createElement('hr');
        const modalPhone = document.createElement('p');
        const modalAddress = document.createElement('p');
        const modalBirthDay = document.createElement('p');

        /* add required CSS classes */
        modalContainer.classList.add('modal-container');
        modalContainer.style.display = 'none';
        modal.classList.add('modal');
        closeButton.classList.add('modal-close-btn');
        modalInfoContainer.classList.add('modal-info-container');
        modalImage.classList.add('modal-img');
        modalH3.classList.add('modal-name', 'cap');
        modalEmail.classList.add('modal-text');
        modalCity.classList.add('modal-text', 'cap');
        modalPhone.classList.add('modal-text');
        modalAddress.classList.add('modal-text');
        modalBirthDay.classList.add('modal-text');
        
        /* set attributes */
        closeButton.type = 'button';
        closeButton.id = 'modal-close-btn';

        closeButton.innerHTML = '<strong>X</strong>';
        modalImage.alt = 'profile picture';
        modalH3.id = 'name';
        /* set data */
        modalImage.src = `${user.picture.thumbnail}`;
        modalH3.textContent = `${user.name.first} ${user.name.last}`;
        modalEmail.textContent = `${user.email}`;
        modalCity.textContent = `${user.location.city}`;
        modalBirthDay.textContent = `${user.dob.date}`;
        modalAddress.textContent = `${user.location.street} ${user.location.city} ${user.location.state} ${user.location.postcode}`;

        /* append the elements each parent */
        modalInfoContainer.appendChild(modalImage);
        modalInfoContainer.appendChild(modalH3);
        modalInfoContainer.appendChild(modalEmail);
        modalInfoContainer.appendChild(modalCity);
        modalInfoContainer.appendChild(hr);
        modalInfoContainer.appendChild(modalPhone);
        modalInfoContainer.appendChild(modalAddress);
        modalInfoContainer.appendChild(modalBirthDay);

        modal.appendChild(closeButton);
        modal.appendChild(modalInfoContainer);  
        modalContainer.appendChild(modal); 

        /* append it all together to the body */
        body.appendChild(modalContainer);

        const cards = Array.from(document.querySelectorAll('.cards'));
        cards.addEventListener('click', (e) => {
            consle.log(e.target.value);
        });
        
    });
});
//     // IMPORTANT: Below is only for exceeds tasks 
//     <div class="modal-btn-container">
//         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//         <button type="button" id="modal-next" class="modal-next btn">Next</button>
//     </div>
// </div>