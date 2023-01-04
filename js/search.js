var url_string = window.location;
var url = new URL(url_string);
var query = url.searchParams.get("query");
var tvid = url.searchParams.get("id");

let showingResultsForDisplayed = false;

fetch('https://gogoanime.consumet.org/search?keyw='+ query)
.then(response => response.json())
.then(data => {
    var cardDiv = document.getElementById("card");

    if (!showingResultsForDisplayed) {
        const showingResultsFor = document.createElement("h2");
        showingResultsFor.innerText = "Showing Results For " + query;

        cardDiv.insertBefore(showingResultsFor, cardDiv.firstChild);

        const dataCount = document.createElement("h3");
        dataCount.innerText = `${data.length} search results`;

        cardDiv.insertBefore(dataCount, showingResultsFor.nextSibling);

        showingResultsForDisplayed = true;
    }

for (var i = 0; i < data.length; i++) {
  var anime = data[i];
  var animeDiv = document.createElement("div");
  animeDiv.style.display = "inline-block";
  animeDiv.style.marginBottom = "20px";
  animeDiv.style.width = "300px";

  animeDiv.innerHTML = `<img height="350" width="250" src="${anime.animeImg}" alt="${anime.animeTitle}"> <a href="https://kiriyako.github.io/amai/anime?query=${anime.animeId}"  </a> <h2>${anime.animeTitle}</h2>`;
  cardDiv.appendChild(animeDiv);
}
});
