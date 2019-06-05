// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/factory_background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

/*
// Coin image
var coinReady = false;
var coinImage = new Image();
coinImage.onload = function () {
    coinReady = true;
};
coinImage.src = "images/coin.png";

*/

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};

var monster_array=[];

var pointsCaught = 0;

var coin = {};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {

	new_coin();
	new_monster();

};

var new_coin = function() {

    coin.x = 32 + (Math.random() * (canvas.width - 64));
    coin.y = 32 + (Math.random() * (canvas.height - 64));

};

var new_monster = function() {

	var monster=new Object();
	// Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
    monster.incXMonster=-1;
    monster.incYMonster=-1;

    monster_array.push(monster);

};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	monster_array.forEach(function (monster) {

        if (
            hero.x <= (monster.x + 32)
            && monster.x <= (hero.x + 32)
            && hero.y <= (monster.y + 32)
            && monster.y <= (hero.y + 32)
        ) {

            --pointsCaught;

            monster.x = 32 + (Math.random() * (canvas.width - 64));
            monster.y = 32 + (Math.random() * (canvas.height - 64));

            reset();
            // new_monster();

        }

    });


    // Are they touching?
    if (
        hero.x <= (coin.x + 32)
        && coin.x <= (hero.x + 32)
        && hero.y <= (coin.y + 32)
        && coin.y <= (hero.y + 32)
    ) {
        ++pointsCaught;
        new_coin();
        new_monster();
    }


};


// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

    monster_array.forEach(function(monster) {
        if (monsterReady) {
            ctx.drawImage(monsterImage, monster.x, monster.y);
            console.log(monster.x,monster.y);
        }
    });

    if (coinReady) {
        ctx.drawImage(coinImage, coin.x, coin.y);
    }

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Coins caught: " + pointsCaught, 32, 32);
	ctx.fillText("There are now: "+Object.keys(monster_array).length+ "monsters", 32,64);

	/*
	for (var it=0; it<monster_array.length; it++) {
    	ctx.fillText("There is a monster ("+it+") in "+monster_array[it].x+","+monster_array[it].y,32,96+32*it);
    }
    */

};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;


	/*
    var i=0;
    monster_array.forEach(function(monster) {

        monster.x += monster.incXMonster;
        monster.y +=monster.incYMonster;

        if (monster.x>=(canvas.width-32)) monster.incXMonster=-monster.incXMonster;
        if (monster.x<=0) monster.incXMonster=-monster.incXMonster;
        if (monster.y>=(canvas.height-32)) monster.incYMonster=-monster.incYMonster;
        if (monster.y<=0) monster.incYMonster=-monster.incYMonster;

        // if (i>=3) { alert("There is a monster ("+i+") in "+monster.x+","+monster.y); }
        i++;

		ctx.fillText("*** i= "+i,64,128);

	});

	*/

    for (var i = 0; i < monster_array.length; i++) {

        monster_array[i].x += monster_array[i].incXMonster;
        monster_array[i].y += monster_array[i].incYMonster;

        if (monster_array[i].x >= (canvas.width - 32)) monster_array[i].incXMonster = -monster_array[i].incXMonster;
        if (monster_array[i].x <= 0) monster_array[i].incXMonster = -monster_array[i].incXMonster;
        if (monster_array[i].y >= (canvas.height - 32)) monster_array[i].incYMonster = -monster_array[i].incYMonster;
        if (monster_array[i].y <= 0) monster_array[i].incYMonster = -monster_array[i].incYMonster;

        //ctx.fillText("*** i= "+i,64,128);
        //alert("There is a monster ("+i+") in "+monster.x+","+monster.y)

    }


	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
hero.x = canvas.width / 2;
hero.y = canvas.height / 2;
var then = Date.now();
reset();
main();
