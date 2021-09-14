const USER_CRITERIA = 4;

// Gets references to the #generate element.
var generateBtn = document.querySelector("#generate");

// Event listner added to generateBtn.
generateBtn.addEventListener("click", writePassword);

// Writes a password to the screen.
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
}

function generatePassword() {
    var userPassLength = validNum();
    var hasLowerCase = confirm("Include lowercase characters?");
    var hasUpperCase = confirm("Include uppercase characters?");
    var hasNumbers = confirm("Include numbers?");
    var hasSpecial = confirm("Include special characters? e.g. !, \", #");

    var charTypes = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecial];
    var charIndices = [];
    var array = [];

    var password = "";

    // Assigns the first avaiable index in charIndices for every true value in charTypes.
    for (var i = 0; i < charTypes.length; i++) {
        if (charTypes[i] === true) {
            charIndices[charIndices.length] = i;
        }
    }

    // Loops through each character in the password based on the users designated length.
    for (var i = 0; i < userPassLength; i++) {

        // If charIndices is empty the user didn't choose a character type and will be forced out.
        // The user will need to press the button again to continue.
        if (charIndices.length === 0) {
            alert("Please choose at least one character type.");
            break;
        }

        // Generates password randomly until the last three characters
        else if (password.length < userPassLength - 3) {
            password = charGen(charIndices, password);
        }

        // Checks if a character is missing based on the user's selection so  a character type incursion can be made if necessary.
        else {
            var index = regex(charIndices, password)

            // Indicates that user character type is missing and should be included.
            if (index === 0 || index === 1 || index === 2 || index === 3) {
                array = [index];
                password = charGen(array, password);
            } else {
                password = charGen(charIndices, password);
            }
        }
    }
    return password;
}

// Validates user input for password length.
function validNum() {
    do {
        var valid = true;
        var response = parseInt(prompt("Please enter password length."));
        if (response >= 8 && response <= 128 && response) {
            return response;
        } else {
            alert("Invalid input. Please enter a number between 8 and 128.");
            valid = false;
        }
    } while (!valid)
}

// Generates a number randomly, given a range.
function randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Searches the password generated thus far as detailed by the regular expressions in the array.
// If the regular expressions didn't find anything and the expression should exist (detailed below)
// i is returned indicating the index in charIndices() (the character type) that should be included.
function regex(charIndices, password) {
    var pattern = [/[a-z]/, /[A-Z]/, /[0-9]/, /[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/];
    for (var i = 0; i < USER_CRITERIA; i++) {
        if (pattern[i].test(password) === false && shouldExist(charIndices, i)) {
            return i;
        }
    }
}

// Checks each index of charIndices for index (the character type) and if it exists returns true, else returns false.
function shouldExist(charIndices, index) {
    for (var i = 0; i < charIndices.length; i++) {
        if (charIndices[i] === index) {
            return true;
        }
    }
    return false;
}

// Generates characters for password based on user choices by randomly selecting and evaluating one of 
// charIndices[] indices. Selected indicies are converted to characters, concatenated, and returned.
function charGen(charIndices, password) {
    var index = randNum(0, charIndices.length - 1);

    // Ranges based on HTML ASCII Character Set
    if (charIndices[index] === 0) {
        password += String.fromCharCode(randNum(97, 122));
    } else if (charIndices[index] === 1) {
        password += String.fromCharCode(randNum(65, 90));
    } else if (charIndices[index] === 2) {
        password += String.fromCharCode(randNum(48, 57));
    } else {
        var specialChar = randNum(1, 32);
        if (specialChar <= 15) { // 32-47
            password += String.fromCharCode(specialChar + 32);
        } else if (specialChar <= 22) { // 58-64
            password += String.fromCharCode(specialChar + 42);
        } else if (specialChar <= 28) { // 91-96
            password += String.fromCharCode(specialChar + 68);
        } else { // 123-126
            password += String.fromCharCode(specialChar + 94);
        }
    }
    return password;
}