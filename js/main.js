/* Techdegree project 5  Random Employee directory
author: Luc de Brouwer
startProject: 3-2-2019
*/

const gallery = document.querySelector('#gallery');
const body = document.getElementsByTagName('body')[0];

const url = 'https://randomuser.me/api/?results=12';

// Fetch the random users from the random user api 
// Calls createCards and createModals to build the necessary content
const fetchdata = () => {
    return fetch(url)
    .then(res => { return res.json() })
    .then(function(data){
        const users = data.results;
        return users.map(user => {
            createCards(user.picture.large, user.name.first, user.name.last, user.email, user.location.city, user.location.state);
            createModals(user.picture.large, user.name.first, user.name.last, user.email, user.dob.date, user.location.street, user.phone, user.location.city, user.location.state, user.location.postcode);
        })
    });
}


/**
 * Creates and returns a DOM element, accepts an element and classname value
 * @param {string} element 
 * @param {string} value 
 * @returns {HTMLElement} DOM element
 */
const makeElement = (element, value, text) => {
    const elementToCreate = document.createElement(element);
    elementToCreate.setAttribute('class', value);
    elementToCreate.textContent = text;
    return elementToCreate;
}

/**
 * ForEach returned user in results array, create a card
 * @param {ImageBitmap} image 
 * @param {string} firstname 
 * @param {string} lastname 
 * @param {string} email 
 * @param {string} city 
 * @param {string} state
 * @returns Card with random user 
 */
const createCards = (image, firstname, lastname, email, city, state) => {
    /* Build the needed HTML structure */
    const card = makeElement('div', 'card', null);
    const cardImgContainer = makeElement('div', 'card-img-container', null);
    const cardImg = makeElement('img', 'card-img', null);

    const cardInfoDiv = makeElement('div', 'card-info-container', null);
    const nameH3 = makeElement('h3', 'card-name cap', `${firstname} ${lastname}`);
    const emailP = makeElement('p', 'card-text', email);
    const location = makeElement('p', 'card-text cap', `${city} ${state}`);

    cardImg.setAttribute('src', image);
    cardImg.setAttribute('alt', 'profile picture');
    nameH3.setAttribute('id', 'name');

    /* Make sure we add all our HTML to the DOM */
    cardImgContainer.appendChild(cardImg);
    cardInfoDiv.appendChild(nameH3);
    cardInfoDiv.appendChild(emailP);
    cardInfoDiv.appendChild(location);
    card.appendChild(cardImgContainer);
    card.appendChild(cardInfoDiv);
    gallery.appendChild(card);
}

const createModals = (image, firstname, lastname, email, birthday, street, phone, city, state, postcode) => {
    const modalContainer = makeElement('div', 'modal-container', null);
    const modal = makeElement('div', 'modal', null);
    const modalInfoContainer = makeElement('div', 'modal-info-container', null);
    const closeButton = makeElement('button', 'modal-close-btn', 'X');
    const modalImg = makeElement('img', 'modal-img', null);

    const modalH3 = makeElement('h3', 'modal-name cap', `${firstname} ${lastname}`);
    const modalMail = makeElement('p', 'modal-text', email);
    const modalCity = makeElement('p', 'modal-text cap', `${city} ${state}`);
    const modalHr = makeElement('hr', '', null);
    const modalPhone = makeElement('p', 'modal-text', phone);
    const modalAddress = makeElement('p', 'modal-text',  `${street} ${city} ${state} ${postcode}`);
    const modalBirthDay = makeElement('p', 'modal-text', birthday.slice(0, 10));

    /* set attributes */
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('id','modal-close-btn');
    modalImg.setAttribute('src', image);
    modalImg.setAttribute('alt', 'profile picture'); 
    modalH3.setAttribute('id', 'name');
    /* Hide modals */
    modalContainer.style.display = 'none';

    modalInfoContainer.appendChild(modalImg);
    modalInfoContainer.appendChild(modalH3);
    modalInfoContainer.appendChild(modalMail);
    modalInfoContainer.appendChild(modalCity);
    modalInfoContainer.appendChild(modalHr);
    modalInfoContainer.appendChild(modalPhone);
    modalInfoContainer.appendChild(modalAddress);
    modalInfoContainer.appendChild(modalBirthDay);

    modal.appendChild(closeButton);
    modal.appendChild(modalInfoContainer);  
    modalContainer.appendChild(modal); 

    /* append it all together to the body */
    body.appendChild(modalContainer);
}

gallery.addEventListener('click', (e) => {
    const cards = Array.from(document.querySelectorAll('.card'));
    const modals = document.querySelectorAll('.modal-container');
    for(let i = 0; i < cards.length; i+=1) {
        if(e.target.closest('.card') === cards[i]) {
            modals[i].style.display = 'block';
        }
    }
  
});

fetchdata();