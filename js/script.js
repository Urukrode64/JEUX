// 1 On dÃ©finisse une sorte de "programme principal"
// le point d'entrÃ©e du code qui sera appelÃ©e dÃ¨s que la
// page ET SES RESSOURCES est chargÃ©e

window.onload = init;

let grille;
let canvas, ctx, canvasLargeur, canvasHauteur;
let mousePos = {};
let userState = "rien";
let cookieDragguee = null;
let assets;
let niveauCourant = 1;
let score = 0;
let etatJeu = "MenuPrincipal";
let tableauDesBalles = [];
let tableauDesPillards = [];

var inputKeys = new Map();
inputKeys.set("ArrowLeft", false);
inputKeys.set("ArrowRight", false);



function init() {
  console.log("Page et ressources prÃªtes Ã  l'emploi");
  // appelÃ©e quand la page et ses ressources sont prÃªtes.
  // On dit aussi que le DOM est ready (en fait un peu plus...)
  window.addEventListener('keydown', function (evt) {
    inputKeys.set(evt.key, true);
  });
  window.addEventListener('keyup', function (evt) {
    inputKeys.set(evt.key, false);
  });

  loadAssets(startGame);
}

function startGame(assetsLoaded) {
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext("2d");
  canvasLargeur = canvas.width;
  canvasHauteur = canvas.height;
  assets = assetsLoaded;


  canvas.onmousedown = traiteMouseDown;
  canvas.onmouseup = traiteMouseUp;
  zelda = new Personnage(canvas.width / 2, canvas.height - 64, 0, 0, 1); //x, y, stepX, stepY, s
  creerDesBalles(niveauCourant + 1);
  
  


  requestAnimationFrame(animationLoop);
}

function traiteMouseDown(event) {
  //console.log("Souris cliquÃ©e bouton = " + event.button);
  //console.log("souris clickÃ©e " + mousePos.x + " " + mousePos.y);
  assets.plop.play();

  switch (userState) {
    case "cookieEnDrag":
    case "rien":
      // on a cliquÃ© sur une cookie, on va recherche la cookie en fonction
      // du x et du y cliquÃ©
      // puis on va changer l'Ã©tat pour "cookieEnDrag"
      userState = "cookieEnDrag";

      cookieDraggee = grille.getCookie(mousePos.x, mousePos.y);
  }
}

function traiteMouseUp(event) {
  console.log("Souris relÃ¢chÃ©e bouton = " + event.button);
  console.log("souris relÃ¢chÃ©e " + mousePos.x + " " + mousePos.y);
  switch (userState) {
    case "cookieEnDrag":
      //cookieCible = grille.getCookie(mousePos.x, mousePos.y);
      // regarder si on peut swapper ? ou si on est pas trop loin....
      console.log(
        "on essaie d echanger avec une cookie de type : " + cookieCible.type
      );
      userState = "rien";
      break;
    case "rien":
      break;
  }
}



function animationLoop() {
  // Efface le canvas
  ctx.clearRect(0, 0, canvasLargeur, canvasHauteur);
  afficheInfoJeu(); // scores, niveau etc.


  switch (etatJeu) {
    case "MenuPrincipal":
      afficheMenuPrincipal();
      break;
    case "JeuEnCours":
      updateJeu();
      break;
    case "EcranChangementNiveau":
      afficheEcranChangementNiveau();
      break;
    case "GameOver":
      afficheEcranGameOver();
  }

  // on demande Ã  redessiner 60 fois par seconde
  requestAnimationFrame(animationLoop);
}


function afficheInfoJeu() {
  ctx.save();
  ctx.fillStyle = "orange";
  ctx.font = "30pt Calibri";
  ctx.fillText("Niveau : " + niveauCourant, 400, 40);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "red";
  ctx.strokeText("Niveau : " + niveauCourant, 400, 40);

  ctx.fillText(etatJeu, 300, 100);
  ctx.restore();
}
function afficheMenuPrincipal() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "green";
  ctx.font = "30pt Calibri";
  ctx.fillText("MENU PRINCIPAL", 100, 20);

  ctx.fillText("Cliquez pour démarrer", 65, 60);



  ctx.restore();
}

