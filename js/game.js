// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
let ctx2 = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);



// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/factory_background_v02.png";



// Image da Bola
let heroReady = false;
let heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";

//Outros Objectos
let monsterReady1 = false;
let monsterImage1 = new Image();
monsterImage1.onload = function () {
    monsterReady1 = false;
};
monsterImage1.src = "images/monster1.png";

//Monster image2
let monsterReady2 = false;
let monsterImage2 = new Image();
monsterImage2.onload = function () {
    monsterReady2 = false;
};
monsterImage2.src = "images/monster2.png";


//Monster image2
let monsterReady3 = false;
let monsterImage3 = new Image();
monsterImage3.onload = function () {
    monsterReady3 = false;
};
monsterImage3.src = "images/monster3.png";

//Monster image2
let monsterReady4 = false;
let monsterImage4 = new Image();
monsterImage4.onload = function () {
    monsterReady4 = false;
};
monsterImage4.src = "images/monster4.png";

//Monster image2
let monsterReady5 = false;
let monsterImage5 = new Image();
monsterImage5.onload = function () {
    monsterReady5 = false;
};
monsterImage5.src = "images/monster5.png";


 
// Variáveis gerais:
let numObjetosEmMontagem = 200;
let numTiposDeObjetoDiferentes = 7;
let probObjetoDifetente = 0.3;  //alterado para 0.3 para ter menos ocorrencias pois estou a usar mais objectos 
let tempoAtual = 0;
let numVezesEspacoPrimido = 0;
let indiceDeObjetoNoAlvo = 0;
let indiceAnteriorDeObjetoNoAlvo = 0;

let numFalhas = 0;
let numErros = 0;
let numAcertos = 0;

let teclaPrimida = false;

let objetosEmMontagem = [];

// Handle keyboard controls
let keysDown = {};
let singleKeyDetector = false;

addEventListener("keydown", function (e) {
    if (singleKeyDetector) return;
    numVezesEspacoPrimido++;
    classificaResposta();
    keysDown[e.keyCode] = true;
    singleKeyDetector = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
    singleKeyDetector = false;
}, false);

let audiohit = new Audio('sounds/hit2.mp3');
let audiofail = new Audio('sounds/fail2.mp3');

let classificaResposta = function () {

    teclaPrimida = true;
    if (objetosEmMontagem[indiceDeObjetoNoAlvo] == 1) {
        numAcertos++;
        audiohit.play();
    } else {
        numErros++;
        audiofail.play();
        
    }
};


let sound = function (src) {
	  this.sound = document.createElement("audio");
	  this.sound.src = src;
	  this.sound.setAttribute("preload", "auto");
	  this.sound.setAttribute("controls", "none");
	  this.sound.style.display = "none";
	  document.body.appendChild(this.sound);
	  this.play = function(){
	    this.sound.play();
	  }
	  this.stop = function(){
	    this.sound.pause();
	  }
	} 


// Reset ##
let reset = function () {
    setObjetosEmMontagem();
};

let setObjetosEmMontagem = function () {
    for (let i = 0; i < numObjetosEmMontagem; i++) {
        objetosEmMontagem[i] = (Math.random() < probObjetoDifetente) ? 1 : 2;
        
        if (objetosEmMontagem[i]==2){            // para adicionar mais peças acrescentar mais valores                          
        	objetosEmMontagem[i]= Math.floor(Math.random() * numTiposDeObjetoDiferentes + 1)	;	 //adicionar quantas peças quisermos
        }
        
    }
};

let update = function (modifier) {
    tempoAtual++;
};

// Draw everything
let render = function () {
	
	
	
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    indiceAnteriorDeObjetoNoAlvo = indiceDeObjetoNoAlvo;
    indiceDeObjetoNoAlvo = Math.round((tempoAtual - 467) / 64);

    if (indiceDeObjetoNoAlvo != indiceAnteriorDeObjetoNoAlvo) {
        if (objetosEmMontagem[indiceAnteriorDeObjetoNoAlvo] == 1 && teclaPrimida == false) {
            numFalhas++;
            // teclaPrimida = false;
        }
        teclaPrimida = false;
    }


   

    for (let i = 0; i < objetosEmMontagem.length; i++) {

        let px = -(32 + i * 64) + tempoAtual;

        // 435 = -32 -64i + t
        // 467 - t = -64i
        // 64i=t-467
        // i=(t-467)/64
    	
        if (px > -32 && px < canvas.width) {
        	
            if (objetosEmMontagem[i] === 1) {
                ctx.drawImage(heroImage, px, 324);   //alinhamento das peças
          
            } else if (objetosEmMontagem[i] ===2  ) {   // se for maior que 1 faz os aleatórios gerados acima
                ctx.drawImage(monsterImage2, px, 324);  
            } else if (objetosEmMontagem[i] ===3  ) {   // se for maior que 1 faz os aleatórios gerados acima
                ctx.drawImage(monsterImage3, px, 324); 
            } else if (objetosEmMontagem[i] ===4  ) {   // se for maior que 1 faz os aleatórios gerados acima
                ctx.drawImage(monsterImage4, px, 324); 
            } else if (objetosEmMontagem[i] ===5  ) {   // se for maior que 1 faz os aleatórios gerados acima
                ctx.drawImage(monsterImage4, px, 324);
            } else {   // se for maior que 1 faz os aleatórios gerados acima
                ctx.drawImage(monsterImage1, px, 324);
            }
        }
    }
    // Tempo
   
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "20px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Objectos: " + indiceDeObjetoNoAlvo, 20, canvas.height - 32);
    ctx.fillText("Tempo:" + tempoAtual, 20, 420);
   
    
   
    ctx.fillText("Tentativas.......... " + numVezesEspacoPrimido, 300, 150);
    ctx.fillText("Bolas Batidas... " + numAcertos, 300, 440);
    ctx.fillText("Bolas Falhadas.. " + numErros, 300, 190);
    ctx.fillText("Não Batidas....... " + numFalhas, 300, 220);
    
   // ctx.fillText(statsAtuais, 32, 96);
};

// The main game loop
let main = function () {
	

    let now = Date.now();
    let delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!

let then = Date.now();
reset();
main();
