// client js

// function to upload an image
var submit = document.getElementById("submit");
submit.addEventListener("click", function(e){
    // get input value
    var formData = new FormData();
    var file = document.getElementById("upload").files[0];
    formData.append("upload", file);

    // create new XMLHttpRequest object for AJAX
    var xhr = new XMLHttpRequest();

    // set AJAX method & URL
    xhr.open("post", "/uploads", true);

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            var response = JSON.parse(xhr.responseText);
			
			// append new uploaded image into listImages
			var ul = document.getElementById("listImages");
			var li = document.createElement("li");
			li.innerHTML = "<img src=\"" + response.file + "\" class=\"img-rounded block-add\" />";
			ul.appendChild(li);
            // return true;
        }
        else {
        	console.log(xhr.responseText);
        	// return false;
        }
    }
    
	xhr.send(formData);
}, false);

// function to show images
function loadImages() {
	// create new XMLHttpRequest object for AJAX
	var xhr = new XMLHttpRequest();

	// set AJAX method & URL
	xhr.open('get', '/images', true);

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			// get AJAX json response text and parse into array
            var obj = JSON.parse(xhr.responseText);

            // get ul element with id listImages
            var ul = document.getElementById('listImages');
            for(var i = 0; i < obj.length; i++) {
            	// create new li
            	var li = document.createElement('li');

            	// insert img with src and class
            	li.innerHTML = "<img src=\"" + obj[i] + "\" class=\"img-rounded block-add\" />";

            	// append as ul children
            	ul.appendChild(li);
            }
        }
        else {
        }
	}
	xhr.send(null);
	return false;
}

$(document).ready(function () {
    $(document).on('click', '.block-add', function () {
        var src = $(this).attr('src');
        var elem = $('<div class="container"><img src="' + src + '" class="blocks" /></div>');
        $('.block').append(elem);
        elem.draggable({
        	containment: ".block"
        });
        elem.find('.blocks:first').resizable();
        return false;
    });
});