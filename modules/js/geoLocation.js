	
/*****************************************************************
*	Name    : geoSuccessCallBack
*	Author  : Kony Solutions
*	Purpose : The below function is the success call back of 'kony.location.getCurrentPosition' API,Used to display current location details .
******************************************************************/

function geoSuccessCallBack(position)
{
	
	try
	{
		var lat = position.coords.latitude.toFixed(10).replace(/0{0,2}$/, "");
		var lng = position.coords.longitude.toFixed(10).replace(/0{0,2}$/, "");
		frmGeoCurrentNWatch.lblLatValue.text ="= "+lat;
		frmGeoCurrentNWatch.lblLongValue.text ="= " + lng;

		frmGeoCurrentNWatch.lblAltValue.text ="= " + position.coords.altitude;

		
		frmGeoCurrentNWatch.lblAccValue.text= "= " + position.coords.accuracy;

		frmGeoCurrentNWatch.lblHeadValue.text ="= "+ position.coords.heading;

		
		
		if (watchFlag == false)
		{
			frmGeoCurrentNWatch.title = "Current Position";
			frmGeoCurrentNWatch.lblDesc.setVisibility(true);
			frmGeoCurrentNWatch.lblDesc.text = "getcurrentPosition Api gives the current location of the device.";
			if(kony.os.deviceInfo().name == "WindowsPhone" || kony.os.deviceInfo().name == "thinclient")
			{
					frmGeoCurrentNWatch.labelFormOptions.text = "Current Position";
			}
			if (kony.os.deviceInfo().name == "iPhone" || kony.os.deviceInfo().name == "iPad")
			{
				frmGeoCurrentNWatch.lblSpeedValue.text = "= " + position.coords.speed;
			}
			else
			{
				frmGeoCurrentNWatch.lblSpeedValue.text = "= " + position.coords.speeding;
			}
		}
		else 
		{
			frmGeoCurrentNWatch.lblSpeedValue.text = "= 0" ;
			frmGeoCurrentNWatch.title = "Watch Position";
			frmGeoCurrentNWatch.lblDesc.setVisibility(true);
			frmGeoCurrentNWatch.lblDesc.text = "The watch operation continues to monitor the position of the device and invokes the appropriate callback every time this position changes. The watch operation continues until the clearwatch method is called with the corresponding identifier.";
			if(kony.os.deviceInfo().name == "WindowsPhone" || kony.os.deviceInfo().name == "thinclient")
			{
					frmGeoCurrentNWatch.labelFormOptions.text = "Watch Position";
			}
		}
		frmGeoCurrentNWatch.lblTimeValue.text="= " + position.timestamp;
	}
	catch(err)
	{
		alert("error is : "+err)
	}
	frmGeoCurrentNWatch.show();
	kony.application.dismissLoadingScreen();
}
	
	
/*****************************************************************
*	Name    : geoErrorCallBack
*	Author  : Kony Solutions
*	Purpose : The below function is the error call back of 'kony.location.getCurrentPosition' API,Used to display error details .
******************************************************************/

function geoErrorCallBack(positionerror)
{
	alert("Error occured while retrieving the data " + positionerror)
	kony.application.dismissLoadingScreen();
}
	
	
/*****************************************************************
*	Name    : geoPosition
*	Author  : Kony Solutions
*	Purpose : The below function is to invoke 'kony.location.getCurrentPosition' API
******************************************************************/