function updateJeu() {


  zelda.draw(ctx);
  updateBalles();
  updatePillards();
  updateScore();
  

  // 3 on déplace les objets


  // 4 on peut faire autre chose (par ex: detecter des collisions,
  // ou prendre en compte le clavier, la souris, la manette de jeu)
  traiteCollisionsJoueurAvecBords();


  if (inputKeys.get("ArrowRight") == true) {
    zelda.move("ArrowRight", Date.now());
  }
  if (inputKeys.get("ArrowLeft") == true) {
    zelda.move("ArrowLeft", Date.now());
  }
  if (inputKeys.get("a") == true) {
    zelda.attack("a");
  }

  if (niveauFini()) {
    etatJeu = "EcranChangementNiveau";
  }
  else {
    if (tableauDesBalles.length === 0) { creerDesBalles(niveauCourant + 1); }
    if (tableauDesPillards.length === 0 && niveauCourant>2) { creerDesPillards(niveauCourant/5); }
  }

  if(score<= -200){etatJeu = "GameOver";}

}

function afficheEcranChangementNiveau() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "green";
  ctx.font = "30pt Calibri";
  ctx.fillText("Changement niveau", 100, 20);

  ctx.fillText("Cliquez pour niveau suivant", 65, 60);

  ctx.restore();
}
function afficheEcranGameOver() {
  niveauCourant = 1;
  score = 0;
  tableauDesBalles=[];
  tableauDesPillards=[];
  etatJeu = "MenuPrincipal";
 }


function creerDesBalles(nb) {

  for (let i = 0; i < nb; i++) {
    let x = Math.random() * canvas.width;
    let y = 0;

    let vy = Math.random() * 2;
    if (vy < 1) { vy = 1; }
    let b = new Monnet(x, y, 0, 0, 0.3, vy);


    tableauDesBalles.push(b);
  }


}

function creerDesPillards(nb) {

  for (let i = 0; i < nb; i++) {
    let x = Math.random() * canvas.width;
    let y = canvas.height-45;
    let vx = -5 + Math.random() * 5;
    if (vx < 1) { vx = 1; }

    let b = new Pillard(x, y, 0, 2, 0.5, vx);

  
    tableauDesPillards.push(b);
    
  }

  // on ajoute une balle chercheuse dans le tableau
  //balleChercheuse = new BalleChercheuse(100, 100, 40, "red", 0, 0);
  //tableauDesBalles.push(balleChercheuse);
}


function updateBalles() {
  // utilisation d'un itérateur sur le tableau
  tableauDesBalles.forEach((b) => {
    b.draw(ctx);
    traiteCollisionsBalleAvecBords(b);
    traiteCollisionBalleAvecMonstre(b);

    b.move();
  });
}

function updatePillards() {
  // utilisation d'un itérateur sur le tableau
  tableauDesPillards.forEach((b) => {
    b.draw(ctx);
    traiteCollisionJoueurAvecPillard(b);
    traiteCollisionsPillardAvecBords(b);
    b.move();
  });
}


function updateScore() {
  let spanScore = document.querySelector("#score");
  spanScore.innerHTML = "<i>" + score + "</i>";
}


function niveauFini() {
  if (score >= (niveauCourant * 10) / 0.5) {
    score = 0;
    return true;
  }
}

function niveauSuivant() {
  console.log("NIVEAU SUIVANT");
  niveauCourant++;
  creerDesBalles(niveauCourant + 1);
  if (niveauCourant > 2) { creerDesPillards(niveauCourant); }
  etatJeu = "JeuEnCours";
}

function traiteCollisionsBalleAvecBords(b) {
  if (b.y > canvas.height) {
    let index = tableauDesBalles.indexOf(b);
    tableauDesBalles.splice(index, 1);
  }
}
