const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const total = document.querySelector("#total");

const movieSelect = document.getElementById("movie");

const image = document.querySelector("#img-banner");

populateUI();
// value to be changed to number
let ticketPrice = +movieSelect.value;

// save the selcted movie in local storage

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// change images
function updateImage() {}
// update total & count

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(function (seat) {
    // console.log([...seats])
    return [...seats].indexOf(seat);
  });

  // local storage & stringify the data
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const countLenght = selectedSeats.length;

  count.innerText = countLenght;
  total.innerHTML = ticketPrice * countLenght;
}

// get from local storage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  image.src = `image${ticketPrice}.jpg`;
  //get the individual movies
  setMovieData(e.target.selectedIndex, e.target.value);

  updateSelectedCount();
  updateImage();
});

// selecting movies

container.addEventListener("click", (e) => {
  // console.log(e.currentTarget)
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  updateSelectedCount();
});

updateSelectedCount();
