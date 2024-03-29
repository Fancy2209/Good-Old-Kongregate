// ==UserScript==
// @name         Good Old Kongregate
// @namespace    http://tampermonkey.net/
// @version      0.75
// @description  Gone but not forgotten
// @author       Fancy2209, Matrix4348
// @match         *://www.kongregate.com/*
// @icon         https://cdn1.kongcdn.com/compiled-assets/favicos/favico-196-de563d6c4856efb7ac5060666510e5e50b2382593b724b802a6c6c53c1971e8c.png
// @grant        none
// @run-at       document-start
// @require      https://code.jquery.com/jquery-1.9.1.js
// @connect      github.com
// ==/UserScript==

function TimeToLogin(){
    function updatePlaylist() {
        if(!active_user.playLatersCount){
            active_user.playLatersCount=function(){ return 0; }
        }
        var e = active_user.playLatersCount();
        $$(".play-laters-count-link").each(function (t) {
            (t.title = e + " games in your playlist."), t.down(".play-laters-count").update(e);
        });
    }
    function updateFavorites() {
        var e = active_user.favoritesCount();
        $$(".favorites-count-link").each(function (t) {
            (t.title = e + " favorites."), t.down(".favorites-count").update(e);
        });
    }
    function updateFriendInfo(e) {
        e.select(".friends_online_count").each(function (e) {
            e.update(active_user.friendsOnlineCount());
        }),
            active_user.friendsOnlineCount() > 0
            ? e.select(".friends_online_link").each(function (e) {
            e.title = active_user.friendsOnlineNames();
        })
        : e.select(".friends_online_link").each(function (e) {
            e.title = "No friends online.";
        });
    }

    var go=0, t = $("welcome");
    if(typeof(active_user)!="undefined"){
        if (active_user.isAuthenticated() && t!=null){ go=1; }
    }
    if(go){
        var e = active_user.getAttributes();
        updateFriendInfo(t), updatePlaylist(), updateFavorites();
        var n = new Element("img").writeAttribute({ id: "welcome_box_small_user_avatar", src: e.avatar_url, title: e.username, name: "user_avatar", alt: "Avatar for " + e.username, height: 28, width: 28 });
        t.down("span#small_avatar_placeholder").update(n),
            t.select(".facebook_nav_item").each(function (e) { active_user.isFacebookConnected() && e.hide(); }),
            $("mini-profile-level").writeAttribute({ class: "spritesite levelbug level_" + e.level, title: "Level " + e.level }),
            active_user.populateUserSpecificLinks(t),
            t.select(".username_holder").each(function (e) { e.update(active_user.username()); });
        var a = active_user.unreadShoutsCount() + active_user.unreadWhispersCount() + active_user.unreadGameMessagesCount();
        a > 0 &&
            ($("profile_bar_messages").addClassName("alert_messages"),
             $("profile_control_unread_message_count").update(a),
             $("profile_control_unread_message_count").addClassName("mls has_messages"),
             $("my-messages-link").setAttribute("title", active_user.unreadShoutsCount() + " shouts, " + active_user.unreadWhispersCount() + " whispers"),
             0 !== active_user.unreadWhispersCount()
             ? $("my-messages-link").setAttribute("href", "/accounts/" + active_user.username() + "/private_messages")
             : 0 !== active_user.unreadGameMessagesCount() && $("my-messages-link").setAttribute("href", "/accounts/" + active_user.username() + "/game_messages")),
            null !== active_user.chipsBalance() , ($("blocks_balance").update(active_user.chipsBalance()), $("blocks").show()),
            $("guest_user_welcome_content").hide(),
            $("nav_welcome_box").show();
    }
    else{ setTimeout(function(){ TimeToLogin(); },10000); }
}

function ReopenChat(A){
    var go=0;
    if(typeof(holodeck)!="undefined" && document.getElementById("chat_tab")!=null){
        if(holodeck.ready){ go=1; }
    }
    if(go){ document.getElementById("chat_tab").style.display="";}
    else if(A){ setTimeout(function(B){ ReopenChat(B); },1000, A-1); }
}

function fill_games_tab(A){
    if(typeof(navigationData)!="undefined"){
        if(navigationData.user.authenticated){
            document.getElementById("GOK_recently_played").setAttribute("href",navigationData.user.recently_played_path);
            var l=navigationData.games.recently_played.length;
            if(l>0){
                document.getElementById("GOK_no_recently_played_game").style.display="none";
                document.getElementById("GOK_recently_played_1").style.display="";
                document.getElementById("GOK1_image").setAttribute("src",navigationData.games.recently_played[0].icon_path);
                document.getElementById("GOK1_name").innerText=navigationData.games.recently_played[0].title;
                document.getElementById("GOK_recently_played_1").setAttribute("href",navigationData.games.recently_played[0].game_path);
                for(let k=1; k<l; k++){
                    document.getElementById("GOK_recently_played_"+(k+1)).setAttribute("href",navigationData.games.recently_played[k].game_path);
                    document.getElementById("GOK_recently_played_"+(k+1)).innerText=navigationData.games.recently_played[k].title;
                    document.getElementById("GOK_recently_played_"+(k+1)).style.display="";
                }
            }
            /*document.getElementById("GOK_playlist").setAttribute("href",navigationData.user.playlist_path);
            var p=navigationData.games.playlist.length;
            if(p>0){
                document.getElementById("GOK_no_playlist").style.display="none";
                document.getElementById("GOK_playlist_1").style.display="";
                document.getElementById("GOK_playlist_1_image").setAttribute("src",navigationData.games.playlist[0].icon_path);
                document.getElementById("GOK_playlist_1_name").innerText=navigationData.games.playlist[0].title;
                document.getElementById("GOK_playlist_1").setAttribute("href",navigationData.games.playlist[0].game_path);
                for(let k=1; k<p; k++){
                    document.getElementById("GOK_playlist_"+(k+1)).setAttribute("href",navigationData.games.playlist[k].game_path);
                    document.getElementById("GOK_playlist_"+(k+1)).innerText=navigationData.games.playlist[k].title;
                    document.getElementById("GOK_playlist_"+(k+1)).style.display="";
                }
            }
            else{ document.getElementById("GOK_no_playlist_text").innerText="Add games to play them later."; }*/
        }
    }
    else if(A){ setTimeout(function(B){ fill_games_tab(B); },1000, A-1); }
}

