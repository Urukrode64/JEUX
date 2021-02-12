// Exemple de classe
class Pillard {
    x;//position x (en  px)
    y;//position y(en px)
    stepX;  //position sur le sprite en x
    stepY; //position sur le sprite en y
    s; //zoom
    tab_stepX = [25,80,128];
    vx;
  

    constructor(x, y, stepX, stepY, s,vx) {
        this.x = x;
        this.y = y;
        this.stepX = stepX;
        this.stepY = stepY;
        this.s = s;
        this.vx = vx
       

    }


    draw(ctx) {

        ctx.save();

        // dessin d'un cercle, on utilise le mode "chemin"
        ctx.beginPath();
        
        ctx.drawImage(
            assets.boy,
            this.tab_stepX[this.stepX], Math.floor(this.stepY) * 100, 53, 85,
            this.x, this.y, 65 * this.s, 80 * this.s);


            ctx.stroke(); // en fil de fer
        ctx.restore();
    }

    move() {

        this.stepX ++; 
        this.x += this.vx;
        this.draw(ctx);
        if (this.stepX > 2) {
            this.stepX = 0;
          
        } 

    }




}
