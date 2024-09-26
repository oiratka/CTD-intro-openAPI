const buttons = document.querySelector("#buttons");
const results = document.querySelector("#results");
const pages = document.querySelector("#pagination");

// async function to fetch data from the SWAPI API //rus notes for myself: функция для запроса данных с сервера SWAPI
async function asyncFetch(apiValue, url = 0) {
  const baseUrl = url || `https://www.swapi.tech/api/${apiValue}/`; // Construct URL inside the function
  try {
    const res = await fetch(baseUrl);
    if (!res.ok) {
      throw new Error(`Error! Status: ${res.status}`);
    }
    const data = await res.json();
    showResults(data, apiValue);
    getOtherPages(data, apiValue);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Event listener for results container to toggle details on card click
results.addEventListener('click', e => {
  if (e.target.tagName === 'H4') {
    const id = e.target.getAttribute('data-id');
    const card = e.target.closest('.card');
    if (id && card) {
      toggleDetails(id, card); // Pass the clicked card element to toggle details
    } else {
      console.error("Failed to get ID or card element");
    }
  }
});

async function toggleDetails(id, card) {
  const apiValue = window.currentValue; // Use the stored value
  const detailsContainer = card.querySelector('.more-data');
  
  if (detailsContainer) {
    // Toggle visibility based on current state
    if (detailsContainer.style.display === 'none' || detailsContainer.style.display === '') {
      detailsContainer.style.display = 'block'; // Show the details
    } else {
      detailsContainer.style.display = 'none'; // Hide the details
    }
  } else {
    // Details are not visible, fetch and show them
    await showMoreData(id, card, apiValue);
  }
}

async function showMoreData(id, card, value) {
  // Define the API endpoint based on the value type
  let apiUrl = '';
  if (value === 'people') {
    apiUrl = `https://www.swapi.tech/api/people/${id}`;
  } else if (value === 'species') {
    apiUrl = `https://www.swapi.tech/api/species/${id}`;
  } else if (value === 'planets') {
    apiUrl = `https://www.swapi.tech/api/planets/${id}`;
  } else if (value === 'films') {
    apiUrl = `https://www.swapi.tech/api/films/${id}`;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayMoreData(data, card, value); // Pass the value parameter
  } catch (error) {
    console.error('Error fetching more data:', error);
    card.innerHTML += '<p>Failed to fetch more data.</p>'; // Show error message inside the card
  }
}


function displayMoreData(data, card, apiValue) {
  const person = data.result ? data.result.properties : null;
  if (!person) {
    console.error("Data structure is incorrect", data);
    card.innerHTML += '<p>Failed to load details.</p>';
    return;
  }

  // Create content to append to the clicked card
  let details = '<div class="more-data" style="display: none;">';

  // Append different content based on the value
  if (apiValue === 'people') {
    details += `
      <p>Height: ${person.height || 'N/A'}</p>
      <p>Mass: ${person.mass || 'N/A'}</p>
      <p>Eye color: ${person.eye_color || 'N/A'}</p>
      <p>Hair color: ${person.hair_color || 'N/A'}</p>
      <p>Skin color: ${person.skin_color || 'N/A'}</p>
      <p>Birth Year: ${person.birth_year || 'N/A'}</p>
      <p>Gender: ${person.gender || 'N/A'}</p>
    `;
  } else if (apiValue === 'species') {
    details += `
    <p>Hair color: ${person.hair_colors || 'N/A'}</p>
     <p>Skin color: ${person.skin_colors || 'N/A'}</p>
    <p>Average height: ${person.average_height || 'N/A'}</p>
      <p>Language: ${person.language || 'N/A'}</p>
   
    `;
  } else if (apiValue === 'films'){
    details += `
      <p>Director: ${person.director || 'N/A'}</p>
      <p>Title: ${person.title || 'N/A'}</p>
      <p>Episode ID: ${person.episode_id || 'N/A'}</p>
    `;
  }else if (apiValue === 'planets'){
    details += `
      <p>Climate: ${person.climate || 'N/A'}</p>
      <p>Population: ${person.population || 'N/A'}</p>
      <p>Terrain: ${person.terrain || 'N/A'}</p>
    `;
  } else{
    details += '<p>No additional details available.</p>';
  }


  // Close the more-data div
  details += '</div>';

  // Append the details inside the clicked card
  card.innerHTML += details;
  card.querySelector('.more-data').style.display = 'block'; // Show the newly added details
}

// Define showResults to display the fetched data
function showResults(data, apiValue) {
  let output = "";
  if (["people", "planets", "species"].includes(apiValue)) {
    data.results.forEach((item) => {
      output += `
        <div class="card">
          <h4 data-id="${item.uid}">${item.name}</h4>
        </div>`;
    });
  } else if (apiValue === "films") {
    data.result.forEach((item) => {
      const film = item.properties;
      output += `
        <div class="card">
          <h4 data-id="${item.uid}">${film.title}</h4>
          <p>Release date: ${film.release_date}</p>
        </div>`;
    });
  }
  results.innerHTML = output; // Display the received HTML into the results container
}

function getOtherPages(data, apiValue) {
  pages.innerHTML = "";

  if (data.previous) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.classList.add("pagination-btn");
    prevButton.addEventListener("click", () => asyncFetch(apiValue, data.previous));
    pagination.appendChild(prevButton);
  }

  if (data.next) {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.classList.add("pagination-btn");
    nextButton.addEventListener("click", () => asyncFetch(apiValue, data.next));
    pagination.appendChild(nextButton);
  }
}

// Event listener for the buttons to trigger asyncFetch on click
buttons.addEventListener("click", (e) => {
  const apiValue = e.target.textContent.toLowerCase(); 
  asyncFetch(apiValue); 

  // Store the value for later use (in a global or closure variable)
  window.currentValue = apiValue; 
});

const musicButton=document.querySelector('#music');
musicButton.addEventListener('click', function (){

    if (song.paused){
        song.play();
    }
    else {
        song.pause();
    }
})
console.log(results);
