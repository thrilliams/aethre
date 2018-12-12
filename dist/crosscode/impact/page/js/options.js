(function(){

    /* Toggle Menus: */

    $(function(){
        var menus = $(".toggleMenu .trigger");
        menus.click(function(){
            $(this).parent().addClass("shown");
            if(window.ig && window.ig.system) ig.system.setFocusLost();
        });
        $("#game").mousedown(function(){
            $(".toggleMenu").removeClass("shown");
        })
    });

    var OPTIONS;
    if(window.IG_LANG == "de_DE"){
        OPTIONS = {
            "Bildschirm" : [
                {name: "x1", key: "opt_screen", value: 0 },
                {name: "x2", key: "opt_screen", value: 1 },
                {name: "fit", key: "opt_screen", value: 2 },
                {name: "stretch", key: "opt_screen", value: 3 }
            ],
            "Grafik" : [
                {name: "sharp", key: "opt_scale", value: "2" },
                {name: "blurry", key: "opt_scale", value: "1" }
            ],
            "Sound" : [
                {slider: "opt_sound", min: "0", max: "1" }
            ],
            "Musik" : [
                {slider: "opt_music", min: "0", max: "1" }
            ]
        };
    }
    else{
        OPTIONS = {
            "Screen" : [
                {name: "x1", key: "opt_screen", value: 0 },
                {name: "x2", key: "opt_screen", value: 1 },
                {name: "fit", key: "opt_screen", value: 2 },
                {name: "stretch", key: "opt_screen", value: 3 }
            ],
            "Graphics" : [
                {name: "sharp", key: "opt_scale", value: "2" },
                {name: "blurry", key: "opt_scale", value: "1" }
            ],
            "Sound" : [
                {slider: "opt_sound", min: "0", max: "1" }
            ],
            "Music" : [
                {slider: "opt_music", min: "0", max: "1" }
            ]
        }
    }

    $(function(){
        var target = $(".optionList");

        for(var name in OPTIONS){
            target.append($("<li><span>" + name + "</span></li>"));
            var sublist = $("<ul></ul>");
            target.append(sublist);
            for(var i = 0; i < OPTIONS[name].length; ++i){
                var entry = OPTIONS[name][i];
                var li;
                if(entry.key){
                    li = $('<li><a class="opt_button '+ entry.key + "_" + entry.value + '" ><span>' + entry.name + '</span></a></li>');
                    li.find("a").click(option_set);
                    li.find("a")[0].key = entry.key;
                    li.find("a")[0].value = entry.value;
                }
                else if(entry.slider){
                    li = initSlider(entry);
                }
                sublist.append(li);
            }
        }
        option_load();
        option_init();
    });

    function initSlider(entry){
        var li = $('<li><div class="slider ' + entry.slider + '"></div></li>');
        var slider = li.find(".slider");
        var button = li.find(".sliderButton");
        var key = entry.slider;

        var updateSlider = function(){
            var value = slider.slider("value");
            slider_set(key, value);
        }

        slider.slider({
            min: entry.min, max: entry.max,
            step: (entry.max - entry.min) / 100,
            range: "min",
            slide: updateSlider,
            change: updateSlider
        });
        return li;
    }

    function option_load(){
        window["IG_GAME_SCALE"] = (localStorage.getItem("options.scale") * 1) || 2;
        window["IG_SCREEN_MODE"] =
            window["IG_SCREEN_MODE_OVERRIDE"] ||
            localStorage.getItem("options.screenMode") ||
            (ig.isPlatform('BROWSER') ? 1 : 2 );
        window["IG_SCREEN_MODE"] = window["IG_SCREEN_MODE"]|0;
        var sound = (localStorage.getItem("options.soundVolume"));
        var music = (localStorage.getItem("options.musicVolume"));
        window["IG_SOUND_VOLUME"] = sound == null || isNaN(sound*1) ? 1 : sound*1;
        window["IG_MUSIC_VOLUME"] = music == null || isNaN(music*1) ? 1 : music*1;
    }
    function option_save(){
        localStorage.setItem("options.scale", window["IG_GAME_SCALE"]);
        localStorage.setItem("options.screenMode", window["IG_SCREEN_MODE"]);
        localStorage.setItem("options.soundVolume", window["IG_SOUND_VOLUME"]);
        localStorage.setItem("options.musicVolume", window["IG_MUSIC_VOLUME"]);
    }

    function option_init(){
        $("#options .opt_scale_" + window["IG_GAME_SCALE"]).addClass("active");
        $("#options .opt_screen_" + window["IG_SCREEN_MODE"]).addClass("active");
        $("#options .opt_sound").slider("value", window["IG_SOUND_VOLUME"]);
        $("#options .opt_music").slider("value", window["IG_MUSIC_VOLUME"]);
        setup_screen();
        setup_sound();
        $(window).resize(setup_screen);
    }

    function setup_screen() {
        if(window.sc && sc.options) {
            sc.options.set("display-type", window["IG_SCREEN_MODE"]);
            sc.options._setDisplaySize();
        } else {
            var width = 0, height = 0;
            var originalWidth = window['IG_WIDTH'], originalHeight = window['IG_HEIGHT'];
            var windowWidth = $(window).width(), windowHeight = $(window).height();
            var hideBorder = false, checkFullPixelAlign = false;
            switch(window["IG_SCREEN_MODE"] * 1) {
                case 0:
                    width = originalWidth;
                    height = originalHeight;

                    break;
                case 1:
                    width = originalWidth * 2;
                    height = originalHeight * 2;
                    break;
                case 2:
                    checkFullPixelAlign = true;
                    if(windowWidth / windowHeight > originalWidth / originalHeight) {
                        height = windowHeight;
                        width = originalWidth * windowHeight / originalHeight;
                    } else {
                        width = windowWidth;
                        height = originalHeight * windowWidth / originalWidth;
                    }
                    hideBorder = true;
                    break;
                case 3:
                    width = windowWidth;
                    height = windowHeight;
                    checkFullPixelAlign = true;
                    hideBorder = true;
                    break;
                default:
                    width = originalWidth;
                    height = originalHeight;
                    break;
            }
            if(checkFullPixelAlign){
                for(var scale = 1; scale < 4; ++scale){
                    if(Math.abs(width - originalWidth*scale) < 4){
                        width = originalWidth * scale;
                        height = originalHeight * scale;
                    }
                }
            }

            if(window.ig && window.ig.system) {
                ig.system['setCanvasSize'](width, height, hideBorder);
            } else {
                $("#canvas").width(width);
                $("#canvas").height(height);
                $("#canvas")[0].className = hideBorder ? 'borderHidden' : '';
            }
        }
    }

    function setup_sound() {
        if(window.ig && window.ig.system) {
            ig.system.setSoundVolume(window["IG_SOUND_VOLUME"]);
            ig.system.setMusicVolume(window["IG_MUSIC_VOLUME"]);
        }
    }

    function option_set() {
        var key = this.key, value = this.value, self= this;
        if(key == "opt_scale"){
            show_warn_dialog("The game needs to reload to change this option. Unsaved data will be lost. Continue?",
                "Reload Game", "Cancel", function(){
                    option_do_set(self, key, value);
                });
        }
        else{
            option_do_set(this, key, value);
        }
    }

    function option_do_set(element, key, value){
        $(element).parents("ul").first().find(".active").removeClass("active");
        $(element).addClass("active");

        if(key == "opt_screen"){
            window["IG_SCREEN_MODE"] = value;
            setup_screen();
        }
        else if(key == "opt_scale"){
            window["IG_GAME_SCALE"] = value * 1;
        }
        option_save();
        if(key == "opt_scale"){
            window.location.reload();
        }
    }


    function slider_set(key, value){
        if(key == "opt_sound"){
            window["IG_SOUND_VOLUME"] = value * 1;
        }
        else if(key == "opt_music"){
            window["IG_MUSIC_VOLUME"] = value * 1;
        }
        setup_sound();
        option_save();
    }

    function clear_warn_dialog(){
        $(".overlay").remove();
        $(".warnMessage").remove();
    }

    function show_warn_dialog(text, confirmText, cancelText, onConfirm, onCancel){
        var overlay = $('<div class="overlay" ></div>');
        $(document.body).append(overlay);
        var warning = $('<div class="warnMessage" ><div>' +
            '<p>' + text + '</p>' +
            '<button type="button" class="confirm" >' + confirmText + '</button>' +
            '<button type="button" class="cancel">' + cancelText + '</button>' +
            '</div></div>');
        warning.find(".confirm").click(function(){
            clear_warn_dialog();
            if(onConfirm) onConfirm();
        });
        warning.find(".cancel").click(function(){
            clear_warn_dialog();
            if(onCancel) onCancel();
        });
        $(document.body).append(warning);
        window.setTimeout(function(){
            warning.addClass("shown");
        }, 10);
    }

    window.IG_OPTIONS = {
        load: option_load,
        save: option_save
    }

})();


var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "OPR",
            identity: "Opera"
        },
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        { 	string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        {		// for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Trident",
            identity: "Explorer",
            versionSearch: "rv"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        { 		// for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS : [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iOS"
        },
        {
            string: navigator.userAgent && navigator.userAgent.toLowerCase(),
            subString: "android",
            identity: "Android"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
    ]

};
BrowserDetect.init();