function replace_css(){
    var N=document.head.getElementsBySelector('link[rel="stylesheet"]');
    for(let n of N){
        if(n.href.search("gamepage_merged")>-1 && n.getAttribute("data-turbo-track")=="reload"){
            n.remove();
            let goodKongCSS = document.createElement('link');
            goodKongCSS.rel = 'stylesheet';
            goodKongCSS.setAttribute('data-turbo-track', 'reload');
            goodKongCSS.href = 'https://fancy2209.github.io/KOG/GamePage.css';
            document.head.appendChild(goodKongCSS);
        }
        else if(n.href.search("application_merged")>-1 && n.getAttribute("data-turbo-track")=="reload"){
            n.remove();
            let goodKongCSS = document.createElement('link');
            goodKongCSS.rel = 'stylesheet';
            goodKongCSS.setAttribute('data-turbo-track', 'reload');
            goodKongCSS.href = 'https://fancy2209.github.io/KOG/Main.css';
            document.head.appendChild(goodKongCSS);
        }
        else if(n.href.search("application-")>-1 && n.getAttribute("data-turbo-track")=="reload"){
            n.remove();
        }
    }
}

function replace_favicon(){
    var I=document.head.getElementsBySelector('link[rel="icon"]');
    for(let i of I){
        if(i.type=="image/svg+xml"){ i.href = "https://github.com/Fancy2209/Good-Old-Kongregate/raw/main/Icon/icon.svg"; }
        else{ i.href = "https://raw.githubusercontent.com/Fancy2209/Good-Old-Kongregate/main/Icon/kong.png"; }
    }
}

function ThingsToDoAtTheEnd(){
    ReopenChat(50);
};

(function() {
    'use strict';

    // Find the Things

    const headerWrap = GM_getResourceText("");
    const footer = ``;
    const homepage_primarywrap =``;

    var v1=0, v2=0, v3=0, v4=0, v5=0, v6=0, v7=0, v8=0, v9=0, v10=0;
    var targetNode = document;
    var config = { childList: true, subtree: true };
    var callback = (mutationList, observer) => {
        for (let mutation of mutationList) {
            for(let node of mutation.addedNodes){
                for (let mutation of mutationList) {
                    if (mutation.type === 'childList') {
                        for(let node of mutation.addedNodes){
                            if(v1==0 && node.tagName=="K-NAVBAR"){
                                v1=1;
                                let n=document.createElement("div");
                                n.id="headerwrap";
                                n.innerHTML = headerWrap;
                                node.parentElement.insertBefore(n, node);
                                node.remove();
                                TimeToLogin();
                                fill_games_tab(50);
                                replace_css();
                                replace_favicon();
                            }
                            else if(v1==1 && node.tagName=="K-NAVBAR"){
                                node.remove();
                            }
                            else if(v2==0 && node.id=="footer" && node.tagName=="K-FOOTER"){
                                v2=1;
                                let n=document.createElement("div");
                                n.id="footer";
                                n.addClassName("clearfix");
                                n.innerHTML = footer;
                                node.parentElement.insertBefore(n, node);
                                node.remove();
                            }
                            else if (v3==0 && 0==1){
                                v3=1;
                                // FREE
                            }
                            else if (v4==0 && 0==1){
                                v4=1;
                                // FREE
                            }
                            else if(v5==0 && node.id=="floating_game_holder"){ // MORE WORK NEEDED TO FIX CHANGEs FROM DECEMBER 14TH!
                                v5=1;
                                document.getElementById("floating_game_holder").parentNode.style.backgroundColor="#2b2b2b";
                            }
                            else if(v6==0 && 0==1){
                                v6=1;
                                // FREE
                            }
                            else if(v7==0 && 0==1){
                                v7=1;
                                // FREE
                            }
                            else if(v8==0 && document.URL=="https://www.kongregate.com/" && node.tagName=="MAIN"){
                                v8=1;
                                let pw=document.createElement("div");
                                pw.id="primarywrap";
                                pw.addClassName("divider");
                                pw.innerHTML=homepage_primarywrap;
                                node.parentElement.insertBefore(pw, node);
                                node.remove();
                            }
                            else if(v9==0 && node==document.body && document.getElementById("home")){
                                v9=1;
                                node.classList.remove('lang_other', 'lang_en');
                                node.classList.add('new_home', 'no_subwrap', 'grid960');
                            }
                            else if(v10==0 && (node.src||"").search("konstruct.min.js")>-1){
                                v10=1;
                                node.remove();
                            }
                        }
                    }
                }
            }
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    ThingsToDoAtTheEnd();

})();
