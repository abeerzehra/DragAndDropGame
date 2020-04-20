timing = 120000;
var myTimer;
function addPoint() {
    var points = document.getElementById('points');
    points.innerHTML = parseInt(points.innerHTML) + 5;
}
function dragStart(event) {
    event.dataTransfer.setData("source", event.target.id);
    console.log(event.target);
}

function allowDrop(event) {
    event.preventDefault();
}

function removeBlur() {
    var images = document.getElementsByClassName('image-done');

    while (images.length) {
        images[0].classList.remove("image-done");
    }
}

function addDrag() {
    var images = document.getElementsByClassName('source');

    for (let index = 0; index < images.length; index++) {
        // console.log(images[index]);
        images[index].setAttribute('ondragstart', 'dragStart(event)')
        //  console.log(images[index]);
    }

}

function nextLevel() {
    var levels = document.getElementById('level');
    levels.innerHTML = parseInt(levels.innerHTML) + 1;
    clearInterval(myTimer);
    alert('Welcome to the next Level');
    myTimer = setTimer(parseInt(timing) - (parseInt(levels.innerHTML) * 10000));
    removeBlur();
    addDrag();
    rearrangeDestination();
    rearrangeSources();
}

function levelEnded() {
    var dest = document.getElementsByClassName('dest');
    var source = document.getElementsByClassName('source');
    var imageDone = document.getElementsByClassName('image-done');

    if (dest.length + source.length > imageDone.length) {
        return false;
    }
    return true;
}



function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("source");

    if (data[1] == event.target.id[1]) {
        addPoint();
        clap();
        var image1 = document.getElementById(data);
        var image2 = document.getElementById(event.target.id);
        image1.removeAttribute('ondragstart');
        image1.classList.add("image-done");
        image2.classList.add("image-done");
        if (levelEnded()) {
            nextLevel();
            
        }
    }
    else{
        wrong();
    }
}

function swapPositions(arr, a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]]
}
function rearrangeSources() {
    var array = document.getElementsByClassName('sourceDiv');

    for(var i=0;i<8;i++){
        swapPositions(array,getRandomInt(5), getRandomInt(5));
    }

    var sources = document.getElementById('source');
    for(var i=0;i<array.length;i++){
        sources.appendChild(array[i])
    }

   
}
function rearrangeDestination() {
    var array2 = document.getElementsByClassName('destDiv');

    for(var i=0;i<10;i++){
        swapPositions(array2,getRandomInt(5), getRandomInt(5));
        swapPositions(array2,getRandomInt(5), getRandomInt(5));
    }
    
    var destination = document.getElementById('destination');
    for(var i=0;i<array2.length;i++){
        destination.appendChild(array2[i])
        // console.log(array2[i]);
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function setTimer(time) {
    console.log(time);
    var countDownDate = new Date().getTime();
    countDownDate = countDownDate + time;
    var x = setInterval(function () {

        var now = new Date().getTime();

        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
            gameOver()
        }
    }, 1000);
    return x;
}

function reset(){
    removeBlur();
    addDrag();
    rearrangeSources();
    rearrangeDestination();
    var levels = document.getElementById('level');
    levels.innerHTML = 1;
    var points = document.getElementById('points');
    points.innerHTML = 0;
    clearInterval(myTimer);
    myTimer = setTimer(timing);
}

function gameOver(){
    reset();
    alert("Game Over, timeout");
    clearInterval(myTimer);
    myTimer = setTimer(timing);
}

function clap(){
    var snd = new Audio("audio/kids-cheering-sound-effect.mp3");
    snd.play();
}

function wrong(){
    var wrong = new Audio("audio/wrong.mp3");
    wrong.play();

}

myTimer = setTimer(timing);