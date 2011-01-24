function Bullet(x,y,speedx, speedy,width,height,image_name)
{
    this.x=x;
    this.y=y;
    this.speedx=speedx;
    this.speedy=speedy;
    this.width=width;
    this.height=height;
    this.image_name=image_name;
    this.Draw=function()
    {
        var bullet=new Image();
        bullet.src=this.image_name;

        context.drawImage(bullet,0,0,width,height,this.x,this.y,width,height);
    };
    this.Update=function()
    {
        this.x+=this.speedx;
        this.y+=this.speedy;
    };
}
