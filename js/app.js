// Question pour lancer le jeu.
const lancerJeu = confirm("Souhaitez-vous lancer une partie?");
if (!lancerJeu) {
  alert("Peut-être une prochaine fois!");
  // Renvoi vers la page d'accueil.
  window.location.href = "index.html";
}

console.log("la valeur de lancer jeu: ", lancerJeu);

// Je vais chercher l'élément jeu de mon HTML que je stocke dans une const jeu.
const jeu = document.getElementById("jeu");
// Zone de texte qui affichera le message de victoire par la suite.
const zoneTexte = document.getElementById("zoneTexte");
// Zone de texte qui affichera le message appuyer sur espace pour relancer.
const message = document.getElementById("message");

// Permet de transformer en tableau l'ensemble des elements "carte" dans "jeu".
const cartes = Array.from(jeu.querySelectorAll(".carte"));

// Mélange les cartes de façon aléatoire avant de les afficher.
cartes.sort(() => Math.random() - 0.5);
cartes.forEach((carte) => jeu.appendChild(carte));
// Si c'est la premère carte on la garde en mémoire.
let premiere = null;
// Empêche de cliquer sur d'autres cartes durant le délai.
let verrou = false;

cartes.forEach((carte) => {
  // Quand on clique sur cette carte , on execute la fonction.
  carte.addEventListener("click", () => {
    if (verrou || carte.classList.contains("retournee")) return;

    // On retourne la carte
    carte.classList.add("retournee");

    // Si aucune carte n'a encore été retournée on garde la carte dans "premiere".
    if (!premiere) {
      premiere = carte;
      console.log("Première carte sélectionnée :", premiere.dataset.image);

      // Sinon, c'est la deuxième carte, on bloque les clics avec "verrou".
    } else {
      const deuxieme = carte;
      verrou = true;
      console.log("Deuxième carte sélectionnée :", deuxieme.dataset.image);

      // On vérifie si les images sont identiques.
      if (premiere.dataset.image === deuxieme.dataset.image) {
        console.log("Paire trouvée :", premiere.dataset.image);
        // Paire trouvée
        premiere = null;
        verrou = false;

        /* On vérifie si toutes les cartes sont trouvées.
        .every parcourt chaque carte une par une,
        verifie si elle a la classe retournee, si oui la condition if est vrai. */
        if (cartes.every((c) => c.classList.contains("retournee"))) {
          console.log("Victoire détectée !");
          // J'ajoute du texte à ma div zoneTexte quand le joueur à gagné.
          zoneTexte.textContent =
            "Bravo ! Vous avez trouvé toutes les paires !";
          /* J'ajoute du texte à ma div message,
          j'invite le joueur à une nouvelle partie en cliquant sur espace. */
          message.textContent =
            "Appuyez sur la touche espace pour relancer une partie";

          zoneTexte.classList.add("show");
          message.classList.add("show");
        }
      } else {
        console.log("Pas de paire, les cartes vont se retourner dans 5s");
        // Après 5 secondes, on retourne les cartes si elles ne correspondent pas.
        setTimeout(() => {
          premiere.classList.remove("retournee");
          deuxieme.classList.remove("retournee");
          premiere = null;
          verrou = false;
        }, 5000);
      }
    }
  });
});
document.addEventListener("keydown", (event) => {
  // Écoute la touche espace pour relancer une partie.
  if (event.code === "Space") {
    rejouer();
  }
});

function rejouer() {
  console.log("Nouvelle partie démarrée");
  // Cela efface message.
  message.textContent = "";
  // Cela remet ma phrase initiale.
  zoneTexte.textContent = "Clique sur les cartes afin de trouver les paires!";

  message.classList.remove("show");
  zoneTexte.classList.remove("show");
  // On remet toutes les cartes face cachée.
  cartes.forEach((carte) => {
    const img = carte.querySelector("img");
    img.src = "asset/question.svg";
    carte.classList.remove("retournee");
  });

  // On réinitialise les variables.
  premiere = null;
  verrou = false;

  // On mélange à nouveau les cartes.
  const cartesMelangees = Array.from(cartes).sort(() => Math.random() - 0.5);
  cartesMelangees.forEach((c) => jeu.appendChild(c));
}
