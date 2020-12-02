var PLAY = 1;
var END = 0;
var gameState = PLAY
var monkey , monkey_running
var bananaImage, obstacleImage
var bananaGroup, obstacleGroup
var score
var points
var ground
function preload(){
  
  
  monkey_running =      loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(600,400);

 monkey = createSprite(70,290,20,50);
  monkey.addAnimation("running", monkey_running);
monkey.scale=0.1

  ground=createSprite(400,350,1800,10)
  ground.velocityX = -4 
  score=0
  points=0
  bananasGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
background(240)
  if(gameState === PLAY){
spawnBanana() 
  spawnObstacle()
    if(keyDown("space")&& monkey.y > 310  ){
        monkey.velocityY = -20; 
 }
  if (bananasGroup.isTouching(monkey)){
    bananasGroup.destroyEach()
    points=points+1
  }
  
 

  if (ground.x < 0){
      ground.x = ground.width/2;
  }
  score = score + Math.round(getFrameRate()/60);
  if(obstaclesGroup.isTouching(monkey)){
    gameState=END 
  }
 

  }
   else if (gameState === END) {
      bananasGroup.destroyEach()
     obstaclesGroup.destroyEach()
     ground.velocityX=0
     stroke("black")
      fill ("black")
     text("GAME OVER",300,200)
   }
   monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
  stroke("black")
  fill ("black")
  text("SURVIVAL TIME : "+score,450,50)
  text("POINTS : "+points,50,50)
  drawSprites() 
  
}
function spawnBanana() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    
     //assign lifetime to the variable
   banana.lifetime = 210;
    bananasGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,310,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    
     //assign lifetime to the variable
   obstacle.lifetime = 200;
obstaclesGroup.add(obstacle);
  }
  
}



