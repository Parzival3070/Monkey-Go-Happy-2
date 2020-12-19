//create the monkey varibles
var monkey, monkey_running

//create bannana varibles
var bannana, bannanaImage, bannnanaGroup

//create obstacle varibles
var obstacle, obstacleImage, obstacleGroup

//create invisible ground varibles
var invisibleground, invisiblegroundImage

//create ground varibles
var ground, groundImage

//create the gameover varibles
var gameover, gameoverImage;

//create the survival time varible
var survivalTime = 0;

//create the gamestates and assign it to PLAY
var PLAY = 1;
var END = 0;
var gameState;


function preload() {

  //preload monkey running animation 
  monkey_running = loadAnimation('Monkey_01.png', 'Monkey_02.png', 'Monkey_03.png', 'Monkey_04.png', 'Monkey_05.png', 'Monkey_06.png', 'Monkey_07.png', 'Monkey_08.png', 'Monkey_09.png', 'Monkey_10.png')

  //preload bannana image
  bannanaImage = loadImage('banana.png');

  groundImage = loadImage('jungle.jpg');

  //preload obstacle image
  obstacleImage = loadImage('stone.png');

  //preload the game over image
  gameoverImage = loadImage('gameover.png');

}


function setup() {

  //create canvas to fit all screens
  createCanvas(windowWidth, windowHeight);

  //create monkey sprite to fit all screens
  monkey = createSprite(windowWidth / 4, windowHeight - 150);
  monkey.addAnimation('running', monkey_running);
  monkey.scale = 0.3;

  //create the invisible game over sprite to fit all screena
  gameover = createSprite(windowWidth / 2, windowHeight / 2)
  gameover.addImage(gameoverImage);
  gameover.scale = 1;
  gameover.visible = false;

  //create invisibleground sprite to fit all screens
  invisibleground = createSprite(windowWidth / 2, monkey.y + 130, windowWidth * 1.5, 80);
  invisibleground.shapeColor = 'darkgreen';
  invisibleground.visible = false;

  //create the obstacle and bannana groups
  obstacleGroup = new Group();
  bannanaGroup = new Group();

  gameState = PLAY;

}


function draw() {

  //background color
  background(groundImage);

  console.log(monkey.scale)

  if (gameState === PLAY) {

    survivalTime = Math.round(frameCount / frameRate());
    stroke('black');
    textSize(20);
    fill('black');
    text('Survival Time:  ' + survivalTime, 100, 100);

    if (bannanaGroup.isTouching(monkey) && monkey.scale < 0.39) {

      monkey.scale = monkey.scale + 0.003 ;

    }

    monkey.velocityY = monkey.velocityY + 1.5

    if (keyDown("space") && monkey.y >= 558) {

      monkey.velocityY = -35;

    }

    monkey.collide(invisibleground);

    if (frameCount % 300 === 0) {

      obstacle1();

    }

    if (frameCount % 120 === 0) {

      bannana1();
      bannana.y = Math.round(random(100, 558))

    }

    if (monkey.isTouching(bannanaGroup)) {

      bannana.visible = false;

    }

  }

  if (monkey.isTouching(obstacleGroup)) {

    monkey.scale = monkey.scale - + 0.003;

  }

  if (gameState === END) {

    gameover.visible = true;
    monkey.destroy();
    bannanaGroup.destroyEach();
    obstacleGroup.destroyEach();
    //ground.destroy();
    background(0);

  }

  drawSprites();

}

function obstacle1() {

  obstacle = createSprite(windowWidth + 50, 558, 10, 10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -20;
  obstacleGroup.add(obstacle);
  obstacle.lifetime = 1000;

}

function bannana1() {

  bannana = createSprite(windowWidth, 600, 10, 10);
  bannana.addImage(bannanaImage);
  bannana.scale = 0.1;
  bannana.velocityX = -20;
  bannanaGroup.add(bannana);
  bannana.lifetime = 1000;

}