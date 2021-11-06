SelVal = 'C';
CurSpeed = 3;
SetClass = '';
WebSock = null;
HasConnected = false;
IsIndicating = false;
MsgCNT = $('.messages-content');

$('#init-chat').val('Hi.');
if (Auth = GetCookie('X-Auth')) $('#code-box').val(Auth);

CodeDict = {
	_1000: "Connection Closed By The Server.",
	_1005: "Connection Interrupted From Your Side.",
	_1006: "Unable To Connect To The Server.",
	_1008: "Connection Closed Due To Policy Violation.",
	_1010: "Server Mandatory Extension Failure.",
	_1011: "Server Encountered An Error, Connection Has Been Closed.",
	_1012: "Connection Dropped, Server Services Restarted.",
	_1013: "Unable To Connect! Try Again Later.",
	_1014: "Connection Dropped! Error : Bad Gateway.",
	_1015: "Unable To Establish A Secure Connection To Server."
}

Toast.setOptions(
{
	delay    : 5,
	timelife : true,
	onShow   : "vanishIn",
	onHide   : "vanishOut"
});
new Toast("info", "Welcome To Bot-Battle");

function UpdateBotList(CurVal)
{
	if (CurVal == SelVal) return;
	$('select#bsnd').empty();
	SelVal = CurVal;

	switch(CurVal)
	{
		case 'C':
			$('<option value="C">Itself</option>').appendTo('select#bsnd');
			$('<option value="P" selected>Pandora-Bot</option>').appendTo('select#bsnd');
			$('<option value="B">Bing-Bot</option>').appendTo('select#bsnd');
			$('<option value="R">Rose-Bot</option>').appendTo('select#bsnd');
		break;

		case 'P':
			$('<option value="C">Clever-Bot</option>').appendTo('select#bsnd');
			$('<option value="B" selected>Bing-Bot</option>').appendTo('select#bsnd');
			$('<option value="R">Rose-Bot</option>').appendTo('select#bsnd');
		break;

		case 'B':
			$('<option value="B">Itself</option>').appendTo('select#bsnd');
			$('<option value="C" selected>Clever-Bot</option>').appendTo('select#bsnd');
			$('<option value="P">Pandora-Bot</option>').appendTo('select#bsnd');
			$('<option value="R">Rose-Bot</option>').appendTo('select#bsnd');
		break;

		case 'R':
			$('<option value="C">Clever-Bot</option>').appendTo('select#bsnd');
			$('<option value="P">Pandora-Bot</option>').appendTo('select#bsnd');
			$('<option value="B" selected>Bing-Bot</option>').appendTo('select#bsnd');
		break;
	}

	$('select#bsnd').niceSelect('update');
}

function ExploreAI()
{
	StartChat = undefined;
	$('label.status').text('Connecting....');
	$('section.settings').addClass('hide icon');
	$('label.status').removeClass('dcon').addClass('conn');
	var BId = $('select#bfst').val() + "-" + $('select#bsnd').val();

	SetCookie("X-Bots", BId, 7);
	SetCookie("X-Auth", $('#code-box').val(), 7);
	if ($('#init-chat').val().trim() != '')
	{
		StartChat = $('#init-chat').val();
		SetCookie("X-Start", StartChat, 7);
	}
	
	try
	{
		setTimeout(function(NewBId)
		{
			if (HasConnected && IsCon()) SendToServer(
				{
					Msg: $('#init-chat').val().trim() == '' ? null : $('#init-chat').val(),
					Action: "Bot-Change",
					Bots: NewBId
				});
			else
			{
				WebSock = new WebSocket('wss://bot-battle.cf:8443/Clash');
				WebSock.onopen = OnConnected;
				WebSock.onerror = ErrorThrown;
				WebSock.onmessage = GotMessage;
				WebSock.onclose = OnDisconnected;
			}
		}, 1000, BId);
	}
	catch (e) { }
}

function ScrollToView()
{
	MsgCNT.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom',
	{
		scrollInertia: 0,
		timeout: 0
	});
}

function RangeChange(NewSpeed)
{
	if (CurSpeed != NewSpeed && IsCon())
		SendToServer({ Action: "Speed", Value: NewSpeed, MySpeed: CurSpeed });
	CurSpeed = NewSpeed;
}

function SetState(IsLeft)
{
	if (IsCon())
	{
		$('#switch-state').attr('disabled', true);
		$('#switch-state .checkbox').attr('disabled', true);
		SendToServer({ Action: "State", IsPause: IsLeft });
	}
}

