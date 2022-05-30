

$(document).ready(function(){
	$('.slider').slick({
		arrows:false,
		slidesToShow:3,
		centerMode:true,
		touchThreshold: 100,
		variableWidth:true,
		autoplay: true,
  	autoplaySpeed: 5000,
	});
});




const checkbox = document.getElementById('l-d-mode');
const designer = document.getElementById('designerid');
const developer = document.getElementById('developerid');
const designerSelector = document.getElementById('selector-d');
const developerSelector = document.getElementById('selector-f');

checkbox.addEventListener( 'click', function () {
  if (checkbox.checked) {
    designer.style='z-index: 1';
    designer.style.opacity = "1";
    developer.style='z-index: 0';
    developer.style.opacity = "1";
    designerSelector.style.opacity = "1";
    developerSelector.style.opacity = "0";

  } else {
    designer.style='z-index: 0';
    developer.style='z-index: 1';
    designer.style.opacity = "0";
    developer.style.opacity = "1";
    designerSelector.style.opacity = "0";
    developerSelector.style.opacity = "1";

  }
});




// ------------------------Theme--------------------

let html = document.getElementsByTagName('html');
let radios = document.getElementsByName('themes'); 

for (i = 0; i < radios.length; i++) {
  radios[i].addEventListener('change', function() {
    html[0].classList.remove(html[0].classList.item(0));
    html[0].classList.add(this.id);
  });
}







const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const timestamps = [];

timestamps.unshift(getTimestamp());

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey() {
  return keys[getRandomNumber(0, keys.length-1)]
}

function targetRandomKey() {
  const key = document.getElementById(getRandomKey());
  key.classList.add("selected");
  let start = Date.now()
}

function getTimestamp() {
  return Math.floor(Date.now() / 1000)
}

document.addEventListener("keyup", event => {
  const keyPressed = String.fromCharCode(event.keyCode);
  const keyElement = document.getElementById(keyPressed);
  const highlightedKey = document.querySelector(".selected");
  
  keyElement.classList.add("hit")
  keyElement.addEventListener('animationend', () => {
    keyElement.classList.remove("hit")
  })
  
  if (keyPressed === highlightedKey.innerHTML) {
    timestamps.unshift(getTimestamp());
    const elapsedTime = timestamps[0] - timestamps[1];
    console.log(`Character per minute ${60/elapsedTime}`)
    highlightedKey.classList.remove("selected");
    targetRandomKey();
  } 
})

targetRandomKey();




"use strict"

document.addEventListener('DOMContentLoaded', function(){
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			form.classList.add('_sending');

			let response = await fetch('sendmail.php',{
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
			} else {
				alert ("Error");
				form.classList.remove('_sending');
			}
		} else {
			alert('Fill in required fields')
		}
	}

	function formValidate(form){
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];

			formRemoveError(input);

			if (input.classList.contains('_email')){
				if (emailTest(input)){
					formAddError(input);
					error++;
				}
			}else if (input.value === '') {
				formAddError(input);
				error++;
			}
		}
		return error;
	}
	function formAddError(input){
		input.parentElement.classList.add('_errorp');
		input.classList.add('_error');
	}
	function formRemoveError(input){
		input.parentElement.classList.remove('_errorp');
		input.classList.remove('_error');
	}
	function emailTest(input){
		// return !/^\2+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\2{2,8})+$/.test(input.value);
		return /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
	}
});