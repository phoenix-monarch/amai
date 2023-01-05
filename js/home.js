fetch('https://gogoanime.consumet.org/recent-release')
  .then(response => response.json())
  .then(data => {
    let html = "";
    const recent = document.getElementById("recentrelease");
    data.slice(0, 1).forEach(anime => {
      html += `
           <img height="350" width="250" src="${anime.animeImg}" style="display: flex;"> <p></p>
         <a href="https://kiriyako.github.io/amai/watch?query=${anime.animeId}&ep=${anime.episodeNum}"> <div id="rr"> ${anime.animeTitle}  <br> 
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
         <a href="https://kiriyako.github.io/amai/anime?query=${anime.animeId}"> <div id="rr"> ${anime.animeTitle}  <br> 
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
      <a href="https://kiriyako.github.io/amai/anime?query=${anime.animeId}"> <div id="rr"> ${anime.animeTitle}  <br> 
        </div>
      `;
    });

    recent.innerHTML = `<h1>Top Airing</h1>` +    html;
  });
