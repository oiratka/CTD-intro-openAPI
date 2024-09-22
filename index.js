
const buttons = document.querySelector("#buttons"); 
const results = document.querySelector("#results");
const dispslayResults = document.querySelector("#dataDisplay");

// Define asyncFetch to fetch data from the SWAPI API
async function asyncFetch(value) {
  const baseUrl = `https://www.swapi.tech/api/${value}/`; // Construct URL inside the function
  try {
    const res = await fetch(baseUrl);
    const data = await res.json();

    showResults(data, value); // Call showResults to display the data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Define showResults to display the fetched data 
function showResults(data, value) {
  let output = "";
console.log(data)
  if (["people", "planets", "species"].includes(value)) {
    data.results.forEach((item) => {
      const properties = item.properties;
      output += 
      `<div class="card">
          <h4>${item.name}</h4>
        </div>`;
    });
  }
  else if(value === 'films'){
    
    data.result.forEach((item) =>{
      const film = item.properties;
      output +=
      `<div class="card">
        <h4>${film.title}</h4>
        <p>Release date: ${film.release_date}</p>
      </div>`
    } )
  }
  results.innerHTML = output; // Display the received HTML into the results container
}
  


// Event listener for the buttons to trigger asyncFetch on click
buttons.addEventListener("click", (e) => {
  const value = e.target.textContent.toLowerCase(); // Get the button's text content as the query
  asyncFetch(value); // Call asyncFetch with the query (e.g., 'people')
});

console.log(results);
