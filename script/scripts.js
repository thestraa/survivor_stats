//Navbar
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}
window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".navbar");
  let navlinks = document.querySelector(".navlinks");
  if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      navlinks.classList.add("scrolledx");
  } else {
      navbar.classList.remove("scrolled");
      navlinks.classList.remove("scrolledx");
  }
});

//Countdown
function updateCountdown() {
  const targetDate = new Date("2025-03-03T20:00:00").getTime();
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = days;
      document.getElementById("hours").textContent = hours;
      document.getElementById("minutes").textContent = minutes;
      document.getElementById("seconds").textContent = seconds;
  } else {
      document.querySelector(".countdown").innerHTML = "<h3>Počeo je Survivor!</h3>";
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();



// Voting system

document.addEventListener("DOMContentLoaded", function () {
  const competitors = ["Takmičar 1", "Takmičar 2", "Takmičar 3", "Takmičar 4", "Takmičar 5", "Takmičar 6", "Takmičar 7", "Takmičar 8", "Takmičar 9", "Takmičar 10", "Takmičar 11", "Takmičar 12", "Takmičar 13", "Takmičar 14", "Takmičar 15", "Takmičar 16"];
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
