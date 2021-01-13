var dog,happyDog,dogIma,database,foodS,foodStock;
 

function preload()
{
  dogIma=loadImage("images/dogImg1.png")
  happyDog=loadImage("images/dogImg.png");
}

function setup() 
{
  database=firebase.database();

	createCanvas(500,500);

  dog=createSprite(300,300,20,50);
  dog.addImage("wait",dogIma);
  dog.addImage("happy",happyDog);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() 
{  
  background(46,139,87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.changeImage("happy",happyDog);
  }
  if(keyWentUp(UP_ARROW))
  {
    dog.changeImage("wait",dogIma);
  }

  drawSprites();

  fill("white");
  text("Note:Use UP_Arrow to feed the dog",10,25);
  text("Food :"+foodS,300,240);
}

function readStock(data)
{
  foodS=data.val();
}

function writeStock(x)
{

  if(x<=0)
  {
    x=0;
  }

  else
  {
    x=x-1;
  }

  database.ref('/').update
  (
    {
      Food:x
    }
  )
}