function geoPosition()
{
	//#ifdef winphone8
		frmGeoCurrentNWatch.show();
	//#else
		//do nothing
	//#endif
 	try
 	{
	 	watchFlag = false;
		frmGeoCurrentNWatch.btnClearWatch.setVisibility(false);
		frmGeoCurrentNWatch.lblGeoAdress.setVisibility(false);
		frmGeoCurrentNWatch.hbxWatchID.setVisibility(true);
		kony.application.showLoadingScreen("loadingscreen","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, false,null);
		var positionoptions = kony.location.getCurrentPosition(geoSuccessCallBack, geoErrorCallBack);
	}
	catch(exception)
	{
		alert("Exception is ::"+exception);
	}
}
	
	
/*****************************************************************
*	Name    : errorCallBack1
*	Author  : Kony Solutions
*	Purpose : The below function is the error call back of 'kony.location.watchPosition ' API,Used to display error details .
******************************************************************/
 
 function errorCallBack1(errorMessage)
 {
 	watchFlag=false;
 	frmGeoCurrentNWatch.btnClearWatch.isVisible = false;
 	alert("Error is :: " +errorMessage )
 }
 
 /*****************************************************************
*	Name    : watchPosition
*	Author  : Kony Solutions
*	Purpose : The below function is to invoke ' kony.location.watchPosition ' API
******************************************************************/
 
function watchPosition()
{      
	kony.application.showLoadingScreen("loadingscreen","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, false,null);
	//#ifdef winphone8
		frmGeoCurrentNWatch.show();
	//#else
		//do nothing
	//#endif
	var positionoptions = {};//maximumage: 3000};
	watchFlag = true;
	frmGeoCurrentNWatch.hbxWatchID.setVisibility(true);
	frmGeoCurrentNWatch.lblGeoAdress.setVisibility(false);
	frmGeoCurrentNWatch.btnClearWatch.setVisibility(true);
	watchID = kony.location.watchPosition (geoSuccessCallBack, errorCallBack1, positionoptions);
}

/*****************************************************************
*	Name    : handleAlert
*	Author  : Kony Solutions
*	Purpose : The below function is to
******************************************************************/
function handleAlert(response)
{
	frmOptions.show();
}

	
/*****************************************************************
*	Name    : clearWatch
*	Author  : Kony Solutions
*	Purpose : The below function is to invoke ' kony.location.clearWatch ' API
******************************************************************/
function clearWatch()
{
	frmGeoCurrentNWatch.hbxWatchID.setVisibility(false);
	kony.location.clearWatch(watchID);
	watchFlag = false;
	frmGeoCurrentNWatch.lblGeoAdress.setVisibility(true);
	
	frmGeoCurrentNWatch.btnClearWatch.setVisibility(false);
	frmGeoCurrentNWatch.lblDesc.setVisibility(false);
	
	frmGeoCurrentNWatch.lblGeoAdress.text = "Watch has stopped.";
	
	frmGeoCurrentNWatch.title = "clearWatch";
	if(kony.os.deviceInfo().name == "WindowsPhone" || kony.os.deviceInfo().name == "thinclient")
	{
		frmGeoCurrentNWatch.labelFormOptions.text = "Clear Watch";
		
	}
	
	
	
	//Defining basicConf parameter for alert
	var basicConf = {message: "Watch has stopped.",alertType: constants.
	ALERT_TYPE_INFO,alertTitle: "clearWatch",yesLabel:"OK",
	noLabel: "no", alertHandler: handleAlert};
	//Defining pspConf parameter for alert
	var pspConf = {};
	//Alert definition
	var infoAlert = kony.ui.Alert(basicConf,pspConf);
}

/*****************************************************************
*	Name    : showFrmOption
*	Author  : Kony Solutions
*	Purpose : The below function is to navigate to frmOptions
******************************************************************/
function showFrmOptions(){
	frmOptions.show();
}

/*****************************************************************
*	Name    : dismissLoadingScreen
*	Author  : Kony Solutions
*	Purpose : The below function is to check which api the form is showing
******************************************************************/
function checkForm(){
	if( watchFlag == true){
		frmGeoCurrentNWatch.btnClearWatch.isVisible = true;
		frmGeoCurrentNWatch.btnClearWatch.setVisibility(true);
	}
	else{
		frmGeoCurrentNWatch.btnClearWatch.isVisible = false;
	}
}

/*****************************************************************
*	Name    : onClickOfSegApi
*	Author  : Kony Solutions
*	Purpose : The below function is to invoke the respective function of the api called
******************************************************************/
function onClickOfSegApi(eventobj){
	apiKey = eventobj.selectedIndex[1];
	if(apiKey==0)
		geoPosition();
	else if(apiKey==1)
		watchPosition();
}

/*****************************************************************
*	Name    : onHideFrmGeo
*	Author  : Kony Solutions
*	Purpose : The below function is to clear watch once the the watchPositiopn form is hidden
******************************************************************/
function onHideFrmGeo(){
	if( watchFlag == true){
		/*
		frmGeoCurrentNWatch.btnClearWatch.isVisible = true;
		frmGeoCurrentNWatch.btnClearWatch.setVisibility(true);
		*/
		clearWatch();
	}
	else{
		/*
		frmGeoCurrentNWatch.btnClearWatch.isVisible = false;
		*/
		//do nothing if it is for getCurrentPosition
	}
}