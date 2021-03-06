
if (typeof wordlist === 'undefined') {
    alert("FAILURE: Unable to load wordlist.");

} else if (typeof window.crypto === 'undefined') {
    alert("FAILURE: Your browser doesn't support the Web Crypto standard.")

} else {

    var goButton = document.getElementById("go");
    var titlecaseCheck = document.getElementById("titlecase");
    var dashSeparatedCheck = document.getElementById("dashSeparated");

    // code to run when go button is pressed
    document.getElementById("passgen").onsubmit = function(){

        // get the word count from the input box
        var wordCount = parseInt(document.getElementById("wordCount").value, 10);
        if (isNaN(wordCount)) {
            alert("Invalid word count");
            return false;
        }

        var password = "";

        // generate array of random numbers
        var randomNumbers = new Uint32Array(wordCount);
        window.crypto.getRandomValues(randomNumbers);

        // use random number array to select words from the wordlist
        for (var i = 0; i < randomNumbers.length; i++) {
            var index = randomNumbers[i] % wordlist.length;
            var word = wordlist[index];

            // convert to titlecase if the appropriate box is checked
            if (titlecaseCheck.checked) {
                word = word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
            }

            password += word;

            // add dashes between words if the appropriate box is checked
            if (dashSeparatedCheck.checked && i+1 < randomNumbers.length) {
                password += "-";
            }

        }

        // show the password to the user
        document.getElementById("output").innerHTML = password;

        // this is a form, but we don't want to actually submit
        return false;
    };

    // JS has loaded, so we can allow the user to click the Go button now
    goButton.disabled = false;
}

