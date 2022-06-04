const runCompare = ({ movie1, movie2 }) => {
  let left = 0;
  let right = 0;

  const elementLeft = document.querySelector("#left-summary");
  const elementRight = document.querySelector("#right-summary");
  elementLeft.classList.remove("winner");
  elementLeft.classList.remove("loser");
  elementRight.classList.remove("winner");
  elementRight.classList.remove("loser");

  // for Awards
  const award1 = movie1.Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);

    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);
  const award2 = movie2.Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);

    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  if (award1 > award2) {
    elementLeft.querySelector(".awards").classList.add("win");
    elementRight.querySelector(".awards").classList.add("lose");
    left++;
  } else if (award2 > award1) {
    elementLeft.querySelector(".awards").classList.add("lose");
    elementRight.querySelector(".awards").classList.add("win");
    right++;
  } else {
    elementLeft.querySelector(".awards").classList.add("draw");
    elementRight.querySelector(".awards").classList.add("draw");
  }
  //for box-office
  const box1 =
    movie1.BoxOffice !== "N/A"
      ? parseInt(movie1.BoxOffice.replace("$", "").replaceAll(",", ""))
      : 0;
  const box2 =
    movie2.BoxOffice !== "N/A"
      ? parseInt(movie2.BoxOffice.replace("$", "").replaceAll(",", ""))
      : 0;
  if (box1 > box2) {
    elementLeft.querySelector(".box-office").classList.add("win");
    elementRight.querySelector(".box-office").classList.add("lose");
    left++;
  } else if (box2 > box1) {
    elementLeft.querySelector(".box-office").classList.add("lose");
    elementRight.querySelector(".box-office").classList.add("win");
    right++;
  } else {
    elementLeft.querySelector(".box-office").classList.add("draw");
    elementRight.querySelector(".box-office").classList.add("draw");
  }
  // for metaScore
  const meta1 = movie1.Metascore !== "N/A" ? parseInt(movie1.Metascore) : 0;
  const meta2 = movie2.Metascore !== "N/A" ? parseInt(movie2.Metascore) : 0;
  if (meta1 > meta2) {
    elementLeft.querySelector(".metascore").classList.add("win");
    elementRight.querySelector(".metascore").classList.add("lose");
    left++;
  } else if (meta2 > meta1) {
    elementLeft.querySelector(".metascore").classList.add("lose");
    elementRight.querySelector(".metascore").classList.add("win");
    right++;
  } else {
    elementLeft.querySelector(".metascore").classList.add("draw");
    elementRight.querySelector(".metascore").classList.add("draw");
  }
  // for imdb rating
  const imdb1 = movie1.imdbRating !== "N/A" ? parseFloat(movie1.imdbRating) : 0;
  const imdb2 = movie2.imdbRating !== "N/A" ? parseFloat(movie2.imdbRating) : 0;
  if (imdb1 > imdb2) {
    elementLeft.querySelector(".imdb").classList.add("win");
    elementRight.querySelector(".imdb").classList.add("lose");
    left++;
  } else if (imdb2 > imdb1) {
    elementLeft.querySelector(".imdb").classList.add("lose");
    elementRight.querySelector(".imdb").classList.add("win");
    right++;
  } else {
    elementLeft.querySelector(".imdb").classList.add("draw");
    elementRight.querySelector(".imdb").classList.add("draw");
  }
  //for imdb votes
  const votes1 =
    movie1.imdbVotes !== "N/A"
      ? parseInt(movie1.imdbVotes.replaceAll(",", ""))
      : 0;
  const votes2 =
    movie2.imdbVotes !== "N/A"
      ? parseInt(movie2.imdbVotes.replaceAll(",", ""))
      : 0;
  if (votes1 > votes2) {
    elementLeft.querySelector(".votes").classList.add("win");
    elementRight.querySelector(".votes").classList.add("lose");
    left++;
  } else {
    elementLeft.querySelector(".votes").classList.add("lose");
    elementRight.querySelector(".votes").classList.add("win");
    right++;
  }

  return { elementLeft, left, elementRight, right };
};
