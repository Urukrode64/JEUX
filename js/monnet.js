// Exemple de classe
class Monnet {
    x;//position x (en  px)
    y;//position y(en px)
    stepX;  //position sur le sprite en x
    stepY; //position sur le sprite en y
    s; //zoom
    tab_stepX = [0,100,190,150,70,0]; 
    tab_stepY  =[130,130,130,130,130,130];
    vy;
    //tempsMinEntreDeplacementEnMillisecondes=100; //temps de latence de detcteion de touche

    constructor(x, y, stepX, stepY, s,vy) {
        this.x = x;
        this.y = y;
        this.stepX = stepX;
        this.stepY = stepY;
        this.s = s;
        this.vy=vy;
    }


    draw(ctx) {
        ctx.save();

        //ctx.translate(this.x, this.y);
        ctx.beginPath();

        ctx.drawImage(
            assets.monnet,
            this.tab_stepX[this.stepX], Math.floor(this.stepY) * 130, 100, 120,
            this.x, this.y, 87 * this.s, 130 * this.s);
        
        
      
        ctx.stroke(); // en fil de fer

        ctx.restore();
    }

    move() {

        this.stepX ++; 
        this.y += this.vy;
        this.draw(ctx);


        if(this.stepX==3){this.stepY=1;}

        if (this.stepX > 6) {
            this.stepX = 0;
            this.stepY=0;
        } else if (this.stepX < 0) {
            this.stepX = 6;
            this.stepY=0;
        }

        
    }
}
