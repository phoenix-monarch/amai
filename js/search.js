var url_string = window.location;
var url = new URL(url_string);
var query = url.searchParams.get("query");
var tvid = url.searchParams.get("id");

fetch('https://gogoanime.consumet.org/search?keyw='+ query)
.then(response => response.json())
.then(data => {
    var cardDiv = document.getElementById("card");

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

fetch('https://gogoanime.consumet.org/search?keyw='+ query)
.then(response => response.json())
.then(data => {
    var cardDiv = document.getElementById("card");

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

