<?php
	$Disp = [];
	$DSvrNM = $_SERVER['SERVER_NAME'];
	$Disp[0] = "Direct Access Denied";
	$UFrom = $_SERVER['REDIRECT_URL'] ?? null;
	$HCode = $_SERVER['REDIRECT_STATUS'] ?? null;
	$Disp[1] = "Direct access to this resource is not allowed for security reasons.<br>Kindly contact owner if you think that this is a mistake.";
	
	if (isset($UFrom) && isset($HCode))
	{
		$HasHandled = true;

		if ($HCode == 403)
		{
			$TCnt = "Access Restricted";
			$H2Cnt = "Wait! Access Is Denied";
			$PCnt = "We can't let you access the resources at <b>$UFrom</b> directly due to security concerns. Please do not visit this page again in the future.";	
		}
		else if ($HCode == 404)
		{
			$TCnt = "Page Doesn't Exists";
			$H2Cnt = "Oops! Page Not Found";
			$PCnt = "Sorry but the page at <b>$UFrom</b> which you are looking for either does not exists, have been removed or renamed or is temporarily unavailable.";
		}
		else if ($HCode == 500)
		{
			$TCnt = "Server Failed";
			$H2Cnt = "Yuk! The Server Is Down";
			$PCnt = "We're extremely sorry but something has crashed on our server's end probably due to some misconfiguarations. Please inform owner as soon as possible to resolve this error or you can try again later in a few minutes!";
		}
		else
		{
			$HasHandled = false;
			$Disp[0] = "Something Went Wrong";
			$Disp[1] = "While trying to handle your request we've encountered an unexpected error.<br>Received HTTP status code $HCode.<br><a href='https://en.wikipedia.org/wiki/HTTP_$HCode' target='_blank'>Click Here</a>&nbsp;to know more!";
		}

		if ($HasHandled)
		{
			echo("<!DOCTYPE html><html lang='en'><head><meta charset='utf-8' /><link rel='icon' href='/Icon.png' type='image/png' /><meta name='viewport' content='width=device-width, initial-scale=1' /><link rel='stylesheet' type='text/css' href='/Errors/Assets/EStyle.css' /><title>($HCode) Error Encountered | $TCnt || Movies-Magix</title></head><body><div id='main'><div class='info-holder'><div class='emoji-holder' style='--img-url: url(\"/Errors/Assets/$HCode.png\");'></div><h1>$HCode</h1><h2>$H2Cnt</h2><p>$PCnt</p><a tabindex='0' onclick='window.location=\"http://$DSvrNM\";'>Go Back To Homepage</a></div></div></body></html>");
			exit();
		}
	}
	else http_response_code(401);
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Unknown Error Occured</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<style type="text/css">a { cursor: pointer; text-decoration: none; color: hotpink; font-weight: bold; border: 1px dotted deeppink; border-radius: 10px; padding: 0 5px; } body { display: flex; min-height: 60vh; align-items: center; justify-content: center; } center { height: fit-content; }
		</style>
	</head>
	<body bgcolor="#122">
		<center>
			<h2 style='color: yellow; font-weight: 900; font-size: x-large;'>
				<?php echo($Disp[0]); ?>
			</h2>
			<p style="color: lightpink; font-weight: 400; padding: 0 20px;">
				<?php echo($Disp[1]); ?>
			</p>
			<button onclick='window.location="<?php echo("http://".$DSvrNM); ?>";'
				style="padding: 6px 8px; cursor: pointer; border-radius: 8px 16px; background: lightgreen; color: darkslateblue; font-weight: bolder; border: 1px dotted cyan; border-style: dashed;">
				Go To Homepage
			</button>
		</center>
	</body>
</html>