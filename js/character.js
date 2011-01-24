function Character(x,y,drawx,drawy,speed,image_name)
{
    this.x=x;
    this.y=y;
    this.drawx=drawx;
    this.drawy=drawy;
    this.speed=speed;
    this.image_name=image_name;
    this.Draw=function()
    {
        var character=new Image();
        character.src=this.image_name;

        context.drawImage(character,this.drawx,this.drawy,50,50,this.x,this.y,50,50);
    };
    this.Update=function()
    {
        if (player.x>this.x)
        {
            this.x+=this.speed;
            this.drawx=0;
            this.drawy=150;
        }
        else if (player.x<this.x)
        {
            this.x-=this.speed;
            this.drawx=0;
            this.drawy=100;
        }
        if (player.y>this.y)
        {
            this.y+=this.speed;
            this.drawx=0;
            this.drawy=0;
        }
        else if (player.y<this.y)
        {
            this.y-=this.speed;
            this.drawx=0;
            this.drawy=50;
        }
    };
}
