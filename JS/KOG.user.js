// ==UserScript==
// @name         Good Old Kongregate
// @namespace    http://tampermonkey.net/
// @version      0.61
// @description  Gone but not forgotten
// @author       Fancy2209, Matrix4348
// @match         *://www.kongregate.com/*
// @icon         https://cdn1.kongcdn.com/compiled-assets/favicos/favico-196-de563d6c4856efb7ac5060666510e5e50b2382593b724b802a6c6c53c1971e8c.png
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';

  // Find the Things

  var customFavicon = document.createElement('link');
  customFavicon.type = 'image/png';
  customFavicon.rel = 'icon';
  customFavicon.href = 'https://raw.githubusercontent.com/Fancy2209/Good-Old-Kongregate/main/Icon/kong.png'; // Replace with the URL of your custom favicon

  var goodKongCSS = document.createElement('link');
  goodKongCSS.rel = 'stylesheet';
  goodKongCSS.setAttribute('data-turbo-track', 'reload');

  const headerWrap = `
<!--============ #header ============-->
<div id="header">
  <div id="header_logo">
  <h3 id="playing"><strong>8,218</strong> people online playing <strong>128,477</strong> free games!</h3>
  <h2 title="Kongregate">
<a class="spritesite spriteall" title="Kongregate" id="kong_header_link" href="https://www.kongregate.com/">Kongregate</a>
</h2>
</div>

  <div id="new_nav_wrapper">

<!-- Welcome Start -->
<div id="welcome">

<!-- User Welcome Start -->
<ul id="nav_welcome_box" class="welcome-user" style="display:none">
<!-- Mini Profile Start -->
<li class="profile profile_control">
<a href="https://www.kongregate.com/accounts/Guest">
  <span id="small_avatar_placeholder"></span>
  <span class="username_holder"></span> <span id="mini-profile-level"></span>
</a>    </li>
<!-- Mini Profile End -->
<!-- Playlist Start -->
<li class="playlist">
<a class="play-laters-count-link" href="https://www.kongregate.com/my_playlist">
  <span aria-hidden="true" class="kong_ico mrs">p</span><span class="play-laters-count">0</span>
</a>    </li>
<!-- Playlist End -->
<!-- Favorites Start -->
<li class="favorites">
<a class="favorites-count-link" href="https://www.kongregate.com/accounts/Guest/favorites">
  <span aria-hidden="true" class="kong_ico mrs">l</span><span class="favorites-count">0</span>
</a>    </li>
<!-- Favorites End -->
<!-- Friends Start -->
<li class="friends_online friends">
<a class="friends_online_link" href="https://www.kongregate.com/accounts/Guest/friends">
  <span aria-hidden="true" class="kong_ico mrs">f</span><span class="friends_online_count"></span>
</a>    </li>
<!-- Friends End -->
<!-- Messages Start -->
<li class="messages">
<a class="my-messages" id="my-messages-link" href="https://www.kongregate.com/accounts/Guest/messages">        <span id="profile_bar_messages">
    <span aria-hidden="true" class="kong_ico">m</span><span id="profile_control_unread_message_count" class="msg-count"></span>
  </span>
</a>    </li>
<!-- Messages End -->
<!-- Settings Start -->
<li class="settings profile_control">
<span aria-hidden="true" class="kong_ico">s</span>
<ul>
  <li>
    <a href="https://www.kongregate.com/accounts/Guest/edit">Settings</a>
  </li>
  <li>
    <a id="welcome_box_sign_out" href="#" onclick="signoutFromSite(); return false;">Sign Out</a>
    <script>
//<![CDATA[
      function signoutFromSite() {
        $('welcome_box_sign_out_indicator').show();
        $('welcome_box_sign_out').hide();

        var fb_uid = active_user.getAttributes().facebook_uid,
            fb_auth_response = fb_uid && FB.getAuthResponse();

        if (fb_auth_response && fb_auth_response.userID == fb_uid) {
          FB.logout(function() { signoutFromSite(); });
          return false;
        }

        new Ajax.Request("/session", {
          method: 'delete',
          onComplete: function(request) {
            var newLoc = request.responseJSON.path;

            if (newLoc != document.location) {
              document.location = newLoc;
            } else {
              document.location.reload();
            }
          }
        });

        return false;
      }

//]]>
</script>          <span id="welcome_box_sign_out_indicator" class="spinner spinner_inverse" style="display:none" title="loading…">​</span>
  </li>
</ul>
</li>
<!-- Settings End -->
</ul>
<!-- User Welcome End -->

<!-- Guest Welcome Start -->
<div id="guest_user_welcome_content" class="welcome-guest regtextSml" style="">
<form id="nav_sign_in" onsubmit="if(window.DynamicFrameTarget){ new DynamicFrameTarget({form: this, callback: user_status.sessionStatus});}" action="https://www.kongregate.com/session" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="7MNLS7SbhmwyZG7/uDUqOhGx4iBUFcBMiRJBHfE8b5c5jwNgs72IDYFW5o+TYdq6+zzRiEE6lsuVGr13IVQMjQ==">

<input type="hidden" name="from_welcome_box" id="from_welcome_box" value="true">
<a title="Sign in with Facebook" class="facebook_signin_small sprite_facebook mrs" onclick="new FacebookAuthenticator({}); return false;" href="#">Sign in</a>
  <strong><a class="js-activate-inline-registration" href="#">Register</a></strong>
or
<label for="welcome_username_label">Sign in:</label>
<span class="fields">
  <span class="field">
    <label id="welcome_username_label" for="welcome_username" class="text_label" style="">Username or email</label>
    <input type="text" name="username" id="welcome_username" value="" title="Username or email" tabindex="3" class="text_field">
  </span>
  <span class="field">
    <label id="welcome_password_label" for="welcome_password" class="text_label" style="">Password</label>
    <input type="password" name="password" id="welcome_password" value="" title="Password" tabindex="4" class="text_field">
  </span>
  <input type="submit" value="Sign In" tabindex="5" id="welcome_box_sign_in_button" class="submit spriteall spritesite" onclick="try{}catch(e){};if(!this.elem_welcome_box_sign_in_button){this.elem_welcome_box_sign_in_button=$('welcome_box_sign_in_button');this.spin_welcome_box_sign_in_button=$('welcome_box_sign_in_button_spinner');this.restore=function(t){return function(){t.elem_welcome_box_sign_in_button.show();t.spin_welcome_box_sign_in_button.hide();Event.stopObserving(window, 'unload', t.restore);}}(this);}this.elem_welcome_box_sign_in_button.hide();this.spin_welcome_box_sign_in_button.show();Event.observe(window, 'unload', this.restore);"><span id="welcome_box_sign_in_button_spinner" class="spinner spinner_inverse" style="display:none" title="loading…">​</span>
  <span id="remember_holder" style="display:none;">
    <input type="checkbox" name="remember_me" id="welcome_remember_me" value="true" class="imgMini" tabindex="6" checked="checked"> <label for="welcome_remember_me" id="welcome_remember_label" class="bd">Remember me</label>
  </span>
  <span id="forgot_holder" style="display:none;">
    <a class="password_recovery" tabindex="7" href="#" onclick="active_user.activatePasswordRecovery();; return false;">Forgot password?</a>
  </span>
</span>
</form>  </div>
<!-- Guest Welcome End -->

</div>
<!-- Welcome End -->


<ul class="main_navigation js-nav">
<!-- Start Games -->
<li id="main_nav_games" class="main_nav_item guest">
<a class="main_nav_top_item" href="https://www.kongregate.com/games">Games</a>
<div class="main_nav_menu" style="left: -583.433px; width: 1536px;"><div class="main_nav_menu_inner">

<!-- Recent Games Start -->
<div id="main_nav_games_im_playing" class="main_nav_category my_games_block mrl">
<strong class="game_block_link">
<a href="" data-metric-tracker="js-wa-tc-Navigation-Recently_Played"><tr8n translation_key_id="7532" id="4807e18418b9a568274a246a5cf46b5d">Recently Played »</tr8n></a>
</strong>

<a class="no_games_block" href="https://www.kongregate.com/games">
<span class="plus kong_ico" aria-hidden="true">+</span>
<strong class="title"><tr8n translation_key_id="4769" id="b048eb653574275ade0a3a0f8e3ccec7">Recently Played Games</tr8n></strong>
<span class="desc"><tr8n translation_key_id="7429" id="2042ef2dfbc1df02c574f00b2063a484">Start playing now.</tr8n></span>
</a>


</div>
<!-- Recent Games End -->
<!-- Recommended Games Start -->
<div id="main_nav_recommended_games" class="main_nav_category my_games_block mrl">
<strong class="game_block_link">
<a href="" data-metric-tracker="js-wa-tc-Navigation-Recommended"><tr8n translation_key_id="7430" id="47a7290cf0c4e3789335f6f622a9fd4c">My Recommended »</tr8n></a>
</strong>

<a class="no_games_block" href="https://www.kongregate.com/games">
  <span class="plus kong_ico" aria-hidden="true">+</span>
  <strong class="title"><tr8n translation_key_id="4682" id="d55e2658c6436b84daaf2004789d2023">Recommended Games</tr8n></strong>
  <span class="desc"><tr8n translation_key_id="7429" id="2042ef2dfbc1df02c574f00b2063a484">Start playing now.</tr8n></span>
</a>

</div>
<!-- Recommended Games End -->
<!-- Playlist Games Start -->
<div id="main_nav_my_playlist" class="main_nav_category my_games_block mrl">
<strong class="game_block_link">
<a href="" class="js-wa-tc-Navigation-Playlist"><tr8n translation_key_id="7431" id="d09ef4787d5e3c0182b7048923d4f3da">My Playlist »</tr8n></a>
</strong>
<a class="no_games_block js-activate-inline-registration" href="#">
<span class="plus kong_ico" aria-hidden="true">+</span>
<strong class="title"><span class="icon kong_ico" aria-hidden="true">p</span> <tr8n translation_key_id="6448" id="6ffe6d4f4800e3db93218cc72e5ef57d">My Playlist</tr8n></strong>
<span class="desc"><tr8n translation_key_id="7432" id="0d41cf5977b5fa2c321f4b936fd2e377">Register to save games to play later.</tr8n></span>
</a>
</div>
<!-- Playlist Games End -->


<!-- Categories Start -->
<dl id="main_nav_games_categories" class="main_nav_category">
<dt class="main_nav_category_title pbs"><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/games"><tr8n translation_key_id="4807" id="2862bedfd879c3e77bcf3c6f7e316c64">Categories</tr8n></a></dt>
<dd class="mtm">
<ul class="main_nav_category_list">
<li class="featured"><a data-metric-tracker="js-wa-tc-Navigation-Feature" href="https://www.kongregate.com/top-rated-games"><tr8n translation_key_id="4828" id="d760a8e9c05f22489e400f153123ea74">Top Rated</tr8n></a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/action-games"><tr8n translation_key_id="4675" id="7de879de63eac1879d6b22a01629d8b8">Action</tr8n></a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/multiplayer-games"><tr8n translation_key_id="4676" id="6fc7cdec9e54d4dc28874899ce6f3282">Multiplayer</tr8n></a></li>
<li class="featured"><a data-metric-tracker="js-wa-tc-Navigation-Feature" href="https://www.kongregate.com/top-rated-games?sort=newest"><tr8n translation_key_id="8261" id="1dc823e083cd4aa6f232df5b735cb48f">Hot New</tr8n></a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/mmo-games"><tr8n translation_key_id="4815" id="6a828d3342cb6db551dec15b122dc248">MMO</tr8n></a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/adventure-rpg-games"><tr8n translation_key_id="5183" id="e134b45f61a33f4231408c64ff4eb1a2">Adventure &amp; RPG</tr8n></a></li>
<li class="featured">

    <a data-metric-tracker="js-wa-tc-Navigation-Feature" class="js-activate-inline-registration" href="#">
      <span><tr8n translation_key_id="4827" id="c9282553bdba249264f8036eb2028fa2">My Favorites</tr8n></span>
    </a>

</li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/strategy-defense-games"><tr8n translation_key_id="5181" id="8fba9d10e45c3816fa83ed3a98f79c24">Strategy &amp; Defense</tr8n></a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/shooter-games"><tr8n translation_key_id="4672" id="9a9a0e97bf92631df74b693c6135186e">Shooter</tr8n></a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/upgrades-games"><tr8n translation_key_id="4708" id="8d2564251030e2620672229fd1e48a8e">Upgrades</tr8n></a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/tower-defense-games"><tr8n translation_key_id="4763" id="cc86fa28967243b8c989ff0a1563075f">Tower Defense</tr8n></a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/sports-racing-games"><tr8n translation_key_id="6769" id="1782db50f2860b6a686db1688b7c9126">Sports/Racing</tr8n></a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/5-minute-games"><tr8n translation_key_id="4913" id="9728c0927120cc818a1f472fa4039ac9">5 Minute</tr8n></a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/zombie-games"><tr8n translation_key_id="4707" id="6f03cc72aefac9210ffb6942eef4cfc1">Zombie</tr8n></a></li>
<li class="more"><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="https://www.kongregate.com/games"><tr8n translation_key_id="7427" id="b53d385fbd99e2f1e3ed3b3697890cbd">More Categories</tr8n></a></li>
</ul>
</dd>
<dd class="main_nav_sub">
<p class="main_nav_sub_title mbs"><em><tr8n translation_key_id="8262" id="2859792c0789a0161121358f8d091211">For Developers:</tr8n></em></p>
<ul class="main_nav_sub_links">
<li><a data-metric-tracker="js-wa-tc-Navigation-Developers" href="https://www.kongregate.com/games/new"><tr8n translation_key_id="8263" id="f588fd0640156fb6b9a7de8ae8000f0e">Upload your game</tr8n></a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Developers" href="http://developers.kongregate.com/" target="_blank"><tr8n translation_key_id="7426" id="ab4bc56938c0b465ebde30e946f9fab3">Developers Center</tr8n></a></li>
</ul>
</dd>
</dl>
<!-- Categories End -->

</div>
</div>
</li>
<!-- End Games -->

<!-- Start Achievements -->
<li id="main_nav_achievements" class="main_nav_item guest">
<a class="main_nav_top_item" href="https://www.kongregate.com/badges">Achievements</a>
<div class="main_nav_menu" style="left: -583.433px; width: 1536px;"><div class="main_nav_menu_inner">
<!-- BoTD Start -->
<dl id="main_nav_achievements_botd" class="main_nav_category mrl">
<dt class="main_nav_category_title pbs"><a href="https://www.kongregate.com/badges" data-metric-tracker="js-wa-tc-Navigation-Badge_of_the_Day"><tr8n translation_key_id="7900" id="f2fb1c8230059751b989a7e6c6ea1c8d">Badge of the Day »</tr8n></a></dt>
<dd class="mtm">
<p class="h6 intro mbs"><em><tr8n translation_key_id="7433" id="c94274836d3b878f8635c596be052201">Score 2x points</tr8n><span class="powerup_rewards_botd_upsell"> &amp; <strong class="spritesite textreplace"><tr8n translation_key_id="7434" id="492c29f00b8b94d6357fea2b60706fbc">PowerUp</tr8n></strong><tr8n translation_key_id="7435" id="6f4c259259babe3020fbd7af666f99e6"> rewards points</tr8n></span>!</em></p>
<div class="botd_outer media click_box regtextSml">
<div class="badge img mlm">
  <div class="badge_image">
    <a href="https://www.kongregate.com/games/nerdook/i-am-an-insane-rogue-ai" class="badge_link" data-metric-tracker="js-wa-tc-Navigation-Badge_of_the_Day">
      <img alt="Binary Morality" src="https://cdn2.kongcdn.com/badge_icons/0000/2583/rogue_ai_easy.png" class="img">
    </a>
  </div>
  <div class="badge_border">
    <a href="https://www.kongregate.com/games/nerdook/i-am-an-insane-rogue-ai" class="badge_link" data-metric-tracker="js-wa-tc-Navigation-Badge_of_the_Day">
      <span class="incomplete spritegame spriteall">Badge of the Day</span>
    </a>
  </div>
  <div class="badge_of_the_day_overlay">
    <a href="https://www.kongregate.com/games/nerdook/i-am-an-insane-rogue-ai" class="badge_link" data-metric-tracker="js-wa-tc-Navigation-Badge_of_the_Day">
      <span class="spriteall botd_badge_id_1292">Badge of the Day</span>
    </a>
  </div>
</div>
<p class="bd">
  <strong><a href="https://www.kongregate.com/games/nerdook/i-am-an-insane-rogue-ai" class="game_link click_link" data-metric-tracker="js-wa-tc-Navigation-Badge_of_the_Day">Binary Morality</a></strong>
  Complete a level through both violent and pacifist means in <a href="https://www.kongregate.com/games/nerdook/i-am-an-insane-rogue-ai" data-metric-tracker="js-wa-tc-Navigation-Badge_of_the_Day">I Am An Insane Rogue AI</a>
</p>
</div>
</dd>
</dl>

<!-- BoTD End -->
<!-- Challenge Start -->

<dl id="main_nav_achievements_challenge" class="main_nav_category mrl">
<dt class="main_nav_category_title pbs"><a href="https://www.kongregate.com/current_challenges"><tr8n translation_key_id="5187" id="3f47b3b7f80b1f3553ede8d36f21a9f1">Current Challenge</tr8n> »</a></dt>
<dd class="mtm">
<div class="media click_block">
<a href="https://www.kongregate.com/games/synapticon/spellstone">
  <img alt="Swords and Spells" src="https://cdn3.kongcdn.com/assets/items/0014/9302/swordsandsoulsitem_40x40.png" class="img">
</a>
<p class="bd">
  <strong><a href="https://www.kongregate.com/games/synapticon/spellstone" class="game_link click_link">Swords and Spells</a></strong>
  Complete the third campaign node to unlock the Ragnarok spell in "Swords and Souls"!
</p>
</div>
</dd>
</dl>


<!-- Challenge End -->
<!-- Recently Badged Start -->
<dl id="main_nav_achievements_recent" class="main_nav_category mrl">
<dt class="main_nav_category_title pbs"><a data-metric-tracker="js-wa-tc-Navigation-Recently_Badged" href="https://www.kongregate.com/badges?sort=newest"><tr8n translation_key_id="7436" id="fc67e5f67528c92e4015eb0453c8b7fb">Recently Badged Games</tr8n> »</a></dt>
<dd class="mtm">
<ul class="main_nav_recently_badge_list">

    <li class="game">
<a href="https://www.kongregate.com/games/mrudi/trader-of-stories-chapter-1" class="media" data-metric-tracker="js-wa-tc-Navigation-Recently_Badged">
<img alt="Play Trader of Stories - Chapter 1" src="https://cdn4.kongcdn.com/game_icons/0066/0760/game-icon-kongregate.jpg?i10c=img.resize(width:250)" class="img">
<span class="bd">
<strong class="game_link">Trader of Stories - Chapter 1</strong>
<span class="badge_count"><span class="badge_icon spritesite mrs"></span>1 Badge</span>
</span>
</a>
</li>


    <li class="game">
<a href="https://www.kongregate.com/games/Gibton/apple-worm" class="media" data-metric-tracker="js-wa-tc-Navigation-Recently_Badged">
<img alt="Play Apple Worm" src="https://cdn3.kongcdn.com/game_icons/0065/9998/apple-worm_Kong_250x200.png?i10c=img.resize(width:250)" class="img">
<span class="bd">
<strong class="game_link">Apple Worm</strong>
<span class="badge_count"><span class="badge_icon spritesite mrs"></span>1 Badge</span>
</span>
</a>
</li>


    <li class="game">
<a href="https://www.kongregate.com/games/rzuf79/frog-fable" class="media" data-metric-tracker="js-wa-tc-Navigation-Recently_Badged">
<img alt="Play Frog Fable" src="https://cdn1.kongcdn.com/game_icons/0065/8941/kong_icon.png?i10c=img.resize(width:250)" class="img">
<span class="bd">
<strong class="game_link">Frog Fable</strong>
<span class="badge_count"><span class="badge_icon spritesite mrs"></span>2 Badges</span>
</span>
</a>
</li>


</ul>
</dd>
</dl>
<!-- Recently Badged End -->
<!-- Badges Start -->
<dl id="main_nav_achievements_badges" class="main_nav_category">
<dt class="main_nav_category_title pbs"><a href="https://www.kongregate.com/badges" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7901" id="054590d4aef073d8ef230443545d4380">Badges »</tr8n></a></dt>
<dd class="mtm">
<ul class="main_nav_category_list">
  <li><a href="https://www.kongregate.com/recommended-badges" class="js-activate-inline-registration" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7438" id="9859f3aafcd74c696a79ce257f3b9411">Recommended for Me</tr8n></a></li>
  <li><a href="https://www.kongregate.com/badges?category=action" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7439" id="4858c0ea44fa081c2b98a433e5ed0847">Action Badges</tr8n></a></li>
  <li><a href="https://www.kongregate.com/badges?sort=least_awarded" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7440" id="68c8e9cbdafd71b9e9b069080025c142">Rarest Badges</tr8n></a></li>
  <li><a href="https://www.kongregate.com/badges?category=sports-racing" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7441" id="efecfb8578673700c4b30d0fd48f0e37">Racing Badges</tr8n></a></li>
  <li><a href="https://www.kongregate.com/badges?sort=easiest&amp;filter_by=unearned" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7442" id="71c811dd6b7602f35eedcfbc9eb2ee7b">Easiest Unearned</tr8n></a></li>
  <li><a href="https://www.kongregate.com/badges?category=puzzle" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7443" id="2d708b1a80f5b6d1f1fdbb1bc6e3b785">Puzzle Badges</tr8n></a></li>
  <li><a href="https://www.kongregate.com/badges?sort=newest" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7444" id="2b1df9f5bd73b11e3945d4e9387a5b13">Newest Badges</tr8n></a></li>
  <li class="more"><a href="https://www.kongregate.com/badges" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="5192" id="6815fd55fca416ee4676b660dfc129f4">All Badges</tr8n></a></li>
</ul>
</dd>
</dl>
<!-- Badges End -->
<!-- Quests Start -->
<dl id="main_nav_quests" class="main_nav_category mtl">
<dt class="main_nav_category_title pbs"><a href="https://www.kongregate.com/badge_quests/your_first" data-metric-tracker="js-wa-tc-Navigation-Quests"><tr8n translation_key_id="7902" id="6b749ba95f9b50ca75d5a8b0cfec66d9">Quests »</tr8n></a></dt>
<dd class="mtm">
<ul class="main_nav_category_list">
  <li><a href="https://www.kongregate.com/badge_quests/your_first" data-metric-tracker="js-wa-tc-Navigation-Quests"><tr8n translation_key_id="7445" id="e3705f31a25fb33858729308b23f74f6">All Quests</tr8n></a></li>

</ul>
</dd>
</dl>
<!-- Quests End -->
</div>
</div>
</li>
<!-- End Achievements -->

<!-- Start My Kong -->
<li id="main_nav_mykong" class="main_nav_item guest">
<a class="main_nav_top_item" href="https://www.kongregate.com/community">My Kong</a>
<div class="main_nav_menu" style="left: -583.433px; width: 1536px;">
<div class="main_nav_menu_inner">
<!-- Account Info Start -->
<dl id="main_nav_mykong_activity" class="main_nav_category mrl">
<dt class="main_nav_category_title pbs"><tr8n translation_key_id="7446" id="85519d4cd4c1ead401d71f1858bceacb">Trending with Friends</tr8n></dt>
<dd id="main_nav_activity_upsell" class="mtm">
<p><strong><tr8n translation_key_id="5199" id="fe64e4ecfe0910330496613639d3db60">Activity Feed</tr8n></strong></p>
<p class="media regtextLrg">
  <span class="img kong_ico" aria-hidden="true">g</span>
  <span class="bd"><a href="https://www.kongregate.com/accounts/new"><tr8n translation_key_id="5167" id="be74407479cbeb47bda87703c271b676">Register</tr8n></a><tr8n translation_key_id="7447" id="cca66629ddc45d5fc515c8c815cf244a"> or </tr8n><a href="#" class="js-activate-inline-login"><tr8n translation_key_id="7448" id="9c0695235a34d0a39eaad64474598f49">sign in</tr8n></a><tr8n translation_key_id="7449" id="2a43f38813add6736d2835dcaf51a230"> to start receiving activity updates from around Kongregate!</tr8n></span>
</p>
</dd>
</dl>
<!-- Account Info End -->
<!-- Forums Start -->
<dl id="main_nav_mykong_forums" class="main_nav_category">
<dt class="main_nav_category_title pbs"><a href="https://www.kongregate.com/forums"><tr8n translation_key_id="7903" id="0407960c13a31fbf9f8d2b3e256a6f8d">Forums »</tr8n></a></dt>
<dd class="mtm">
<ul class="main_nav_category_list">
  <li><a data-metric-tracker="js-wa-tc-Navigation-Forums" href="https://www.kongregate.com/forums/1-kongregate">Kongregate</a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Forums" href="https://www.kongregate.com/forums/games">Game Forums</a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Forums" href="https://www.kongregate.com/forums/3-general-gaming">General Gaming</a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Forums" href="https://www.kongregate.com/forums/7-technical-support">Tech Support</a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Forums" href="https://www.kongregate.com/forums/4-game-programming">Game Development</a></li>

  <li class="more"><a class="js-wa-tc-Navigation-Forums" href="https://www.kongregate.com/forums">All Forums</a></li>

</ul>
</dd>
</dl>
<!-- Forums End -->
</div>


</div>
</li>
<!-- End My Kong -->

<!-- Start Dev -->
<li id="main_nav_dev" class="main_nav_item guest">
<a class="main_nav_top_item" href="http://developers.kongregate.com/">Dev</a>
<div class="main_nav_menu" style="left: -583.433px; width: 1536px;">
<div class="main_nav_menu_inner">
<a class="nav--dev-upload" href="https://www.kongregate.com/games/new">Upload Your Game</a>
<p class="nav--dev-tagline">
  <strong>Kongregate is a community-driven browser games portal with an open platform for all web games.</strong>
  Get your games in front of thousands of users while monetizing through ads and virtual goods.
  <a href="https://www.kongregate.com/docs/why-kong/welcome">Learn more »</a>
</p>
<ul class="nav--dev-links">
  <li>
    <a href="http://developers.kongregate.com/">
    <h3>Visit our developers site »</h3>
    <p>Learn more about our publishing program -<br>
      we help game developers get their games out to millions of users on multiple platforms.</p>
</a>        </li>
  <li>
    <a href="https://www.kongregate.com/blog">
    <h3>Read Our Blog »</h3>
    <p>We publish new content weekly, on game/data analysis, case studies, engineering solutions, and design insights.</p>
</a>        </li>
  <li>
    <a href="https://docs.kongregate.com/">
    <h3>Access Documentation »</h3>
    <p>Get everything you need to know about how to implement our APIs and SDKs into your game.</p>
</a>        </li>
</ul>
</div>
</div>
</li>
<!-- End Dev -->

<!-- #search -->
<li class="search" id="search_bar">
<form onsubmit="$('nav_search_submit_button').onclick();" id="search" class="search" action="https://www.kongregate.com/search" accept-charset="UTF-8" method="get"><input name="utf8" type="hidden" value="✓">    <dl>
<dt><div style="position:relative" id="game_title_chooser_outer"><input type="text" name="q" id="game_title" value="" tabindex="1" class="hintable game_title hinted_value" title="Search games &amp; more" autocomplete="off"><div style="display:none;" id="game_title_snapshot" class="game_chooser_selected"></div><div style="z-index: 20000; display: none;" id="game_title_auto_complete" class="game_chooser"></div><script>
//<![CDATA[
var game_title_auto_completer=new Ajax.CachedAutocompleter("game_title","game_title_auto_complete","/games/search?site_search=true",{"paramName":"search","method":"get","onShow":function(element,update){update.show();},"onHide":function(element,update){update.hide();},"minChars":3,"noAutoDefault":false,"forceActivation":true,"frequency":0.1,"callback":function(element,value){return game_indicator(element,value)},"afterUpdateElement":function(element,value){(function(m) { $("nav_search_submit_button").onclick(); game_title_auto_completer.submitted = true; document.location = m.url; })(eval('(' + value.down('.metadata').innerHTML + ')'));}});$('game_title').up('form').observe('submit', function() { if ('' == $('game_title').value) { $('search_game_id').value = ''; }});
//]]>
</script></div></dt>
<dd><input type="submit" value="Search" id="nav_search_submit_button" tabindex="2" class="spritesite" onclick="try{}catch(e){};if(!this.elem_nav_search_submit_button){this.elem_nav_search_submit_button=$('nav_search_submit_button');this.spin_nav_search_submit_button=$('nav_search_submit_button_spinner');this.restore=function(t){return function(){t.elem_nav_search_submit_button.show();t.spin_nav_search_submit_button.hide();Event.stopObserving(window, 'unload', t.restore);}}(this);}this.elem_nav_search_submit_button.hide();this.spin_nav_search_submit_button.show();Event.observe(window, 'unload', this.restore);"><span id="nav_search_submit_button_spinner" class="spinner spinner_inverse" style="display:none" title="loading…">​</span></dd>
</dl>
<script>
//<![CDATA[

game_title_auto_completer.hide = game_title_auto_completer.hide.wrap(
function(hide) {
  Shim.hide('game_title_auto_completer');
  hide();
  $$('.hide_ad_always').invoke('show');
}
);

game_title_auto_completer.show = game_title_auto_completer.show.wrap(
function(show) {
  show();
  $$('.hide_ad_always').invoke('hide');
  Shim.shimElement(this.update, 'game_title_auto_completer');
});

game_title_auto_completer.options.onComplete = game_title_auto_completer.options.onComplete.wrap(function(original, args){
original(args)
this.index = this.entryCount-1;
this.render()
}.bind(game_title_auto_completer))

Event.observe(game_title_auto_completer.element, 'keyup', function(event){
if(!this.active && !this.submitted && event.keyCode == Event.KEY_RETURN){
  document.location = "/search?q=" + $('game_title').getValue()
  event.stop()
} else if(event.keyCode == Event.KEY_BACKSPACE){
  this.index = this.entryCount-1;
  this.render()
}
}.bind(game_title_auto_completer))

game_title_auto_completer.options.noAutoDefault = true

function game_indicator(element,value) {
if (!game_title_auto_completer.active) {
  $$('.game_chooser').first().update($('game_chooser_loading').innerHTML);
  $$('.game_chooser').first().show();
  $$('.game_chooser li.all').first().observe('click', function(e) { $('#search').submit(); });
  $$('.hide_ad_always').invoke('hide');
}
return value;
}

//]]>
</script>  <div id="game_chooser_loading" style="display:none"><ul>
<li class="loading"><div><span class="spinner">​</span></div></li>
<li class="all"><a href="#" onclick="return false;"><span style="display:none"></span><span class="informal"><strong>see more results »</strong>
  <span class="metadata" style="display:none;">{"url":"/search"}</span>
  <div class="clear"></div></span></a>
</li>
</ul>
<span style="display:block;clear:both;"></span>
</div>
</form></li><!-- /#search -->

</ul>
</div>

</div><!--============ /#header ============-->
`;
  const subwrap = `
<!--============ #footer ============-->
<div id="footer" class="clearfix">
  <div class="kongregate-logo mbl"><a class="spriteall spritesite kongregate-logo" href="https://www.kongregate.com/">Kongregate</a></div>
<div class="line">
<div class="unit size1of2">
  <div class="prs">
    <div class="line footer_links">
      <div class="unit size1of3">
        <ul>
          <li>
            <a href="https://www.facebook.com/kongregate">Be a Facebook Fan</a>
            <a class="icon" href="https://www.facebook.com/kongregate">
              <span class="spriteall spritesite facebook_icon"></span>
</a>            </li>
          <li>
            <a href="http://www.twitter.com/kongregate">Follow Us on Twitter</a>
            <a class="icon" href="http://www.twitter.com/kongregate">
              <span class="spriteall spritesite twitter_icon"></span>
</a>            </li>
          <li><a href="https://www.kongregate.com/pages/about">About Us</a></li>
          <li><a href="https://www.kongregate.com/feedbacks/new">Contact Us</a></li>
        </ul>
      </div>
      <div class="unit size1of3">
        <ul class="mhm">
          <li><a target="_blank" href="https://kong.zendesk.com/hc">Help/FAQ</a></li>
          <li><a href="https://www.kongregate.com/pages/conduct">Conduct Guidelines</a></li>
          <li><a href="https://www.kongregate.com/pages/terms">Terms of Service</a></li>
          <li><a href="https://www.kongregate.com/pages/privacy">Privacy Policy</a></li>
        </ul>
      </div>
      <div class="unit size1of3 lastUnit">
        <ul>
          <li><a href="https://www.kongregate.com/games_for_your_site">Games for Your Site</a></li>
          <li><a href="https://www.kongregate.com/pages/logos-and-branding">Link to Kongregate</a></li>
          <li><a href="https://www.kongregate.com/pages/jobs">Job Opportunities</a></li>
          <li><a class="developer_icon spritesite" href="https://www.kongregate.com/games/new">Upload your Game</a></li>
        </ul>
      </div>
    </div>
  </div>
  <dl class="mtl footer_lang_selector">
<dt><strong>Language:</strong></dt>
  <dd class="selector-locale-fr"><a href="https://www.kongregate.com/?set_locale=true" data-lang="fr">Français</a></dd>
  <dd class="selected-locale-fr" style="display:none;"><strong><span class="flag_ico fr_lang spritesite"></span>Français</strong></dd>
  <dd class="selector-locale-en-US" style="display: none;"><a href="https://www.kongregate.com/?set_locale=true" data-lang="en-US">English</a></dd>
  <dd class="selected-locale-en-US"><strong><span class="flag_ico en-US_lang spritesite"></span>English</strong></dd>
  <dd class="selector-locale-de"><a href="https://www.kongregate.com/?set_locale=true" data-lang="de">Deutsch</a></dd>
  <dd class="selected-locale-de" style="display:none;"><strong><span class="flag_ico de_lang spritesite"></span>Deutsch</strong></dd>
</dl>

<script>
//<![CDATA[
$j( document ).ready(function() {
    if(active_user.getsNoTranslations()) return;

    Kongregate.languages = [];

      Kongregate.languages.push({'language': 'Français', 'locale': 'fr', 'default': false});
      Kongregate.languages.push({'language': 'English', 'locale': 'en-US', 'default': true});
      Kongregate.languages.push({'language': 'Deutsch', 'locale': 'de', 'default': false});

     $j('.footer_lang_selector').show();
     $j.each(Kongregate.languages, function(index, value){
      if(active_user.currentLocale() == value.locale) {
         $j('.selector-locale-' + value.locale).hide();
         $j('.selected-locale-' + value.locale).show();
      }
    });

    $j('[class^="selector-locale"] a').each(function(){
      var lang = $j(this).data().lang;
      var origin = $j(location)[0].protocol + "//" + $j(location)[0].host;
      var pathname = $j(location)[0].pathname;
      var queryString = $j(location)[0].search;
      var anchor = $j(location)[0].hash;

      lang = ((lang == 'en-US') ? '' : '/' + lang);

      if (queryString.indexOf('set_locale=true') == -1) {
        queryString += ((queryString.length > 0) ? '&' : '?') + 'set_locale=true';
      }

      var processed = false;

       $j.each(Kongregate.languages, function(index, value){
        if ((!value['default']) && (pathname.indexOf('/' + value.locale) == 0) && (!processed)) {
          pathname = pathname.substring(('/' + value.locale).length, pathname.length);
          processed = true;
        }
      });

      if (page_data.create_error) {
        pathname = pathname + '/new';
      }

      var url = origin + lang + pathname + queryString + anchor;

      this.href = url;
    });
});

//]]>
</script>
</div>
<div class="unit size1of2 lastUnit">
  <div class="plm">
    <h4 class="h4 mbs"><a href="#" onclick="lightbox.prototype.initializePremiumMembershipPurchase('footer'); return false;">Kong Plus</a></h4>
    <div class="media mbm pbm">
      <a class="spriteall spritesite large_kong_plus_icon img mts" data-test="footer-kplus-ico" href="#" onclick="lightbox.prototype.initializePremiumMembershipPurchase('footer'); return false;">Kong Plus</a>
      <p class="bd">
        Get more out of your Kongregate experience.  Take advantage of ad-free gaming, cool profile skins, automatic beta access, and private chat with Kong Plus.
        <a href="#" onclick="lightbox.prototype.initializePremiumMembershipPurchase('footer'); return false;">Learn more »</a>
      </p>
    </div>
  </div>
</div>
</div>

<a class="dev-footer-upsell" href="http://developers.kongregate.com/">
<span class="logo textreplace">Kongregate Develoeprs</span>
<span class="message">Are you a game developer? Visit our <em>Developers Site</em> where you can find documentation on our APIs and more information about publishing opportunities to further promote your game.</span>
<span class="link textreplace">Learn More</span>
</a>
<ul class="footer_sub clearfix">
<li class="kongregate_copyright">
  <span>© 2018 </span>
  <a class="spriteall spritesite" href="https://www.kongregate.com/">Kongregate</a>
</li>
<li class="footer_mtg--logo spritesite textreplace">An MTG company</li>
</ul>

</div>
<!--============ /#footer ============-->
`;
  const homepage_primarywrap =` 
  <div id="primarywrap" class="divider">
  <div id="tr8n_language_selector_trigger"></div>
  <table id="primarylayout" cellpadding="0" cellspacing="0" border="0">
    <tbody><tr>
      <td id="skin_left_of_game"></td>
      <td class="maincontent">
          <div class="mbl" id="kong_home_af_blade_unit" style="display:none">
  <div id="kong_home_af_blade-ad-slot" class="ad-container"><script>
//<![CDATA[
if (!active_user.isPremium()) {
kong_ads.displayAd("kong_home_af_blade");}

//]]>
</script></div>
</div>
<div class="mbl" id="kong_home_af_728x90_unit" style="display:none">
  <div class="horizontal_ad ad hide_ad_always"><span><div id="kong_home_af_728x90-ad-slot" class="ad-container"><script>
//<![CDATA[
if (!active_user.isPremium()) {
kong_ads.displayAd("kong_home_af_728x90");}

//]]>
</script></div></span></div>
</div>

        <div id="global"></div>
        <div id="user_progress_bar_container" class="user_progress_pod_outer" style="display:none;">
<div class="user-progress">
  <p class="progress-box">
    <a id="progress_bar_hide_control" class="close" href=""><span id="user_progress_close" class="icon sprite_new_user textreplace">X</span></a>
    <span id="kongregate_progress_bar_message">
      <span class="text">Complete Initialization <strong>for <a href="/kreds" target="_blank">10 kreds</a></strong></span>
      <span class="kongbot sprite_new_user"></span>
    </span>
    <span id="klient_progress_bar_message" style="display:none;">
      <span class="text text--klient">Complete the
        <!-- Kartridge -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 967.9 230" height="30px" width="120px" alt="Kartridge" class="kartridge">
          <path fill="#FFF" d="M188.9 113.1l59.2-59.7c3.2-3.2.9-8.7-3.6-8.7H188c-1.9 0-3.8.8-5.1 2.1L122.6 108c-1.4 1.4-2.1 3.2-2.1 5.1 0 1.8.7 3.7 2.1 5.1l60.3 61.2c1.4 1.4 3.2 2.1 5.1 2.1h56.5c4.5 0 6.8-5.5 3.6-8.7l-59.2-59.7z"></path>
          <path d="M156.1 89l-23.8 24.1c-2.1 2.1-2.1 5.5 0 7.5l23.8 24V89z" opacity=".2"></path>
          <path fill="#5116DC" d="M156.1 85.3l-23.8 24.1c-2.1 2.1-2.1 5.5 0 7.5l23.8 24V85.3z"></path>
          <path d="M191.9 116.8l57.8-58.2c2.1-2.1 2.7-5.1 1.5-7.9-1.1-2.7-3.7-4.5-6.7-4.5H188c-2.5 0-4.9 1-6.6 2.8l-25.2 25.6V53.4c0-4-3.2-7.2-7.2-7.2h-35.7c-2.5 0-4.9 1-6.7 2.8L78.3 77.3c-.5.4-.9 1-.9 1.7v101.2c0 4 3.2 7.2 7.2 7.2h35.7c2.5 0 4.9-1 6.7-2.8l27.3-27.5 27 27.4c1.8 1.8 4.1 2.8 6.6 2.8h56.5c3 0 5.5-1.7 6.7-4.5 1.1-2.7.6-5.8-1.5-7.9l-57.7-58.1zm55.3 64.5c-.5 1.1-1.5 1.8-2.8 1.8H188c-1.4 0-2.7-.5-3.6-1.5L124 120.4c-1-1-1.5-2.2-1.5-3.6s.5-2.6 1.5-3.6L184.4 52c1-1 2.3-1.5 3.6-1.5h56.5c1.2 0 2.3.7 2.8 1.8s.2 2.4-.6 3.2l-59.2 59.7c-.4.4-.6.9-.6 1.5s.2 1.1.6 1.5l59.2 59.7c.8 1 1 2.3.5 3.4z" opacity=".2"></path>
          <path fill="#5116DC" d="M191.9 113.1l57.8-58.2c2.1-2.1 2.7-5.1 1.5-7.9-1.1-2.7-3.7-4.5-6.7-4.5H188c-2.5 0-4.9 1-6.6 2.8l-25.2 25.6V49.7c0-4-3.2-7.2-7.2-7.2h-35.7c-2.5 0-4.9 1-6.7 2.8L78.3 73.6c-.5.4-.9 1-.9 1.7v101.2c0 4 3.2 7.2 7.2 7.2h35.7c2.5 0 4.9-1 6.7-2.8l27.3-27.5 27 27.4c1.8 1.8 4.1 2.8 6.6 2.8h56.5c3 0 5.5-1.7 6.7-4.5 1.1-2.7.6-5.8-1.5-7.9l-57.7-58.1zm55.3 64.5c-.5 1.1-1.5 1.8-2.8 1.8H188c-1.4 0-2.7-.5-3.6-1.5L124 116.7c-1-1-1.5-2.2-1.5-3.6s.5-2.6 1.5-3.6l60.3-61.2c1-1 2.3-1.5 3.6-1.5h56.5c1.2 0 2.3.7 2.8 1.8s.2 2.4-.6 3.2l-59.2 59.7c-.4.4-.6.9-.6 1.5s.2 1.1.6 1.5l59.2 59.7c.9 1.1 1.1 2.3.6 3.4z"></path>
          <path d="M292.8 153.8V84h14.4v30.4l24-30.4h18l-26.7 33.4 28.5 36.5h-18.6l-25.2-33.2v33.2l-14.4-.1zm81.1 0h-14.8L385.8 84h17.4l26.8 69.8h-14.9l-5.6-15h-30l-5.6 15zM394.4 98l-10.2 27.5h20.3L394.4 98zm74.8 30.8h-10.5v25.1h-14.4V84h27.6c13.6 0 24.7 7.3 24.7 22.1 0 10.3-5.4 16.9-13.1 20l14.8 27.7h-15.7l-13.4-25zm1.5-13.4c5.4 0 11.1-2.4 11.1-9 0-6.7-5.8-8.7-11.2-8.7h-12v17.7h12.1zM530.6 98h-21V84H566v14h-21v55.8h-14.4V98zm73.9 30.8H594v25.1h-14.4V84h27.6c13.6 0 24.7 7.3 24.7 22.1 0 10.3-5.4 16.9-13.1 20l14.8 27.7h-15.7l-13.4-25zm1.5-13.4c5.4 0 11.1-2.4 11.1-9 0-6.7-5.8-8.7-11.2-8.7h-12v17.7H606zm59.4 38.4H651V84h14.4v69.8zm41.9 0h-21.1V84h21.4c24.3 0 39.4 12.8 39.4 34.8 0 20.8-15 35-39.7 35zm.6-56.1h-7.3v42.5h7.1c14.4 0 24.4-7.7 24.4-21.4.1-13.7-10.4-21.1-24.2-21.1zm90.3 57.2c-21.6 0-38.9-16.1-38.9-35.9 0-20.3 16.5-36 36.4-36 17.4 0 28.5 10.2 31.4 21.3l-14.1 4.3c-1.5-6-8-11.9-17.5-11.9-11.8 0-21.5 9.5-21.5 22.2 0 12.1 8.8 22.3 21.5 22.3 9.5 0 16.3-4.9 18-11.8h-21.2v-13.1h36.3v5.4c0 21.8-13.4 33.2-30.4 33.2zm92-70.9v13.6h-31.5v14.2h28.2v13.6h-28.2v15.1h31.7V154h-45.9V84h45.7z" opacity=".2"></path>
          <path fill="#5116DC" d="M292.8 149.9V80h14.4v30.4l24-30.4h18l-26.7 33.4 28.5 36.5h-18.6l-25.2-33.2v33.2h-14.4zm81.1 0h-14.8L385.8 80h17.4l26.8 69.8h-14.9l-5.6-15h-30l-5.6 15.1zM394.4 94l-10.2 27.5h20.3L394.4 94zm74.8 30.8h-10.5v25.1h-14.4V80h27.6c13.6 0 24.7 7.3 24.7 22.1 0 10.3-5.4 16.9-13.1 20l14.8 27.7h-15.7l-13.4-25zm1.5-13.4c5.4 0 11.1-2.4 11.1-9 0-6.7-5.8-8.7-11.2-8.7h-12v17.7h12.1zM530.6 94h-21V80H566v14h-21v55.8h-14.4V94zm73.9 30.8H594v25.1h-14.4V80h27.6c13.6 0 24.7 7.3 24.7 22.1 0 10.3-5.4 16.9-13.1 20l14.8 27.7h-15.7l-13.4-25zm1.5-13.4c5.4 0 11.1-2.4 11.1-9 0-6.7-5.8-8.7-11.2-8.7h-12v17.7H606zm59.4 38.5H651V80h14.4v69.9zm41.9 0h-21.1V80h21.4c24.3 0 39.4 12.8 39.4 34.8 0 20.8-15 35.1-39.7 35.1zm.6-56.2h-7.3v42.5h7.1c14.4 0 24.4-7.7 24.4-21.4.1-13.7-10.4-21.1-24.2-21.1zm90.3 57.3c-21.6 0-38.9-16.1-38.9-35.9 0-20.3 16.5-36 36.4-36 17.4 0 28.5 10.2 31.4 21.3l-14.1 4.3c-1.5-6-8-11.9-17.5-11.9-11.8 0-21.5 9.5-21.5 22.2 0 12.1 8.8 22.3 21.5 22.3 9.5 0 16.3-4.9 18-11.8h-21.2v-13.1h36.3v5.4c0 21.7-13.4 33.2-30.4 33.2zm92-71v13.6h-31.5v14.2h28.2v13.6h-28.2v15.1h31.7V150h-45.9V80h45.7zM901.7 80h8.3v1.5h-3.3v8.9h-1.6v-8.9h-3.3V80h-.1zm19.6 2.9l-3.4 7.6h-1.2l-3.4-7.6v7.6h-1.6V80h2.1l3.5 8 3.5-8h2.2v10.5h-1.6l-.1-7.6z"></path>
        </svg>
      Quest and earn <strong>an exclusive shiny kongpanion + 10 kreds</strong></span>
      <span class="arrow_seperator sprite_new_user"></span>
    </span>
    <span id="user_progress_percentage_number" class="percent"></span>
    <span class="progress" id="user_progress_bar_frame">
      <span id="user_progress_bar" class="bar"></span>
      <span id="user_progress_preview" class="preview">
        <span class="tooltip">15%</span>
        <span class="preview-bar"></span>
      </span>
      <span id="user_progress_reward_image" class="reward sprite_new_user"></span>
      <span id="user_progress_reward_image2" class="reward2 sprite_new_user" style="display:none;"></span>
    </span>
  </p>
  <div id="user_progress_bar_steps_container" class="steps">
    <a id="progress_bar_previous_control" class="prev" href="">« Previous</a>
    <ul id="user_progress_bar_steps" class="step-list"></ul>
    <a id="progress_bar_next_control" class="next" href="">Next »</a>
  </div>
  <div id="user_progress_bar_complete_message" class="congrats-msg">
    <p><strong>Congratulations!</strong> You’ve completed your Kongregate account!</p>
    <p>Keep exploring Kongregate with more <a href="/badges" target="_blank">badges</a> and <a href="/top-rated-games?sort=newest" target="_blank">games</a>!</p>
  </div>
  <div id="user_klient_progress_bar_complete_message" class="congrats-msg--klient">
    <p><strong>Congratulations!</strong> You’ve completed your Kartridge quest!</p>
    <p>Spend your hard earned kreds on some of <a href="/community-favorite-games" target="_blank">these games</a>!</p>
  </div>
</div>
<p id="progress_never_show_again_message" class="remove regtext" style="display:none;">
  Hide the progress bar forever?
  <a id="progress_never_show_again_confirm" class="remove-link" href="">Yes</a>
  <a id="progress_never_show_again_deny" class="remove-link" href="">No</a>
</p>
<script type="text/html" id="user_progress_bar_step_template">
  <li id="#{icon_id}_step" class="#{icon_id}-step step #{klient_step}"><a class="user-step-link" href="#{link_path}"><span class="step-inner"><span class="sprite_new_user icon"></span>#{link_content}</span></a></li>
</script>
</div>

            <h1 class="homepage_title">Kongregate: Play free games online</h1>
<div id="feature">
    
      <div class="home_feat_roll">
<ol class="home_feat_nav">
  <li class="prev"></li>
  <li class="next mls"></li>
</ol>
<ul class="home_feat_items">
        <li data-guest-only="false" data-country-code="non_targeted" data-locale="global" class="home_feat_item featured_content">
  <style> .fr-template-1layer-bg-Kreds { background:#F5BF41 url('https://cdn3.kongcdn.com/assets/files/0002/8834/KONG_Offerwall_2XCopy_FeatureRoll_2880x650_en_none.png') no-repeat 0 50%; } </style> <div class="copy click_box"> <h3 class="textreplace">Kreds</h3> <a href="https://www.kongregate.com/kreds?haref=FR_Kreds" target="_blank" class="click_link">Play Now!</a> </div> <div class="bg fr-template-1layer-bg-Kreds"></div>
</li>

        <li data-guest-only="false" data-country-code="non_targeted" data-locale="global" class="home_feat_item featured_content">
  <style> .fr-template-1layer-bg-RaidHeroesTotalWar { background:#121721 url('https://cdn3.kongcdn.com/assets/files/0002/8818/RHTW.png') no-repeat 0 50%; } </style> <div class="copy click_box"> <h3 class="textreplace">RaidHeroesTotalWar</h3> <a href="https://www.kongregate.com/games/thekastudio/raid-heroes-total-war?haref=FR_RaidHeroesTotalWar" target="_blank" class="click_link">Play Now!</a> </div> <div class="bg fr-template-1layer-bg-RaidHeroesTotalWar"></div>
</li>

        <li data-guest-only="false" data-country-code="non_targeted" data-locale="global" class="home_feat_item featured_content">
  <style> .fr-template-1layer-bg-DungeonCrusherSoulHunters { background:#311B3E url('https://cdn1.kongcdn.com/assets/files/0002/8819/DC.png') no-repeat 0 50%; } </style> <div class="copy click_box"> <h3 class="textreplace">DungeonCrusherSoulHunters</h3> <a href="https://www.kongregate.com/games/towardsmars/dungeon-crusher-soul-hunters?haref=FR_DungeonCrusherSoulHunters" target="_blank" class="click_link">Play Now!</a> </div> <div class="bg fr-template-1layer-bg-DungeonCrusherSoulHunters"></div>
</li>

        <li data-guest-only="false" data-country-code="non_targeted" data-locale="global" class="home_feat_item featured_content">
  <style> .fr-template-1layer-bg-FirestoneIdleRPG { background:#301D48 url('https://cdn4.kongcdn.com/assets/files/0002/8817/kongregateFeaturedBannerHalloween.png') no-repeat 0 50%; } </style> <div class="copy click_box"> <h3 class="textreplace">FirestoneIdleRPG</h3> <a href="https://www.kongregate.com/games/HolydayStudios/firestone?haref=FR_FirestoneIdleRPG" target="_blank" class="click_link">Play Now!</a> </div> <div class="bg fr-template-1layer-bg-FirestoneIdleRPG"></div>

</li>

        <li data-guest-only="false" data-country-code="non_targeted" data-locale="global" class="home_feat_item featured_content">
  <style> .fr-template-1layer-bg-MedievalChronicles7 { background:#C34C46 url('https://cdn1.kongcdn.com/assets/files/0002/8839/SUN_HD.png') no-repeat 0 50%; } </style> <div class="copy click_box"> <h3 class="textreplace"> MedievalChronicles7 </h3> <a href="https://www.kongregate.com/games/VasantJ/medieval-chronicles-7?haref=FR_ MedievalChronicles7" target="_blank" class="click_link">Play Now!</a> </div> <div class="bg fr-template-1layer-bg-MedievalChronicles7"></div>
</li>

        <li data-guest-only="false" data-country-code="non_targeted" data-locale="global" class="home_feat_item featured_content focus">
  <style> .fr-template-1layer-bg-Discord { background:#202939 url('https://cdn1.kongcdn.com/assets/files/0002/8802/frankongstein_feature_roll.png') no-repeat 0 50%; } </style> <div class="copy click_box"> <h3 class="textreplace">Discord</h3> <a href="https://discord.gg/Kongregate" target="_blank" class="click_link">Create a Kongpanion and share with our community!</a> </div> <div class="bg fr-template-1layer-bg-Discord"></div>
</li>

        <li data-guest-only="false" data-country-code="non_targeted" data-locale="global" class="home_feat_item featured_content">
  <style> .fr-template-1layer-bg-BHQ { background:#1B0D28 url('https://cdn2.kongcdn.com/assets/files/0002/8821/getspookywithbhq_banner.png') no-repeat 0 50%; } </style> <div class="copy click_box"> <h3 class="textreplace">BHQ</h3> <a href="https://www.kongregate.com/games/Juppiomenz/bit-heroes?haref=FR_BHQ" target="_blank" class="click_link">Play Now!</a> </div> <div class="bg fr-template-1layer-bg-BHQ"></div>
</li>

        <li data-guest-only="false" data-country-code="non_targeted" data-locale="global" class="home_feat_item featured_content">
  <style> .fr-template-1layer-bg-AnimationThrowdown { background:#A1D6EF url('https://cdn3.kongcdn.com/assets/files/0002/8810/AT_FeatureRoll_2880X650.png') no-repeat 0 50%; } </style> <div class="copy click_box"> <h3 class="textreplace">AnimationThrowdown</h3> <a href="https://www.kongregate.com/games/Throwdown/animation-throwdown?haref=FR_AnimationThrowdown" target="_blank" class="click_link">Play Now!</a> </div> <div class="bg fr-template-1layer-bg-AnimationThrowdown"></div>
</li>

        <li data-guest-only="false" data-country-code="non_targeted" data-locale="global" class="home_feat_item featured_content">
  <style> .fr-template-1layer-bg-MergestKingdom { background:#7275AF url('https://cdn3.kongcdn.com/assets/files/0002/8822/2280x650_kingdom.jpg') no-repeat 0 50%; } </style> <div class="copy click_box"> <h3 class="textreplace">MergestKingdom</h3> <a href="https://www.kongregate.com/games/CleverApps/mergest-kingdom?haref=FR_MergestKingdom" target="_blank" class="click_link">Play Now!</a> </div> <div class="bg fr-template-1layer-bg-MergestKingdom"></div>
</li>

        <li data-guest-only="false" data-country-code="non_targeted" data-locale="global" class="home_feat_item featured_content">
  <style> .fr-template-1layer-bg-Vinterget { background:#7D8A9F url('https://cdn2.kongcdn.com/assets/files/0002/8816/KongregatePic__1_.png') no-repeat 0 50%; } </style> <div class="copy click_box"> <h3 class="textreplace">Vinterget</h3> <a href="https://www.kongregate.com/games/ailwuful/vinterget?haref=FR_Vinterget" target="_blank" class="click_link">Play Now!</a> </div> <div class="bg fr-template-1layer-bg-Vinterget"></div>
</li>

        

  </ul>
</div>

  <!-- Pod Container Start -->
  <div id="home_pods">
    <!-- Blue Bar Start -->
    <div id="flash_messages_target"></div>

    <!-- Blue Bar End -->
    <!-- Hot New Games Start -->
    
<div id="latest_games_pod" class="games_pod js-roller home-pod" pod-name="latest_games" pod-panes-count="6">

<div class="home-pod-header">
<h2 class="home-pod-title">
  
  Hot New Games
  <a href="/top-rated-games?sort=newest">(see all)</a>

</h2>
<span class="pane_dots">
      <span class="spriteall spritesite active_dot dot_0 roller_dot">.</span>
      <span class="spriteall spritesite inactive_dot dot_1 roller_dot">.</span>
    <a href="#" onclick="Roller.rolodex['latest_games'].scrollToPreviousPaneAndStop(); return false;" class="spriteall spritesite roller_button roller_previous">Previous</a>
    <a href="#" onclick="Roller.rolodex['latest_games'].scrollToNextPaneAndStop(); return false;" class="spriteall spritesite roller_button roller_next">Next</a>
</span>
</div>

<div id="latest_games" class="games_pod_scrollable_container">
<div id="latest_games_scrollable" class="games_pod_scrollable js-roller-scrollable">
    <div class="ind_pane loaded">
        
          
  
<div data-game-impression-game-id="299519" data-game-impression-unit-type="latest_games" data-game-impression-position="0" data-game-impression-depth="0" class="game js-game-hover">
  <a class="hover_game_info" href="https://www.kongregate.com/games/HolydayStudios/firestone?haref=HP_HNG_firestone">
    <img class="game_icon image" title="" alt="Play Firestone Idle RPG" width="250" height="200" src="https://cdn3.kongcdn.com/game_icons/0070/1398/Kongregate_-_Halloween_Event_-_Appicon2023.png?i10c=img.resize(width:250,height:200)">
    <span class="info">
      <strong class="title truncate">Firestone Idle RPG</strong>
      <ul class="tags">
        <li class="tag"><span class="term">Clicker</span></li><li class="tag"><span class="term">Idle</span></li><li class="tag"><span class="term">Incremental</span></li>
      </ul>
      <span class="rating"><span class="kong_ico" aria-hidden="true">*</span>  4.0</span>
    </span>
</a>  </div>


        
          
  
<div data-game-impression-game-id="285013" data-game-impression-unit-type="latest_games" data-game-impression-position="1" data-game-impression-depth="0" class="game js-game-hover">
  <a class="hover_game_info" href="https://www.kongregate.com/games/tovrick/sword-fight?haref=HP_HNG_sword-fight">
    <img class="game_icon image" title="" alt="Play Sword Fight" width="250" height="200" src="https://cdn2.kongcdn.com/game_icons/0070/1250/SwordFightIcon_Unity_0_19_3.png?i10c=img.resize(width:250,height:200)">
    <span class="info">
      <strong class="title truncate">Sword Fight</strong>
      <ul class="tags">
        <li class="tag"><span class="term">Idle</span></li><li class="tag"><span class="term">Upgrades</span></li><li class="tag"><span class="term">Mouse Only</span></li>
      </ul>
      <span class="rating"><span class="kong_ico" aria-hidden="true">*</span>  4.2</span>
    </span>
</a>  </div>


        
          
  
<div data-game-impression-game-id="313848" data-game-impression-unit-type="latest_games" data-game-impression-position="2" data-game-impression-depth="0" class="game js-game-hover">
  <a class="hover_game_info" href="https://www.kongregate.com/games/Playsaurus/poker-quest?haref=HP_HNG_poker-quest">
    <img class="game_icon image" title="" alt="Play Poker Quest RPG" width="250" height="200" src="https://cdn4.kongcdn.com/game_icons/0070/0687/250_200.png?i10c=img.resize(width:250,height:200)">
    <span class="info">
      <strong class="title truncate">Poker Quest RPG</strong>
      <ul class="tags">
        <li class="tag"><span class="term">Card</span></li><li class="tag"><span class="term">Fantasy</span></li><li class="tag"><span class="term">Mouse Only</span></li>
      </ul>
      <span class="rating"><span class="kong_ico" aria-hidden="true">*</span>  4.2</span>
    </span>
</a>  </div>


        
          
  
<div data-game-impression-game-id="283352" data-game-impression-unit-type="latest_games" data-game-impression-position="3" data-game-impression-depth="0" class="game js-game-hover">
  <a class="hover_game_info" href="https://www.kongregate.com/games/towardsmars/dungeon-crusher-soul-hunters?haref=HP_HNG_dungeon-crusher-soul-hunters">
    <img class="game_icon image" title="" alt="Play Dungeon Crusher: Soul Hunters" width="250" height="200" src="https://cdn4.kongcdn.com/game_icons/0070/1388/Dc.gif?i10c=img.resize(width:250,height:200)">
    <span class="info">
      <strong class="title truncate">Dungeon Crusher: Soul Hunters</strong>
      <ul class="tags">
        <li class="tag"><span class="term">Clicker</span></li><li class="tag"><span class="term">Multiplayer</span></li><li class="tag"><span class="term">Incremental</span></li>
      </ul>
      <span class="rating"><span class="kong_ico" aria-hidden="true">*</span>  3.6</span>
    </span>
</a>  </div>


        
          
  
<div data-game-impression-game-id="289806" data-game-impression-unit-type="latest_games" data-game-impression-position="4" data-game-impression-depth="0" class="game js-game-hover">
  <a class="hover_game_info" href="https://www.kongregate.com/games/RogueSword/dungeoneers?haref=HP_HNG_dungeoneers">
    <img class="game_icon image" title="" alt="Play Dungeoneers" width="250" height="200" src="https://cdn3.kongcdn.com/game_icons/0070/0626/dng_kongregate_250_200.jpg?i10c=img.resize(width:250,height:200)">
    <span class="info">
      <strong class="title truncate">Dungeoneers</strong>
      <ul class="tags">
        <li class="tag"><span class="term">Dungeon</span></li><li class="tag"><span class="term">Turn Based</span></li><li class="tag"><span class="term">Mouse Only</span></li>
      </ul>
      <span class="rating"><span class="kong_ico" aria-hidden="true">*</span>  4.1</span>
    </span>
</a>  </div>


        
          
  
<div data-game-impression-game-id="317607" data-game-impression-unit-type="latest_games" data-game-impression-position="5" data-game-impression-depth="0" class="game js-game-hover">
  <a class="hover_game_info" href="https://www.kongregate.com/games/HapiwakuProject/incremental-epic-hero?haref=HP_HNG_incremental-epic-hero">
    <img class="game_icon image" title="" alt="Play Incremental Epic Hero" width="250" height="200" src="https://cdn4.kongcdn.com/game_icons/0070/0808/KongregateThumbnail.jpg?i10c=img.resize(width:250,height:200)">
    <span class="info">
      <strong class="title truncate">Incremental Epic Hero</strong>
      <ul class="tags">
        <li class="tag"><span class="term">Incremental</span></li><li class="tag"><span class="term">Upgrades</span></li><li class="tag"><span class="term">Dungeon</span></li>
      </ul>
      <span class="rating"><span class="kong_ico" aria-hidden="true">*</span>  4.1</span>
    </span>
</a>  </div>


    </div>
    <div class="ind_pane loaded">
        
          
  
<div data-game-impression-game-id="272366" data-game-impression-unit-type="latest_games" data-game-impression-position="0" data-game-impression-depth="1" class="game js-game-hover">
  <a class="hover_game_info" href="https://www.kongregate.com/games/Panoramik/mighty-party?haref=HP_HNG_mighty-party">
    <img class="game_icon image" title="" alt="Play Mighty Party" width="250" height="200" src="https://cdn1.kongcdn.com/game_icons/0069/4671/Zombie_Love.jpg?i10c=img.resize(width:250,height:200)">
    <span class="info">
      <strong class="title truncate">Mighty Party</strong>
      <ul class="tags">
        <li class="tag"><span class="term">CCG</span></li><li class="tag"><span class="term">Turn Based</span></li><li class="tag"><span class="term">Multiplayer</span></li>
      </ul>
      <span class="rating"><span class="kong_ico" aria-hidden="true">*</span>  4.0</span>
    </span>
</a>  </div>


        
          
  
<div data-game-impression-game-id="315606" data-game-impression-unit-type="latest_games" data-game-impression-position="1" data-game-impression-depth="1" class="game js-game-hover">
  <a class="hover_game_info" href="https://www.kongregate.com/games/tbiz5270/idle-monster-td?haref=HP_HNG_idle-monster-td">
    <img class="game_icon image" title="" alt="Play Idle Monster TD" width="250" height="200" src="https://cdn3.kongcdn.com/game_icons/0070/0770/kong_500x400_copy.png?i10c=img.resize(width:250,height:200)">
    <span class="info">
      <strong class="title truncate">Idle Monster TD</strong>
      <ul class="tags">
        <li class="tag"><span class="term">Tower Defense</span></li><li class="tag"><span class="term">Idle</span></li><li class="tag"><span class="term">Monster</span></li>
      </ul>
      <span class="rating"><span class="kong_ico" aria-hidden="true">*</span>  4.1</span>
    </span>
</a>  </div>


        
          
  
<div data-game-impression-game-id="287709" data-game-impression-unit-type="latest_games" data-game-impression-position="2" data-game-impression-depth="1" class="game js-game-hover">
  <a class="hover_game_info" href="https://www.kongregate.com/games/somethingggg/ngu-idle?haref=HP_HNG_ngu-idle">
    <img class="game_icon image" title="" alt="Play NGU IDLE" width="250" height="200" src="https://cdn4.kongcdn.com/game_icons/0070/0434/KongQuacky.png?i10c=img.resize(width:250,height:200)">
    <span class="info">
      <strong class="title truncate">NGU IDLE</strong>
      <ul class="tags">
        <li class="tag"><span class="term">Incremental</span></li><li class="tag"><span class="term">Idle</span></li><li class="tag"><span class="term">Upgrades</span></li>
      </ul>
      <span class="rating"><span class="kong_ico" aria-hidden="true">*</span>  4.5</span>
    </span>
</a>  </div>


        
          
  
<div data-game-impression-game-id="161320" data-game-impression-unit-type="latest_games" data-game-impression-position="3" data-game-impression-depth="1" class="game js-game-hover">
  <a class="hover_game_info" href="https://www.kongregate.com/games/kanoapps/mob-wars-la-cosa-nostra?haref=HP_HNG_mob-wars-la-cosa-nostra">
    <img class="game_icon image" title="" alt="Play Mob Wars: La Cosa Nostra" width="250" height="200" src="https://cdn3.kongcdn.com/game_icons/0069/5323/LCN_KongIcon_250x200.png?i10c=img.resize(width:250,height:200)">
    <span class="info">
      <strong class="title truncate">Mob Wars: La Cosa Nostra</strong>
      <ul class="tags">
        <li class="tag"><span class="term">Multiplayer</span></li><li class="tag"><span class="term">Mouse Only</span></li><li class="tag"><span class="term">RPG</span></li>
      </ul>
      <span class="rating"><span class="kong_ico" aria-hidden="true">*</span>  3.7</span>
    </span>
</a>  </div>


        
          
  
<div data-game-impression-game-id="315604" data-game-impression-unit-type="latest_games" data-game-impression-position="4" data-game-impression-depth="1" class="game js-game-hover">
  <a class="hover_game_info" href="https://www.kongregate.com/games/SamuraiGames/another-chronicle-b-ver?haref=HP_HNG_another-chronicle-b-ver">
    <img class="game_icon image" title="" alt="Play Another Chronicle β.ver" width="250" height="200" src="https://cdn2.kongcdn.com/game_icons/0070/0774/main1_3_0.gif?i10c=img.resize(width:250,height:200)">
    <span class="info">
      <strong class="title truncate">Another Chronicle β.ver</strong>
      <ul class="tags">
        <li class="tag"><span class="term">Text-Based</span></li><li class="tag"><span class="term">Upgrades</span></li><li class="tag"><span class="term">RPG</span></li>
      </ul>
      <span class="rating"><span class="kong_ico" aria-hidden="true">*</span>  4.0</span>
    </span>
</a>  </div>


        
          
  
<div data-game-impression-game-id="311196" data-game-impression-unit-type="latest_games" data-game-impression-position="5" data-game-impression-depth="1" class="game js-game-hover">
  <a class="hover_game_info" href="https://www.kongregate.com/games/JoyBits/worlds-builder?haref=HP_HNG_worlds-builder">
    <img class="game_icon image" title="" alt="Play WORLDS Builder: Farm &amp; Craft" width="250" height="200" src="https://cdn2.kongcdn.com/game_icons/0069/9689/WORLDS_new_levels_gif.gif?i10c=img.resize(width:250,height:200)">
    <span class="info">
      <strong class="title truncate">WORLDS Builder: Farm &amp; Craft</strong>
      <ul class="tags">
        <li class="tag"><span class="term">Management</span></li><li class="tag"><span class="term">Mouse Only</span></li><li class="tag"><span class="term">Farm</span></li>
      </ul>
      <span class="rating"><span class="kong_ico" aria-hidden="true">*</span>  3.8</span>
    </span>
</a>  </div>


    </div>
</div>
</div>
</div>

    <!-- Hot New Games End -->
    <!-- Beta/Ad Start -->
      <div id="ad_games_pod" class="home-pod">
  <div class="square_ad ad"><div class="square_ad_wrapper"><span class="hide_ad_always"><div id="kong_home_af_300x250-ad-slot" class="ad-container"><script>
//<![CDATA[
if (!active_user.isPremium()) {
kong_ads.displayAd("kong_home_af_300x250");}

//]]>
</script></div><span class="bt-uid-tg" uid="5ab3c5d976-106" style="display: none !important"></span></span></div></div>
  <div id="ad_300x100" class="ad_336 ad mtl">
    <div id="kong_home_af_300x100-ad-slot" class="ad-container"><script>
//<![CDATA[
if (!active_user.isPremium()) {
kong_ads.displayAd("kong_home_af_300x100");}

//]]>
</script></div>
  </div>
  <div id="home_spotlight_feature" class="mtl" style="display:none;">
    <h6 class="h6 game_spotlights_heading ptm phm">Sponsored Listing</h6>
    <div id="kong_home_spotlight_af_281x90-ad-slot" class="ad-container premium_viewable"><script>
//<![CDATA[
kong_ads.displayAd("kong_home_spotlight_af_281x90");
//]]>
</script></div>
  </div>
</div>

    <!-- Beta/Add End -->
    <div id="kong_home_bf_728x90_unit">
      <div class="horizontal_ad ad hide_ad_always"><span><div id="kong_home_bf_728x90-ad-slot" class="ad-container"><script>
//<![CDATA[
if (!active_user.isPremium()) {
kong_ads.displayAd("kong_home_bf_728x90");}

//]]>
</script></div><span class="bt-uid-tg" uid="5ab3c60093-106" style="display: none !important"></span></span></div>
    </div>

    <!-- Highest Rated Games Start -->
    
<div id="popular_games_pod" class="js-roller home-pod" pod-name="popular_games" pod-panes-count="3">

<div class="home-pod-header">
<h2 class="home-pod-title">
  
  Highest Rated Games
  <a href="/games?sort=rating">(see all)</a>

</h2>
<span class="pane_dots">
      <span class="spriteall spritesite active_dot dot_0 roller_dot">.</span>
      <span class="spriteall spritesite inactive_dot dot_1 roller_dot">.</span>
      <span class="spriteall spritesite inactive_dot dot_2 roller_dot">.</span>
    <a href="#" onclick="Roller.rolodex['popular_games'].scrollToPreviousPaneAndStop(); return false;" class="spriteall spritesite roller_button roller_previous">Previous</a>
    <a href="#" onclick="Roller.rolodex['popular_games'].scrollToNextPaneAndStop(); return false;" class="spriteall spritesite roller_button roller_next">Next</a>
</span>
</div>

<div id="popular_games" class="games_pod_scrollable_container">
<div id="popular_games_scrollable" class="games_pod_scrollable js-roller-scrollable">
    <div class="ind_pane loaded">
        
          
  
<div data-game-impression-game-id="249627" data-game-impression-unit-type="popular_games" data-game-impression-position="0" data-game-impression-depth="0" class="game pam js-game-hover" id="highest_rated_game_249627">
  <a class="game_browser_icon game_ico_outer" href="https://www.kongregate.com/games/SoulGame/swords-and-souls"><img class="game_icon" title="Swords and Souls" alt="Play Swords and Souls" width="171" height="137" src="https://cdn1.kongcdn.com/game_icons/0063/9685/250x200_BETTER.png?i10c=img.resize(width:171,height:137)"></a>
  <!-- Title -->
  <strong class="title">
    <a class="play_link" href="https://www.kongregate.com/games/SoulGame/swords-and-souls">
      <span class="txt truncate hover_game_info">Swords and Souls</span>
</a>    </strong>
    <!-- Tags -->
    <ul class="tags">
      <li class="tag"><a rel="tag" class="term" href="/arena-combat-games">Arena Combat</a></li><li class="tag"><a rel="tag" class="term" href="/fighting-games">Fighting</a></li><li class="tag"><a rel="tag" class="term" href="/upgrades-games">Upgrades</a></li>
    </ul>
  <!-- Explanation/Description -->
  <p class="info hyphenate regtextSml">
    CHECKOUT THE SEQUEL!
http://steampowered.com/ap...
  </p>
  <!-- Footer -->
  <span class="game_footer regtextSml">
    <!-- Rating -->
    <ul class="star-rating spritegame"><li class="current-rating spritegame spriteall" style="width:60px;"></li></ul>
      <!-- Badges -->
      <span class="badge_count">
        <span class="badge_count_ico kong_ico" aria-hidden="true">a</span>4
      </span>
  </span>
</div>


        
          
  
<div data-game-impression-game-id="190329" data-game-impression-unit-type="popular_games" data-game-impression-position="1" data-game-impression-depth="0" class="game pam js-game-hover" id="highest_rated_game_190329">
  <a class="game_browser_icon game_ico_outer" href="https://www.kongregate.com/games/0rava/mutilate-a-doll-2"><img class="game_icon" title="Mutilate-a-Doll 2" alt="Play Mutilate-a-Doll 2" width="171" height="137" src="https://cdn4.kongcdn.com/game_icons/0070/0664/newlogo.png?i10c=img.resize(width:171,height:137)"></a>
  <!-- Title -->
  <strong class="title">
    <a class="play_link" href="https://www.kongregate.com/games/0rava/mutilate-a-doll-2">
      <span class="txt truncate hover_game_info">Mutilate-a-Doll 2</span>
</a>    </strong>
    <!-- Tags -->
    <ul class="tags">
      <li class="tag"><a rel="tag" class="term" href="/ragdoll-games">Ragdoll</a></li><li class="tag"><a rel="tag" class="term" href="/sandbox-games">Sandbox</a></li><li class="tag"><a rel="tag" class="term" href="/physics-games">Physics</a></li>
    </ul>
  <!-- Explanation/Description -->
  <p class="info hyphenate regtextSml">
    MaD2 is a virtual stressball physics sandbox ab...
  </p>
  <!-- Footer -->
  <span class="game_footer regtextSml">
    <!-- Rating -->
    <ul class="star-rating spritegame"><li class="current-rating spritegame spriteall" style="width:60px;"></li></ul>
  </span>
</div>


        
          
  
<div data-game-impression-game-id="151730" data-game-impression-unit-type="popular_games" data-game-impression-position="2" data-game-impression-depth="0" class="game pam js-game-hover" id="highest_rated_game_151730">
  <a class="game_browser_icon game_ico_outer" href="https://www.kongregate.com/games/Ninjakiwi/bloons-td-5"><img class="game_icon" title="Bloons TD 5" alt="Play Bloons TD 5" width="171" height="137" src="https://cdn2.kongcdn.com/game_icons/0044/9338/bloons-tower-defense5-300x250.jpg?i10c=img.resize(width:171,height:137)"></a>
  <!-- Title -->
  <strong class="title">
    <a class="play_link" href="https://www.kongregate.com/games/Ninjakiwi/bloons-td-5">
      <span class="txt truncate hover_game_info">Bloons TD 5</span>
</a>    </strong>
    <!-- Tags -->
    <ul class="tags">
      <li class="tag"><a rel="tag" class="term" href="/tower-defense-games">Tower Defense</a></li><li class="tag"><a rel="tag" class="term" href="/bloons-games">Bloons</a></li><li class="tag"><a rel="tag" class="term" href="/monkey-games">Monkey</a></li>
    </ul>
  <!-- Explanation/Description -->
  <p class="info hyphenate regtextSml">
    Bloons TD 5 has heaps of new features including...
  </p>
  <!-- Footer -->
  <span class="game_footer regtextSml">
    <!-- Rating -->
    <ul class="star-rating spritegame"><li class="current-rating spritegame spriteall" style="width:59px;"></li></ul>
  </span>
</div>


    </div>
    <div class="ind_pane loaded">
        
          
  
<div data-game-impression-game-id="316009" data-game-impression-unit-type="popular_games" data-game-impression-position="0" data-game-impression-depth="1" class="game pam js-game-hover" id="highest_rated_game_316009">
  <a class="game_browser_icon game_ico_outer" href="https://www.kongregate.com/games/siread/retro-bowl"><img class="game_icon" title="Retro Bowl" alt="Play Retro Bowl" width="171" height="137" src="https://cdn1.kongcdn.com/game_icons/0069/4343/icon_200.png?i10c=img.resize(width:171,height:137)"></a>
  <!-- Title -->
  <strong class="title">
    <a class="play_link" href="https://www.kongregate.com/games/siread/retro-bowl">
      <span class="txt truncate hover_game_info">Retro Bowl</span>
</a>    </strong>
    <!-- Tags -->
    <ul class="tags">
      <li class="tag"><a rel="tag" class="term" href="/football-games">Football</a></li><li class="tag"><a rel="tag" class="term" href="/sports-games">Sports</a></li><li class="tag"><a rel="tag" class="term" href="/manager-games">Management</a></li>
    </ul>
  <!-- Explanation/Description -->
  <p class="info hyphenate regtextSml">
    Retro Bowl is the perfect game for the armchair...
  </p>
  <!-- Footer -->
  <span class="game_footer regtextSml">
    <!-- Rating -->
    <ul class="star-rating spritegame"><li class="current-rating spritegame spriteall" style="width:59px;"></li></ul>
  </span>
</div>


        
          
  
<div data-game-impression-game-id="315580" data-game-impression-unit-type="popular_games" data-game-impression-position="1" data-game-impression-depth="1" class="game pam js-game-hover" id="highest_rated_game_315580">
  <a class="game_browser_icon game_ico_outer" href="https://www.kongregate.com/games/kupo707/epic-battle-fantasy-5"><img class="game_icon" title="Epic Battle Fantasy 5" alt="Play Epic Battle Fantasy 5" width="171" height="137" src="https://cdn4.kongcdn.com/game_icons/0069/3941/ebf5_kong_thumb.png?i10c=img.resize(width:171,height:137)"></a>
  <!-- Title -->
  <strong class="title">
    <a class="play_link" href="https://www.kongregate.com/games/kupo707/epic-battle-fantasy-5">
      <span class="txt truncate hover_game_info">Epic Battle Fantasy 5</span>
</a>    </strong>
    <!-- Tags -->
    <ul class="tags">
      <li class="tag"><a rel="tag" class="term" href="/rpg-games">RPG</a></li><li class="tag"><a rel="tag" class="term" href="/adventure-games">Adventure</a></li><li class="tag"><a rel="tag" class="term" href="/strategy-games">Strategy</a></li>
    </ul>
  <!-- Explanation/Description -->
  <p class="info hyphenate regtextSml">
    Go on a 30-hour turn-based RPG adventure!

It's...
  </p>
  <!-- Footer -->
  <span class="game_footer regtextSml">
    <!-- Rating -->
    <ul class="star-rating spritegame"><li class="current-rating spritegame spriteall" style="width:59px;"></li></ul>
      <!-- Badges -->
      <span class="badge_count">
        <span class="badge_count_ico kong_ico" aria-hidden="true">a</span>4
      </span>
  </span>
</div>


        
          
  
<div data-game-impression-game-id="195142" data-game-impression-unit-type="popular_games" data-game-impression-position="2" data-game-impression-depth="1" class="game pam js-game-hover" id="highest_rated_game_195142">
  <a class="game_browser_icon game_ico_outer" href="https://www.kongregate.com/games/Ironhidegames/kingdom-rush-frontiers"><img class="game_icon" title="Kingdom Rush Frontiers" alt="Play Kingdom Rush Frontiers" width="171" height="137" src="https://cdn1.kongcdn.com/game_icons/0051/0118/IconoKongregate.png?i10c=img.resize(width:171,height:137)"></a>
  <!-- Title -->
  <strong class="title">
    <a class="play_link" href="https://www.kongregate.com/games/Ironhidegames/kingdom-rush-frontiers">
      <span class="txt truncate hover_game_info">Kingdom Rush Frontiers</span>
</a>    </strong>
    <!-- Tags -->
    <ul class="tags">
      <li class="tag"><a rel="tag" class="term" href="/tower-defense-games">Tower Defense</a></li><li class="tag"><a rel="tag" class="term" href="/strategy-games">Strategy</a></li><li class="tag"><a rel="tag" class="term" href="/defense-games">Defense</a></li>
    </ul>
  <!-- Explanation/Description -->
  <p class="info hyphenate regtextSml">
    The world's most devilishly addictive defense g...
  </p>
  <!-- Footer -->
  <span class="game_footer regtextSml">
    <!-- Rating -->
    <ul class="star-rating spritegame"><li class="current-rating spritegame spriteall" style="width:59px;"></li></ul>
      <!-- Badges -->
      <span class="badge_count">
        <span class="badge_count_ico kong_ico" aria-hidden="true">a</span>4
      </span>
  </span>
</div>


    </div>
    <div class="ind_pane loaded">
        
          
  
<div data-game-impression-game-id="133293" data-game-impression-unit-type="popular_games" data-game-impression-position="0" data-game-impression-depth="2" class="game pam js-game-hover" id="highest_rated_game_133293">
  <a class="game_browser_icon game_ico_outer" href="https://www.kongregate.com/games/Ironhidegames/kingdom-rush"><img class="game_icon" title="Kingdom Rush" alt="Play Kingdom Rush" width="171" height="137" src="https://cdn3.kongcdn.com/game_icons/0032/8367/KongregateThumb.png?i10c=img.resize(width:171,height:137)"></a>
  <!-- Title -->
  <strong class="title">
    <a class="play_link" href="https://www.kongregate.com/games/Ironhidegames/kingdom-rush">
      <span class="txt truncate hover_game_info">Kingdom Rush</span>
</a>    </strong>
    <!-- Tags -->
    <ul class="tags">
      <li class="tag"><a rel="tag" class="term" href="/tower-defense-games">Tower Defense</a></li><li class="tag"><a rel="tag" class="term" href="/strategy-games">Strategy</a></li><li class="tag"><a rel="tag" class="term" href="/defense-games">Defense</a></li>
    </ul>
  <!-- Explanation/Description -->
  <p class="info hyphenate regtextSml">
    The kingdom is under attack! Defend your realm ...
  </p>
  <!-- Footer -->
  <span class="game_footer regtextSml">
    <!-- Rating -->
    <ul class="star-rating spritegame"><li class="current-rating spritegame spriteall" style="width:58px;"></li></ul>
      <!-- Badges -->
      <span class="badge_count">
        <span class="badge_count_ico kong_ico" aria-hidden="true">a</span>4
      </span>
  </span>
</div>


        
          
  
<div data-game-impression-game-id="266462" data-game-impression-unit-type="popular_games" data-game-impression-position="1" data-game-impression-depth="2" class="game pam js-game-hover" id="highest_rated_game_266462">
  <a class="game_browser_icon game_ico_outer" href="https://www.kongregate.com/games/Juppiomenz/bit-heroes"><img class="game_icon" title="Bit Heroes" alt="Play Bit Heroes" width="171" height="137" src="https://cdn2.kongcdn.com/game_icons/0070/1394/BHQ.gif?i10c=img.resize(width:171,height:137)"></a>
  <!-- Title -->
  <strong class="title">
    <a class="play_link" href="https://www.kongregate.com/games/Juppiomenz/bit-heroes">
      <span class="txt truncate hover_game_info">Bit Heroes</span>
</a>    </strong>
    <!-- Tags -->
    <ul class="tags">
      <li class="tag"><a rel="tag" class="term" href="/rpg-games">RPG</a></li><li class="tag"><a rel="tag" class="term" href="/pixel-games">Pixel</a></li><li class="tag"><a rel="tag" class="term" href="/dungeon-games">Dungeon</a></li>
    </ul>
  <!-- Explanation/Description -->
  <p class="info hyphenate regtextSml">
    Retro dungeon crawling MMO with PvP, Pets, Guil...
  </p>
  <!-- Footer -->
  <span class="game_footer regtextSml">
    <!-- Rating -->
    <ul class="star-rating spritegame"><li class="current-rating spritegame spriteall" style="width:58px;"></li></ul>
      <!-- Badges -->
      <span class="badge_count">
        <span class="badge_count_ico kong_ico" aria-hidden="true">a</span>2
      </span>
  </span>
</div>


        
          
  
<div data-game-impression-game-id="287709" data-game-impression-unit-type="popular_games" data-game-impression-position="2" data-game-impression-depth="2" class="game pam js-game-hover" id="highest_rated_game_287709">
  <a class="game_browser_icon game_ico_outer" href="https://www.kongregate.com/games/somethingggg/ngu-idle"><img class="game_icon" title="NGU IDLE" alt="Play NGU IDLE" width="171" height="137" src="https://cdn3.kongcdn.com/game_icons/0070/0434/KongQuacky.png?i10c=img.resize(width:171,height:137)"></a>
  <!-- Title -->
  <strong class="title">
    <a class="play_link" href="https://www.kongregate.com/games/somethingggg/ngu-idle">
      <span class="txt truncate hover_game_info">NGU IDLE</span>
</a>    </strong>
    <!-- Tags -->
    <ul class="tags">
      <li class="tag"><a rel="tag" class="term" href="/incremental-games">Incremental</a></li><li class="tag"><a rel="tag" class="term" href="/idle-games">Idle</a></li><li class="tag"><a rel="tag" class="term" href="/upgrades-games">Upgrades</a></li>
    </ul>
  <!-- Explanation/Description -->
  <p class="info hyphenate regtextSml">
    Everyone likes numbers that go up. Play NGU Idl...
  </p>
  <!-- Footer -->
  <span class="game_footer regtextSml">
    <!-- Rating -->
    <ul class="star-rating spritegame"><li class="current-rating spritegame spriteall" style="width:58px;"></li></ul>
      <!-- Badges -->
      <span class="badge_count">
        <span class="badge_count_ico kong_ico" aria-hidden="true">a</span>2
      </span>
  </span>
</div>


    </div>
</div>
</div>
</div>

    <!-- Highest Rated Games End -->

    <!-- Top Games This Month Start -->
    

<div id="top_games_this_month_pod" class="home-pod">
<div class="home-pod-header">
  <h2 class="home-pod-title">
    Top Games This Month
    <a href="/top-monthly-games">(see all)</a>
  </h2>
</div>
<ul>
    
      

<li data-game-impression-game-id="298297" data-game-impression-unit-type="top_games_this_month" data-game-impression-position="0" class="js-game-hover game-pod-med">
  <a class="hover_game_info" href="https://www.kongregate.com/games/Zamol/places?haref=HP_TGTM_places">
    <img class="game_icon" title="Stacked Idle" alt="Play Stacked Idle" width="93" height="74" src="https://cdn1.kongcdn.com/game_icons/0070/0981/logo.png?i10c=img.resize(width:93)">
    <span class="title">
      <span class="txt truncate hover_game_info">Stacked Idle</span>
    </span>
    <ul class="tags">
      <li class="tag"><span class="term">Incremental</span></li>
    </ul>
      <span class="rating regtextSml"><span class="kong_ico" aria-hidden="true">*</span>  3.2</span>
    <span class="developer regtextSml truncate"><em>by</em> <strong>Zamol</strong></span>
</a>  </li>

</ul>
</div>


    <!-- Top Games This Month End -->
    <!-- Wide Trending Start -->
    <!-- Wide Trending End -->
    <div class="line">
      <!-- Mobile Games Start -->
      <div id="our_mobile_games_pod" class="home-pod">
<div class="home-pod-header">
  <h2 class="home-pod-title">
    Our Published Games
    <a href="https://www.kartridge.com/games?gameGroupId=403&amp;utm_medium=kongregate&amp;utm_source=mobile_game_pod&amp;utm_campaign=homepage&amp;utm_content=text_link">(see all)</a>
  </h2>
</div>
<div class="click_box">
  <style>
#our_mobile_games_pod .click_box {
  height: 284px;
  position: relative;
  z-index: 1;
}

#our_mobile_games_pod .click_link {
  background: transparent;
  display: block;
  height: 295px;
  width: 295px;
}

#our_mobile_games_pod .click_link:hover { background-position: 0 -44px; }

#our_mobile_games_pod .omgp-copy {
  background: transparent url('https://cdn2.kongcdn.com/assets/files/0002/7600/KongWeb-Promo_300x296.png') no-repeat 0 0;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: -13px;
  z-index: 1;
}


}
</style>

<div class="omgp-copy">
<h3 class="textreplace">Royal Idle - Medieval Quest</h3>
<p class="textreplace">Collect gold and emeralds, build your kingdom, and journey to new adventure!</p>
<a href="https://app.adjust.com/auzbih6?campaign=IF-All-Free-All-MobileGamePod-" target="_blank" class="click_link textreplace">Download on the App Store &amp; Get it on Google Play</a>
</div>


</div>
</div>

      <!-- Mobile Games End -->
      <!-- Most Played Games Start -->
      

<div id="most_played_games_pod" class="home-pod">
<div class="home-pod-header">
  <h2 class="home-pod-title">
    Most Played Games
    <a href="/most-played-games">(see all)</a>
  </h2>
</div>
<ul>
    
      

<li data-game-impression-game-id="316009" data-game-impression-unit-type="most_played_games" data-game-impression-position="0" class="js-game-hover game-pod-med">
  <a class="hover_game_info" href="https://www.kongregate.com/games/siread/retro-bowl?haref=HP_MPG_retro-bowl">
    <img class="game_icon" title="Retro Bowl" alt="Play Retro Bowl" width="93" height="74" src="https://cdn1.kongcdn.com/game_icons/0069/4343/icon_200.png?i10c=img.resize(width:93)">
    <span class="title">
      <span class="txt truncate hover_game_info">Retro Bowl</span>
    </span>
    <ul class="tags">
      <li class="tag"><span class="term">Football</span></li><li class="tag"><span class="term">Sports</span></li><li class="tag"><span class="term">Management</span></li>
    </ul>
      <span class="rating regtextSml"><span class="kong_ico" aria-hidden="true">*</span>  4.6</span>
    <span class="developer regtextSml truncate"><em>by</em> <strong>siread</strong></span>
</a>  </li>

    
      

<li data-game-impression-game-id="271381" data-game-impression-unit-type="most_played_games" data-game-impression-position="1" class="js-game-hover game-pod-med">
  <a class="hover_game_info" href="https://www.kongregate.com/games/Throwdown/animation-throwdown?haref=HP_MPG_animation-throwdown">
    <img class="game_icon" title="Animation Throwdown" alt="Play Animation Throwdown" width="93" height="74" src="https://cdn4.kongcdn.com/game_icons/0070/1395/ezgif.com-resize__25_.gif?i10c=img.resize(width:93)">
    <span class="title">
      <span class="txt truncate hover_game_info">Animation Throwdown</span>
    </span>
    <ul class="tags">
      <li class="tag"><span class="term">Card</span></li><li class="tag"><span class="term">CCG</span></li><li class="tag"><span class="term">Turn Based</span></li>
    </ul>
      <span class="rating regtextSml"><span class="kong_ico" aria-hidden="true">*</span>  4.2</span>
    <span class="developer regtextSml truncate"><em>by</em> <strong>Throwdown</strong></span>
</a>  </li>

    
      

<li data-game-impression-game-id="266462" data-game-impression-unit-type="most_played_games" data-game-impression-position="2" class="js-game-hover game-pod-med">
  <a class="hover_game_info" href="https://www.kongregate.com/games/Juppiomenz/bit-heroes?haref=HP_MPG_bit-heroes">
    <img class="game_icon" title="Bit Heroes" alt="Play Bit Heroes" width="93" height="74" src="https://cdn2.kongcdn.com/game_icons/0070/1394/BHQ.gif?i10c=img.resize(width:93)">
    <span class="title">
      <span class="txt truncate hover_game_info">Bit Heroes</span>
    </span>
    <ul class="tags">
      <li class="tag"><span class="term">RPG</span></li><li class="tag"><span class="term">Pixel</span></li><li class="tag"><span class="term">Dungeon</span></li>
    </ul>
      <span class="rating regtextSml"><span class="kong_ico" aria-hidden="true">*</span>  4.5</span>
    <span class="developer regtextSml truncate"><em>by</em> <strong>Juppiomenz</strong></span>
</a>  </li>

    
      

<li data-game-impression-game-id="151730" data-game-impression-unit-type="most_played_games" data-game-impression-position="3" class="js-game-hover game-pod-med">
  <a class="hover_game_info" href="https://www.kongregate.com/games/Ninjakiwi/bloons-td-5?haref=HP_MPG_bloons-td-5">
    <img class="game_icon" title="Bloons TD 5" alt="Play Bloons TD 5" width="93" height="74" src="https://cdn1.kongcdn.com/game_icons/0044/9338/bloons-tower-defense5-300x250.jpg?i10c=img.resize(width:93)">
    <span class="title">
      <span class="txt truncate hover_game_info">Bloons TD 5</span>
    </span>
    <ul class="tags">
      <li class="tag"><span class="term">Tower Defense</span></li><li class="tag"><span class="term">Bloons</span></li><li class="tag"><span class="term">Monkey</span></li>
    </ul>
      <span class="rating regtextSml"><span class="kong_ico" aria-hidden="true">*</span>  4.6</span>
    <span class="developer regtextSml truncate"><em>by</em> <strong>Ninjakiwi</strong></span>
</a>  </li>

</ul>
</div>


      <!-- Mosted Played Games End -->
      <!-- Community Favorite Games Start -->
      

<div id="community_favorites_pod" class="home-pod">
<div class="home-pod-header">
  <h2 class="home-pod-title">
    Community Favorites
    <a href="/community-favorite-games">(see all)</a>
  </h2>
</div>
<ul>
    
      

<li data-game-impression-game-id="271381" data-game-impression-unit-type="community_favorites" data-game-impression-position="0" class="js-game-hover game-pod-med">
  <a class="hover_game_info" href="https://www.kongregate.com/games/Throwdown/animation-throwdown?haref=HP_CF_animation-throwdown">
    <img class="game_icon" title="Animation Throwdown" alt="Play Animation Throwdown" width="93" height="74" src="https://cdn4.kongcdn.com/game_icons/0070/1395/ezgif.com-resize__25_.gif?i10c=img.resize(width:93)">
    <span class="title">
      <span class="txt truncate hover_game_info">Animation Throwdown</span>
    </span>
    <ul class="tags">
      <li class="tag"><span class="term">Card</span></li><li class="tag"><span class="term">CCG</span></li><li class="tag"><span class="term">Turn Based</span></li>
    </ul>
      <span class="rating regtextSml"><span class="kong_ico" aria-hidden="true">*</span>  4.2</span>
    <span class="developer regtextSml truncate"><em>by</em> <strong>Throwdown</strong></span>
</a>  </li>

    
      

<li data-game-impression-game-id="266462" data-game-impression-unit-type="community_favorites" data-game-impression-position="1" class="js-game-hover game-pod-med">
  <a class="hover_game_info" href="https://www.kongregate.com/games/Juppiomenz/bit-heroes?haref=HP_CF_bit-heroes">
    <img class="game_icon" title="Bit Heroes" alt="Play Bit Heroes" width="93" height="74" src="https://cdn2.kongcdn.com/game_icons/0070/1394/BHQ.gif?i10c=img.resize(width:93)">
    <span class="title">
      <span class="txt truncate hover_game_info">Bit Heroes</span>
    </span>
    <ul class="tags">
      <li class="tag"><span class="term">RPG</span></li><li class="tag"><span class="term">Pixel</span></li><li class="tag"><span class="term">Dungeon</span></li>
    </ul>
      <span class="rating regtextSml"><span class="kong_ico" aria-hidden="true">*</span>  4.5</span>
    <span class="developer regtextSml truncate"><em>by</em> <strong>Juppiomenz</strong></span>
</a>  </li>

    
      

<li data-game-impression-game-id="299519" data-game-impression-unit-type="community_favorites" data-game-impression-position="2" class="js-game-hover game-pod-med">
  <a class="hover_game_info" href="https://www.kongregate.com/games/HolydayStudios/firestone?haref=HP_CF_firestone">
    <img class="game_icon" title="Firestone Idle RPG" alt="Play Firestone Idle RPG" width="93" height="74" src="https://cdn3.kongcdn.com/game_icons/0070/1398/Kongregate_-_Halloween_Event_-_Appicon2023.png?i10c=img.resize(width:93)">
    <span class="title">
      <span class="txt truncate hover_game_info">Firestone Idle RPG</span>
    </span>
    <ul class="tags">
      <li class="tag"><span class="term">Clicker</span></li><li class="tag"><span class="term">Idle</span></li><li class="tag"><span class="term">Incremental</span></li>
    </ul>
      <span class="rating regtextSml"><span class="kong_ico" aria-hidden="true">*</span>  4.0</span>
    <span class="developer regtextSml truncate"><em>by</em> <strong>HolydayStudios</strong></span>
</a>  </li>

    
      

<li data-game-impression-game-id="248326" data-game-impression-unit-type="community_favorites" data-game-impression-position="3" class="js-game-hover game-pod-med">
  <a class="hover_game_info" href="https://www.kongregate.com/games/synapticon/spellstone?haref=HP_CF_spellstone">
    <img class="game_icon" title="Spellstone" alt="Play Spellstone" width="93" height="74" src="https://cdn2.kongcdn.com/game_icons/0067/5197/kong_logo.jpg?i10c=img.resize(width:93)">
    <span class="title">
      <span class="txt truncate hover_game_info">Spellstone</span>
    </span>
    <ul class="tags">
      <li class="tag"><span class="term">CCG</span></li><li class="tag"><span class="term">Card</span></li><li class="tag"><span class="term">Turn Based</span></li>
    </ul>
      <span class="rating regtextSml"><span class="kong_ico" aria-hidden="true">*</span>  3.8</span>
    <span class="developer regtextSml truncate"><em>by</em> <strong>synapticon</strong></span>
</a>  </li>

</ul>
</div>


      <!-- Community Favorite Games End -->
    </div>
    <!-- Browse By Category start -->
    <div id="home-browse-pods" class="line">
      <div class="unit size2of3">
        
          <div id="browsebycategory" class="browse-by-category mhm">
            <div class="pod_header clearfix">
              <h2><a href="/games">Browse Top Games by Category</a></h2>
              <p class="pod_all"><a href="/games">(see all)</a></p>
            </div>
            <div class="line">
<div class="unit size1of2">
  <div class="mrm">
    <!-- .category -->
<div class="category">
<dl>
  <dt><a href="https://www.kongregate.com/card-games">Card</a></dt>
  <dd class="browse_games">
    <table cellspacing="0" cellpadding="0" border="0">
        
          <tbody><tr data-game-impression-game-id="270326" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="0" class="game_hover js-game-hover graybg">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/RobotoGames/age-of-rivals?haref=HP_Card_age-of-rivals"><img class="game_icon" title="Age of Rivals" alt="Play Age of Rivals" width="26" height="21" src="https://cdn4.kongcdn.com/game_icons/0065/8601/Kongregate_Icon_Small.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/RobotoGames/age-of-rivals?haref=HP_Card_age-of-rivals">Age of Rivals</a>
  </p>
    <p class="browse_developer">by
      RobotoGames
    </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:54px;"></li>
    </ul>
    <p><em class="num_rating">(4.19 avg.)</em></p>
</td>
</tr>

        
          <tr data-game-impression-game-id="271381" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="1" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Throwdown/animation-throwdown?haref=HP_Card_animation-throwdown"><img class="game_icon" title="Animation Throwdown" alt="Play Animation Throwdown" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0070/1394/BHQ.gif?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Throwdown/animation-throwdown?haref=HP_Card_animation-throwdown">Animation Throwdown</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:54px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="123844" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="2" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/fighter106/spectromancer-gamers-pack?haref=HP_Card_spectromancer-gamers-pack"><img class="game_icon" title="Spectromancer: Gamer's Pack" alt="Play Spectromancer: Gamer's Pack" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0029/0619/welcome_png.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/fighter106/spectromancer-gamers-pack?haref=HP_Card_spectromancer-gamers-pack">Spectromancer: Gamer'...</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:51px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="158442" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="3" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/nulllvoid/hd-xyth?haref=HP_Card_hd-xyth"><img class="game_icon" title="HD Xyth" alt="Play HD Xyth" width="26" height="21" src="https://cdn3.kongcdn.com/game_icons/0042/1478/HDX_icon_250x200.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/nulllvoid/hd-xyth?haref=HP_Card_hd-xyth">HD Xyth</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:51px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="208033" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="4" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/synapticon/tyrant-unleashed-web?haref=HP_Card_tyrant-unleashed-web"><img class="game_icon" title="Tyrant Unleashed" alt="Play Tyrant Unleashed" width="26" height="21" src="https://cdn3.kongcdn.com/game_icons/0067/6091/tu_may4th__1_.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/synapticon/tyrant-unleashed-web?haref=HP_Card_tyrant-unleashed-web">Tyrant Unleashed</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:51px;"></li>
    </ul>
</td>
</tr>

      <tr>
       <td colspan="3" class="category_count">
         <a class="viewall" href="https://www.kongregate.com/card-games">564&nbsp;more&nbsp;Card games »</a>
       </td>
      </tr>
    </tbody></table>
  </dd>
</dl>
</div><!-- /.category -->
<!-- .category -->
<div class="category">
<dl>
  <dt><a href="https://www.kongregate.com/idle-games">Idle</a></dt>
  <dd class="browse_games">
    <table cellspacing="0" cellpadding="0" border="0">
        
          <tbody><tr data-game-impression-game-id="287709" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="0" class="game_hover js-game-hover graybg">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/somethingggg/ngu-idle"><img class="game_icon" title="NGU IDLE" alt="Play NGU IDLE" width="26" height="21" src="https://cdn3.kongcdn.com/game_icons/0070/0434/KongQuacky.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/somethingggg/ngu-idle">NGU IDLE</a>
  </p>
    <p class="browse_developer">by
      somethingggg
    </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:58px;"></li>
    </ul>
    <p><em class="num_rating">(4.52 avg.)</em></p>
</td>
</tr>

        
          <tr data-game-impression-game-id="312748" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="1" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/JamesG466/incremancer"><img class="game_icon" title="Incremancer" alt="Play Incremancer" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0069/1970/zombie-512.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/JamesG466/incremancer">Incremancer</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:58px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="216826" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="2" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Playsaurus/clicker-heroes"><img class="game_icon" title="Clicker Heroes" alt="Play Clicker Heroes" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0064/3541/icon250x200.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Playsaurus/clicker-heroes">Clicker Heroes</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:56px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="258553" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="3" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/XmmmX99/the-perfect-tower"><img class="game_icon" title="The Perfect Tower" alt="Play The Perfect Tower" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0064/7749/Image.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/XmmmX99/the-perfect-tower">The Perfect Tower</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:56px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="243608" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="4" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/GreenSatellite/trimps"><img class="game_icon" title="Trimps" alt="Play Trimps" width="26" height="21" src="https://cdn1.kongcdn.com/game_icons/0065/8867/icon40.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/GreenSatellite/trimps">Trimps</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:56px;"></li>
    </ul>
</td>
</tr>

      <tr>
       <td colspan="3" class="category_count">
         <a class="viewall" href="https://www.kongregate.com/idle-games">1304&nbsp;more&nbsp;Idle games »</a>
       </td>
      </tr>
    </tbody></table>
  </dd>
</dl>
</div><!-- /.category -->
<!-- .category -->
<div class="category">
<dl>
  <dt><a href="https://www.kongregate.com/strategy-defense-games">Strategy &amp; Defense</a></dt>
  <dd class="browse_games">
    <table cellspacing="0" cellpadding="0" border="0">
        
          <tbody><tr data-game-impression-game-id="151730" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="0" class="game_hover js-game-hover graybg">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Ninjakiwi/bloons-td-5"><img class="game_icon" title="Bloons TD 5" alt="Play Bloons TD 5" width="26" height="21" src="https://cdn1.kongcdn.com/game_icons/0044/9338/bloons-tower-defense5-300x250.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Ninjakiwi/bloons-td-5">Bloons TD 5</a>
  </p>
    <p class="browse_developer">by
      Ninjakiwi
    </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:59px;"></li>
    </ul>
    <p><em class="num_rating">(4.61 avg.)</em></p>
</td>
</tr>

        
          <tr data-game-impression-game-id="195142" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="1" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Ironhidegames/kingdom-rush-frontiers"><img class="game_icon" title="Kingdom Rush Frontiers" alt="Play Kingdom Rush Frontiers" width="26" height="21" src="https://cdn3.kongcdn.com/game_icons/0051/0118/IconoKongregate.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Ironhidegames/kingdom-rush-frontiers">Kingdom Rush Frontiers</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:59px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="133293" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="2" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Ironhidegames/kingdom-rush"><img class="game_icon" title="Kingdom Rush" alt="Play Kingdom Rush" width="26" height="21" src="https://cdn4.kongcdn.com/game_icons/0032/8367/KongregateThumb.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Ironhidegames/kingdom-rush">Kingdom Rush</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:58px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="222987" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="3" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Ninjakiwi/bloons-monkey-city"><img class="game_icon" title="Bloons Monkey City" alt="Play Bloons Monkey City" width="26" height="21" src="https://cdn1.kongcdn.com/game_icons/0057/9167/MonkeyCity-250x200-KongIcon.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Ninjakiwi/bloons-monkey-city">Bloons Monkey City</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:58px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="171311" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="4" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/kurechii/the-kings-league-odyssey"><img class="game_icon" title="The King's League: Odyssey" alt="Play The King's League: Odyssey" width="26" height="21" src="https://cdn4.kongcdn.com/game_icons/0045/5359/KongThum500400.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/kurechii/the-kings-league-odyssey">The King's League: Od...</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
</td>
</tr>

      <tr>
       <td colspan="3" class="category_count">
         <a class="viewall" href="https://www.kongregate.com/strategy-defense-games">7346&nbsp;more&nbsp;Strategy &amp; Defense games »</a>
       </td>
      </tr>
    </tbody></table>
  </dd>
</dl>
</div><!-- /.category -->
<!-- .category -->
<div class="category">
<dl>
  <dt><a href="https://www.kongregate.com/puzzle-games">Puzzle</a></dt>
  <dd class="browse_games">
    <table cellspacing="0" cellpadding="0" border="0">
        
          <tbody><tr data-game-impression-game-id="322653" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="0" class="game_hover js-game-hover graybg">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/KekGames/unpuzzlex"><img class="game_icon" title="UnpuzzleX" alt="Play UnpuzzleX" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0069/9792/_______2020_06_08_00_09_18_518.gif?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/KekGames/unpuzzlex">UnpuzzleX</a>
  </p>
    <p class="browse_developer">by
      KekGames
    </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:58px;"></li>
    </ul>
    <p><em class="num_rating">(4.49 avg.)</em></p>
</td>
</tr>

        
          <tr data-game-impression-game-id="320582" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="1" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/masasgames/escape-game-computer-office-escape"><img class="game_icon" title="Escape Game - Computer Office Escape" alt="Play Escape Game - Computer Office Escape" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0069/7983/icon_kongregate.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/masasgames/escape-game-computer-office-escape">Escape Game - Compute...</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="292356" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="2" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/KekGames/unpuzzle-2"><img class="game_icon" title="Unpuzzle 2" alt="Play Unpuzzle 2" width="26" height="21" src="https://cdn3.kongcdn.com/game_icons/0067/4526/KongIcon.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/KekGames/unpuzzle-2">Unpuzzle 2</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:56px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="320577" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="3" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/VasantJ/medieval-chronicles-9-part-2"><img class="game_icon" title="Medieval Chronicles 9 (Part 2)" alt="Play Medieval Chronicles 9 (Part 2)" width="26" height="21" src="https://cdn4.kongcdn.com/game_icons/0069/7980/TitleScreen.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/VasantJ/medieval-chronicles-9-part-2">Medieval Chronicles 9...</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:56px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="323368" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="4" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/VasantJ/medieval-chronicles-8-part-2"><img class="game_icon" title="Medieval Chronicles 8 (Part 2)" alt="Play Medieval Chronicles 8 (Part 2)" width="26" height="21" src="https://cdn4.kongcdn.com/game_icons/0070/0366/TitleScreen.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/VasantJ/medieval-chronicles-8-part-2">Medieval Chronicles 8...</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:56px;"></li>
    </ul>
</td>
</tr>

      <tr>
       <td colspan="3" class="category_count">
         <a class="viewall" href="https://www.kongregate.com/puzzle-games">39549&nbsp;more&nbsp;Puzzle games »</a>
       </td>
      </tr>
    </tbody></table>
  </dd>
</dl>
</div><!-- /.category -->
<!-- .category -->
<div class="category">
<dl>
  <dt><a href="https://www.kongregate.com/shooter-games">Shooter</a></dt>
  <dd class="browse_games">
    <table cellspacing="0" cellpadding="0" border="0">
        
          <tbody><tr data-game-impression-game-id="216711" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="0" class="game_hover js-game-hover graybg">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Ninjakiwi/sas-zombie-assault-4"><img class="game_icon" title="SAS: Zombie Assault 4" alt="Play SAS: Zombie Assault 4" width="26" height="21" src="https://cdn4.kongcdn.com/game_icons/0062/1792/SAS4_250x200_KongIcon.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Ninjakiwi/sas-zombie-assault-4">SAS: Zombie Assault 4</a>
  </p>
    <p class="browse_developer">by
      Ninjakiwi
    </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:58px;"></li>
    </ul>
    <p><em class="num_rating">(4.50 avg.)</em></p>
</td>
</tr>

        
          <tr data-game-impression-game-id="174645" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="1" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/JuiceTin/strike-force-heroes-2"><img class="game_icon" title="Strike Force Heroes 2" alt="Play Strike Force Heroes 2" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0046/3246/250x200KONG.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/JuiceTin/strike-force-heroes-2">Strike Force Heroes 2</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="171560" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="2" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Tacticsoft/supermechs"><img class="game_icon" title="Supermechs" alt="Play Supermechs" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0067/8000/kong_bannerr.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Tacticsoft/supermechs">Supermechs</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="149599" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="3" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/JuiceTin/strike-force-heroes"><img class="game_icon" title="Strike Force Heroes" alt="Play Strike Force Heroes" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0039/3628/Kong_250_x_200.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/JuiceTin/strike-force-heroes">Strike Force Heroes</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="49854" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="4" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/ArmorGames/upgrade-complete"><img class="game_icon" title="UPGRADE COMPLETE!" alt="Play UPGRADE COMPLETE!" width="26" height="21" src="https://cdn3.kongcdn.com/game_icons/0009/8236/UCkongtile.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/ArmorGames/upgrade-complete">UPGRADE COMPLETE!</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:56px;"></li>
    </ul>
</td>
</tr>

      <tr>
       <td colspan="3" class="category_count">
         <a class="viewall" href="https://www.kongregate.com/shooter-games">15373&nbsp;more&nbsp;Shooter games »</a>
       </td>
      </tr>
    </tbody></table>
  </dd>
</dl>
</div><!-- /.category -->

  </div>
</div>
<div class="unit size1of2 lastUnit">
  <div class="plm">
    <!-- .category -->
<div class="category">
<dl>
  <dt><a href="https://www.kongregate.com/mmo-games">MMO</a></dt>
  <dd class="browse_games">
    <table cellspacing="0" cellpadding="0" border="0">
        
          <tbody><tr data-game-impression-game-id="266462" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="0" class="game_hover js-game-hover graybg">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Juppiomenz/bit-heroes?haref=HP_MMO_bit-heroes"><img class="game_icon" title="Bit Heroes" alt="Play Bit Heroes" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0070/1394/BHQ.gif?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Juppiomenz/bit-heroes?haref=HP_MMO_bit-heroes">Bit Heroes</a>
  </p>
    <p class="browse_developer">by
      Juppiomenz
    </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:58px;"></li>
    </ul>
    <p><em class="num_rating">(4.53 avg.)</em></p>
</td>
</tr>

        
          <tr data-game-impression-game-id="227576" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="1" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/iouRPG/idle-online-universe?haref=HP_MMO_idle-online-universe"><img class="game_icon" title="Idle Online Universe" alt="Play Idle Online Universe" width="26" height="21" src="https://cdn1.kongcdn.com/game_icons/0070/0972/IOUShot.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/iouRPG/idle-online-universe?haref=HP_MMO_idle-online-universe">Idle Online Universe</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:49px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="280206" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="2" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Ninjakiwi/tower-keepers?haref=HP_MMO_tower-keepers"><img class="game_icon" title="Tower Keepers" alt="Play Tower Keepers" width="26" height="21" src="https://cdn3.kongcdn.com/game_icons/0067/6994/TK_250x200_KongIcon.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Ninjakiwi/tower-keepers?haref=HP_MMO_tower-keepers">Tower Keepers</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:50px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="269125" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="3" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/OasisGames/naruto-online?haref=HP_MMO_naruto-online"><img class="game_icon" title="Naruto Online" alt="Play Naruto Online" width="26" height="21" src="https://cdn4.kongcdn.com/game_icons/0068/4333/250-200.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/OasisGames/naruto-online?haref=HP_MMO_naruto-online">Naruto Online</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:48px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="240290" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="4" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/BDAEntertainment/realm-of-empires?haref=HP_MMO_realm-of-empires"><img class="game_icon" title="Realm of Empires: Warlords Rising" alt="Play Realm of Empires: Warlords Rising" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0067/0197/RoE_KeyArt250x200KongregateUpdate.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/BDAEntertainment/realm-of-empires?haref=HP_MMO_realm-of-empires">Realm of Empires: War...</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:51px;"></li>
    </ul>
</td>
</tr>

      <tr>
       <td colspan="3" class="category_count">
         <a class="viewall" href="https://www.kongregate.com/mmo-games">151&nbsp;more&nbsp;MMO games »</a>
       </td>
      </tr>
    </tbody></table>
  </dd>
</dl>
</div><!-- /.category -->
<!-- .category -->
<div class="category">
<dl>
  <dt><a href="https://www.kongregate.com/adventure-rpg-games">Adventure &amp; RPG</a></dt>
  <dd class="browse_games">
    <table cellspacing="0" cellpadding="0" border="0">
        
          <tbody><tr data-game-impression-game-id="249627" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="0" class="game_hover js-game-hover graybg">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/SoulGame/swords-and-souls"><img class="game_icon" title="Swords and Souls" alt="Play Swords and Souls" width="26" height="21" src="https://cdn3.kongcdn.com/game_icons/0063/9685/250x200_BETTER.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/SoulGame/swords-and-souls">Swords and Souls</a>
  </p>
    <p class="browse_developer">by
      SoulGame
    </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:60px;"></li>
    </ul>
    <p><em class="num_rating">(4.65 avg.)</em></p>
</td>
</tr>

        
          <tr data-game-impression-game-id="315580" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="1" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/kupo707/epic-battle-fantasy-5"><img class="game_icon" title="Epic Battle Fantasy 5" alt="Play Epic Battle Fantasy 5" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0069/3941/ebf5_kong_thumb.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/kupo707/epic-battle-fantasy-5">Epic Battle Fantasy 5</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:59px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="266462" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="2" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Juppiomenz/bit-heroes"><img class="game_icon" title="Bit Heroes" alt="Play Bit Heroes" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0070/1394/BHQ.gif?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Juppiomenz/bit-heroes">Bit Heroes</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:58px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="230534" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="3" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/DustinAux/the-enchanted-cave-2"><img class="game_icon" title="The Enchanted Cave 2" alt="Play The Enchanted Cave 2" width="26" height="21" src="https://cdn1.kongcdn.com/game_icons/0059/1576/icon250x200.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/DustinAux/the-enchanted-cave-2">The Enchanted Cave 2</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:58px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="258157" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="4" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Puffballs_United/fleeing-the-complex"><img class="game_icon" title="Fleeing the Complex" alt="Play Fleeing the Complex" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0064/7406/FtCIcon.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Puffballs_United/fleeing-the-complex">Fleeing the Complex</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:58px;"></li>
    </ul>
</td>
</tr>

      <tr>
       <td colspan="3" class="category_count">
         <a class="viewall" href="https://www.kongregate.com/adventure-rpg-games">10881&nbsp;more&nbsp;Adventure &amp; RPG games »</a>
       </td>
      </tr>
    </tbody></table>
  </dd>
</dl>
</div><!-- /.category -->
<!-- .category -->
<div class="category">
<dl>
  <dt><a href="https://www.kongregate.com/action-games">Action</a></dt>
  <dd class="browse_games">
    <table cellspacing="0" cellpadding="0" border="0">
        
          <tbody><tr data-game-impression-game-id="151307" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="0" class="game_hover js-game-hover graybg">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/TogeProductions/infectonator-2"><img class="game_icon" title="Infectonator 2" alt="Play Infectonator 2" width="26" height="21" src="https://cdn3.kongcdn.com/game_icons/0040/0085/Infectonator2-250x200.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/TogeProductions/infectonator-2">Infectonator 2</a>
  </p>
    <p class="browse_developer">by
      TogeProductions
    </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
    <p><em class="num_rating">(4.42 avg.)</em></p>
</td>
</tr>

        
          <tr data-game-impression-game-id="136305" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="1" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/JuicyBeast/burrito-bison-revenge"><img class="game_icon" title="Burrito Bison Revenge" alt="Play Burrito Bison Revenge" width="26" height="21" src="https://cdn1.kongcdn.com/game_icons/0044/9272/bb2_250x200.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/JuicyBeast/burrito-bison-revenge">Burrito Bison Revenge</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="146097" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="2" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/BerzerkStudio/sands-of-the-coliseum"><img class="game_icon" title="Sands of the Coliseum" alt="Play Sands of the Coliseum" width="26" height="21" src="https://cdn1.kongcdn.com/game_icons/0037/9618/Icon250x200.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/BerzerkStudio/sands-of-the-coliseum">Sands of the Coliseum</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="110126" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="3" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/ArmorGames/elephant-quest"><img class="game_icon" title="Elephant Quest" alt="Play Elephant Quest" width="26" height="21" src="https://cdn1.kongcdn.com/game_icons/0056/3372/elephantq.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/ArmorGames/elephant-quest">Elephant Quest</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:56px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="153727" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="4" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/JuicyBeast/knightmare-tower"><img class="game_icon" title="Knightmare Tower" alt="Play Knightmare Tower" width="26" height="21" src="https://cdn1.kongcdn.com/game_icons/0040/7334/kt_250-200.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/JuicyBeast/knightmare-tower">Knightmare Tower</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:56px;"></li>
    </ul>
</td>
</tr>

      <tr>
       <td colspan="3" class="category_count">
         <a class="viewall" href="https://www.kongregate.com/action-games">31125&nbsp;more&nbsp;Action games »</a>
       </td>
      </tr>
    </tbody></table>
  </dd>
</dl>
</div><!-- /.category -->
<!-- .category -->
<div class="category">
<dl>
  <dt><a href="https://www.kongregate.com/multiplayer-games">Multiplayer</a></dt>
  <dd class="browse_games">
    <table cellspacing="0" cellpadding="0" border="0">
        
          <tbody><tr data-game-impression-game-id="145629" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="0" class="game_hover js-game-hover graybg">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Ninjakiwi/sas-zombie-assault-3"><img class="game_icon" title="SAS: Zombie Assault 3" alt="Play SAS: Zombie Assault 3" width="26" height="21" src="https://cdn1.kongcdn.com/game_icons/0037/7746/Kongregate_250x200_Icon.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Ninjakiwi/sas-zombie-assault-3">SAS: Zombie Assault 3</a>
  </p>
    <p class="browse_developer">by
      Ninjakiwi
    </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
    <p><em class="num_rating">(4.43 avg.)</em></p>
</td>
</tr>

        
          <tr data-game-impression-game-id="158665" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="1" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/kChamp/shellshock-live-2"><img class="game_icon" title="ShellShock Live 2" alt="Play ShellShock Live 2" width="26" height="21" src="https://cdn4.kongcdn.com/game_icons/0042/2147/kongthumb.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/kChamp/shellshock-live-2">ShellShock Live 2</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="193858" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="2" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Rob_Almighty/bad-eggs-online-2"><img class="game_icon" title="Bad Eggs Online 2" alt="Play Bad Eggs Online 2" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0050/7259/BEO2_Thumb3.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Rob_Almighty/bad-eggs-online-2">Bad Eggs Online 2</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="218450" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="3" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/FunkyPear/gravitee-wars-online"><img class="game_icon" title="Gravitee Wars Online" alt="Play Gravitee Wars Online" width="26" height="21" src="https://cdn1.kongcdn.com/game_icons/0056/8298/gwo_kong_icon_252x202.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/FunkyPear/gravitee-wars-online">Gravitee Wars Online</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="149963" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="4" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/rokawar/rush-team-free-fps-multiplayers"><img class="game_icon" title="Rush Team Free FPS Multiplayers" alt="Play Rush Team Free FPS Multiplayers" width="26" height="21" src="https://cdn1.kongcdn.com/game_icons/0058/2149/250_200_RT_Icon__copy.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/rokawar/rush-team-free-fps-multiplayers">Rush Team Free FPS Mu...</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:56px;"></li>
    </ul>
</td>
</tr>

      <tr>
       <td colspan="3" class="category_count">
         <a class="viewall" href="https://www.kongregate.com/multiplayer-games">716&nbsp;more&nbsp;Multiplayer games »</a>
       </td>
      </tr>
    </tbody></table>
  </dd>
</dl>
</div><!-- /.category -->
<!-- .category -->
<div class="category">
<dl>
  <dt><a href="https://www.kongregate.com/sports-racing-games">Sports &amp; Racing</a></dt>
  <dd class="browse_games">
    <table cellspacing="0" cellpadding="0" border="0">
        
          <tbody><tr data-game-impression-game-id="316009" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="0" class="game_hover js-game-hover graybg">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/siread/retro-bowl"><img class="game_icon" title="Retro Bowl" alt="Play Retro Bowl" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0069/4343/icon_200.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/siread/retro-bowl">Retro Bowl</a>
  </p>
    <p class="browse_developer">by
      siread
    </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:59px;"></li>
    </ul>
    <p><em class="num_rating">(4.60 avg.)</em></p>
</td>
</tr>

        
          <tr data-game-impression-game-id="115608" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="1" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/light_bringer777/learn-to-fly-2"><img class="game_icon" title="Learn to Fly 2" alt="Play Learn to Fly 2" width="26" height="21" src="https://cdn3.kongcdn.com/game_icons/0025/7656/thumbnail-kong.jpg?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/light_bringer777/learn-to-fly-2">Learn to Fly 2</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:58px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="257414" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="2" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/light_bringer777/learn-to-fly-3"><img class="game_icon" title="Learn to Fly 3" alt="Play Learn to Fly 3" width="26" height="21" src="https://cdn4.kongcdn.com/game_icons/0064/6770/logo474x379_250x200ratio_.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/light_bringer777/learn-to-fly-3">Learn to Fly 3</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:57px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="45630" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="3" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/light_bringer777/learn-to-fly"><img class="game_icon" title="Learn to Fly" alt="Play Learn to Fly" width="26" height="21" src="https://cdn2.kongcdn.com/game_icons/0008/9816/thumb_LTF.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/light_bringer777/learn-to-fly">Learn to Fly</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:56px;"></li>
    </ul>
</td>
</tr>

        
          <tr data-game-impression-game-id="10110" data-game-impression-unit-type="top_games_by_category" data-game-impression-position="4" class="game_hover js-game-hover ">
<td class="sm_game_icon">
  <a href="https://www.kongregate.com/games/Jiggmin/platform-racing-2"><img class="game_icon" title="Platform Racing 2" alt="Play Platform Racing 2" width="26" height="21" src="https://cdn3.kongcdn.com/game_icons/0068/5571/pr2.png?i10c=img.resize(width:26,height:21)"></a>
</td>
<td class="browse_game_title">
  <p>
    <a class="truncate_one_line hover_game_info" href="https://www.kongregate.com/games/Jiggmin/platform-racing-2">Platform Racing 2</a>
  </p>
  </td>
  <td class="browse_rating">
    <ul class="star-rating spritegame">
      <li class="current-rating spritegame spriteall" style="width:55px;"></li>
    </ul>
</td>
</tr>

      <tr>
       <td colspan="3" class="category_count">
         <a class="viewall" href="https://www.kongregate.com/sports-racing-games">8472&nbsp;more&nbsp;Sports &amp; Racing games »</a>
       </td>
      </tr>
    </tbody></table>
  </dd>
</dl>
</div><!-- /.category -->

  </div>
</div>
</div>

          </div>
      </div>
      <div class="unit size1of3 lastUnit">
        <div id="game_spotlights_pod" class="games_pod mhm mbl pbl">
          <div class="pod_header clearfix">
            <h2>Game Spotlights</h2>
          </div>
          <h6 class="h6 game_spotlights_heading mbs">Sponsored Listings</h6>
          <div id="kong_home_bf_281x90_1-ad-slot" class="ad-container premium_viewable"><script>
//<![CDATA[
kong_ads.displayAd("kong_home_bf_281x90_1");
//]]>
</script></div>
          <div id="kong_home_bf_281x90_2-ad-slot" class="ad-container premium_viewable"><script>
//<![CDATA[
kong_ads.displayAd("kong_home_bf_281x90_2");
//]]>
</script></div>
          <div id="kong_home_bf_281x90_3-ad-slot" class="ad-container premium_viewable"><script>
//<![CDATA[
kong_ads.displayAd("kong_home_bf_281x90_3");
//]]>
</script></div>
            <span class="horz-spotlight--upsell__wrapper">
  <h6 class="h6 game_spotlights_heading mtm mbs">Promoted Listings</h6>
  <span id="sane_browser_gamespotlight">
    <article class="horz-spotlight horz-spotlight--upsell">
      <a href="https://kong.zendesk.com/hc/en-us/articles/360043995471" class="horz-spotlight__link">
        <img alt="" class="horz-spotlight__img" src="https://cdn4.kongcdn.com/images/presentation/promo-upsell.png">
        <h3 class="horz-spotlight__title">
          Hey Developers!
        </h3>
        <p class="horz-spotlight__desc">
          Did you know you can promote your games in special listings around Kongregate using Blocks?
        </p>
        <span class="horz-spotlight__play">
          Learn more »
        </span>
      </a>
    </article>
  </span>
</span>

<script>
//<![CDATA[

  (function() {
      var displayUpsell = function(user) {
        if (user.isDeveloper()) {
          document.querySelector('.horz-spotlight--upsell__wrapper').classList.add('is-visible');
        }
      }

      if (active_user) {
        displayUpsell(active_user);
        active_user.addRunWhenAuthenticatedObserver(displayUpsell);
      }
  })();

//]]>
</script>
        </div>
        <div id="kongregate_social_connect_pod" class="mhm">
          <div class="pod_header clearfix">
            <h2>Stay Informed</h2>
          </div>
            <div class="pod_container">
              <a title="Sign in with Facebook" class="facebook_signin_large sprite_facebook mvl" onclick="new FacebookAuthenticator({}); return false;" href="#">Connect with Facebook</a>
              <div class="fb-facepile" data-size="medium" data-max-rows="1" data-width="270"></div>
            </div>
          <div class="pod_container twitter_container">
            <a href="https://twitter.com/kongregate" class="twitter-follow-button" data-show-count="true" data-size="large" data-lang="en">Follow @twitterapi</a>
          </div>
        </div>
      </div>
      <div id="extra_games" class="browse-by-category clear size1of1 unit">
        <!-- Extra games from infinite scroll are added here -->
      </div>
      <div id="show_more_categories" class="clear showmore_sprite">
        <div id="show_more_link">
          <a class="h6 h6_alt mhm pbs large_show_more_link" href="#" onclick="; return false;"><span class="large_show_more_area pam">Show More<span class="large_show_more_icon showmore_sprite"></span></span></a>
        </div>
        <div id="show_more_spinner" style="display: none;">
          <span class="spinner spinner_big">loading</span>
        </div>
      </div>
    </div>
    <!-- Browse By Category End -->
  </div>
  <!-- Pod Container End -->
</div>

      </td>
      <td id="skin_right_of_game"></td>
    </tr>
  </tbody></table>
</div>
`;

  var v1=0, v2=0, v3=0, v4=0, v5=0, v6=0, v7=0, v8=0, v9=0;
  var targetNode = document;
  var config = { childList: true, subtree: true };
  var callback = (mutationList, observer) => {
      for (let mutation of mutationList) {
          for(let node of mutation.addedNodes){
              for (let mutation of mutationList) {
                  if (mutation.type === 'childList') {
                      for(let node of mutation.addedNodes){
                          if(v1==0 && node.className=="md:hidden sticky top-0 z-100 group/navbar"){
                              v1=1;
                              let n=document.createElement("div");
                              n.id="headerwrap";
                              n.innerHTML = headerWrap;
                              node.parentElement.insertBefore(n, node);
                              node.remove();
                          }
                          else if(v2==0 && node.tagName=="K-NAVBAR"){
                              v2=1;
                              node.remove();
                          }
                          else if(v3==0 && node.id=="subwrap" && node.parentNode==document.body){
                              v3=1;
                              let n=document.createElement("div");
                              n.id="subwrap";
                              n.innerHTML=subwrap;
                              node.parentElement.insertBefore(n, node);
                              node.remove();
                          }
                          else if (v4==0 && node.tagName=="LINK" && node.rel=="icon"){
                              v4=1;
                              node.remove();
                              document.head.appendChild(customFavicon);
                          }
                          else if(v5==0 && node.tagName=="LINK" && node.rel=="stylesheet" && node.href.search("application_merged")>-1 && node.getAttribute("data-turbo-track")=="reload"){
                              v5=1;
                              node.remove();
                              goodKongCSS.href = 'https://web.archive.org/web/20220929041450id_/https://cdn2.kongcdn.com/compiled-assets/application_merged-a67554df6c1f13a74ac9c9905653492539c4567a18b17f4e1ca5fa9e37e2c194.css';
                              document.head.appendChild(goodKongCSS);
                          }
                          else if(v6==0 && node.tagName=="LINK" && node.rel=="stylesheet" && node.href.search("gamepage_merged")>-1 && node.getAttribute("data-turbo-track")=="reload"){
                              v6=1;
                              node.remove();
                              goodKongCSS.href = 'https://web.archive.org/web/20221109060717id_/https://cdn4.kongcdn.com/compiled-assets/gamepage_merged-ef563bc058e7e90cd0a2e1f8a744e354f5404b5e2a48491589b610e949d74c97.css';
                              document.head.appendChild(goodKongCSS);
                          }
                          else if(v7==0 && node.tagName=="LINK" && node.rel=="stylesheet" && node.href.search("application-")>-1 && node.getAttribute("data-turbo-track")=="reload"){
                              v7=1;
                              node.remove();
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
                          else if(v9==0 && node==document.body){
                            node.classList.remove('lang_other', 'lang_en');
                            node.classList.add('new_home', 'no_subwrap', 'grid960');
                          }
                      }
                  }
              }
          }
      }
  };
  var observer = new MutationObserver(callback);
  observer.observe(targetNode, config);

  function TimeToLogin(active_user){
    if(active_user.id()>0){
        document.getElementById("guest_user_welcome_content").style.display="none";
        var login_area=document.getElementById("nav_welcome_box");
        login_area.style.display="";
        var av=document.createElement("img"); av.src=active_user.avatarUrl();
        login_area.getElementsByClassName("profile profile_control")[0].firstElementChild.href="http://www.kongregate.com/accounts/"+active_user.username();
        document.getElementById("small_avatar_placeholder").appendChild(av);
        login_area.getElementsByClassName("username_holder")[0].innerHTML=active_user.username();
        document.getElementById("mini-profile-level").innerHTML=active_user.level();
        login_area.getElementsByClassName("play-laters-count")[0].innerHTML=active_user.playLatersCount();
        login_area.getElementsByClassName("favorites-count-link")[0].href="http://www.kongregate.com/accounts/"+active_user.username()+"/favorites";
        login_area.getElementsByClassName("favorites-count")[0].innerHTML=active_user.favoritesCount();
        login_area.getElementsByClassName("friends_online_link")[0].href="http://www.kongregate.com/accounts/"+active_user.username()+"/friends";
        login_area.getElementsByClassName("friends_online_count")[0].innerHTML=active_user.friendsOnlineCount();
        document.getElementById("my-messages-link").href="http://www.kongregate.com/accounts/"+active_user.username()+"/messages";
        var uc=active_user.unreadShoutsCount()+active_user.unreadWhispersCount()+active_user.unreadGameMessagesCount();
        if(uc>0){ document.getElementById("profile_control_unread_message_count").innerHTML=uc; }
        login_area.getElementsByClassName("settings profile_control")[0].getElementsByTagName("ul").firstElementChild.firstElementChild.href="http://www.kongregate.com/accounts/"+active_user.username()+"/edit";
    }
}

function ThingsToDoAtTheEnd(){
    if(typeof(active_user)!="undefined"){
        TimeToLogin(active_user);
    }
    else{ setTimeout(function(){ ThingsToDoAtTheEnd(); },1000); }
};
ThingsToDoAtTheEnd();

})();
