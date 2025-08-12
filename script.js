const cardArr = [
  "heart",
  "star",
  "moon",
  "diamond",
  "heart",
  "star",
  "moon",
  "diamond",
];

function shuffleCards(arr) {
  for (let i = arr.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

shuffleCards(cardArr);

function renderCards(arr) {
  for (let i = 0; i < arr.length; i++) {
    let cardContainer = document.getElementById("card-container");
    let card = document.createElement("div");
    cardContainer.appendChild(card);
    card.classList.add("card");
    card.classList.add("face-down");
    card.setAttribute("data-card-type", arr[i]);
  }
}

renderCards(cardArr);

document.querySelectorAll(".card").forEach((element) => {
  element.onclick = flipCard;
});

let cardClickDisabled = false;

function flipCard(event) {
  if (cardClickDisabled) return;

  event.target.classList.remove("face-down");
  event.target.classList.add("selected");
  const cards = document.querySelectorAll(".card");
  const cardType = event.target.dataset.cardType;
  const selectedCards = document.querySelectorAll(".selected");
  const matchingSelectedCards = document.querySelectorAll(
    `.selected[data-card-type="${cardType}"]`
  );

  if (selectedCards.length === 2 && matchingSelectedCards.length < 2) {
    cardClickDisabled = true;
    setTimeout(() => {
      cards.forEach((element) => {
        element.classList.add("face-down");
        element.classList.remove("selected");
      });
      cardClickDisabled = false;
    }, 5000);
  }

  if (matchingSelectedCards.length % 2 === 0) {
    cardClickDisabled = true;
    setTimeout(() => {
      matchingSelectedCards.forEach((element) => {
        element.classList.add("hidden");
        element.classList.remove("selected");
      });
      cardClickDisabled = false;
    }, 5000);
  }
}
