$(document).ready(function(){


var rectangle = new Array();
var yellowPoints = new Array();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var player = 0;
var movement;
var speed = 1;
var score = 0;

//Create squares from the JSON data
  function create_rectangle(){
      $.getJSON("./data/squares.json", function(data){
          for(let i = 0; i < 5; i ++){
              let j = new squareCreator(data.squares[i].x, data.squares[i].y, data.squares[i].width, data.squares[i].height, data.squares[i].color);
              rectangle.push(j);
          }
      });
  }

//Create points from the JSON
function create_points(){
    $.getJSON( "./data/points.json", function(data) {
        for(let i = 0; i < 3; i ++){
            let j = new squareCreator(data.info[i].x, data.info[i].y, data.info[i].width, data.info[i].height, data.info[i].color);
            yellowPoints.push(j);
          }
    });
}


    create_rectangle();
    create_points();
    drawSquare();
    setInterval(update, 1000/60);

  function update() {
       ctx.clearRect(0,0,canvas.width,canvas.height);
         drawSquare();
         collisions();
         create_score();
     }

//Uses for loop to draw squares on the canvas, including player
  function drawSquare(){
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

//Shows the scoreboard
function create_score(){

  $("#score").html("Score: " + score);

  if(score ===3){
    $("#score").html("Score: " + score + "<br>You Win!");

  }
}

     $(this).keypress(function(event){
       getKey(event);
     });

// Moves the player character when using 'wasd'
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

  }


//Checks for any collisions between objects
function collisions(){

  var test2 = false;

 for ( let i = 1; i < rectangle.length ; i ++){
     test2 = have_collided(rectangle[0], rectangle[i]);
        if (test2 == true){
      break;
      }

  }
  //Upon collision, pushes player back
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
//Removes points
  setTimeout(remove_points, 1000);
}

function remove_points(){
    for (let i = 0; i < yellowPoints.length; i ++){
      var test3 = have_collided(rectangle[player], yellowPoints[i]);

      if(test3){
        yellowPoints.splice(i, 1);
        score ++;
      }
    }
}

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

//Keeps the player on the canvas
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

      function have_collided(object1,object2){
        return !(
          ((object1.y + object1.height) < (object2.y)) || //
          (object1.y > (object2.y + object2.height)) ||
          ((object1.x + object1.width) < object2.x) ||
          (object1.x > (object2.x + object2.width))
        );
      }

})
