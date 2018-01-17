var c = document.getElementById("imgc");
var ctx = c.getContext("2d");

function display(){
    var imgurl = document.getElementById("url").value;
    document.getElementById("step2").style.display = "block";
    document.getElementById("res1").src= imgurl;
    var img = document.getElementById("res1");
    img.crossOrigin = "anonymous";
    ctx.drawImage(img, 0, 0);
    document.getElementById("step3").style.display = "block";
}
function save(){
    canvas = document.querySelector('canvas');
    window.navigator.msSaveBlob(canvas.msToBlob(), "image"); 
}