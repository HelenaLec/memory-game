console.log("test de ma console");

//question pour lancer le jeu
const lancerJeu = confirm("Souhaitez-vous lancer une partie?");
if (!lancerJeu) {
  alert("Peut-être une prochaine fois!");
  throw new Error("Partie annulée par l'utilisateur.");
}

console.log("la valeur de lancer jeu: ", lancerJeu);

// je vais chercher l'élément jeu de mon HTML que je stocke dans une const jeu.
const jeu = document.getElementById("jeu");
// zone de texte qui affichera le message de félicitations et définis zoneTexte.
const zoneTexte = document.getElementById("bravo");
// zone de texte qui affichera le message appuyer sur espace pour relancer.
const message = document.getElementById("message");

//permet de transformer en tableau l'ensemble des elements "carte",
const cartes = Array.from(jeu.querySelectorAll(".carte"));
// contenu dans ma div "jeu"
console.log(jeu);

// utilisation de Math.random afin de mélanger les cartes
cartes.sort(() => Math.random() - 0.5);
cartes.forEach((carte) => jeu.appendChild(carte));

let premiere = null;
//empêche de cliquer sur d'autres cartes durant le délai de 5 secondes
let verrou = false;

cartes.forEach((carte) => {
  carte.addEventListener("click", () => {
    if (verrou || carte.classList.contains("retournee")) return;

    // pour retourner la carte
    carte.classList.add("retournee");

    if (!premiere) {
      premiere = carte;
    } else {
      const deuxieme = carte;
      //bloque les clics
      verrou = true;

      // On vérifie si les images sont identiques
      if (premiere.dataset.image === deuxieme.dataset.image) {
        // Paire trouvée
        premiere = null;
        verrou = false;

        /*On vérifie si toutes les cartes sont trouvées
        .every parcourt chaque carte une par une,
        verifie si elle a la classe retournee, si oui la condition if est vrai*/
        if (cartes.every((c) => c.classList.contains("retournee"))) {
          console.log(bravo);
          //J'ajoute du texte à ma div bravo quand le joueur à gagné
          zoneTexte.textContent =
            "Bravo ! Vous avez trouvé toutes les paires !";
          /*J'ajoute du texte à ma div message,
          j'invite le joueur à une nouvelle partie en cliquant sur espace*/
          message.textContent =
            "Appuyez sur la touche espace pour relancer une partie";

          zoneTexte.classList.add("show");
          message.classList.add("show");
        }
      } else {
        //Pas de paire trouvée on les retourne après 5s
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
  //reste à l'écoute du clic de la touche espace si oui appel de la fonction rejouer
  if (event.code === "Space") {
    rejouer();
  }
});

function rejouer() {
  //cela efface message
  message.textContent = "";
  // cela remet ma phrase initiale
  zoneTexte.textContent = "Clique sur les cartes afin de trouver les paires!";

  message.classList.remove("show");
  zoneTexte.classList.remove("show");
  // On remet toutes les cartes face cachée
  cartes.forEach((carte) => {
    const img = carte.querySelector("img");
    img.src = "asset/question.svg";
    carte.classList.remove("retournee");
  });

  // on réinitialise les variables
  premiere = null;
  verrou = false;

  // on mélange à nouveau les cartes
  const parent = document.getElementById("jeu");
  const cartesMelangees = Array.from(cartes).sort(() => Math.random() - 0.5);
  cartesMelangees.forEach((c) => parent.appendChild(c));

  console.log("Nouvelle partie !");
}
