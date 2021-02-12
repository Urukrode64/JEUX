

function traiteCollisionsJoueurAvecBords() {
  if (zelda.x > canvas.width - zelda.s * 64) {//- zelda.l) {

    zelda.x = canvas.width - zelda.s * 64;// - zelda.l;
    //zelda.vitesseX = -zelda.vitesseX;
  } else if (zelda.x < 0) {
    //console.log("COLLISION A GAUCHE");
    zelda.x = 0; // point de contact

  }

}

function circleCollide(x1, y1, r1, x2, y2, r2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return dx * dx + dy * dy < (r1 + r2) * (r1 + r2);
}

function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {

  if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
    return false; // No horizontal axis projection overlap
  if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
    return false; // No vertical axis projection overlap
  return true; // If previous tests failed, then both axis projections
  // overlap and the rectangles intersect
}

function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
  var testX = cx;
  var testY = cy;
  if (testX < x0) testX = x0;
  if (testX > (x0 + w0)) testX = (x0 + w0);
  if (testY < y0) testY = y0;
  if (testY > (y0 + h0)) testY = (y0 + h0);
  return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
}

function traiteCollisionsPillardAvecBords(p) {
  if (p.x > canvas.width - p.s * 65) {
    p.x = canvas.width - p.s * 65;
    p.vx = -p.vx;
  } else if (p.x < 0) {
    p.x = 0;
    p.vx = -p.vx;
  }

}

function traiteCollisionBalleAvecMonstre(b) {
  if (
    circRectsOverlap(
      zelda.x,
      zelda.y,
      zelda.s * 64,
      zelda.s * 64,
      b.x,
      b.y,
      b.s * 100,
      b.s * 100
    )
  ) {
    assets.gain.play();
    let index = tableauDesBalles.indexOf(b);
    tableauDesBalles.splice(index, 1);
    score += 10;
  }
}

function traiteCollisionJoueurAvecPillard(b) {
  if (
    circRectsOverlap(
      zelda.x,
      zelda.y,
      zelda.s * 64,
      zelda.s * 64,
      b.x,
      b.y,
      b.s * 65,
      b.s * 80
    )
  ) {
    let index = tableauDesPillards.indexOf(b);
    tableauDesPillards.splice(index, 1);

    if (zelda.stepX != 0 && zelda.stepY != 2) {
      score-=30;
     
    }
  }
}

