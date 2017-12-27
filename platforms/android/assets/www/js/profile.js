function localCallback()
{
    //document.getElementById("scanqr").addEventListener("click", scanQr, false);
    getProfile("abc");

}


function generateQr(text){
    try{
        var scanner = cordova.require("com.phonegap.plugins.barcodescanner.barcodescanner");
        scanner.encode("TEXT_TYPE", text,
            function(success) {
                //alert("encode success: " + success);
            },
            function(fail) {
                alert("encoding failed: " + fail);
            }
        );
    } catch (err) {
            alert(err.message);
    }
}