/**
 * Created by naadi on 28/4/2017.
 */

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

var l1 = "Kenny Rogers"; var l2 = "Mee";
var l3 = "Sushi"; var l4 = "Roti";
var l5 = "Kueh"; var l6 = "Maggi";
var l7 = "Buah"; var l8 = "Sup";
var color = ['#f2b929','#f4cb61','#f2b929','#f4cb61','#f2b929','#f4cb61', '#f2b929', '#f4cb61','#f2b929','#f4cb61','#f2b929','#f4cb61','#f2b929','#f4cb61', '#f2b929', '#f4cb61'];
var label = [l1, l2, l3, l4, l5, l6, l7, l8];
var slices = label.length;
var sliceDeg = 360/slices;
var deg = rand(0, 360);
var speed = 5;
var slowDownRand = 0;
var ctx = canvas.getContext('2d');
var width = canvas.width; // size
var center = width/2;      // center
var isStopped = true;
var lock = true;
var intId;
var elementID = 0;
drawImg();


/*Untuk button addfood*/
function setArray(e) {
    var a = document.getElementById("makan-mana-form2");
    a = a.getElementsByTagName('input');
    console.log("length :" + a.length); 
    
    label = [];

    for(var x=0; x< a.length-1; x++){
        label[x] =  $('input[id=field'+(x+1)+']').val();
        console.log("label[" +x+"] : " + label[x]);
    }

    slices = label.length;
    sliceDeg = 360/slices;
    drawImg();
    
}


/*Untuk button addfood*/
$(document).ready(function() {
    $("#add").click(function() {
        intId = $("#buildyourform").length + 1;
        elementID = elementID+1;
        console.log("field"+elementID);
        var fieldWrapper = $(" <div class=\"form-group\" ><label class=\"control-label col-sm-2\" for=\"field" + elementID + "\">Choice "+ elementID +"</label>");
        var fName = $("<div class=\"col-sm-9\"><input type=\"text\" class=\"form-control\" id=\"field" + elementID + "\" value=\"Input your choice\" onClick=\"this.select()\">");
        var removeButton = $("<button type=\"button\" class=\"remove inline\"><i class=\"fa fa-trash\"></i></input></div></div>");
        removeButton.click(function() {
            $(this).parent().remove();
            elementID = elementID-1;
        });

        fieldWrapper.append(fName);
        fieldWrapper.append(removeButton);
        $("#buildyourform").append(fieldWrapper);
    });
});


function setIsStopped() {
    isStopped = false;
    lock = false;
    (function anim() {
        deg += speed;
        deg %= 360;

        // Increment speed
        if(!isStopped && speed<3){
            speed = speed+1 * 0.1;
        }
        // Decrement Speed
        if(isStopped){
            if(!lock){
                lock = true;
                slowDownRand = rand(0.994, 0.998);
            }
            speed = speed>0.2 ? speed*=slowDownRand : 0;
        }
        // Stopped!
        if(lock && !speed){
            var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
            ai = (slices+ai)%slices; // Fix negative index
            return alert("You got:\n"+ label[ai] ); // Get Array Item from end Degree
        }

        drawImg();
        window.requestAnimationFrame( anim );
    }());
}

function deg2rad(deg) {
    return deg * Math.PI/180;
}

function insertLabel() {
    return deg * Math.PI/180;
}

function drawSlice(deg, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(center, center);
    ctx.arc(center, center, width/2, deg2rad(deg), deg2rad(deg+sliceDeg));
    ctx.lineTo(center, center);
    ctx.fill();
}

function drawText(deg, text) {
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(deg2rad(deg));
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = 'bold 25px sans-serif';
    if (text.length >= 10){
        ctx.fillText(text, center-10, 8);
    }
    else{
        ctx.fillText(text, 150, 8);
    }
    ctx.restore();
}

function drawImg() {
    ctx.clearRect(0, 0, width, width);
    for(var i=0; i<slices; i++){
        drawSlice(deg, color[i]);
        drawText(deg+sliceDeg/2, label[i]);
        deg += sliceDeg;
    }
}

document.getElementById("spin").addEventListener("mousedown", function(){
    isStopped = true;
}, false);