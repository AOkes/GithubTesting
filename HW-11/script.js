$(document).ready(function(){


// VARIABLES
var squid = new Array();
var fish_food = new Array();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var player = 0;
var movement;
var speed = 1;
var score = 0;

// create new objects and push into an array
  function create_squid(){
// grab data from JSON file
      $.getJSON("./data/squares.json", function(data){
          for(let i = 0; i < 5; i ++){
              let j = new Vertibrate(data.squares[i].x, data.squares[i].y, data.squares[i].width, data.squares[i].height, data.squares[i].color);
              squid.push(j);
          }
      });
/*      .done(function() { // Testing for errors during process.
         console.log( "second success" );
       })
       .fail(function() {
         console.log( "error" );
       })
       .always(function() {
         console.log( "complete" );
       });*/
  }

// full the information from a JSON and display it.
function create_food(){
    $.getJSON( "./data/food.json", function(data) {
        for(let i = 0; i < 3; i ++){
            let j = new Vertibrate(data.info[i].x, data.info[i].y, data.info[i].width, data.info[i].height, data.info[i].color);
            fish_food.push(j);
          }
    });
/*   .done(function() { // Testing for errors during process.
      console.log( "second success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
*/
}


    create_squid();
    create_food();
    drawSquare();
    setInterval(update, 1000/60);
    setInterval(switch_player, 3000);

  function update() {
       ctx.clearRect(0,0,canvas.width,canvas.height);
         drawSquare();
         collisions();
         create_score();
     }

  function drawSquare(){
       // for loop to display the objects in the array
       for ( let i = 0; i < squid.length ; i ++){
        ctx.fillStyle = squid[i].color;
        ctx.fillRect(squid[i].x, squid[i].y, squid[i].width, squid[i].height);
        canvas_wall(squid[i]);
       }
        // Draw the food objects
       for ( let i = 0; i < fish_food.length ; i ++){
        ctx.fillStyle = fish_food[i].color;
        ctx.fillRect(fish_food[i].x, fish_food[i].y, fish_food[i].width, fish_food[i].height);

       }
     }

// This will create the score
function create_score(){

  $("#score").html("Score: " + score);

  if(score ===3){
    $("#score").html("Score: " + score + "<br>You Win!");

  }
}


  // KEYPRESS EVENT
     $(this).keypress(function(event){
       getKey(event);
     });

// This function creates movement when a key is pressed
  function getKey(event){

       var char = event.which || event.keyCode;
       var letter = String.fromCharCode(char);

       if(letter == "w"){
         up(squid[player]);
         movement = "up";
       }
       if (letter == "s"){
         down(squid[player]);
         movement = "down";
       }
       if (letter == "a"){
         left(squid[player]);
         movement = "left"
       }
       if (letter == "d"){
         right(squid[player]);
         movement = "right"
       }

       // Manually Switch which object is the "player"
    /*   if (letter == "n"){
         player += 1;
         if (player >= squid.length){
           player = 0;
         }
       }*/

  }

  // Function to automatically switch of player
  function switch_player(){
    player += 1;
    if (player >= squid.length){
      player = 0;
    }
  }

// this function tests for collision and if detected, prevents player object from overlapping.
function collisions(){

  // this variable will allow us to test if collision is true or false
  var test2 = false;

  // this will loop through my squid array to see if any objects are colliding
 for ( let i = 1; i < squid.length ; i ++){
     test2 = have_collided(squid[0], squid[i]);
        if (test2 == true){
      break; // if the objects overlap, then we break out of the loop.
      }

  }
  // if the collisions happen, then we push the player character back the opposite way.
  if (test2){
    if (movement =="up"){
      down(squid[player]);
    }
    else if(movement == "down"){
      up(squid[player]);
    }
    else if (movement == "left"){
      right(squid[player]);
    }
    else if (movement == "right"){
      left(squid[player]);
    }
  }
//  This removes the collectable item after its spliced from the array.
  setTimeout(remove_food, 1000);
}

function remove_food(){
  // I need to a statement to splice out collectable items...
    for (let i = 0; i < fish_food.length; i ++){
      var test3 = have_collided(squid[player], fish_food[i]);

      if(test3){
        fish_food.splice(i, 1);
        score ++;
      }
    }
}



// These functions create movement up/down/left/moveRight.
//We create seperate functions for these so we can reuse them with our collisions test above
    function up(object){
        object.y -= speed;
    }

    function down(object){
        object.y += speed;
    }

    function left(object){
         object.x -= speed;
    }

    function right(object){
          object.x += speed;
    }

// Keep the player objects within the canvas.
     function canvas_wall(object){
       if (object.x >= canvas.width - object.width){
         object.x = canvas.width - object.width;
       }
       if (object.y >= canvas.height - object.height){
         object.y = canvas.height - object.height;
       }
       if (object.x <= 0){
         object.x = 0;
       }
       if (object.y <= 0){
         object.y = 0;
       }
     }

     //Create object collision detection
      function have_collided(object1,object2){
        return !(
          ((object1.y + object1.height) < (object2.y)) || //
          (object1.y > (object2.y + object2.height)) ||
          ((object1.x + object1.width) < object2.x) ||
          (object1.x > (object2.x + object2.width))
        );
      }

})
