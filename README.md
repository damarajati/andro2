# QR code
Cordova QR code scanner and reader demo

> **Prerequisite:** Install NodeJs, Cordova, Phonegap.

```bash
cordova create qrcode com.example.qrcode "QrCode"
cd qrcode
cordova platform add android
cordova plugin add https://github.com/jonathannaguin/BarcodeScanner.git
#cordova plugin add https://github.com/wildabeast/BarcodeScanner.git
#cordova plugin add com.phonegap.plugins.barcodescanner
cordova build android
```

Add the following to **js/index.js**

###Scan
```javascript
function scanQr(){
    try{
        var scanner = cordova.require("com.phonegap.plugins.barcodescanner.barcodescanner");

        scanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    } catch (err) {
        alert(err.message);
    }

}
```

###Generate
```javascript
function generateQr(){
    try{
        var scanner = cordova.require("com.phonegap.plugins.barcodescanner.barcodescanner");
        scanner.encode("TEXT_TYPE", "http://github.com/CodeWhisperers/qr_code",
            function(success) {
                alert("encode success: " + success);
            },
            function(fail) {
                alert("encoding failed: " + fail);
            }
        );
    } catch (err) {
            alert(err.message);
    }
}
```

Add buttons to **index.html** and asign click listeners
```javascript
onDeviceReady: function() {
		/// ...
		document.getElementById("scan").addEventListener("click", scanQr, false);
        document.getElementById("generate").addEventListener("click", generateQr, false);
```

##Extra sugar

HTML
```html
<div class="app" id="splash">
    <h1>Apache Cordova</h1>
    <div id="deviceready" class="blink">
        <p class="event listening">Connecting to Device</p>
        <p class="event received">Device is Ready</p>
    </div>
</div>
<div class="app" id="qr">
    <br/>
    <h1>QR code</h1>
    <div id="scan" class="button" >SCAN</div>
    <div id="generate" class="button" >Generate</div>
</div>
```

CSS
```css

.button {
    margin: 10px auto;
    display:block;
    width: 100px;
    height: 30px;
    background: red;
    color:white;
    text-align: center;
    line-height: 30px;
    font-weight: bold;
    border-radius: 10px;
}

#splash {
    display: block;
}

#qr {
    display: none;
}
```

JS
```javascript
onDeviceReady: function() {
		/// ...
		// show buttons div
		document.getElementById("splash").style.display = 'none';
        document.getElementById("qr").style.display = 'block';
```