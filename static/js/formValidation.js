var form = document.getElementById("Reg");
form.addEventListener('submit', formValidation);

function formValidation(event){

	var name = document.getElementById('fname').value;
	var uname = document.getElementById('uname').value;
	var pass = document.getElementById('pass').value;
	var cpass = document.getElementById('cpass').value;
	var email = document.getElementById('email').value;
	var pnum = document.getElementById('pnum').value;
	var cnum = document.getElementById('cnum').value;
	var dob = document.getElementById('dob').value;

	var genders = document.getElementsByName('gender');
	var gender;
	for(var i = 0; i < genders.length; i++){
    	if(genders[i].checked){
        	gender = genders[i].value;
        	break;
    	}
	}

	var preferences = document.getElementsByName("preference");
  	var preferencesChecked = [];
  	for (var i=0; i<preferences.length; i++) {
    	if (preferences[i].checked) {
        	preferencesChecked.push(preferences[i].value);
     	}
  	}

	if (validName(name, "* Use only alphabets between 6 & 40 characters *")) {
		if (validUName(uname,"* Use alphabets and numbers between 6 & 30 characters *")) {
			if(validPass(pass, "* Password should contain atleast 1 LC letter, 1 UC letter, 1 number and 1 special character *")) {
				if(validCPass(cpass, pass, "* Passwords do not match *")) {
					if (emailValidation(email, "* Please enter a valid email address *")) {
						if (validPNum(pnum, "* Please enter a valid phone number (10 digits) *")) {
							if(validCNum(cnum, "* Please enter a cell valid number (10 digits) *")) {
								event.preventDefault();
								showDetails();
								return true;
							} else {
								event.preventDefault();
								return false;
							}
						} else {
							event.preventDefault();
							return false;
						}
					} else {
						event.preventDefault();
						return false;
					}
				} else {
					event.preventDefault();
					return false;
				}
			} else {
				event.preventDefault();
				return false;
			}
		} else {
			event.preventDefault();
			return false;
		}
	} else {
		event.preventDefault();
		return false;
	}

	function validName(inputtext, alertMsg) {
		var nameExp = /^[a-zA-Z ]{6,40}$/;
		if (nameExp.test(inputtext)) {
			document.getElementById('p1').innerText = "";
			return true;
		} else if(!nameExp.test(inputtext)){
			document.getElementById('p1').innerText = alertMsg; 
			document.getElementById('fname').focus();
			return false;
		}
	}

	function validUName(inputtext, alertMsg) {
		var nameExp = /^[0-9a-zA-Z]{6,30}$/;
		if (nameExp.test(inputtext)) {
			document.getElementById('p2').innerText = "";
			return true;
		} else if(!nameExp.test(inputtext)){
			document.getElementById('p2').innerText = alertMsg; 
			document.getElementById('uname').focus();
			return false;
		}
	}

	function validPass(inputpass, alertMsg) {
		var passExp = /^(?=.*\d)(?=.*[!#$%@&? "])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!#$%@&? "]{6,20}$/;
		if(passExp.test(inputpass)) {
			document.getElementById('p3').innerText = "";
			return true;
		} else if(!passExp.test(inputpass)){
			document.getElementById('p3').innerText = alertMsg;
			document.getElementById('pass').focus();
			return false;
		}
	}

	function validCPass(inputcpass, inputpass, alertMsg) {
		var passExp = /^^(?=.*\d)(?=.*[!#$%@&? "])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!#$%@&? "]{6,20}$/;
		if((passExp.test(inputcpass)) && (inputcpass === inputpass)){
			document.getElementById('p4').innerText = "";
			return true;
		} else if(!((passExp.test(inputcpass)) || (inputcpass === inputpass))) {
			document.getElementById('p4').innerText = alertMsg;
			document.getElementById('cpass').focus();
			return false;
		}
	}

	function emailValidation(inputtext, alertMsg) {
		var emailExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
		if (emailExp.test(inputtext)) {
			document.getElementById('p5').innerText = "";
			return true;
		} else if (!emailExp.test(inputtext)){
			document.getElementById('p5').innerText = alertMsg; 
			document.getElementById('email').focus();
			return false;
		}
	}

	function validPNum(inputnum, alertMsg) {
		var numExp = /\+?\d[\d -]{8,12}\d/;
		if(numExp.test(inputnum)) {
			document.getElementById('p6').innerText = "";
			return true;
		}
		else if(!numExp.test(inputnum)){
			document.getElementById('p6').innerText = alertMsg; 
			document.getElementById('pnum').focus();
			return false;
		}
	}

	function validCNum(inputnum, alertMsg) {
		var numExp = /\+?\d[\d -]{8,12}\d/;
		if (inputnum == "" || numExp.test(inputnum)) {
			document.getElementById('p7').innerText = "";
			return true;
		} else if(!numExp.test(inputnum)) {
			document.getElementById('p7').innerText = alertMsg; 
			document.getElementById('cnum').focus();
			return false;
		}
	}

	function showDetails() {
		document.getElementById('details').style.display = "block";
		document.getElementById('val1').innerText = name;
		document.getElementById('val2').innerText = uname;
		document.getElementById('val3').innerText = pass;
		document.getElementById('val4').innerText = email;
		document.getElementById('val5').innerText = pnum;
		if(!(cnum == "")) {
			document.getElementById('val6').innerText = cnum;
		} else {
			document.getElementById('val6').style.display = "none";
		}
		document.getElementById('val7').innerText = dob;
		document.getElementById('val8').innerText = gender;
		document.getElementById('val9').innerText = preferencesChecked;
	}
}

function validateLogin() {
	var uname = document.getElementById('username');
	var pass = document.getElementById('password');

	var guname = document.getElementById('uname').value;
	var gpass = document.getElementById('pass').value;

	if (uname.value == guname) {
		document.getElementById('l1').innerText = ""
		if (pass.value == gpass) {
			document.getElementById('l2').innerText = "";
			return true;
		} else {
			document.getElementById('l2').innerText = "* Incorrect Password *";
			pass.focus();
			return false;
		}
	} else {
		document.getElementById('l1').innerText = "* Incorrect Username *";
		uname.focus();
		return false;
	}
}