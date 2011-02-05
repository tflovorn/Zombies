window.addEventListener("load", Init_Game, false);

var WIDTH = 800, HEIGHT = 480,
    canvas, context,
    keyEnum, keyArray,
    bullet_array, bullet_image,
    zombie_array, player;

function Init_Game() {
    canvas = document.getElementById("game_canvas");
    context = canvas.getContext("2d");
            
    keyEnum = { W_Key:0, A_Key:1, S_Key:2, D_Key:3, Space_Key:4};
    keyArray=new Array(5);
    keyArray[0]=false;
    keyArray[1]=false;
    keyArray[2]=false;
    keyArray[3]=false;
    keyArray[4]=false;
            
    bullet_array = [];
    bullet_image = new Image();
    bullet_image.src = "images/bullet.png";

    zombie_array=new Array(100);
    var zombie;
    for (var i=0;i<10;++i)
    {
        for (var j=0;j<10;++j)
        {
            zombie=new Character(i * 100, j * 100, 0, 0, 50, 50, 1/(i+j) + .1, 
                                 "images/zombie.png");
            zombie_array[i*10+j]=zombie;
        }
    }
    player=new Character(100, 300, 0, 0, 50, 50, 3, "images/player.png");
            
    window.addEventListener("keydown",doKeyDown,true);
    window.addEventListener("keyup",doKeyUp,true);

    setInterval("Draw()", 10);
    setInterval("Update()", 10);
}

function Update()
{
    // setting player.drawx/drawy changes direction player image is facing
    if(keyArray[keyEnum.W_Key])
    {
        if (player.y - player.speed > 0){
            player.y -= player.speed ;
        }
        player.drawx=0;
        player.drawy=50;
    }
    else if(keyArray[keyEnum.S_Key])
    {
        if (player.y + player.speed  < HEIGHT){
            player.y += player.speed ;
        }
        player.drawx=0;
        player.drawy=0;
    }
    else if(keyArray[keyEnum.A_Key])
    {
        if (player.x - player.speed  > 0){
            player.x -= player.speed ;
        }
        player.drawx=0;
        player.drawy=100;
    }
    else if(keyArray[keyEnum.D_Key])
    {
        if (player.x + player.speed  < WIDTH){
            player.x += player.speed ;
        }
        player.drawx=0;
        player.drawy=150;
    }
    if(keyArray[keyEnum.Space_Key])
    {
        var bullet;
        switch (player.direction) {
            case "north":
                bullet=new Bullet(player.x, player.y, 0, -5, 5, 5, 
                                  "images/bullet.png");
                break;
            case "south":
                bullet=new Bullet(player.x, player.y, 0, 5, 5, 5, 
                                  "images/bullet.png");
                break;
            case "west":
                bullet=new Bullet(player.x, player.y, -5, 0, 5, 5, 
                                  "images/bullet.png");
                break;
            case "east":
                bullet=new Bullet(player.x, player.y, 5, 0, 5, 5, 
                                  "images/bullet.png");
                break;
        }
        bullet_array.push(bullet);
    }
    for (var i=0; i < zombie_array.length; ++i)
    {
        zombie_array[i].Update();
    }
    for (var i=0; i < bullet_array.length; ++i)
    {
        bullet_array[i].Update();
        for (var j=0; j < zombie_array.length; ++j)
        {
            if(Intersects(bullet_array[i],zombie_array[j]))
            {
                zombie_array[j].x=-60;
                zombie_array[j].speed=0;
                bullet_array.splice(i, 1);
                break;
            }
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

function doKeyDown(evt){
    switch (evt.keyCode) {
        case 87:  /* W arrow was pressed */
            keyArray[keyEnum.W_Key] = true;
            player.direction="north";
            break;
        case 83:  /* S arrow was pressed */
            keyArray[keyEnum.S_Key] = true;
            player.direction="south";
            break;
        case 65:  /* A key was pressed */
            keyArray[keyEnum.A_Key] = true;
            player.direction="west";
            break;
        case 68:  /* D key was pressed */
            keyArray[keyEnum.D_Key] = true;
            player.direction="east";
            break;
        case 32:  /* Space key was pressed */
            keyArray[keyEnum.Space_Key] = true;
            break;
    }
}
function doKeyUp(evt){
    switch (evt.keyCode) {
        case 87:  /* W arrow was let up */
            keyArray[keyEnum.W_Key] = false;
            break;
        case 83:  /* S arrow was let up */
            keyArray[keyEnum.S_Key] = false;
            break;
        case 65:  /* A key was let up */
            keyArray[keyEnum.A_Key] = false;
            break;
        case 68:  /* D key was let up */
            keyArray[keyEnum.D_Key] = false;
            break;
        case 32:  /* Space key was let up */
            keyArray[keyEnum.Space_Key] = false;
            break;
    }
}
