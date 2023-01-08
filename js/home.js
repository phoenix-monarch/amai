fetch('https://gogoanime.consumet.org/recent-release')
  .then(response => response.json())
  .then(data => {
    let html = "";
    const recent = document.getElementById("recentrelease");
    data.slice(0, 1).forEach(anime => {
      html += `
           <img height="350" width="250" src="${anime.animeImg}" style="display: flex;"> <p></p>
         <a href="https://kiriyako.github.io/amai/anime?id=${anime.animeId}"> <div id="rr"> ${anime.animeTitle}  <br> 
           Episode ${anime.episodeNum} </a> </div>
      `;
    });

    recent.innerHTML = `<h1>Latest Release</h1>` + html;
  });

  fetch('https://gogoanime.consumet.org/popular')
  .then(response => response.json())
  .then(data => {
    let html = "";
    const recent = document.getElementById("popular");
    data.slice(0, 1).forEach(anime => {
      html += `
           <img height="350" width="250" src="${anime.animeImg}" style="display: flex;"> <p></p>
         <a href="https://kiriyako.github.io/amai/anime?id=${anime.animeId}"> <div id="rr"> ${anime.animeTitle}  <br> 
           </div>
      `;
    });

    recent.innerHTML = `<h1>Popular Right Now</h1>` + html;
  });

  fetch('https://gogoanime.consumet.org/top-airing')
  .then(response => response.json())
  .then(data => {
    let html = "";
    const recent = document.getElementById("slideshow");
    data.slice(0, 1).forEach(anime => {
      html += `<img height="350" width="250" src="${anime.animeImg}" style="display: flex;"> <p></p>
      <a href="https://kiriyako.github.io/amai/anime?id=${anime.animeId}"> <div id="rr"> ${anime.animeTitle}  <br> 
        </div>
      `;
    });

    recent.innerHTML = `<h1>Top Airing</h1>` +    html;
  });

  //Code for searching the last query the user made
  const queryInput = document.getElementById("query");
if (localStorage.getItem("query")) {
  queryInput.value = localStorage.getItem("query");
}
queryInput.addEventListener("input", function() {
  localStorage.setItem("query", this.value);
});

//Code which fetches API and displays autocomplete results
const autocompleteResults = document.getElementById("autocomplete-results");
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

const debouncedInput = debounce(function(event) {
  autocompleteResults.innerHTML = "";

  const query = document.querySelector("#query").value;

  fetch(`https://api.consumet.org/anime/enime/${query}`)
    .then(response => response.json())
    .then(data => {
      data.results.slice(0,4).forEach(result => {
        const li = document.createElement("li");
        li.innerText = result.title;

        li.addEventListener("click", function(event) {
          window.location.href = `https://kiriyako.github.io/amai/anime?id=${result.id}`;
        });

        autocompleteResults.appendChild(li);
      });
    });
}, 500);

queryInput.addEventListener("input", debouncedInput);

document.addEventListener("click", function(event) {
  if (event.target !== autocompleteResults) {
    autocompleteResults.innerHTML = "";
  }
});
