


function localCallback()
{
    //document.getElementById("scanqr").addEventListener("click", scanQr, false);
    scanQr();

}


function scanQr()
{
    try{
        var scanner = cordova.require("com.phonegap.plugins.barcodescanner.barcodescanner");

        scanner.scan(
            function (result) {
                // result = {text: string, format: 'QR_TEXT', canceled:false}
                if (result.text != 'abcd') {
                     lvlUp();
                     finishCurrentQuest();
                    $('#congrats').removeClass('hidden');
                } else {
                    $('#denied').removeClass('hidden');
                }
            },
            function (error) {
                $('#denied').removeClass('hidden');
            }
        );
    } catch (err) {
        alert(err.message);
    }

}

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