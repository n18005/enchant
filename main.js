window.focus();

enchant();
// ページが読み込まれたときに実行される処理
window.onload = function()
{
    var game = new Game(320, 320);
    game.fps = 16;
    // 画像の読み込み処理
    game.preload(
        './assets/images/chara1.png',
        './assets/images/hiyoko.png',
        './assets/images/icon1.png');
    game.keybind(' '.charCodeAt(0), 'a');
    var kuma = null;
    // ゲームの処理
    game.onload = function()
    {
        var bgA = new Sprite(320,320);
        game.rootScene.addChild(bgA);
        kuma = new Sprite(32,32);
        kuma.image = game.assets['./assets/images/chara1.png'];
        kuma.frame = 6;
        kuma.x = 60;
        kuma.y = 230;
        game.rootScene.addChild(kuma);
            var hiyoko = new koke();
        // 定期処理
        game.rootScene.addEventListener('enterframe', function()
        {
            if(hiyoko.x < 0){
           game.end();
            };
            // １秒に１回ターゲット出現 
            // if(game.frame%game.fps ===0)
            if(game.input.a)
            {
                var mato = new Target();
            }
            
            // kokeクラスとTargetクラスの衝突判定
            koke.intersect(Target).forEach(function(pair)
            {
                //pair[0]: kokeのインスタンス
                //pair[1]: Targetのインスタンス
                //game.rootScene.removeChild(pair[0]);
                hiyoko.hp -= 1;
                console.log(hiyoko.hp);
                hiyoko.x += 5;
                game.rootScene.removeChild(pair[1]);
            });

            if(hiyoko.hp<= 0){
                game.rootScene.removeChild(hiyoko);
                game.end();
            };
        });
    };
    
    // ゲームの処理をスタート
    game.start();
    
    // ひよこクラス
    var koke = Class.create(Sprite, {initialize:function(){
        Sprite.call(this,32,32);
        this.hp = 500;
       this.x =400;
       this.y = 200;
        this.image = game.assets['./assets/images/hiyoko.png'];
        game.rootScene.addChild(this);
        // 定期処理
        this.addEventListener('enterframe', function(){
            this.x -= 5;
        });
    }});
    // ターゲットクラス
    var Target = Class.create(Sprite, {initialize:function(){
        Sprite.call(this,32,32);
        
        this.image = game.assets['./assets/images/chara1.png'];
        this.frame = 1;
        game.rootScene.addChild(this);
        
        // 出現位置
        this.x = 0; 
        this.y =  200;
        
        // 移動処理
        this.addEventListener('enterframe', function(){
           this.x += 2;
           if(this.x < 0) game.rootScene.removeChild(this);
        });
    }});
  
};