function ToggleIndicator(IsRight = true)
{
	if (IsIndicating) $('.message.loading').remove();
	else
	{
		var TClass = IsRight ? " message-personal" : "";
	  $('<div class="message loading'+ TClass +' new"><span></span></div>')
	  .appendTo($('.mCSB_container'));
	  ScrollToView();
	}

	IsIndicating = !IsIndicating;
}

function Insert(Bot, IMsg, ToRight = true)
{
	if ($.trim(IMsg) == "") return false;
	var BotElement = '<div class="bot">' + Bot + '</div>';
	if (IsIndicating) $('.message.loading').remove();
	var TClass = ToRight ? " message-personal" : "";
	$('<div class="message'+ TClass +' new">'
	+ IMsg + BotElement + '</div>')
	.appendTo($('.mCSB_container'));
	ScrollToView(); IsIndicating = false;
}

function SetCookie(name, value, days)
{
    if (days)
    {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        var expires = "; expires=" + date.toUTCString();
    }
    
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function GetCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function EraseCookie(name) { document.cookie = name +'=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; }

// Connection handlings starts here

function OnConnected(ConE)
{
	SetClass = 'live';
	HasConnected = true;
	$('.mCSB_container').empty();
	$('label.status').text('Connected');
	$('label.status').removeClass('dcon conn');
	$('#switch-state').attr('disabled', false);
	$('input.checkbox').prop('checked', false);
	$('#switch-state .checkbox').attr('disabled', false);

	setTimeout(function()
	{
		if (!IsCon()) return;
		if (StartChat !== undefined) Insert('Bot', StartChat);
		else Insert('Bot', 'Hello.');
		ToggleIndicator(false);
	}, 1500);
}

function GotMessage(MsgE)
{
	try
	{
		var JSvResp = JSON.parse(MsgE.data);

		switch (JSvResp.Action)
		{
			case "Speed":
				
				if (!JSvResp.HasChanged)
				{
					CurSpeed = JSvResp.MySpeed;
					$('input#range-speed').prop('value', CurSpeed);
					new Toast("error", "Failed To Set The Message Speed.");
				}
				else new Toast("success", "Chat Speed Rate Has Been Changed.");
			break;

			case "State":

				setTimeout(function()
				{
					$('#switch-state').attr('disabled', false);
					$('#switch-state .checkbox').attr('disabled', false);
					new Toast('success', 'Chat Between The Bots Has Been ' + JSvResp.Type);
				}, 1000);
			break;

			case "Bot-Change":

				if (JSvResp.BotsChanged) 
				{
					OnConnected(null);
					new Toast('success', "Bots Updated Successfully!");
				}
				else new Toast('error', "Server Rejected The Request For Changing The Bots!");
			break;
			
			case "Chat":

				var Chat = JSvResp.Talk;
				Insert(Chat.BotName, Chat.Message, Chat.IsRight);
				setTimeout(function(Direction) { ToggleIndicator(Direction); }, 1500, !Chat.IsRight);
			break;

			case "Download":

				if (JSvResp.HasData)
				{
					DownloadTXT(JSvResp.Data);
					setTimeout(function() { new Toast('success', 'Updated Chat History Has Been Downloaded.'); }, 1000);
				}
				else new Toast("info", "There Is Not Enought Chat Available To Download, Try Again Later.");
			break;
		}
	}
	catch(e) { }
}

function DownloadTXT(BS64)
{
	const DownloadElem = document.createElement("a");
	var IdSeed = (Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111);
	DownloadElem.href = 'data:application/octet-stream;base64,' + BS64;
	DownloadElem.download = 'Bot-Battle Chat_' + IdSeed + '.txt';
	DownloadElem.click();
}

function OnDisconnected(DscE)
{
	SetClass = '';
	var DCode = DscE.code;
	$('label.status').addClass('dcon');
	if (IsIndicating) ToggleIndicator();
	$('label.status').text('Disconnected');
	$('section.settings').removeClass('hide live');
	
	if (DCode >= 1000 && DCode <= 1020)
	{
		if (CodeDict['_' + DCode] !== undefined)
			new Toast('warn', CodeDict['_' + DCode]);
		else new Toast('error', "Unknown Error Encountered While Establishing A Connection!");
	}
	else if (DCode === 3050) new Toast('info', "Your Session Was Terminated From The Server.");
	else if (DCode >= 3000 && DCode <= 3999)
		new Toast('alert', DscE.reason);
}

function ErrorThrown(ErrE)
{
	// body...
}

function IsCon() { return WebSock.readyState === WebSocket.OPEN; }
function SendToServer(JData) { if (IsCon()) WebSock.send(JSON.stringify(JData)); }
function Popable() { return WebSock.readyState === WebSocket.OPEN || WebSock.readyState === WebSocket.CLOSED; }

// Connection handlings ends here
