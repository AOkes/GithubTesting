$(document).ready(function(){


// VARIABLES
var rectangle = new Array();
var yellowPoints = new Array();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var player = 0;
var movement;
var speed = 1;
var score = 0;

// create new objects and push into an array
  function create_rectangle(){
// grab data from JSON file
      $.getJSON("./data/squares.json", function(data){
          for(let i = 0; i < 5; i ++){
              let j = new squareCreator(data.squares[i].x, data.squares[i].y, data.squares[i].width, data.squares[i].height, data.squares[i].color);
              rectangle.push(j);
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
function create_points(){
    $.getJSON( "./data/points.json", function(data) {
        for(let i = 0; i < 3; i ++){
            let j = new squareCreator(data.info[i].x, data.info[i].y, data.info[i].width, data.info[i].height, data.info[i].color);
            yellowPoints.push(j);
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


    create_rectangle();
    create_points();
    drawSquare();
    setInterval(update, 1000/60);
    //setInterval(switch_player, 3000);

  function update() {
       ctx.clearRect(0,0,canvas.width,canvas.height);
         drawSquare();
         collisions();
         create_score();
     }

  function drawSquare(){
       // for loop to display the objects in the array
       for ( let i = 0; i < rectangle.length ; i ++){
        ctx.fillStyle = rectangle[i].color;
        ctx.fillRect(rectangle[i].x, rectangle[i].y, rectangle[i].width, rectangle[i].height);
        canvas_wall(rectangle[i]);
       }
        // Draw the points objects
       for ( let i = 0; i < yellowPoints.length ; i ++){
        ctx.fillStyle = yellowPoints[i].color;
        ctx.fillRect(yellowPoints[i].x, yellowPoints[i].y, yellowPoints[i].width, yellowPoints[i].height);

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
         up(rectangle[player]);
         movement = "up";
       }
       if (letter == "s"){
         down(rectangle[player]);
         movement = "down";
       }
       if (letter == "a"){
         left(rectangle[player]);
         movement = "left"
       }
       if (letter == "d"){
         right(rectangle[player]);
         movement = "right"
       }

       // Manually Switch which object is the "player"
    /*   if (letter == "n"){
         player += 1;
         if (player >= rectangle.length){
           player = 0;
         }
       }*/

  }

  // Function to automatically switch of player
/*  function switch_player(){
    player += 1;
    if (player >= rectangle.length){
      player = 0;
    }
  }*/

// this function tests for collision and if detected, prevents player object from overlapping.
function collisions(){

  // this variable will allow us to test if collision is true or false
  var test2 = false;

  // this will loop through my rectangle array to see if any objects are colliding
 for ( let i = 1; i < rectangle.length ; i ++){
     test2 = have_collided(rectangle[0], rectangle[i]);
        if (test2 == true){
      break; // if the objects overlap, then we break out of the loop.
      }

  }
  // if the collisions happen, then we push the player character back the opposite way.
  if (test2){
    if (movement =="up"){
      down(rectangle[player]);
    }
    else if(movement == "down"){
      up(rectangle[player]);
    }
    else if (movement == "left"){
      right(rectangle[player]);
    }
    else if (movement == "right"){
      left(rectangle[player]);
    }
  }
//  This removes the collectable item after its spliced from the array.
  setTimeout(remove_points, 1000);
}

function remove_points(){
  // I need to a statement to splice out collectable items...
    for (let i = 0; i < yellowPoints.length; i ++){
      var test3 = have_collided(rectangle[player], yellowPoints[i]);

      if(test3){
        yellowPoints.splice(i, 1);
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
