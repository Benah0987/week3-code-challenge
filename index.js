
//the code defines the async function fetchAndRenderFilms()
//it fetches data from an external API
async function fetchAndRenderFilms() {
  try {
    const response = await fetch('https://api.npoint.io/1e77e2b3a524e94aea30/films/');
    //fetch function used to send to send a GET request to the endpoint
    const data = await response.json();
    //await response is used for waiting for the response to come back
    renderFilms(data);
    //i passed the data respnse to the renderFilms func()
  } catch (error) {
    console.error(error);
  }
}

function renderFilms(data) {
  //a container div and a list element are created for each movie
  const div = document.getElementById('card');
  const ul = document.getElementById('films');

  data.forEach(movie => {
    //the function will traverse through each element(movie)
    //i created a list element for each film
    const li = document.createElement('li');
    li.classList.add('pointer', 'bold-italic-text');
    li.innerHTML = movie.title;//the list item will display the title fetched from json
    
    //created a div element with a class filmcard
    const filmCard = document.createElement('div');
    filmCard.classList.add('film-card');

    //the elements that are going to be in the filmcard
    filmCard.innerHTML = `
      <img src="${movie.poster}" height=500px width=300px/>
      <h2 class="bold-text">${movie.title}</h2>
      <p class="bold-text">${movie.description}</p>
      <p><span class="highlight bold-text">Runtime: ${movie.runtime}</span></p>
      <p><span class="highlight bold-text">Showtime: ${movie.showtime}</span></p>
    `;


     //created another p element
    const tickets = document.createElement('p');
    //gave it a classlist 'tickets'
    tickets.classList.add('bold-italic-text');
    //what the p element will display
    tickets.innerHTML = `Available tickets: ${movie.capacity - movie.tickets_sold}`;
    //available ticket calculations
    filmCard.appendChild(tickets);
    //using appendchild added the element to the filmcard

         //created another button element
    const btn = document.createElement('button');
    
    btn.textContent = 'Buy ticket';//button text
    btn.addEventListener('click', () => {
      if (tickets.innerText.split(': ')[1] === '0') {
        alert('Ticket Sold Out');
      } else {
        tickets.innerText = `Available tickets: ${parseInt(tickets.innerText.split(': ')[1]) - 1}`;
      }
    });
    filmCard.appendChild(btn);

    li.addEventListener('click', () => {
      div.innerText = '';
      if (!filmCard.classList.contains('active')) {
        filmCard.classList.add('active');
        div.appendChild(filmCard);
      }
    });

    ul.appendChild(li);
  });
}

fetchAndRenderFilms();
