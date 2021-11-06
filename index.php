<?php
	header("Expires: 0");
    header("Pragma: no-cache");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Cache-Control: no-store, no-cache, must-revalidate");
?>

<!DOCTYPE html>
<html lang="en" >
	<head>
		<title>Enjoy Bots Chat - Meet The Future Of AI || Bot-Battle</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="icon" href="bot-ai.png" type="image/png" />
		<link rel="stylesheet" href="Styles\NiceSelect.css">
		<link rel='stylesheet' href="Styles\Scrollbar.css">
		<link rel="stylesheet" href="Styles\Slider.css">
		<link rel="stylesheet" href="Styles\Style.css">
		<link rel="stylesheet" href="Styles\Toast.css">
		<script src='Scripts\JQuery.js'></script>
		<meta charset="UTF-8">
	</head>
	<body onload="MsgCNT.mCustomScrollbar();">
		<section class="settings">
			<div class="close-container" onclick="$('.settings').addClass('hide')">
				<div class="leftright"></div>
				<div class="rightleft"></div>
			</div>
			<div class="elems init-change">
				<b>Configure Bots</b>
				<hr style="width: 80%;">
				<b class="author">By Rishabh Kumar</b><br>
				<div class="container">
					<div class="txt">Let The</div>
					<select id="bfst" onchange="UpdateBotList(this.value)" aria-label="bot-1st">
						<option value="C" selected>Clever-Bot</option>
						<option value="P">Pandora-Bot</option>
						<option value="B">Bing-Bot</option>
						<option value="R">Rose-Bot</option>
					</select>
				</div>
				<div class="container">
					<div class="txt">Talk To</div>
					<select id="bsnd" aria-label="bot-2nd">
						<option value="C">Itself</option>
						<option value="P" selected>Pandora-Bot</option>
						<option value="B">Bing-Bot</option>
						<option value="R">Rose-Bot</option>
					</select>
				</div>
				<div class="textboxer">
					<input id="init-chat" class="writable" placeholder="Start chat from here">
					<label for="init-chat" class="starter-lbl set">Start chat from here</label>
				</div>
				<div class="textboxer">
					<input id="code-box" class="writable" placeholder="Enter access code">
					<label for="code-box" class="starter-lbl set">Enter access code</label>
				</div>
				<div style="margin-bottom: 5px;">
					<button onclick="ExploreAI();">Start War</button>
				</div>
			</div>
			<div class="elems live-change">
				<b>Update Settings</b>
				<hr style="width: 80%;">
				<b class="author">By Rishabh Kumar</b><br>
				<p class="spaced"></p><span class="txt">Change Chat State</span>
			    <div class="btn-feel b2" id="switch-state">
			        <input type="checkbox" onchange="SetState(this.checked);" class="checkbox">
			        <div class="knobs"><span class="sw"></span></div>
			        <div class="layer"></div>
			    </div>
			    <div class="range">
					<input name="range" class="sld" id="range-speed" type="range" value="3" min="2" oninput="$('output.output').text(this.value);" onchange="RangeChange(this.value);" max="10"><div class="range-output"><output class="output" name="output" for="range">3</output></div>
				</div>
				<span class="txt" style="top: 48px; left: 0px;">Change Message Delay</span>
				<div style="top: 65px; left: 0px; position: relative;">
					<button onclick="$('.mCSB_container').empty(); new Toast('success', 'Chat History Has Been Erased.');">Clear History</button>
					<button onclick="$('.settings').removeClass('live');">Change Bots</button>
				</div>
				<div class="btn-secdd">
					<button onclick="WebSock.close(3050, 'I Wan\'t Leave.');">Disconnect</button>
					<button onclick="if (IsCon()) SendToServer({ Action: 'GetChat' });">Download Chat</button>
				</div>
			</div>
		</section>
		<section class="auto-messenger">
			<div class="chat">
				<div class="chat-title">
					<h1>Self-Talking Bots</h1>
					<h2>Meet the future of AI</h2>
				</div>
				<div class="messages">
					<div class="messages-content"></div>
				</div>
				<div class="control-box">
					<label class="status dcon">Disconnected</label>
					<button class="re-select" onclick="if (Popable()) { $('.settings').addClass(SetClass).removeClass('hide'); } else new Toast('warn', 'Please Wait....');">Settings</button>
				</div>
			</div>
		</section>

		<script src="Scripts\Slider.js"></script>
		<script src='Scripts\Scrollbar.js'></script>
		<script src="Scripts\NiceSelect.js"></script>
		<script>$('select').niceSelect();</script>
		<script src="Scripts\Toast.js"></script>
		<script src="Scripts\Handler.js"></script>
	</body>
</html>
