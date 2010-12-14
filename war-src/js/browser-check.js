goog.provide("plt.wescheme.browserCheck");


goog.require('plt.wescheme.BrowserDetect');
goog.require('plt.wescheme.cookies');

(function() {
    var BrowserDetect = plt.wescheme.BrowserDetect;
    var Cookies = plt.wescheme.cookies;


    // browserCheck: -> void
    // Check to see if the browser is either FF >= 3.6 or Chrome >= 5.0.
    // If not, bring up a warning dialog saying that we haven't tested
    // on the other platforms.
    plt.wescheme.browserCheck = function() {
	if (browserAlreadyChecked()) {
	    return;
	}

	var expectedBrowserVersions = [{browser: 'Chrome', minimumVersion: 5},
				       {browser: 'Firefox', minimumVersion: 3.6}];
	for (var i = 0; i < expectedBrowserVersions.length; i++) {
	    if (BrowserDetect.browser === expectedBrowserVersions[i].browser) {
		if (BrowserDetect.version >= expectedBrowserVersions[i].minimumVersion) {
		    return;
		} else {
		    markBrowserChecked();
		    warnBrowserMightBeOlderThanExpected(expectedBrowserVersions[i].browser,
							expectedBrowserVersions[i].minimumVersion);
		    return;
		}
	    }
	}
	// Warn: using browser that we haven't tested against.
	markBrowserChecked();
	warnBrowserMightNotWork();
    };


    var COOKIE_NAME = 'weschemeBrowserVersionCheck';
    var COOKIE_VALUE = 'checked';
    var browserAlreadyChecked = function() {
	return Cookies.readCookie(COOKIE_NAME) === COOKIE_VALUE;
    };

    var markBrowserChecked = function() {
	Cookies.createCookie(COOKIE_NAME, COOKIE_VALUE);
    };


    // warnBrowserMightBeOlderThanExpected: string number -> void
    // Bring up a modal dialog that warns the user if the browser has 
    var warnBrowserMightBeOlderThanExpected = function(browser, minimumVersion) {
	var dialogWindow = (jQuery("<div/>"));
	dialogWindow.append(jQuery("<p/>").text(
	    "You're using " + BrowserDetect.browser + " " + BrowserDetect.version + 
		", but WeScheme needs " + browser + " >= " + minimumVersion + 
		".  WeScheme <u>may</u> work for you, but we have not tested it!" + 
		"For the best experience, please download <a href=\"http://www.google.com/chrome\">Google Chrome</a>."
	));
	dialogWindow.dialog({'title': 'Browser version check',
			     'bgiframe' : true,
			     'modal' : true,
			     'overlay' : {'opacity': 0.5,
					  'background': 'black'}
			    });
	dialogWindow.dialog("open");
    };


    var warnBrowserMightNotWork = function() {
	var dialogWindow = (jQuery("<div/>"));
	dialogWindow.append(jQuery("<p/>").text(
		 "You're using " + BrowserDetect.browser + " " + BrowserDetect.version + 
		 ", but WeScheme needs " + browser + " >= " + minimumVersion + 
		 ".  WeScheme <u>may</u> work for you, but we have not tested it!" + 
		 "For the best experience, please download <a href=\"http://www.google.com/chrome\">Google Chrome</a>."
		 ));
	dialogWindow.dialog({'title': 'Browser version check',
			     'bgiframe' : true,
			     'modal' : true,
			     'overlay' : {'opacity': 0.5,
					  'background': 'black'}
			    });
	dialogWindow.dialog("open");
    };


})();