let currentIndex = 0;
const images = ["photo/inaugurazione.jpeg", "photo/giuseppe-cacciola.jpeg", "photo/masterclass-wnzel-fuchs.jpeg"];

function showImage(index) {
    const imageContainer = document.getElementById("scorrimento");
    const imageElement = document.createElement("img");
    imageElement.src = images[index];
    imageElement.alt = "Image " + (index + 1);
    imageContainer.innerHTML = '';
    imageContainer.appendChild(imageElement);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

showImage(currentIndex);
const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");

previousButton.addEventListener("click", previousImage);
nextButton.addEventListener("click", nextImage);

document.addEventListener("DOMContentLoaded", function() {
    const linksMostraNascondi = document.querySelectorAll(".mostra-nascondi");

    linksMostraNascondi.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            this.style.display = "none";
            const titoloNascosto = document.createElement('h4');
            const testoNascosto = document.createElement('div');
            titoloNascosto.textContent = "15 Febbraio 2024";
            testoNascosto.textContent = "Decreto di accreditamento dei percorsi di formazione iniziale dei docenti";
            titoloNascosto.classList.add('titolo-nascosto');
            testoNascosto.classList.add('testo-nascosto');
            this.parentNode.appendChild(titoloNascosto); 
            this.parentNode.appendChild(testoNascosto);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const readButton = document.querySelector('.read');
    
    readButton.addEventListener('click', function() {
      const isRead = readButton.getAttribute('data-read');
      
      if (isRead === 'false') {
        readButton.textContent = 'Letto';
        readButton.setAttribute('data-read', 'true');
      } else {
        readButton.textContent = 'Leggi';
        readButton.setAttribute('data-read', 'false');
      }
    });
});

const form = document.querySelector('form');
form.addEventListener('submit', search);

function search(event){
  // Impedisci il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const author_input = document.querySelector('#author');
  const author_value = encodeURIComponent(author_input.value);
  console.log('Eseguo ricerca: ' + author_value);
  // Prepara la richiesta
  rest_url = 'http://openlibrary.org/search.json?author=' + author_value;
  console.log('URL: ' + rest_url);
  // Esegui fetch
  fetch(rest_url).then(onResponse).then(onJsonLibrary);
}

function onJsonLibrary(json) {
  console.log('JSON ricevuto');
  // Svuotiamo la libreria
  const library = document.querySelector('#library-view');
  library.innerHTML = '';
  // Leggi il numero di risultati
  let num_results = json.num_found;
  // Mostriamone al massimo 10
  if(num_results > 10)
    num_results = 10;
  // Processa ciascun risultato
  for(let i=0; i<num_results; i++){
    // Leggi il documento
    const doc = json.docs[i]
    // Leggiamo info
    const title = doc.title;
    // Controlliamo ISBN
    if(!doc.isbn){
      console.log('ISBN mancante, salto');
      continue;
    }
    const isbn = doc.isbn[0];
    // Costruiamo l'URL della copertina
    const cover_url = 'http://covers.openlibrary.org/b/isbn/' + isbn + '-M.jpg';
    //Togliamo il div dell'albo pretorio
    const togli_albo = document.getElementById('bianco');
    togli_albo.classList.remove('hidden');
    // Creiamo il div che conterrÃ  immagine e didascalia
    const book = document.createElement('div');
    book.classList.add('book');
    // Creiamo l'immagine
    const img = document.createElement('img');
    img.src = cover_url;
    // Creiamo la didascalia
    const caption = document.createElement('span');
    caption.textContent = title;
    // Aggiungiamo immagine e didascalia al div
    book.appendChild(img);
    book.appendChild(caption);
    // Aggiungiamo il div alla libreria
    library.appendChild(book);
  }
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function GoogleMap() {
  var pos = {lat: 37.5091, lng: 15.0804};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 14
  })
  var marker = new google.maps.Marker({
      position: conservatorioBellini,
      map: map,
      title: 'Conservatorio Bellini di Catania'
  });
}
