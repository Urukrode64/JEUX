// Exemple de classe
class Personnage {
    x;//position x (en  px)
    y;//position y(en px)
    stepX;  //position sur le sprite en x
    stepY; //position sur le sprite en y
    s; //zoom
  

    constructor(x, y, stepX, stepY, s) {
        this.x = x;
        this.y = y;
        this.stepX = stepX;
        this.stepY = stepY;
        this.s = s;
       

    }


    draw(ctx) {

        ctx.save();

        // dessin d'un cercle, on utilise le mode "chemin"
        ctx.beginPath();
        
        ctx.drawImage(
            assets.zelda,
            Math.floor(this.stepX )* 64, Math.floor(this.stepY) * 64, 64, 64,
            this.x, this.y, 64 * this.s, 64 * this.s);


            ctx.stroke(); // en fil de fer
        ctx.restore();
    }

    move(key) {
      


        if (key === "ArrowRight") {
            this.stepX+=0.2; 
            this.stepY=0;
            this.x+=3;
        }
            
        else if (key === "ArrowLeft") {
            this.stepX-=0.2;
            this.stepY=0;
            this.x-=3;  
         }


        if (this.stepX > 7) {
            this.stepX = 0;
        }else if (this.stepX < 0) {
            this.stepX = 7;
        }
        this.draw(ctx);   

    }

    attack(key) {
        if (key === "a") {
           
            this.stepX=0;
            this.stepY=2;
        }

    }




}
