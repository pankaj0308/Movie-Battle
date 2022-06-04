const autocompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
    <img src='${imgSrc}'/>
    ${movie.Title} (${movie.Year})`;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "834932a8",
        s: searchTerm,
      },
    });

    if (response.data.Error) {
      return [];
    }

    return response.data.Search;
  },
};
const movieObj = { movie1: {}, movie2: {} };
const feedMovieDetails = (obj, i) => {
  if (i === 1) {
    movieObj.movie1 = obj;
  }
  if (i === 2) {
    movieObj.movie2 = obj;
  }
};

//calling the reusabe autocomplete func 1
autocomplete({
  ...autocompleteConfig,
  label: "movie",
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".notification").classList.add("is-hidden");
    const summary = document.querySelector("#left-summary");
    onMovieSelect(movie, summary, 1);
  },
});

//calling the reusable autocomplete func 2
autocomplete({
  ...autocompleteConfig,
  label: "movie",
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    const summary = document.querySelector("#right-summary");
    onMovieSelect(movie, summary, 2);
    document.querySelector(".fight").classList.remove("is-hidden");
  },
});

//fetching follow up by ID
const onMovieSelect = async (movie, summary, i) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "834932a8",
      i: movie.imdbID,
    },
  });
  summary.innerHTML = movieTemplate(response.data);
  const movieDetail = { ...response.data };
  feedMovieDetails(movieDetail, i);
};

const movieTemplate = (movieDetail) => {
  return `
  <article class='media'>
    <figure class='media-left'>
      <p class='image'>
        <img src='${movieDetail.Poster}'/>
      </p>
    </figure>
    <div class='media-content'>
      <div class='content'>
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.Plot}</p>
      </div>  
    </div>
  </article>
  <div class="playground">
    <article class='awards notification is-link'>
      <p class='title'>${movieDetail.Awards}</p>
      <p class='subtitle'>Awards</p>
    </article>
    <article class='box-office notification is-link'>
      <p class='title'>${movieDetail.BoxOffice}</p>
      <p class='subtitle'>Box Office</p>
    </article>
    <article class='metascore notification is-link'>
      <p class='title'>${movieDetail.Metascore}</p>
      <p class='subtitle'>Metascore</p>
    </article>
    <article class='imdb notification is-link'>
      <p class='title'>${movieDetail.imdbRating}</p>
      <p class='subtitle'>IMDB Rating</p>
    </article>
    <article class='votes notification is-link'>
      <p class='title'>${movieDetail.imdbVotes}</p>
      <p class='subtitle'>IMDB Votes</p>
    </article>
  </div>
  `;
};

//Pressing the Button
const button = document.querySelector(".button");
button.addEventListener("click", () => declareWinner(movieObj));

const declareWinner = (obj) => {
  const { elementLeft, left, elementRight, right } = runCompare(obj);

  if (left > right) {
    elementLeft.classList.add("winner");
    elementRight.classList.add("loser");
  } else if (left < right) {
    elementLeft.classList.add("loser");
    elementRight.classList.add("winner");
  } else {
    return;
  }
};
