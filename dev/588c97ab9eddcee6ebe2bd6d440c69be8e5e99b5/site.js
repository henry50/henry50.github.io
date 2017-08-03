var myArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
var btn = document.getElementById("rnd")
setInterval(function () {
    var rand = myArray[Math.round(Math.random() * (myArray.length - 1))];
    var rand1 = myArray[Math.round(Math.random() * (myArray.length - 1))];
    var rand2 = myArray[Math.round(Math.random() * (myArray.length - 1))];
    var rand3 = myArray[Math.round(Math.random() * (myArray.length - 1))];
    var rand4 = myArray[Math.round(Math.random() * (myArray.length - 1))];
    var rand5 = myArray[Math.round(Math.random() * (myArray.length - 1))];  
    btn.style.backgroundColor= '#'+rand+rand1+rand2+rand3+rand4+rand5;
}, 100);