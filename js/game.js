window.addEventListener("load", Init_Game, false);

var WIDTH = 800, HEIGHT = 480,
    canvas, context, keyDict,
    bullet_array, bullet_image, zombie_array, player,
    mouse_x, mouse_y, mouse_down, score = 0, can_shoot=true;

function Init_Game() {
    if (!document.createElement('canvas').getContext) {
        alert("This browser doesn't support canvas!");
        return;
    }
    canvas = document.getElementById("game_canvas");
    context = canvas.getContext("2d");
    context.font = 'bold 30px sans-serif';
    context.textBaseline = 'top';
    context.fillStyle = '#000000';
    
    mouse_down = false;

    keyDict = {};
            
    bullet_array = [];

    bullet_image = new Image();
    bullet_image.src = "images/bullet.png";
    var player_image = new Image();
    player_image.src = "images/player.png";
    var zombie_image = new Image();
    zombie_image.src = "images/zombie.png";

    zombie_array = [];
    var zombie;
    for (var i=0;i<10;++i)
    {
        for (var j=0;j<10;++j)
        {
            zombie=new Character(i * 100, j * 100, 0, 0, 50, 50, 1/(i+j) + .1, 
                                 zombie_image);
            zombie_array.push(zombie);
        }
    }
    player=new Character(100, 300, 0, 0, 50, 50, 3, player_image);
    player.direction = "south";
            
    window.addEventListener("keydown",doKeyDown,true);
    window.addEventListener("keyup",doKeyUp,true);
    window.addEventListener("mousedown", doMouseDown, false);
    window.addEventListener("mouseup", doMouseUp, false);
    window.addEventListener("mousemove", doMouseMove, false);

    setInterval("Draw()", 10);
    setInterval("Update()", 10);
}

function Update()
{
    // setting player.drawx/drawy changes direction player image is facing
    if(keyDict["W"] || keyDict["UP"])
    {
        if (player.y - player.speed > 0){
            player.y -= player.speed ;
        }
        player.drawx=0;
        player.drawy=50;
    }
    else if(keyDict["S"] || keyDict["DOWN"])
    {
        if (player.y + player.height + player.speed < HEIGHT){
            player.y += player.speed ;
        }
        player.drawx=0;
        player.drawy=0;
    }
    else if(keyDict["A"] || keyDict["LEFT"])
    {
        if (player.x - player.speed > 0){
            player.x -= player.speed ;
        }
        player.drawx=0;
        player.drawy=100;
    }
    else if(keyDict["D"] || keyDict["RIGHT"])
    {
        if (player.x + player.width + player.speed < WIDTH){
            player.x += player.speed ;
        }
        player.drawx=0;
        player.drawy=150;
    }
    if (mouse_down && can_shoot)
    {
        var bullet = new Bullet(player.x + player.width / 2, 
                                player.y + player.height / 2, 
                                mouse_x, mouse_y, 5, 5, 5, "images/bullet.png");
        bullet_array.push(bullet);
	can_shoot=false;
	setTimeout( function(){can_shoot=true;},100);
    }
    for (var i=0; i < zombie_array.length; ++i)
    {
        zombie_array[i].Update();
    }
    for (var i=0; i < bullet_array.length; ++i)
    {
        bullet_array[i].Update();
        var bullet_alive = true;
        // check for zombie intersections
        for (var j=0; j < zombie_array.length; ++j)
        {
            if(Intersects(bullet_array[i],zombie_array[j]))
            {
                // remove the zombie
                zombie_array[j].x=-60;
                zombie_array[j].speed=0;
                // remove the bullet
                bullet_array.splice(i, 1);
                bullet_alive = false;
        		//increase score
		        score += 10;
                break;
            }
        }
        if (!bullet_alive) continue;
        // check if the bullet has gone out of bounds
        if ((bullet_array[i].x < 0) || (bullet_array[i].x > WIDTH) ||
            (bullet_array[i].y < 0) || (bullet_array[i].y > HEIGHT))
        {
            // remove the bullet
            bullet_array.splice(i, 1);
        }
    }
    
}

function Draw() {   
    context.clearRect(0, 0, WIDTH, HEIGHT);

    player.Draw();
    for (var i=0;i < zombie_array.length; ++i)
    {
        zombie_array[i].Draw();
    }
    for (var i=0;i < bullet_array.length; ++i)
    {
        bullet_array[i].Draw();
    }

    context.fillText("Score: " + score, 10, 10);
}

function Intersects(first,second)
{
    if((first.x<second.x+second.width) && (first.x+first.width>second.x)
        && (first.y<second.y+second.height) && (first.y+first.height>second.y))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function doKeyDown(evt) {
    keyDict[getKeyValue(evt).toUpperCase()] = true;
}

function doKeyUp(evt) {
    keyDict[getKeyValue(evt).toUpperCase()] = false;
}

// Extract the string corresponding to the key pressed.
function getKeyValue(keyEvent) {
    var keyCode;
    // IE support
    if (keyEvent.which == undefined) {
        keyCode = keyEvent.keyCode;
    }
    // everyone else
    else {
        keyCode = keyEvent.which;
    }
    // special keys
    switch (keyCode) {
        // 37-40 [ascii %, &, ', (] are mapped to arrow keys
        case 37:
            return "LEFT";
        case 38:
            return "UP";
        case 39:
            return "RIGHT";
        case 40:
            return "DOWN";
    }
    // normal key
    return String.fromCharCode(keyCode);
}

// mouse button just went down
function doMouseDown(mouseEvent) {
    mouse_down = true;
}

// mouse button just went up
function doMouseUp(mouseEvent) {
    mouse_down = false;
}

// mouse changed position
function doMouseMove(mouseEvent) {
    var mouse_pos = getCursorPosition(mouseEvent);
    mouse_x = mouse_pos[0];
    mouse_y = mouse_pos[1];
}

// Code pulled straight from Dive Into HTML5 (Halma)
// Unsure which browsers don't support pageX/pageY.
function getCursorPosition(mouseEvent) {
    var x, y;
    if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
        x = mouseEvent.pageX;
        y = mouseEvent.pageY;
    }
    else {
        x = mouseEvent.clientX + document.body.scrollLeft 
                + document.documentElement.scrollLeft;
        y = mouseEvent.clientY + document.body.scrollTop 
                + document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    return [x, y];
}
