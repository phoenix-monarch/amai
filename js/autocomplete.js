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

  fetch('https://api.consumet.org/anime/gogoanime/'+ query)
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
