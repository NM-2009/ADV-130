mercy = "";
paralyzed = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY= 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_mercy = "";
song_paralyzed = "";
function preload()
{
    mercy = loadSound("Mercy.mp3");
    paralyzed = loadSound("paralyzed.mp3");
}
function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}
function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_name = paralyzed.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        mercy.stop();
        if(song_name == false){
            paralyzed.play();
        }
        else{
            console.log("Song Name: Paralyzed");
            document.getElementById("song_id").innerHTML = "Song Name: Paralyzed Song";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        paralyzed.stop();
        if(mercy == false){
            mercy.play();
        }
        else{
            console.log("Song Name: Mercy");
            document.getElementById("song_id").innerHTML = "Song Name: Mercy";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}