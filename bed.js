img = "" ;
objects = [] ;

function preload() {
    img = loadImage('bedroom.jpg') ;
}

function setup() {
    canvas = createCanvas(750,450) ;
    canvas.position(390, 350) ;

    detector = ml5.objectDetector('cocossd' , modelloaded) ;
    document.getElementById("status").innerHTML = "Status: Detecting objects" ;
}
function modelloaded() {
    console.log("cocossd is initialised.") ; 
    detector.detect(img, gotResult) ;
}
function gotResult(error, results) {
    if(error) {
        console.log(error) ;
    }
    else {
        console.log(results) ;
        objects =  results ;
    }
}
function draw() {
    image(img, 0, 0, 750, 450) ;

    for(i=0 ; i<objects.length ; i++) {
        document.getElementById("status").innerHTML = "Status: Detected objects." + "<br>" + "There are mainly 7 objects in this picture. Cocossd detected 1 of them." ;
        accuracyPercent =floor(objects[i].confidence *100);
        fill('#FFFFFF') ;
        text(objects[i].label + " :" + accuracyPercent + "% accuracy" , objects[i].x + 17, objects[i].y + 30) ;
        textSize(18) ;
        textFont('Georgia');
        noFill() ;
        stroke('#FFFFFF') ;
        rect(objects[i].x,objects[i].y, objects[i].width, objects[i].height) ;
    }
}