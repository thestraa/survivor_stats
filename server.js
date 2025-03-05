const express = require("express");
const cors = require("cors"); 
const db = require("./db");

const app = express();

app.use(cors()); //Omogućava frontend-u da komunicira sa backend-om
app.use(express.json());

app.get("/api/takmicari", (req, res) => {
  db.query("SELECT * FROM takmicari", (err, results) => {
    if (err) {
      console.error("Greška pri dohvatanju takmičara:", err);
      return res.status(500).json({ error: "Greška na serveru" });
    }
      // Podeli takmičare u dve grupe
      const zeleniTim = results.filter(t => t.tim === "zeleni");
      const zutiTim = results.filter(t => t.tim === "zuti");

    res.json({ zeleniTim, zutiTim });
  });
});

// Dodavanje podataka
app.post("/api/takmicari", (req, res) => {
  const { ime, prezime, pobede, ukupne_igre, slika, tim } = req.body;

  // Provera da li je tim dodeljen
  if (!tim || (tim !== "zeleniTim" && tim !== "zutiTim")) {
      return res.status(400).json({ error: "Tim mora biti dodeljen." });
  }

  const noviTakmicar = {
      ime,
      prezime,
      pobede,
      ukupne_igre,
      slika,
      tim
  };

  // Dodajte takmičara u bazu (prilagodite kako čuvate podatke)
  db.collection("takmicari").insertOne(noviTakmicar)
      .then(result => {
          res.status(201).json(result.ops[0]);
      })
      .catch(error => {
          res.status(500).json({ error: "Greška pri dodavanju takmičara." });
      });
});

// Ažuriranje podataka
app.put("/api/takmicari/:id", (req, res) => {
  const { id } = req.params;
  const { pobede, ukupne_igre, slika } = req.body;

  const query = "UPDATE takmicari SET pobede = ?, ukupne_igre = ?, slika = ? WHERE id = ?";
  db.query(query, [pobede, ukupne_igre, slika, id], (err, result) => {
    if (err) {
      console.error("Greška pri ažuriranju takmičara:", err);
      return res.status(500).json({ error: "Greška na serveru" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Takmičar nije pronađen" });
    }
    res.json({ message: "Podaci ažurirani uspešno" });
  });
});

// Brisanje podataka
app.delete("/api/takmicari/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM takmicari WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Greška pri brisanju takmičara:", err);
      return res.status(500).json({ error: "Greška na serveru" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Takmičar nije pronađen" });
    }
    res.json({ message: "Takmičar uspešno obrisan" });
  });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server pokrenut na portu 3000");
});
