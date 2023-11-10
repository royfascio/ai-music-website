bones = "";
believer = "";
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
bones_status = "";
believer_status = "";

function preload() {
    bones = loadSound("bones.mp3");
    believer = loadSound("believer.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, model_loaded);
    poseNet.on('pose', gotPoses);
}

function model_loaded() {
    console.log("PoseNet model is loaded");
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("FF0000");

   
    bones_status = bones.isPlaying();
	believer_status = believer.isPlaying();

    if(scoreLeftWrist > 0.2) {
        circle(left_wrist_x, left_wrist_y, 20);
        believer.stop();

        if(bones_status == false) {
            bones.play();
            document.getElementById("song_name").innerHTML = "Song Name = BONES";
        }
    }

    if(scoreRightWrist > 0.2) {
        circle(right_wrist_x, right_wrist_y, 20);
        bones.stop();

        if(believer_status == false) {
            believer.play();
            document.getElementById("song_name").innerHTML = "Song Name = BELIEVER";
        }
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreRightWrist =  results[0].pose.keypoints[10].score;
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("left_wrist_x = " + left_wrist_x + " left_wrist_y = " + left_wrist_y);

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("right_wrist_x = " + right_wrist_x + " right_wrist_y = " + right_wrist_y);
    }
    
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
