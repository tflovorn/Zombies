function Init_Game(canvasElement) {
    setInterval("Draw()", 10);
    setInterval("Update()", 10);
}
function Update()
{
    if(keyArray[keyEnum.W_Key] == true)
    {
        if (player.y - player.speed > 0){
            player.y -= player.speed ;
        }
        player.drawx=0;
        player.drawy=50;
    }
    else if(keyArray[keyEnum.S_Key] == true)
    {
        if (player.y + player.speed  < HEIGHT){
            player.y += player.speed ;
        }
        player.drawx=0;
        player.drawy=0;
    }
    else if(keyArray[keyEnum.A_Key] == true)
    {
        if (player.x - player.speed  > 0){
            player.x -= player.speed ;
        }
        player.drawx=0;
        player.drawy=100;
    }
    else if(keyArray[keyEnum.D_Key] == true)
    {
        if (player.x + player.speed  < WIDTH){
            player.x += player.speed ;
        }
        player.drawx=0;
        player.drawy=150;
    }
    if(keyArray[keyEnum.Space_Key] == true)
    {
        switch (player.direction) {
            case "north":
                var bullet=new Bullet(player.x,player.y,0,-5,5,5,"images/bullet.png");
                break;
            case "south":
                var bullet=new Bullet(player.x,player.y,0,5,5,5,"images/bullet.png");
                break;
            case "west":
                var bullet=new Bullet(player.x,player.y,-5,0,5,5,"images/bullet.png");
                break;
            case "east":
                var bullet=new Bullet(player.x,player.y,5,0,5,5,"images/bullet.png");
                break;
        }
        bullet_array[next_bullet++]=bullet;
        
        if(next_bullet==100)
        {
            next_bullet=0;
        }
    }
    for (var i=0;i<100;++i)
    {
        zombie_array[i].Update();
    }
    for (var i=0;i<next_bullet;++i)
    {
        bullet_array[i].Update();
        for (var j=0;j<100;++j)
        {
            if(Intersects(bullet_array[i],zombie_array[j]))
            {
                zombie_array[j].x=-60;
                zombie_array[j].speed=0;
                bullet_array[i].x=-160;
                bullet_array[i].speedx=0;
                bullet_array[i].speedy=0;  
                break;
            }
        }
    }
}
function Draw() {   
    context.clearRect(0, 0, WIDTH, HEIGHT);

    player.Draw();
    for (var i=0;i<100;++i)
    {
        zombie_array[i].Draw();
    }
    for (var i=0;i<next_bullet;++i)
    {
        bullet_array[i].Draw();
    }
}

function Intersects(first,second)
{
    if(first.x+first.width<second.x || first.x>second.x+second.width
        || first.y+first.height<second.y || first.y>second.y+second.height)
    {
        return false;
    }
    else
    {
        return true;
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
