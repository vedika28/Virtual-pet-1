//Create variables here
var dog, happyDog,foodS, foodStock;
var dogImg,happyDogImg;
var database;

function preload() {
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");  
}

function setup() {
  createCanvas(500, 500);

  dog=createSprite(width/2,height/2);
  dog.addImage(dogImg);
  
  database = firebase.database();
  dog.addImage(dogImg);
  dog.scale=0.5;
}


function draw() { 
  background(46, 139, 87);

  foodStock=database.ref('Food');
  foodStock.on('value',readFood)

  feedDog();

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  text("food stock: "+foodS,10,50);
  text("press up arrow to feed the dog",100,450);

}

function readFood(data) {
  foodS=data.val();
}

function writeFood(x) {
  if (x>0) {
    x-=1;
  } else if (x<=0) {
    x=0;
  }

  database.ref('/').update({
    Food: x
  })
}

function feedDog() {
  if (keyWentDown(UP_ARROW)) {
    writeFood(foodS);    
    dog.addImage(happyDogImg);
  }
}



