
var redCircle;
var gameLayer;
var bulletSpeed=5;
var greenCircleArray=new Array();
var size ;
var cnt = 0;
var CircleChainGame = cc.Layer.extend({
    init:function(){
        cnt = 0;
        MW.SCORE = 0;
        var ret = false;
        
            this._super();
            // set mouse click event on;
            this.setMouseEnabled(true);
            // the default ball's speed;
            var circleSpeed = 2;
            MW.SCORE = 0;
            cnt = 0;
            size= cc.Director.getInstance().getWinSize();
            gameLayer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), size.width, size.height);
            greenCircleArray = new Array();
            // give 10 ball's when begin;
            for(i=0;i<MW.DEFAULT_CIRCLE;i++){
                var greenCircle = cc.Sprite.create("res/greencircle.png");
                greenCircleArray.push(greenCircle);
                var randomDir = Math.random()*2*Math.PI;
                greenCircle.xSpeed=circleSpeed*Math.cos(randomDir);
                greenCircle.ySpeed=circleSpeed*Math.sin(randomDir);
                gameLayer.addChild(greenCircle);
                greenCircle.setPosition(new cc.Point(Math.random()*size.width,Math.random()*size.height));
                greenCircle.schedule(function(){
                     this.setPosition(new cc.Point(this.getPosition().x+this.xSpeed,this.getPosition().y+this.ySpeed));
                     if(this.getPosition().x>size.width){
                        this.setPosition(new cc.Point(this.getPosition().x-size.width,this.getPosition().y));
                    }
                    if(this.getPosition().x<0){
                        this.setPosition(new cc.Point(this.getPosition().x+size.width,this.getPosition().y));
                    }
                    if(this.getPosition().y>size.height){
                        this.setPosition(new cc.Point(this.getPosition().x ,this.getPosition().y-size.height));
                    }
                    if(this.getPosition().y<0){
                        this.setPosition(new cc.Point(this.getPosition().x ,this.getPosition().y+size.height));
                    }
                })
            }
            console.log("Total:"+greenCircleArray.length);
            redCircle=cc.Sprite.create("res/redcircle.png");        
            gameLayer.addChild(redCircle);
            this.addChild(gameLayer);
            /*var itemStartGame = cc.MenuItemImage.create(
                    "res/btnStartGameNor.png",
                    "res/btnStartGameDown.png",
                    this.menuCallBack,
                    this
            );

            itemStartGame.setPosition(size.width/2, 160);
            var menu = cc.Menu.create(itemStartGame);
            menu.setPosition(0,0);
            this.addChild(menu);*/
            ret =  true;
        return true;
    },
    onMouseDown:function (event) {
        cnt++;
        /*if(cnt>2||greenCircleArray.length==0){
            this.setMouseEnabled(false);
            MW.SCORE = 20 -greenCircleArray.length;
            this.runAction(cc.Sequence.create(
                cc.DelayTime.create(0.2),
                cc.CallFunc.create(this.onGameOver, this)));
            console.log(cnt);
            console.log(greenCircleArray.length);
        }*/
        if(cnt>3||greenCircleArray.length==0){
            this.setMouseEnabled(false);
            MW.SCORE = MW.DEFAULT_CIRCLE - greenCircleArray.length;
            this.runAction(cc.Sequence.create(
            cc.DelayTime.create(0.2),
            cc.CallFunc.create(this.onGameOver, this)));
            return;
        }
        var location = event.getLocation();
        gameLayer.removeChild(this.redCircle);
        for(i=0;i<4;i++){
            var redBullet = cc.Sprite.create("res/redbullet.png");
            redBullet.xSpeed=bulletSpeed*Math.cos(i*Math.PI/2);
            redBullet.ySpeed=bulletSpeed*Math.sin(i*Math.PI/2);
            gameLayer.addChild(redBullet);    
            redBullet.setPosition(location);
            redBullet.schedule(function(){
                /*this.setPosition(new cc.Point(this.getPosition().x+this.xSpeed,this.getPosition().y+this.ySpeed));
                if(this.getPosition().x>500 || this.getPosition().y>500 || this.getPosition().x<0 || this.getPosition().y<0){
                    gameLayer.removeChild(this);
                }*/
                handleBullet(this); 
            })
        }
    },
    onMouseMoved:function(event){
        var location = event.getLocation();
        redCircle.setPosition(location);
    },
    menuCallBack:function(sender){
        
    },
    onGameOver:function () {
        var scene = cc.Scene.create();
        scene.addChild(GameOver.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});
function handleBullet(bullet){
    bullet.setPosition(new cc.Point(bullet.getPosition().x+bullet.xSpeed,bullet.getPosition().y+bullet.ySpeed));
    if(bullet.getPosition().x>size.width || bullet.getPosition().y>size.height || bullet.getPosition().x<0 || bullet.getPosition().y<0){
        gameLayer.removeChild(bullet);
    }
    for(i=greenCircleArray.length-1;i>=0;i--){
        var distX=bullet.getPosition().x-greenCircleArray[i].getPosition().x;
        var distY=bullet.getPosition().y-greenCircleArray[i].getPosition().y;
        if(distX*distX+distY*distY<144){
            gameLayer.removeChild(bullet);
            for(j=0;j<4;j++){
                var greenBullet = cc.Sprite.create("res/greenbullet.png");
                greenBullet.xSpeed=bulletSpeed*Math.cos(j*Math.PI/2);
                greenBullet.ySpeed=bulletSpeed*Math.sin(j*Math.PI/2);
                gameLayer.addChild(greenBullet);    
                greenBullet.setPosition(new cc.Point(greenCircleArray[i].getPosition().x,greenCircleArray[i].getPosition().y));
                greenBullet.schedule(function(){
                    handleBullet(this);    
                })    
            }
            gameLayer.removeChild(greenCircleArray[i]);
            greenCircleArray.splice(i,1);
            console.log(i+"ii");
            console.log(cnt);
            console.log(greenCircleArray.length);
            if(cnt>2||greenCircleArray.length==0){
                return ;
            }
        }
    }
};
/*var circleChainScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new circleChainGame();
        layer.init();
        this.addChild(layer);
    }
});*/
CircleChainGame.create = function () {
    var sg = new CircleChainGame();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

CircleChainGame.scene = function () {
    var scene = cc.Scene.create();
    var layer = CircleChainGame.create();
    scene.addChild(layer);
    return scene;
};