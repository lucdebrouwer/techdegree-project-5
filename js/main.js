/* Techdegree project 5  Random Employee directory
author: Luc de Brouwer
startProject: 3-2-2019
*/

const gallery = document.querySelector('#gallery');
const searchContainer = document.querySelector('.search-container');
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
 * @param {string} image 
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


/**
 * Create modals that belong to the user card
 * @param {string} image 
 * @param {string} firstname 
 * @param {string} lastname 
 * @param {string} email 
 * @param {string} birthday 
 * @param {string} street 
 * @param {string} phone 
 * @param {string} city 
 * @param {string} state 
 * @param {string} postcode 
 * @returns Modal with user information
 */
const createModals = (image, firstname, lastname, email, birthday, street, phone, city, state, postcode) => {;
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
    const modalAddress = makeElement('p', 'modal-text cap',  `${street} ${city} ${state} ${postcode}`);
    const modalBirthDay = makeElement('p', 'modal-text', birthday.slice(0, 10));
    const modalButtonContainer = makeElement('div', 'modal-btn-container', null);
    const modalPrevButton = makeElement('button', 'modal-prev btn', 'Previous');
    const modalNextButton = makeElement('button', 'modal-next btn', 'Next');
    /* set attributes */
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('id','modal-close-btn');
    modalPrevButton.setAttribute('type', 'button');
    modalPrevButton.setAttribute('id', 'modal-prev');
    modalNextButton.setAttribute('type', 'button');
    modalNextButton.setAttribute('id', 'modal-next');
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
    modalButtonContainer.appendChild(modalPrevButton);
    modalButtonContainer.appendChild(modalNextButton);
    modal.appendChild(modalInfoContainer);
    modal.appendChild(modalButtonContainer);  
    modalContainer.appendChild(modal); 

    /* Attach an eventlistener to the close button, use event delegation to find the "modal-container" and hide the modal*/
    closeButton.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.style.display = 'none';
    });
    modalPrevButton.addEventListener('click', (e) => {
        console.log(e);
    });
    modalNextButton.addEventListener('click', (e) => {

    });



    /* append it all together to the body */
    body.appendChild(modalContainer);
}

const createSearchContainer = () => {
    const searchForm = makeElement('form', '', null);
    const searchInput = makeElement('input', 'search-input', null);
    const formSubmitBtn = makeElement('input', 'search-submit', null);


    searchForm.setAttribute('action', '#');
    searchForm.setAttribute('method', 'get');
    searchInput.setAttribute('placeholder', 'Search...');
    searchInput.setAttribute('type', 'search');
    searchInput.setAttribute('id', 'search-input');
    formSubmitBtn.innerText = '&#x1F50D';
    formSubmitBtn.setAttribute('type', 'submit');
    formSubmitBtn.setAttribute('id', 'search-submit');

    searchForm.appendChild(searchInput);
    searchForm.appendChild(formSubmitBtn);
    searchContainer.appendChild(searchForm);

    // Get search input from user
    // Loop through cards to find matching name
    // Hide all old cards
    // If match is found display the cards that match
    // Else display no match was found, hide all cards. 
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.querySelector('#search-input').value;
        const cards = Array.from(document.querySelectorAll('.card'));

        cards.forEach((card => {
            const oldcards = card;
            let employeeName = card.lastElementChild.firstElementChild.textContent;
            if(employeeName.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
            
        }))

        // const cardnames = Array.from(document.queryS4electorAll('h3.card-name'));
        // const names = cardnames.map(name => {
        //     const oldcards = name.parentNode.parentNode;
        //     const newcards = oldcards.filter(card => {
        //         if(card.includes(query)) {
        //             return card.style.display = 'block'; 
        //         } else {
        //             return card.style.display = 'none';
        //         }
        //     });
            //return console.log(typeof(name));
        //     return name.innerText.toLowerCase();
        // }).filter(emp => {
        //     if (emp.includes(query.toLowerCase())) {
        //         return emp;        
        //     }
        // });

        //console.log(names);
    });
}
/* When a card is clicked, show the modal that belongs to the card*/
gallery.addEventListener('click', (e) => {
    const cards = Array.from(document.querySelectorAll('.card'));

    const modals = document.querySelectorAll('.modal-container');
    for(let i = 0; i < cards.length; i+=1) {
        if(e.target.closest('.card') === cards[i]) {
            modals[i].style.display = 'block';
        }
    }
  
});

createSearchContainer();
fetchdata();

