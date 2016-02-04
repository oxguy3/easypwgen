
if (typeof wordlist === 'undefined') {
    alert("FAILURE: Unable to load wordlist.");

} else if (typeof window.crypto === 'undefined') {
    alert("FAILURE: Your browser doesn't have a secure random number generator.")

} else {

    // makes the first letter of a string uppercase, and the rest lowercase
    function capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    }

    var goButton = document.getElementById("go");

    // code to run when go button is pressed
    goButton.addEventListener("click", function(){

        // get the word count from the input box
        var wordCount = parseInt(document.getElementById("wordCount").value, 10);
        if (isNaN(wordCount)) {
            alert("Invalid word count");
            return;
        }

        var password = "";

        // generate array of random numbers
        var randomNumbers = new Uint32Array(wordCount);
        window.crypto.getRandomValues(randomNumbers);

        // use random number array to select words from the wordlist
        for (var i = 0; i < randomNumbers.length; i++) {
            var index = randomNumbers[i] % wordlist.length;
            password += capitalizeFirstLetter(wordlist[index]);
        }

        // show the password to the user
        document.getElementById("output").innerHTML = password;
    });

    // now that all the code has run without crashing, make the Go! button clickable
    goButton.disabled = false;
}
