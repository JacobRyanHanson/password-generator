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

//generates password
function generatePassword() {

  //user prompts
  var userPassLength = validNum();
  var hasLowerCase = confirm("Include lowercase characters?");
  var hasUpperCase = confirm("Include uppercase characters?");
  var hasNumbers = confirm("Include numbers?");
  var hasSpecial = confirm("Include special characters? e.g. !, \", #");

  //arrays
  var charTypes = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecial];
  var charIndices = [];
  var array = [];

  //local variables
  var password = "";

  //assigns the index for true values in charTypes to the first avaiable spot in charIndices
  for (var i = 0; i < charTypes.length; i++) {
    if (charTypes[i] === true) {
      charIndices[charIndices.length] = i;
    }
  }

  //loops through each character in the password based on the users designated length
  for (var i = 0; i < userPassLength; i++) {

    //charIndices will have one index filled for each character type the user chose to include
    //if its empty the loop breaks and an empty string is returned (user can press the button again)
    if (charIndices.length === 0) {
      alert("Please choose at least one character type.");
      break;
    } 

    //before the last three characters the characters are generated randomly with charGen()
    else if (password.length < userPassLength - 3) {

      //password is passed in and returned with an additional character
      password = charGen(charIndices, password);
    } 
    
    //uses regex() and subsquent method (explained below) to return a value if the password is almost complete
    //but a user character selection has not yet been randomly generated, generating the character randomly if not
    //or generating characters regularly if user selections have been satisfied
    else {
      var index = regex(charIndices, password)
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

//validates user input for password length
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

//generates a number randomly given a range
function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//searches the current password for each regex expression in the array
//if the expression (user character selection) is not found and shouldExist() is true
//it returns the index which is handeled by the last section in generatePassword() to 
//generate the appropriate character
function regex(charIndices, password) {
  var pattern = [/[a-z]/, /[A-Z]/, /[0-9]/, /[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/];
  for (var i = 0; i < 4; i++) {
    if (pattern[i].test(password) === false && shouldExist(charIndices, i)) {
      return i;
    }
  }
}


//matches the current loop cound (i) in regex() aginst the possible values charIndices[] can hold
//to check if that user character selection should exist (but currently dosent)
function shouldExist(charIndices, index) {
  for (var i = 0; i < charIndices.length; i++) {
    if (charIndices[i] === index) {
      return true;
    } 
  }
  return false;
}

//generates characters for password based on user choices by randomly selecting and evaluating one of 
//charIndices[] indices (length may vary but the numerical values held are representitive)
//selected indicies are converted to characters and returned
function charGen(charIndices, password) {
  var index = randNum(0, charIndices.length - 1);

  //randNum ranges based on HTML ASCII Character Set
  if (charIndices[index] === 0) {
    password += String.fromCharCode(randNum(97, 122));
  } else if (charIndices[index] === 1) {
    password += String.fromCharCode(randNum(65, 90));
  } else if (charIndices[index] === 2) {
    password += String.fromCharCode(randNum(48, 57));
  } else {
    var specialChar = randNum(1, 32);
    if (specialChar <= 15) { //32-47
      password += String.fromCharCode(specialChar + 32);
    } else if (specialChar <= 22) { //58-64
      password += String.fromCharCode(specialChar + 42);
    } else if (specialChar <= 28) { //91-96
      password += String.fromCharCode(specialChar + 68);
    } else { //123-126
      password += String.fromCharCode(specialChar + 94);
    }
  }
  return password;
}