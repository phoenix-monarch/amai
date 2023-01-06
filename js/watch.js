//Code for getting parameters from URL
var url_string = window.location;
var url = new URL(url_string);
var query = url.searchParams.get("query");
var ep = url.searchParams.get("ep");
var tvid = url.searchParams.get("id");

//Code which fetches API and displays info and other stuff
fetch('https://gogoanime.consumet.org/anime-details/'+ query)
.then(response => response.json())
.then(data =>  {
    const anime = data;
    const sideDataDiv = document.createElement('div');
    sideDataDiv.innerHTML = ` 
<img height="380" width="260" src = "${anime.animeImg}"> </img> <br>
<h2>${anime.animeTitle}</h2>
<h3>Status: ${anime.status}</h3>
<h3>Premiered: ${anime.releasedDate}</h3>
<h3>Type: ${anime.type}</h3>
    `;
    document.getElementById('info').appendChild(sideDataDiv);
    document     = "Watch " + anime.animeTitle + ' ' + 'Episode '+ ep + '- amai';

});

fetch(`https://gogoanime.consumet.org/anime-details/`+ query)
  .then(response => response.json())
  .then(data => {
const episodesDiv = document.getElementById("episodesw");

let html = " ";

data.episodesList.forEach(episode => {
  html += `<a href="https://kiriyako.github.io/amai/watch?query=${query}&ep=${episode.episodeNum}"> <text class="iepisode"> ${episode.episodeNum} </a> </text>`;

});

episodesDiv.innerHTML = `<h2>Episodes</h2>` + html;
});
   
fetch('https://gogoanime.consumet.org/vidcdn/watch/'+ query + '-' + 'episode' + '-' + ep)
.then(response => response.json())
.then(data => {
    
    const episodewatchDiv = document.getElementById('episodewatch');
    const refererDiv = document.createElement('div');
    refererDiv.innerHTML = `<h2> Currently watching Episode ${ep}. Please use an adblock extension because the external <br> video player puts a lot of ads. </h2>  <iframe scrolling="no" frameBorder="0" allowfullscreen = "true" height="580" width="1000" src="${data.Referer} title="Episode" </iframe> <p></p>`

    episodewatchDiv.appendChild(refererDiv);


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

  fetch(`https://gogoanime.consumet.org/search?keyw=${query}`)
    .then(response => response.json())
    .then(data => {
      data.slice(0 , 4).forEach(result => {
        const li = document.createElement("li");
        li.innerText = result.animeTitle;

        li.addEventListener("click", function(event) {
          window.location.href = `https://kiriyako.github.io/amai/anime?query=${result.animeId}`;
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
