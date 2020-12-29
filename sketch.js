//Create variables here
var dog, dogImage, happyDog, happyDogImage, database, foodS, foodStock,lastFed;
var i=0;
function preload()
{
  //load images here
  dogImage=loadImage("Dog.png");
  happyDogImage=loadImage("happydog.png");
 
}

function setup() {
  createCanvas(1000, 500);

database=firebase.database();

  food1=new Food();
  dog=createSprite(250,300,50,50);
  dog.addImage(dogImage);
  dog.scale=0.2;
  
  

  var dogy = database.ref('Food');
  dogy.on("value",readPosition);
  feed = createButton("FEED THE DOG");
  feed.position(500,15);
  feed.mousePressed(feedDog);
  
  add = createButton("ADD FOOD");
  add.position(400,15);
  add.mousePressed(AddFood);

}


function draw() {  
  background(46, 139, 87);

  drawSprites();
  //add styles here
  textSize(15);
}

function readPosition(data){
  position=data.val();
  foodS.updateFoodstock(position);
}

function writePosition(milk){
  if(milk>0){
    milk=milk-1
  }
  else{
    milk=0
  }

  database.ref('/').set({
    Food : milk
  })

}

function AddFood(){
  position++
  database.ref('/').update({
    Food : position
  })
}

function writeStock(x){

  if(x<=0){
    x=0
  }
  else{
   x=x-1
  }
  database.ref('/').update({
    Food : x
  })
}
function feedDog(){
  foodS.updateFoodStock(foodS.getFoodStock()-1)
  database.ref('/').update({
    Food : foodS.getFoodStock(),
    FeedTime : i++
  })
}