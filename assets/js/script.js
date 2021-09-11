// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

function generatePassword() {
  var passLength = validNum();
  var hasLowerCase = confirm("Include lowercase characters?");
  var hasUpperCase = confirm("Include uppercase characters?");
  var hasNumbers = confirm("Include numbers?");
  var hasSpecial = confirm("Include special characters: e.g. !, \", #");

  var charTypes = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecial];
  var indexes = [];

  var password = "";

  for (var i = 0; i < charTypes.length; i++) {
    if (charTypes[j] === true) {
      indexes[indexes.length] = i;
    }
  }

  for (var i = 0; i < passLength; i++) {
    var index = randNum(0, indexes.length);

    //randNum ranges based on HTML ASCII Character Set
    if (indexes.length === 0) {
      alert("Please choose at least one character type.");
      break;
    } else if (index === 0) {
        password += String.fromCharCode(randNum(97, 122));
    } else if (index === 1) {
        password += String.fromCharCode(randNum(97, 122));
    } else if (index === 2) {
        password += String.fromCharCode(randNum(48, 57));
    } else {
        var specialChar = randNum(1, 33); 
        if (specialChar <= 16) { //32-47
          passowrd += String.fromCharCode(specialChar + 31); 
        } else if (specialChar <= 23) { //58-64
            password += String.fromCharCode(specialChar + 41);
        } else if (specialChar <= 29) { //91-96
            password += String.fromCharCode(specialChar + 67);
        } else { //123-126
            password += String.fromCharCode(specialChar + 93);
        }
    }
  }
}

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

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

