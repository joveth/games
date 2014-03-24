var AboutLayer = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            /*var sp = cc.Sprite.create(res.loading_png);
            sp.setAnchorPoint(0,0);
            this.addChild(sp, 0, 1);*/

            var cacheImage = cc.TextureCache.getInstance().addImage(res.menuTitle_png);
            var title = cc.Sprite.createWithTexture(cacheImage, cc.rect(0, 36, 100, 34));
            title.setPosition( winSize.width / 2, winSize.height - 160 );
            this.addChild(title);

            // There is a bug in LabelTTF native. Apparently it fails with some unicode chars.
            var about = cc.LabelTTF.create("Circle chain game create by jov.\n QQ:247911950 \n Email:jov123@163.com \n Git:", "Arial", 16, cc.size(winSize.width * 0.85, 320), cc.TEXT_ALIGNMENT_CENTER );
            about.setPosition(winSize.width / 2,  winSize.height/2 -20 );
            about.setAnchorPoint(0.5, 0.5 );
            this.addChild(about);

            var label = cc.LabelTTF.create("Go back", "Arial", 18);
            var back = cc.MenuItemLabel.create(label, this.onBackCallback);
            var menu = cc.Menu.create(back);
            menu.setPosition( winSize.width / 2, winSize.height/2 -100);
            this.addChild(menu);
            bRet = true;
        }

        return bRet;
    },
    onBackCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(SysMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

AboutLayer.create = function () {
    var sg = new AboutLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};