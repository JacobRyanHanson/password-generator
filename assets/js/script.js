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

