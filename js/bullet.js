/* 
 * Copyright (c) 2011 Jacob Hartin, Stephen Longfield, Tim Lovorn
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

function Bullet(x, y, target_x, target_y, speed, width, height, image_name)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image_name = image_name;
    // calculate speed vector
    direction_x = target_x - this.x;
    direction_y = target_y - this.y;
    direction_norm = Math.sqrt(Math.pow(direction_x, 2) + 
                               Math.pow(direction_y, 2));
    this.speedx = speed * direction_x / direction_norm;
    this.speedy = speed * direction_y / direction_norm;

    this.Draw = function()
    {
        context.drawImage(bullet_image, 0, 0, width, height, this.x, this.y, 
                          width, height);
    };

    this.Update = function()
    {
        this.x += this.speedx;
        this.y += this.speedy;
    };
}
