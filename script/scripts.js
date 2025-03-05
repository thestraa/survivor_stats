//Navbar
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}
window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".navbar");
  let navlinks = document.querySelector(".navlinks");
  if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
  } else {
      navbar.classList.remove("scrolled");
  }
});

// //Countdown
// function updateCountdown() {
//   const targetDate = new Date("2025-03-03T20:00:00").getTime();
//   const now = new Date().getTime();
//   const timeLeft = targetDate - now;

//   if (timeLeft > 0) {
//       const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//       document.getElementById("days").textContent = days;
//       document.getElementById("hours").textContent = hours;
//       document.getElementById("minutes").textContent = minutes;
//       document.getElementById("seconds").textContent = seconds;
//   } else {
//       document.querySelector(".countdown").innerHTML = "<h3>Počeo je Survivor!</h3>";
//   }
// }

// setInterval(updateCountdown, 1000);
// updateCountdown();



// Voting system

// document.addEventListener("DOMContentLoaded", function () {
//   const competitors = ["Takmičar 1", "Takmičar 2", "Takmičar 3", "Takmičar 4", "Takmičar 5", "Takmičar 6", "Takmičar 7", "Takmičar 8", "Takmičar 9", "Takmičar 10", "Takmičar 11", "Takmičar 12", "Takmičar 13", "Takmičar 14", "Takmičar 15", "Takmičar 16"];
//   competitors.forEach((name) => {
//     let storedVotes = localStorage.getItem(name);
//     if (storedVotes) {
//       document.getElementById(`votes-${name}`).innerText = storedVotes;
//     }
//   });
// });

// function vote(name) {
//   let lastVoteTime = localStorage.getItem("lastVoteGlobal");
//   let currentTime = new Date().getTime();

//   if (lastVoteTime && currentTime - lastVoteTime < 86400000) {
//     alert("Već ste glasali! Možete ponovo glasati za 24 sata.");
//     return;
//   }

//   let voteCountElement = document.getElementById(`votes-${name}`);
//   let currentVotes = parseInt(voteCountElement.innerText);
//   let newVotes = currentVotes + 1;
//   voteCountElement.innerText = newVotes;
//   localStorage.setItem(name, newVotes);
//   localStorage.setItem("lastVoteGlobal", currentTime);
// }

//Sorting table
function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("statsTable");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (!isNaN(parseInt(x.innerHTML)) && !isNaN(parseInt(y.innerHTML))) {
          if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (!isNaN(parseInt(x.innerHTML)) && !isNaN(parseInt(y.innerHTML))) {
          if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:3000/api/takmicari")
      .then(response => response.json())
      .then(data => {
          const containerZeleni = document.getElementById("zeleniTim");
          const containerZuti = document.getElementById("zutiTim");

          // Očisti postojeći sadržaj
          containerZeleni.innerHTML = "";
          containerZuti.innerHTML = "";

          // Proveri da li postoje timovi
          if (Array.isArray(data.zeleniTim)) {
              data.zeleniTim.forEach(takmicar => {
                  const div = document.createElement("div");
                  div.classList.add("takmicar", "card");
                  div.innerHTML = `
                      <img src="${takmicar.slika}" alt="${takmicar.ime} ${takmicar.prezime}">
                      <h3>${takmicar.ime} ${takmicar.prezime}</h3>
                      <p>Uspešnost u igrama: ${(takmicar.pobede / takmicar.ukupne_igre * 100).toFixed(2)}%</p>
                      <p>Pobede: ${takmicar.pobede}</p>
                      <p>Gadjanja: ${takmicar.ukupne_igre}</p>
                  `;
                  containerZeleni.appendChild(div);
              });
          }

          if (Array.isArray(data.zutiTim)) {
              data.zutiTim.forEach(takmicar => {
                  const div = document.createElement("div");
                  div.classList.add("takmicar", "card");
                  div.innerHTML = `
                      <img src="${takmicar.slika}" alt="${takmicar.ime} ${takmicar.prezime}">
                      <h3>${takmicar.ime} ${takmicar.prezime}</h3>
                      <p>Pobede: ${takmicar.pobede}</p>
                      <p>Uspešnost u igrama: ${(takmicar.pobede / takmicar.ukupne_igre * 100).toFixed(2)}%</p>
                      <p>Gadjanja: ${takmicar.ukupne_igre}</p>
                  `;
                  containerZuti.appendChild(div);
              });
          }
      })
      .catch(error => console.error("Greška pri učitavanju podataka:", error));
});

// Funkcija za kreiranje grafikona
function prikaziGrafikon(pobedeZuti, pobedeZeleni) {
  const ctx = document.getElementById("pobedeGrafikon").getContext("2d");

  // Kreiraj okrugli grafikon
  new Chart(ctx, {
      type: "pie",  // Tip grafikona
      data: {
          labels: [`${pobedeZuti}`, `${pobedeZeleni}`],  // Oznake timova
          datasets: [{
              data: [pobedeZuti, pobedeZeleni],  // Podaci o pobedama
              backgroundColor: ["#f4b400", "#00360c"],  // Boje timova (žuti, zeleni)
              hoverBackgroundColor: ["#f5c029", "#025b15"],  // Boje na hover
          }]
      },
      options: {
          responsive: true,  // Da bude responzivno
          plugins: {
              legend: {
                  position: "top",  // Pozicija legende
                  labels: {
                    font: {
                        family: "'Montserrat', sans-serif",  // Promeni font
                        size: 16,  // Veličina fonta
                        weight: "bold",  // Debljina fonta
                    },
                    color: "#fff",  // Boja teksta legendi
                    boxWidth: 20,  // Širina kutije boje u legendi
                    boxHeight: 20,  // Visina kutije boje u legendi
                }
              }
          }
      }
  });
}

// Manuelno uneseni podaci
const pobedeZuti = 3;  // Broj pobeda žutih
const pobedeZeleni = 0;  // Broj pobeda zelenih

// Prikazivanje grafikona sa brojem pobeda
prikaziGrafikon(pobedeZuti, pobedeZeleni);

