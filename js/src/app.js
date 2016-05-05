
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        cc.log("Sample Startup")

        this.createTestMenu();

        var winsize = cc.winSize;

        var logo = new cc.Sprite("res/Logo.png");
        var logoSize = logo.getContentSize();
        logo.x = logoSize.width / 2;
        logo.y = winsize.height - logoSize.height / 2;
        this.addChild(logo);

        return true;
    },

    createTestMenu:function() {
        sdkbox.PluginOneSignal.init();
        sdkbox.PluginOneSignal.setListener({

        });

        sdkbox.PluginOneSignal.setSubscription(true);
        sdkbox.PluginOneSignal.setEmail("test@example.com");
        sdkbox.PluginOneSignal.sendTag("keyjs", "valuejs");
        sdkbox.PluginOneSignal.sendTag("keyjs1", "valuejs1");
        sdkbox.PluginOneSignal.getTags();
        sdkbox.PluginOneSignal.deleteTag("keyjs");
        sdkbox.PluginOneSignal.idsAvailable();
        sdkbox.PluginOneSignal.enableInAppAlertNotification(true);
        sdkbox.PluginOneSignal.promptLocation();

        var self = this;
        self.postNotificationTest = function() {
            var data = {
                "contents": {
                    "en": "Js test message"
                },
                "include_player_ids": [
                    "4db7cb0f-daca-49d6-b3dd-a96774de9f72",
                    "33ad9d96-df00-42a2-b5ab-73417f777d42",
                    "5ea075c5-016d-4f55-891c-3b6c4b393e49"
                ],
                "data": {
                    "foo": "bar"
                }
            };
            console.log(JSON.stringify(data));
            sdkbox.PluginOneSignal.postNotification(JSON.stringify(data));
        };

        self.postNotificationTest();

        var menu = new cc.Menu();

        var item1 = new cc.MenuItemLabel(new cc.LabelTTF("post notification js", "sans", 28), function() {
            self.postNotificationTest();
        });
        menu.addChild(item1);

        var winsize = cc.winSize;
        menu.x = winsize.width / 2;
        menu.y = winsize.height / 2;
        menu.alignItemsVerticallyWithPadding(20);
        this.addChild(menu);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
