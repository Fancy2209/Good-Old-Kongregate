// ==UserScript==
// @name         Good Old Kongregate
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Gone but not forgotten
// @author       Fancy2209
// @match         *://www.kongregate.com/*
// @icon         https://cdn1.kongcdn.com/compiled-assets/favicos/favico-196-de563d6c4856efb7ac5060666510e5e50b2382593b724b802a6c6c53c1971e8c.png
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';
  /*
  // Find the Things
  const VeryGoodNewHeader = document.querySelector('div.sticky.top-0.z-100');
  const VeryGoodNewSubwrap = document.getElementById('subwrap');
  */
  
  var existingFavicon = document.querySelector('link[rel="icon"]');
  var customFavicon = document.createElement('link');
  /*
  customFavicon.type = 'image/png';
  customFavicon.rel = 'icon';
  customFavicon.href = 'https://raw.githubusercontent.com/Fancy2209/Good-Old-Kongregate/main/Icon/kong.png'; // Replace with the URL of your custom favicon
  var goodKongCSS = document.createElement('link');
  var newKongCSS = document.querySelector('head link[rel="stylesheet"][href*="application_merged"][data-turbo-track="reload"]');
  
  goodKongCSS.rel = 'stylesheet';
  goodKongCSS.href = 'https://fancy2209.github.io/KOG/GoodOldKongregate.css';
  goodKongCSS.setAttribute('data-turbo-track', 'reload');
  */
  const headerWrap = `
  <div id="headerwrap">

    
  <!--============ #header ============-->
  <div id="header">
    <div id="header_logo">
<h3 id="playing"><strong></strong> online playing <strong></strong> free games!</h3>
<h2 title="Kongregate">
<a class="spritesite spriteall" title="Kongregate" id="kong_header_link" href="http://www.kongregate.com/">Kongregate</a>
</h2>
</div>

    <div id="new_nav_wrapper">

<!-- Welcome Start -->
<div id="welcome">

<!-- User Welcome Start -->
<ul id="nav_welcome_box" class="welcome-user" style="display:none">
<!-- Mini Profile Start -->
<li class="profile profile_control">
  <a href="http://www.kongregate.com/accounts/Guest">
    <span id="small_avatar_placeholder"></span>
    <span class="username_holder"></span> <span id="mini-profile-level"></span>
</a>    </li>
<!-- Mini Profile End -->
<!-- Playlist Start -->
<li class="playlist">
  <a class="play-laters-count-link" href="http://www.kongregate.com/my_playlist">
    <span aria-hidden="true" class="kong_ico mrs">p</span><span class="play-laters-count">0</span>
</a>    </li>
<!-- Playlist End -->
<!-- Favorites Start -->
<li class="favorites">
  <a class="favorites-count-link" href="http://www.kongregate.com/accounts/Guest/favorites">
    <span aria-hidden="true" class="kong_ico mrs">l</span><span class="favorites-count">0</span>
</a>    </li>
<!-- Favorites End -->
<!-- Friends Start -->
<li class="friends_online friends">
  <a class="friends_online_link" href="http://www.kongregate.com/accounts/Guest/friends">
    <span aria-hidden="true" class="kong_ico mrs">f</span><span class="friends_online_count"></span>
</a>    </li>
<!-- Friends End -->
<!-- Messages Start -->
<li class="messages">
  <a class="my-messages" id="my-messages-link" href="http://www.kongregate.com/accounts/Guest/messages">        <span id="profile_bar_messages">
      <span aria-hidden="true" class="kong_ico">m</span><span id="profile_control_unread_message_count" class="msg-count"></span>
    </span>
</a>    </li>
<!-- Messages End -->
<!-- Settings Start -->
<li class="settings profile_control">
  <span aria-hidden="true" class="kong_ico">s</span>
  <ul>
    <li>
      <a href="http://www.kongregate.com/accounts/Guest/edit">Settings</a>
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
<a class="main_nav_top_item" href="http://www.kongregate.com/games">Games</a>
<div class="main_nav_menu" style="left: -583.433px; width: 1536px;"><div class="main_nav_menu_inner">

<!-- Recent Games Start -->
<div id="main_nav_games_im_playing" class="main_nav_category my_games_block mrl">
<strong class="game_block_link">
<a href="" data-metric-tracker="js-wa-tc-Navigation-Recently_Played"><tr8n translation_key_id="7532" id="4807e18418b9a568274a246a5cf46b5d">Recently Played »</tr8n></a>
</strong>

<a class="no_games_block" href="http://www.kongregate.com/games">
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

  <a class="no_games_block" href="http://www.kongregate.com/games">
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
<dt class="main_nav_category_title pbs"><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/games"><tr8n translation_key_id="4807" id="2862bedfd879c3e77bcf3c6f7e316c64">Categories</tr8n></a></dt>
<dd class="mtm">
<ul class="main_nav_category_list">
  <li class="featured"><a data-metric-tracker="js-wa-tc-Navigation-Feature" href="http://www.kongregate.com/top-rated-games"><tr8n translation_key_id="4828" id="d760a8e9c05f22489e400f153123ea74">Top Rated</tr8n></a></li>
  <li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/action-games"><tr8n translation_key_id="4675" id="7de879de63eac1879d6b22a01629d8b8">Action</tr8n></a></li>
  <li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/multiplayer-games"><tr8n translation_key_id="4676" id="6fc7cdec9e54d4dc28874899ce6f3282">Multiplayer</tr8n></a></li>
  <li class="featured"><a data-metric-tracker="js-wa-tc-Navigation-Feature" href="http://www.kongregate.com/top-rated-games?sort=newest"><tr8n translation_key_id="8261" id="1dc823e083cd4aa6f232df5b735cb48f">Hot New</tr8n></a></li>
  <li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/mmo-games"><tr8n translation_key_id="4815" id="6a828d3342cb6db551dec15b122dc248">MMO</tr8n></a></li>
  <li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/adventure-rpg-games"><tr8n translation_key_id="5183" id="e134b45f61a33f4231408c64ff4eb1a2">Adventure &amp; RPG</tr8n></a></li>
  <li class="featured">
    
      <a data-metric-tracker="js-wa-tc-Navigation-Feature" class="js-activate-inline-registration" href="#">
        <span><tr8n translation_key_id="4827" id="c9282553bdba249264f8036eb2028fa2">My Favorites</tr8n></span>
      </a>
    
  </li>
  <li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/strategy-defense-games"><tr8n translation_key_id="5181" id="8fba9d10e45c3816fa83ed3a98f79c24">Strategy &amp; Defense</tr8n></a></li>
  <li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/shooter-games"><tr8n translation_key_id="4672" id="9a9a0e97bf92631df74b693c6135186e">Shooter</tr8n></a></li>
  <li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/upgrades-games"><tr8n translation_key_id="4708" id="8d2564251030e2620672229fd1e48a8e">Upgrades</tr8n></a></li>
  <li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/tower-defense-games"><tr8n translation_key_id="4763" id="cc86fa28967243b8c989ff0a1563075f">Tower Defense</tr8n></a></li>
  <li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/sports-racing-games"><tr8n translation_key_id="6769" id="1782db50f2860b6a686db1688b7c9126">Sports/Racing</tr8n></a></li>
  <li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/5-minute-games"><tr8n translation_key_id="4913" id="9728c0927120cc818a1f472fa4039ac9">5 Minute</tr8n></a></li>
  <li><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/zombie-games"><tr8n translation_key_id="4707" id="6f03cc72aefac9210ffb6942eef4cfc1">Zombie</tr8n></a></li>
  <li class="more"><a data-metric-tracker="js-wa-tc-Navigation-Categories" href="http://www.kongregate.com/games"><tr8n translation_key_id="7427" id="b53d385fbd99e2f1e3ed3b3697890cbd">More Categories</tr8n></a></li>
</ul>
</dd>
<dd class="main_nav_sub">
<p class="main_nav_sub_title mbs"><em><tr8n translation_key_id="8262" id="2859792c0789a0161121358f8d091211">For Developers:</tr8n></em></p>
<ul class="main_nav_sub_links">
  <li><a data-metric-tracker="js-wa-tc-Navigation-Developers" href="http://www.kongregate.com/games/new"><tr8n translation_key_id="8263" id="f588fd0640156fb6b9a7de8ae8000f0e">Upload your game</tr8n></a></li>
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
<a class="main_nav_top_item" href="http://www.kongregate.com/badges">Achievements</a>
<div class="main_nav_menu" style="left: -583.433px; width: 1536px;"><div class="main_nav_menu_inner">
<!-- BoTD Start -->
<dl id="main_nav_achievements_botd" class="main_nav_category mrl">
<dt class="main_nav_category_title pbs"><a href="http://www.kongregate.com/badges" data-metric-tracker="js-wa-tc-Navigation-Badge_of_the_Day"><tr8n translation_key_id="7900" id="f2fb1c8230059751b989a7e6c6ea1c8d">Badge of the Day »</tr8n></a></dt>
<dd class="mtm">
<p class="h6 intro mbs"><em><tr8n translation_key_id="7433" id="c94274836d3b878f8635c596be052201">Score 2x points</tr8n><span class="powerup_rewards_botd_upsell"> &amp; <strong class="spritesite textreplace"><tr8n translation_key_id="7434" id="492c29f00b8b94d6357fea2b60706fbc">PowerUp</tr8n></strong><tr8n translation_key_id="7435" id="6f4c259259babe3020fbd7af666f99e6"> rewards points</tr8n></span>!</em></p>
<div class="botd_outer media click_box regtextSml">
  <div class="badge img mlm">
    <div class="badge_image">
      <a href="http://www.kongregate.com/games/nerdook/i-am-an-insane-rogue-ai" class="badge_link" data-metric-tracker="js-wa-tc-Navigation-Badge_of_the_Day">
        <img alt="Binary Morality" src="https://cdn2.kongcdn.com/badge_icons/0000/2583/rogue_ai_easy.png" class="img">
      </a>
    </div>
    <div class="badge_border">
      <a href="http://www.kongregate.com/games/nerdook/i-am-an-insane-rogue-ai" class="badge_link" data-metric-tracker="js-wa-tc-Navigation-Badge_of_the_Day">
        <span class="incomplete spritegame spriteall">Badge of the Day</span>
      </a>
    </div>
    <div class="badge_of_the_day_overlay">
      <a href="http://www.kongregate.com/games/nerdook/i-am-an-insane-rogue-ai" class="badge_link" data-metric-tracker="js-wa-tc-Navigation-Badge_of_the_Day">
        <span class="spriteall botd_badge_id_1292">Badge of the Day</span>
      </a>
    </div>
  </div>
  <p class="bd">
    <strong><a href="http://www.kongregate.com/games/nerdook/i-am-an-insane-rogue-ai" class="game_link click_link" data-metric-tracker="js-wa-tc-Navigation-Badge_of_the_Day">Binary Morality</a></strong>
    Complete a level through both violent and pacifist means in <a href="http://www.kongregate.com/games/nerdook/i-am-an-insane-rogue-ai" data-metric-tracker="js-wa-tc-Navigation-Badge_of_the_Day">I Am An Insane Rogue AI</a>
  </p>
</div>
</dd>
</dl>

<!-- BoTD End -->
<!-- Challenge Start -->

<dl id="main_nav_achievements_challenge" class="main_nav_category mrl">
<dt class="main_nav_category_title pbs"><a href="http://www.kongregate.com/current_challenges"><tr8n translation_key_id="5187" id="3f47b3b7f80b1f3553ede8d36f21a9f1">Current Challenge</tr8n> »</a></dt>
<dd class="mtm">
<div class="media click_block">
  <a href="http://www.kongregate.com/games/synapticon/spellstone">
    <img alt="Swords and Spells" src="https://cdn3.kongcdn.com/assets/items/0014/9302/swordsandsoulsitem_40x40.png" class="img">
  </a>
  <p class="bd">
    <strong><a href="http://www.kongregate.com/games/synapticon/spellstone" class="game_link click_link">Swords and Spells</a></strong>
    Complete the third campaign node to unlock the Ragnarok spell in "Swords and Souls"!
  </p>
</div>
</dd>
</dl>


<!-- Challenge End -->
<!-- Recently Badged Start -->
<dl id="main_nav_achievements_recent" class="main_nav_category mrl">
<dt class="main_nav_category_title pbs"><a data-metric-tracker="js-wa-tc-Navigation-Recently_Badged" href="http://www.kongregate.com/badges?sort=newest"><tr8n translation_key_id="7436" id="fc67e5f67528c92e4015eb0453c8b7fb">Recently Badged Games</tr8n> »</a></dt>
<dd class="mtm">
  <ul class="main_nav_recently_badge_list">
    
      <li class="game">
<a href="http://www.kongregate.com/games/mrudi/trader-of-stories-chapter-1" class="media" data-metric-tracker="js-wa-tc-Navigation-Recently_Badged">
<img alt="Play Trader of Stories - Chapter 1" src="https://cdn4.kongcdn.com/game_icons/0066/0760/game-icon-kongregate.jpg?i10c=img.resize(width:250)" class="img">
<span class="bd">
  <strong class="game_link">Trader of Stories - Chapter 1</strong>
  <span class="badge_count"><span class="badge_icon spritesite mrs"></span>1 Badge</span>
</span>
</a>
</li>

    
      <li class="game">
<a href="http://www.kongregate.com/games/Gibton/apple-worm" class="media" data-metric-tracker="js-wa-tc-Navigation-Recently_Badged">
<img alt="Play Apple Worm" src="https://cdn3.kongcdn.com/game_icons/0065/9998/apple-worm_Kong_250x200.png?i10c=img.resize(width:250)" class="img">
<span class="bd">
  <strong class="game_link">Apple Worm</strong>
  <span class="badge_count"><span class="badge_icon spritesite mrs"></span>1 Badge</span>
</span>
</a>
</li>

    
      <li class="game">
<a href="http://www.kongregate.com/games/rzuf79/frog-fable" class="media" data-metric-tracker="js-wa-tc-Navigation-Recently_Badged">
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
<dt class="main_nav_category_title pbs"><a href="http://www.kongregate.com/badges" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7901" id="054590d4aef073d8ef230443545d4380">Badges »</tr8n></a></dt>
<dd class="mtm">
  <ul class="main_nav_category_list">
    <li><a href="http://www.kongregate.com/recommended-badges" class="js-activate-inline-registration" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7438" id="9859f3aafcd74c696a79ce257f3b9411">Recommended for Me</tr8n></a></li>
    <li><a href="http://www.kongregate.com/badges?category=action" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7439" id="4858c0ea44fa081c2b98a433e5ed0847">Action Badges</tr8n></a></li>
    <li><a href="http://www.kongregate.com/badges?sort=least_awarded" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7440" id="68c8e9cbdafd71b9e9b069080025c142">Rarest Badges</tr8n></a></li>
    <li><a href="http://www.kongregate.com/badges?category=sports-racing" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7441" id="efecfb8578673700c4b30d0fd48f0e37">Racing Badges</tr8n></a></li>
    <li><a href="http://www.kongregate.com/badges?sort=easiest&amp;filter_by=unearned" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7442" id="71c811dd6b7602f35eedcfbc9eb2ee7b">Easiest Unearned</tr8n></a></li>
    <li><a href="http://www.kongregate.com/badges?category=puzzle" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7443" id="2d708b1a80f5b6d1f1fdbb1bc6e3b785">Puzzle Badges</tr8n></a></li>
    <li><a href="http://www.kongregate.com/badges?sort=newest" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="7444" id="2b1df9f5bd73b11e3945d4e9387a5b13">Newest Badges</tr8n></a></li>
    <li class="more"><a href="http://www.kongregate.com/badges" data-metric-tracker="js-wa-tc-Navigation-Badges"><tr8n translation_key_id="5192" id="6815fd55fca416ee4676b660dfc129f4">All Badges</tr8n></a></li>
  </ul>
</dd>
</dl>
<!-- Badges End -->
<!-- Quests Start -->
<dl id="main_nav_quests" class="main_nav_category mtl">
<dt class="main_nav_category_title pbs"><a href="http://www.kongregate.com/badge_quests/your_first" data-metric-tracker="js-wa-tc-Navigation-Quests"><tr8n translation_key_id="7902" id="6b749ba95f9b50ca75d5a8b0cfec66d9">Quests »</tr8n></a></dt>
<dd class="mtm">
  <ul class="main_nav_category_list">
    <li><a href="http://www.kongregate.com/badge_quests/your_first" data-metric-tracker="js-wa-tc-Navigation-Quests"><tr8n translation_key_id="7445" id="e3705f31a25fb33858729308b23f74f6">All Quests</tr8n></a></li>
    
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
<a class="main_nav_top_item" href="http://www.kongregate.com/community">My Kong</a>
<div class="main_nav_menu" style="left: -583.433px; width: 1536px;">
<div class="main_nav_menu_inner">
<!-- Account Info Start -->
<dl id="main_nav_mykong_activity" class="main_nav_category mrl">
<dt class="main_nav_category_title pbs"><tr8n translation_key_id="7446" id="85519d4cd4c1ead401d71f1858bceacb">Trending with Friends</tr8n></dt>
<dd id="main_nav_activity_upsell" class="mtm">
  <p><strong><tr8n translation_key_id="5199" id="fe64e4ecfe0910330496613639d3db60">Activity Feed</tr8n></strong></p>
  <p class="media regtextLrg">
    <span class="img kong_ico" aria-hidden="true">g</span>
    <span class="bd"><a href="http://www.kongregate.com/accounts/new"><tr8n translation_key_id="5167" id="be74407479cbeb47bda87703c271b676">Register</tr8n></a><tr8n translation_key_id="7447" id="cca66629ddc45d5fc515c8c815cf244a"> or </tr8n><a href="#" class="js-activate-inline-login"><tr8n translation_key_id="7448" id="9c0695235a34d0a39eaad64474598f49">sign in</tr8n></a><tr8n translation_key_id="7449" id="2a43f38813add6736d2835dcaf51a230"> to start receiving activity updates from around Kongregate!</tr8n></span>
  </p>
</dd>
</dl>
<!-- Account Info End -->
<!-- Forums Start -->
<dl id="main_nav_mykong_forums" class="main_nav_category">
<dt class="main_nav_category_title pbs"><a href="http://www.kongregate.com/forums"><tr8n translation_key_id="7903" id="0407960c13a31fbf9f8d2b3e256a6f8d">Forums »</tr8n></a></dt>
<dd class="mtm">
  <ul class="main_nav_category_list">
    <li><a data-metric-tracker="js-wa-tc-Navigation-Forums" href="http://www.kongregate.com/forums/1-kongregate">Kongregate</a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Forums" href="http://www.kongregate.com/forums/games">Game Forums</a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Forums" href="http://www.kongregate.com/forums/3-general-gaming">General Gaming</a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Forums" href="http://www.kongregate.com/forums/7-technical-support">Tech Support</a></li>
<li><a data-metric-tracker="js-wa-tc-Navigation-Forums" href="http://www.kongregate.com/forums/4-game-programming">Game Development</a></li>

    <li class="more"><a class="js-wa-tc-Navigation-Forums" href="http://www.kongregate.com/forums">All Forums</a></li>

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
  <a class="nav--dev-upload" href="http://www.kongregate.com/games/new">Upload Your Game</a>
  <p class="nav--dev-tagline">
    <strong>Kongregate is a community-driven browser games portal with an open platform for all web games.</strong>
    Get your games in front of thousands of users while monetizing through ads and virtual goods.
    <a href="http://www.kongregate.com/docs/why-kong/welcome">Learn more »</a>
  </p>
  <ul class="nav--dev-links">
    <li>
      <a href="http://developers.kongregate.com/">
      <h3>Visit our developers site »</h3>
      <p>Learn more about our publishing program -<br>
        we help game developers get their games out to millions of users on multiple platforms.</p>
</a>        </li>
    <li>
      <a href="http://www.kongregate.com/blog">
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
<form onsubmit="$('nav_search_submit_button').onclick();" id="search" class="search" action="http://www.kongregate.com/search" accept-charset="UTF-8" method="get"><input name="utf8" type="hidden" value="✓">    <dl>
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
</div>
  `;
  const subwrap = `
  <div id="subwrap">




  <!--============ #footer ============-->
  <div id="footer" class="clearfix">
    <div class="kongregate-logo mbl"><a class="spriteall spritesite kongregate-logo" href="http://www.kongregate.com/">Kongregate</a></div>
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
    <a class="spriteall spritesite" href="http://www.kongregate.com/">Kongregate</a>
  </li>
  <li class="footer_mtg--logo spritesite textreplace">An MTG company</li>
</ul>

  </div>
  <!--============ /#footer ============-->

</div>
  `;
    var v1=0, v2=0, v3=0;
    var targetNode = document;
    var config = { childList: true, subtree: true };
    var callback = (mutationList, observer) => {
        for (let mutation of mutationList) {
            for(let node of mutation.addedNodes){
                for (let mutation of mutationList) {
                    if (mutation.type === 'childList') {
                        for(let node of mutation.addedNodes){
                                if(v1==0 && node.className=="sticky top-0 z-100"){
                                    v1=1;
                                    node.innerHTML = headerWrap;
                                }
                                else if(v2==0 && node.id=="subwrap"){
                                    v2=1;
                                    node.innerHTML = subwrap;
                                }
                            }
                        }
                }
            }
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
      /*
      if (VeryGoodNewHeader) {
      // Old Header HTML

      VeryGoodNewHeader.innerHTML = headerWrap;
      }
      if (VeryGoodNewSubwrap) {
        // Old Subwrap HTML

        VeryGoodNewSubwrap.innerHTML = subwrap;
        }

      if (newKongCSS) {
      // Create a new link element for the replacement stylesheet
        newKongCSS.remove();
        document.head.appendChild(goodKongCSS);
      }
      if (existingFavicon) {
        existingFavicon.remove();
        document.head.appendChild(customFavicon);
      }
      */


})();
