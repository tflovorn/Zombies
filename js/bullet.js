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
        context.drawImage(bullet_image, 0, 0, width, height, this.x, this.y, 
                          width, height);
    };
    this.Update=function()
    {
        this.x+=this.speedx;
        this.y+=this.speedy;
    };
}
