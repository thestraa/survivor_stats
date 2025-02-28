//Navbar
window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) { // Kada skroluju više od 50px
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}
document.addEventListener("click", function (event) {
  const menu = document.querySelector(".menu");
  const hamburger = document.querySelector(".hamburger");

  // Ako klik nije na meniju ili hamburger ikonici, zatvori meni
  if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
    menu.classList.remove("active");
  }
});

// Zatvaranje menija kada se klikne na link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelector(".nav-links").classList.remove("active");
  });
});
// COUNTDOWN TIMER
function updateCountdown() {
  const eventDate = new Date("March 4, 2025 20:00:00").getTime();
  const now = new Date().getTime();
  const timeLeft = eventDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById(
    "countdown"
  ).innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (timeLeft < 0) {
    document.getElementById("countdown").innerHTML = "Survivor je počeo!";
  }
}

updateCountdown(); // Pokreni funkciju odmah
setInterval(updateCountdown, 1000); // Osvježavaj svake sekunde



// Voting system

document.addEventListener("DOMContentLoaded", function () {
  const competitors = ["Takmičar 1", "Takmičar 2"];
  competitors.forEach((name) => {
    let storedVotes = localStorage.getItem(name);
    if (storedVotes) {
      document.getElementById(`votes-${name}`).innerText = storedVotes;
    }
  });
});

function vote(name) {
  let lastVoteTime = localStorage.getItem("lastVoteGlobal");
  let currentTime = new Date().getTime();

  if (lastVoteTime && currentTime - lastVoteTime < 86400000) {
    alert("Već ste glasali! Možete ponovo glasati za 24 sata.");
    return;
  }

  let voteCountElement = document.getElementById(`votes-${name}`);
  let currentVotes = parseInt(voteCountElement.innerText);
  let newVotes = currentVotes + 1;
  voteCountElement.innerText = newVotes;
  localStorage.setItem(name, newVotes);
  localStorage.setItem("lastVoteGlobal", currentTime);
}

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
