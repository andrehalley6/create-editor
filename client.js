// client js

// function to upload an image
var submit = document.getElementById("submit");
submit.addEventListener("click", function(e) {
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

// // function to add input text
// var addText = document.getElementById("addText");
// addText.addEventListener("click", function(e) {
// 	var input = document.createElement("input");
// 	input.setAttribute("value", "");
// 	input.setAttribute("type", "text");
// 	input.setAttribute("class", "input");
// 	input.setAttribute("name", "input[]");

// 	var block = document.getElementById("canvas");
// 	block.appendChild(input);
// }, false);

// // function to change input text into label
// // var changeText = document.getElementsByClassName("input");
// var changeText = document.getElementsByName("input");
// console.log(changeText);
// for(var i = 0; i < changeText.length; i++) {
// 	console.log(changeText[i]);
// 	changeText[i].addEventListener("keypress", function(e) {
// 		if(e.which == 13) {
// 			alert("enter press");
// 			console.log(changeText[i]);
// 			var newElem = document.createElement("div");
// 			newElem.innerHTML = "<p class=\"label\">" + changeText[i].value + "</p>";
// 		}
// 	});
// }

window.onload = function() {
	/*
	 * Load list of images on window load
	 */

	// create new XMLHttpRequest object for AJAX
	var xhr = new XMLHttpRequest();

	// set AJAX method & URL
	xhr.open("get", "/images", true);

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			// get AJAX json response text and parse into array
            var obj = JSON.parse(xhr.responseText);

            // get ul element with id listImages
            var ul = document.getElementById("listImages");
            for(var i = 0; i < obj.length; i++) {
            	// create new li
            	var li = document.createElement("li");

            	// insert img with src and class
            	li.innerHTML = "<img src=\"" + obj[i] + "\" class=\"img-rounded img-add\" />";

            	// append as ul children
            	ul.appendChild(li);

            	// re-initialize draggable for newly added elements to DOM
            	$(".img-add").draggable({ revert: "invalid" });
            }
        }
        else {
        }
	}
	xhr.send(null);
	return false;
}

$(document).ready(function() {
	// this function is to add image into div canvas by clicking on it
    $(document).on("click", ".img-add", function(e) {
        var src = $(this).attr("src");
        var elem = $("<div class=\"container draggable\"><img src=\"" + src + "\" class=\"img-blocks\" height=\"50\" width=\"50\" /></div>");
        $(".block").append(elem);
        elem.draggable({
        	containment	: ".block", 
        	scroll		: false
        });
        elem.find(".img-blocks:first").resizable();
        return false;
    });

    // this function is to remove image from div canvas by clicking on it
    $(document).on("click", ".img-blocks", function(e){
    	$(this).remove();
    	return false;
    });

    // add img with img-add class is draggable into div canvas
    $(".img-add").each(function(i, el) {
      $(el).draggable({
        revert: "invalid"
      });
    });

    // set div block as a droppable
    $(".block").droppable();

    // function to add dynamic text into div canvas
    $(document).on("click", "#addText", function(e) {
    	var input = $("<input type=\"text\" name=\"name[]\" class=\"input\" value=\"\" />");
    	$(".block").append(input);

    	changeInputIntoText(input);
    });

    $(".input").each(function(i, el) {
    	$(el).on("click", function(e) {
    		var input = "<input type=\"text\" name=\"name[]\" class=\"input\" value=\"" + $(el).html() + "\" />";
			$(el).replaceWith(input);
    	});
    });
});

function changeInputIntoText(elem) {
	$(elem).on("keypress", function(e) {
		if(e.which == 13) {
			var text = "<div class=\"text\"><span class=\"input\">" + $(elem).val() + "</span></div>";
			$(elem).replaceWith(text);
		}
	});
}

function editText(elem) {
	$(elem).each(function(i, el) {
		$(el).on("click", function(e) {
			var input = "<input type=\"text\" name=\"name[]\" class=\"input\" value=\"" + $(el).html() + "\" />";
			$(el).replaceWith(input);
		});
	});
}