# Homework 11 Response
## Date 4-5-20
## MART441.50, Julia Ballas


## Overview

We continue to study HTML5 and canvas, expanding on the idea of our game from last week.

## Projects

- A Fishy racing game

## Assignment Details

Create another game involving 5 objects that interact with each other and a player that can pickup another three objects to win.

## To Do List

- Create Basic HTML, CSS and script files
- Follow hands on exercises to setup class and objects
- Add 5 squid objects
- 1 object should move by player
  - can you switch between "player"? (Yes it's possible)
- Add collision between 5 objects
- create new 'food' array and JSON
- Make food array collectable
- Code a score that increased when you collect a piece of food.
- make separate files for my: JSON, class. Organize into data folder.
  - getJSON code


## Setup and squid objects.
To set up my new game this week, I followed along with the weekly exercises, and made good progress until I reached the collisions. That's when I ran into trouble. I created an array called `squid` this week, which I hoped would give my game an ocean theme.

For some reason, I wanted to be able to shift my player object from any object in the array. I used a variable named `player` and assigned the letter "n" to change between the objects.

```JS
if (letter == "d"){
  right(squid[player]);
  movement = "right"
}

// Manually switch which object is the "player"
if (letter == "n"){
  player += 1;
  if (player >= squid.length){
    player = 0;

  }
```

Initially, this worked! I was even able to restrict all my objects within the canvas, but then it came time for the collisions. I could not get my players to collide. I studied and used some code examples from *Week 13* files, and created 4 different movement functions. `up()` `down()` `left()` `right()`. The suggestion was to make a loop that checks if one object has collided with the others, and if the collision was 'true' the movement would reverse.

However, whenever I switched the *player* I ran into issues. First, I could no longer move the *player* around the screen. I fixed that, but then, the collisions no longer worked between all the objects. I continued experimenting and I ended up with some bizarre results.

## Alternative games

In one version, I could only move my objects using the "n" key. The WASD buttons became the direction keys, except they were backwards directions. You pressed "w" (for upward movement) and then "n" and the `squid[player]` moved one space down. Then you change direction and move the next `squid[player]` 1 space. So, it was like a strategy game, sorta.

In my second experiment I put my collsions in my `drawSquare()` function. Now the first object in my array `squid[0]` is the *player* -- and it could move around freely with WASD. But when I switched to a different object in the array, such as `squid[1]`, then the square zoomed to the edge of the canvas. I have no idea why this was happening, but I find it wonderfully amusing. Collisions work only between the main `squid[0]` and other objects. For instance, `squid[1]` and `squid[2]` still do not have collision detection.

I believe this is due to the fact that my collsion detection is written like this:

```JS
for ( let i = 1; i < squid.length ; i ++){
    test2 = have_collided(squid[0], squid[i]);
       if (test2 == true){
     break; // if the objects overlap, then we break out of the loop.
     }
```
The code above only checks if the "player" has collided with the others. Not if the second object has collided with the third or the second object with the fourth, etc.

It is fascinating. I love seeing my squares fly across the screen! There is a game here somewhere.

## Moving on and collectable food

I needed to have a new array with 'food' in it. So my squids can eat something. This will also let me increase a score count.

This time I created a json file and followed the Week13 example to make my food appear, and it worked after I made sure my coordinates were within the canvas. I had to make sure my json file was valid using https://jsonlint.com/. Then I used the error/testing code from jquery.com again.(https://api.jquery.com/jQuery.getJSON/)

Collisions between the player and squid object came next. First I setup a new test variable and used `console.log(test3)` to make sure the collisions worked. Then I reminded myself how the array splice() method worked by checking W3Schools website. (https://www.w3schools.com/jsref/jsref_splice.asp) I had to create the splice method inside a `for` loop in order to target each piece of food and remove it when there was collision.

## Readable Score
Initially, I had the score appear on the canvas, but I disliked the result. So I briefly researched how to fix the blurry text and was bombarded with information about pixel ratio and screen ratio. Instead, I created a new `<div id="score">` and used jQuery to display it and a variable named `score` to track my score. Now, whenever the player splices a piece of food the score will also increase.

## Problems or Issues this week

There were definetly some tricky parts this week, but by far the hardest part seems to be making a narrative or a finished game. I might have all the necessary parts for my assignment, a moveable player, objects I can't collide with, collectables, and a score too, but there isn't much of a game here.

I wonder if I can make the other objects collide with each other.
Nope. I tried adding more variables, and repeating if statements, but it got too messy and it still didn't work for all of them. I'm missing something here.

I wonder if I can make the player switch automatically after 3 seconds.
I can do that... but they don't all collide with each other and I really wish they did. That would provide more obstacles in the race for the food.

This is where I got stuck this week.

## Final Thoughts

I felt like I am beginning to set up my final game project this week, or else studying for my final project. A lot of these game mechanics, like collecting and collisions will be used in my final project. I am very excited to study phaser.io and make some of these ideas simplier, so I can focus on the gameplay and interactive storytelling parts.
