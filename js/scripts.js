// Stores people from fetch request
let people = []

// Returns person from people array
function getPerson(index) {
    return people[index];
}

// Insert card in gallery div
function insertCard (card){
    const galleryDiv = document.querySelector('.gallery');
   galleryDiv.insertAdjacentHTML('beforeend', card) 
}

// Formats Cell Number (XXX) XXX-XXXX
function formatCellNumber (cell){
    let trimmedCell = cell
    trimmedCell = trimmedCell.replaceAll('(', '');
    trimmedCell = trimmedCell.replaceAll(')', '');
    trimmedCell = trimmedCell.replaceAll('-', '');
    trimmedCell = trimmedCell.replaceAll(' ', '');
    let areaCode = `(${trimmedCell.slice(0,3)})`
    let telPrefix = `${trimmedCell.slice(3,6)}`
    let lineNumber = `${trimmedCell.slice(6,10)}`
    return `${areaCode} ${telPrefix}-${lineNumber}`
}

function formatBirthDate (birthDate) {
    let formatedBirthDate = birthDate.slice(0,10)
    formatedBirthDate = formatedBirthDate.replaceAll('-','/')
    return formatedBirthDate
}
// Create html for person card
function createCardHtml (person) {
    return `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src='${person.picture.large}' alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
    </div>`   
}


// Creates html for person modal
function createModalHtml (person) {
    console.log(person)
    return `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${person.name.first}</h3>
                <p class="modal-text">${person.email}</p>
                <p class="modal-text cap">${person.location.city}</p>
                <hr>
                <p class="modal-text">${formatCellNumber(person.cell)}</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.state}, ${person.location.postcode
                }</p>
                <p class="modal-text">Birthday: ${formatBirthDate(person.dob.date)}</p>
            </div>
        </div>
    </div>`
}

// Inserts modal into the body
// Add click event to close modal
function insertModal (modal) {
    const body = document.querySelector('body');
   
    body.insertAdjacentHTML('beforeend', modal);

    const modalCloseButton = document.querySelector('.modal-close-btn');
    const modalContainer = document.querySelector('.modal-container')

    modalCloseButton.addEventListener('click', (e) => {
        modalContainer.remove();
    });

}

// Creates modal and append to the body
function showModal(person){
    const modal = createModalHtml(person)
    insertModal(modal) 
}

// Add click event for each card
// click event shows modal for that person
function addModalForEachPerson() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const person = getPerson(index);
            showModal(person)
        })
    })
}

// Loop over all the people and create a card for each one
function createCards(){
    people.forEach((person) => {
        const html = createCardHtml(person);
        insertCard(html);
    })
}

// Make get request to randomomuser to get 12 people
// Save the results in an array of people
// Create cards and dispay on the page
// Add modals for each person
fetch('https://randomuser.me/api/?results=12&inc=name,picture,email,location,cell,dob')
   .then((response) => {
        return response.json()
   .then((data) => {
       people = data.results;
   })
   .then(() => {
        createCards()
   })
   .then(() => {
        addModalForEachPerson()
    })
});

