var url_string = window.location;
var url = new URL(url_string);
var query = url.searchParams.get("query");
var ep = url.searchParams.get("ep");
var tvid = url.searchParams.get("id");

fetch('https://gogoanime.consumet.org/anime-details/'+ query)
.then(response => response.json())
.then(data =>  {
    const anime = data;
    const sideDataDiv = document.createElement('div');
    sideDataDiv.innerHTML = ` 
<img height="350" width="250" src = "${anime.animeImg}"> </img> <br>
<h2>${anime.animeTitle}</h2>
<h3>Status: ${anime.status}</h3>
<h3>Premiered: ${anime.releasedDate}</h3>
<h3>Type: ${anime.type}</h3>
    `;
    document.getElementById('info').appendChild(sideDataDiv);

    const banner = document.createElement('div');
    banner.innerHTML = ` <img height="1000" width= "100%" src = "${anime.animeImg}">` ;
    document.getElementById('banner').appendChild(banner);

});

fetch(`https://gogoanime.consumet.org/anime-details/`+ query)
  .then(response => response.json())
  .then(data => {
const episodesDiv = document.getElementById("episodesw");

let html = " <h2> Episodes </h2>";

data.episodesList.forEach(episode => {
  html += `<a href="https://kiriyako.github.io/amai/watch?query=${query}&ep=${episode.episodeNum}"> <text class="iepisode"> &nbsp &nbsp &nbsp ${episode.episodeNum} </a>&nbsp &nbsp &nbsp &nbsp</text>`;
});

episodesDiv.innerHTML = html;
});
   
fetch('https://gogoanime.consumet.org/vidcdn/watch/'+ query + '-' + 'episode' + '-' + ep)
.then(response => response.json())
.then(data => {
    
    const episodewatchDiv = document.getElementById('episodewatch');
    const refererDiv = document.createElement('div');
    refererDiv.innerHTML = `<iframe height="580" width="1000" src="${data.Referer} title="Episode" </iframe> <p></p>`

    episodewatchDiv.appendChild(refererDiv);

});