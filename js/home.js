fetch('https://api.consumet.org/anime/gogoanime/top-airing')
    .then(response => response.json())
    .then(data => {
        var cardDiv = document.getElementById("card");    
        data.results.slice(0, 20).forEach(anime => {
            var animeDiv = document.createElement("div");
            animeDiv.style.display = "inline-block";
            animeDiv.style.marginBottom = "20px";
            animeDiv.style.width = "300px";
            var title = anime.title;
            var shortTitle = title.substring(0,50);
            if(title.length > 50)
                shortTitle += "...";
            animeDiv.innerHTML = `<img height="350" width="250" src="${anime.image}" alt="${anime.title}"> <a href="https://kiriyako.github.io/amai/anime?id=${anime.id}"> <h2>${shortTitle}</h2> </a> `;
            cardDiv.appendChild(animeDiv);
        });
    });
