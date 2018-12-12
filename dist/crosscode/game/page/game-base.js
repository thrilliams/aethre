(function(){
    var INDIE_GOGO_URL = "https://www.indiegogo.com/projects/crosscode";


    window.SHOW_GAMECODE = function(){
        if(window.ig && window.ig.system){
            var dom = $('<div class="gameOverlayBox gamecodeMessage" ><h3>Enter Bonus Code</h3></div>');
            var form = $('<form><input type="text" name="gamecode" value="" /><input type="submit" name="send" value="Submit" /><form>');
            dom.append(form);
            form.submit(function(){
                try{
                    sc.submitGameCode(form[0].gamecode.value);
                    ig.system.regainFocus();
                }
                catch(e){

                }
                return false;
            });

            $(document.body).append(dom);
            window.setTimeout(function(){
                dom.addClass("shown");
            }, 20);
            ig.system.setFocusLost();

            var close = function(){
                dom.remove();
            }
            ig.system.addFocusListener(close);
            form.find("input[type=text]").focus();
        }
    };

    var twitterAccounts = [
        {twitter: "RadicalFishGame", what: "Official Account"},
        {twitter: "lachsen", what: "Creative Direction, Programming"},
        {twitter: "RadicalRegiden", what: "Level Design, Programming"},
        {twitter: "GFluegel", what: "Quest Design"},
        {twitter: "interovgm", what: "Music"},
        {twitter: "Teflonator", what: "Sound Design"},
        {twitter: "ThomasFroese", what: "Pixel Art (Effects & Animations)"},
        {twitter: "ma_jrv", what: "Pixel Art (Environment)"},
        {twitter: "VintalValentin", what: "Pixel Art (Environment)"},
        {twitter: "Indofrece", what: "Concept Art"}


    ]

    window.SHOW_TWITTER = function(){
        if(window.ig && window.ig.system){
            var dom = $('<div class="gameOverlayBox twitterMessage" ><h3>Follow us on Twitter!</h3></div>');
            var list = $('<ul></ul>');
            for(var i = 0; i < twitterAccounts.length; ++i){
                var entry = twitterAccounts[i];
                list.append($('<li><a href="https://www.twitter.com/' + entry.twitter + '" target="_blank">@'
                + entry.twitter + '</a> - ' + entry.what + '</li>'));
            }
            dom.append(list);

            var form = $('<form><input type="submit" name="send" value="Close" /><form>');
            dom.append(form);
            form.submit(function(){
                ig.system.regainFocus();
                return false;
            });


            $(document.body).append(dom);
            window.setTimeout(function(){
                dom.addClass("shown");
            }, 20);
            ig.system.setFocusLost();

            if(typeof process !== "undefined" && process.versions['node-webkit']){
                list.find('a[target=_blank]').on('click', function(){
                   require('nw.gui').Shell.openExternal( this.href );
                   return false;
                });
            }



            var close = function(){
                dom.remove();
            }
            ig.system.addFocusListener(close);
            form.find("input[type=submit]").focus();
        }
    };

    window.SHOW_SCREENSHOT = function(imageSrc){
        if(window.ig && window.ig.system){
            var dom = $('<div class="gameOverlayBox screenshotMessage" ><h3>Screenshot</h3></div>');
            var img = $('<img>');
            img.attr('src',imageSrc);
            dom.append(img);
            dom.append($("<p>Right click to copy image.</p>"));

            $(document.body).append(dom);
            window.setTimeout(function(){
                dom.addClass("shown");
            }, 20);
            ig.system.setFocusLost();

            var close = function(){
                dom.remove();
            }
            ig.system.addFocusListener(close);
        }
    };


    window.SHOW_INDIEGOGO = function(){
        if(window.ig && window.ig.system){
            var dom = $('<div class="gameOverlayBox indiegogoMessage" ><h3>We need your support to release CrossCode!</h3></div>');
            dom.append($('<a href="" class="indiegogo logo" ><span>Indiegogo Logo</span></a>'));
            dom.append($("<p>We can only promise a <b>2016 release</b> if we <b>reach our funding goal.</b></p>"));
            dom.append($('<div><a href="" class="bigButton indiegogo" >To Indiegogo</a><a href="" class="bigButton back" >Return to Game</a></div>'));

            dom.find(".back").click(function(){ig.system.regainFocus(); return false});

            var indiegogoLink = dom.find(".indiegogo");
            if(window.require){
                var gui = require('nw.gui');
                indiegogoLink.click(function(){
                    gui.Shell.openExternal(INDIE_GOGO_URL);
                    return false;
                });
            }
            else{
                indiegogoLink.attr('href', INDIE_GOGO_URL);
                indiegogoLink.attr('target',"_blank");
            }



            $(document.body).append(dom);
            window.setTimeout(function(){
                dom.addClass("shown");
            }, 20);
            ig.system.setFocusLost();

            var close = function(){
                dom.remove();
            }
            ig.system.addFocusListener(close);


        }


    }

    window.GAME_ERROR_CALLBACK = function(e, info, gameInfo){
        var infos = [];
        for(var name in info){
            infos.push(name + ": [" + info[name] + "]");
        }
        var infoText = infos.join(", ");


        var gameInfos = "\n\n--- GAME INFO ---\n\n";
        for(var name in gameInfo){
            gameInfos += "[" + name + "]\n" + gameInfo[name] + "\n\n";
        }

        var message = e.message;
        var stack = e.stack;
        var details = infoText + "\n\n" + stack + gameInfos;

        var dom = $('<div class="errorMessage" ><h3></h3><p class="top"></p><textarea readonly ></textarea><p class="bottom"></p></div>');
        dom.find("h3").text("CRITICAL BUG!");
        dom.find("p.top").html("Yepp, the game pretty much <b>crashed</b>. We're sorry!<br>" +
        '<b>Want to help</b>? Please write us a mail to <a href="mailto:feedback@radicalfishgames.com">feedback@radicalfishgames.com</a>, tell us where it happened and add the following details:');
        var textarea = dom.find("textarea");
        textarea.text(details);
        textarea.click(function() { $(this).select(); } );
        dom.find("p.bottom").html("Thanks! We'll do our best to fix those issues for future versions.");
        var button = $('<a href="javascript:window.location.reload()" class="bigButton" >Restart the Game</a>');
        dom.append(button);

        $(document.body).append(dom);
        window.setTimeout(function(){
            dom.addClass("shown");
        }, 20);
    }

    window.SHOW_SAVE_DIALOG = function(currentSaveData){
        if(window.ig && window.ig.system){
            var dom = $('<div class="gameOverlayBox saveMessage" ><h3>Save Import/Export</h3></div>');
            dom.append($("<p>Current Save Slot Data</p>"));
            var textarea = $("<textarea readonly></textarea>");
            textarea.text(currentSaveData || "--- No Data Available ---");
            textarea.click(function() { $(this).select(); } );
            dom.append(textarea);
            dom.append($("<p>Import Save Slot</p>"));
            var form = $('<form><textarea name="import" ></textarea><input type="submit" name="send" value="Submit" /><form>');
            var importText = form.find("textarea");
            dom.append(form);
            form.submit(function(){
                try{
                    sc.submitSaveImport(form[0].import.value);
                    alert("Import Successful!");
                }
                catch(e){
                    alert("Import failed: " + e.message);
                }
                ig.system.regainFocus();
                return false;
            });

            $(document.body).append(dom);
            window.setTimeout(function(){
                dom.addClass("shown");
            }, 20);
            ig.system.setFocusLost();

            var close = function(){
                dom.remove();
            }
            ig.system.addFocusListener(close);
            form.find("input[type=text]").focus();
        }
    };

}());

