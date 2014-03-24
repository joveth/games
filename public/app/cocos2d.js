var MW = MW || {};
(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk: false, 
        showFPS:false,
        frameRate:60,
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'cocos2d/',
        appFiles:['app/Resource.js','app/GameConfig.js','app/MenuLayer.js','app/CircleChain.js',
                    'app/AboutLayer.js','app/GameOver.js'
                    ]
    };
    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        s.src =  'cocos2d/jsloader.js';
        d.body.appendChild(s);
        document.ccConfig  = c;
        s.id = 'cocos2d-html5';
    });
})();