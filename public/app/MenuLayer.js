cc.dumpConfig();

var SysMenu = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
        	//var layer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 600, 600);
            //background
        	/*var sp = cc.Sprite.create(res.bg3_jpg);
            sp.setAnchorPoint(0,0);
            this.addChild(sp, 0, 1);*/
            var circleSpeed = 2;
            
            winSize = cc.Director.getInstance().getWinSize();
        	var newGameNormal = cc.Sprite.create(res.menu_png, cc.rect(0, 0, 126, 33));
            var newGameSelected = cc.Sprite.create(res.menu_png, cc.rect(0, 33, 126, 33));
            var newGameDisabled = cc.Sprite.create(res.menu_png, cc.rect(0, 33 * 2, 126, 33));

            var gameSettingsNormal = cc.Sprite.create(res.menu_png, cc.rect(126, 0, 126, 33));
            var gameSettingsSelected = cc.Sprite.create(res.menu_png, cc.rect(126, 33, 126, 33));
            var gameSettingsDisabled = cc.Sprite.create(res.menu_png, cc.rect(126, 33 * 2, 126, 33));

            var aboutNormal = cc.Sprite.create(res.menu_png, cc.rect(252, 0, 126, 33));
            var aboutSelected = cc.Sprite.create(res.menu_png, cc.rect(252, 33, 126, 33));
            var aboutDisabled = cc.Sprite.create(res.menu_png, cc.rect(252, 33 * 2, 126, 33));

            var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, function () {
                    this.onButtonEffect();
                    this.onNewGame();
              }.bind(this));
            var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
            var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

            //menu
            var menu = cc.Menu.create(newGame, gameSettings, about);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
            menu.setPosition(winSize.width / 2, winSize.height / 2 - 80);

            //logo
            var logo = cc.Sprite.create(res.logo2_png);
            logo.setAnchorPoint(0, 0);
            logo.setPosition(winSize.width /2 - 160 ,winSize.height / 2 + 10);
            this.addChild(logo, 10, 1);
            this.schedule(this.update, 0.1);
            for(i=0;i<5;i++){
                var greenCircle = cc.Sprite.create(res.greencircle_png);
                var randomDir = Math.random()*2*Math.PI;
                greenCircle.xSpeed=circleSpeed*Math.cos(randomDir);
                greenCircle.ySpeed=circleSpeed*Math.sin(randomDir);
                this.addChild(greenCircle);
                greenCircle.setPosition(new cc.Point(Math.random()*winSize.width,Math.random()*winSize.height));
                greenCircle.schedule(function(){
                     this.setPosition(new cc.Point(this.getPosition().x+this.xSpeed,this.getPosition().y+this.ySpeed));
                     if(this.getPosition().x>winSize.width){
                        this.setPosition(new cc.Point(this.getPosition().x-winSize.width,this.getPosition().y));
                    }
                    if(this.getPosition().x<0){
                        this.setPosition(new cc.Point(this.getPosition().x+winSize.width,this.getPosition().y));
                    }
                    if(this.getPosition().y>winSize.height){
                        this.setPosition(new cc.Point(this.getPosition().x ,this.getPosition().y-winSize.height));
                    }
                    if(this.getPosition().y<0){
                        this.setPosition(new cc.Point(this.getPosition().x ,this.getPosition().y+winSize.height));
                    }
                })
            }
            if (MW.SOUND) {
                cc.AudioEngine.getInstance().setMusicVolume(0.7);
                cc.AudioEngine.getInstance().playMusic(res.background_mp3, true);
            }
            bRet = true;
        }
        return bRet;
    },
    onNewGame:function (pSender) {
        //load resourcess
        cc.LoaderScene.preload(g_maingame, function () {
            var scene = cc.Scene.create();
            scene.addChild(CircleChainGame.create());
            //scene.addChild(GameControlMenu.create());
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        }, this);
    },
    onSettings:function (pSender) {
        this.onButtonEffect();
        var scene = cc.Scene.create();
        scene.addChild(SettingsLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    onAbout:function (pSender) {
        this.onButtonEffect();
        var scene = cc.Scene.create();
        scene.addChild(AboutLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
   /* update:function () {
        if (this._ship.getPosition().y > 480) {
            var pos = cc.p(Math.random() * winSize.width, 10);
            this._ship.setPosition( pos );
            this._ship.runAction( cc.MoveBy.create(
                parseInt(5 * Math.random(), 10),
                cc.p(Math.random() * winSize.width, pos.y + 480)));
        }
    },*/
    onButtonEffect:function(){
        if (MW.SOUND) {
            var s = cc.AudioEngine.getInstance().playEffect(res.effect2_mp3);
        }
    }
});
SysMenu.create = function () {
    var sg = new SysMenu();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

SysMenu.scene = function () {
    var scene = cc.Scene.create();
    var layer = SysMenu.create();
    console.log(layer);
    scene.addChild(layer);
    return scene;
};