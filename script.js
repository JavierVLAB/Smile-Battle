const video = document.getElementById('video')
const detectionText = document.getElementById('detectionText')

var detectionTime = 250;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  console.log("mobile");
  displaySize = { width: 240, height: 320 };
  video.setAttribute("width","240");
  video.setAttribute("height","320");
}else{
  console.log("not mobile");
  displaySize = { width: 640, height: 480 };
  video.setAttribute("width","640");
  video.setAttribute("height","480");
  detectionTime = 100;
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)
  .catch(error => console.log(error));

const constraints = {video: true};
var displaySize;

function startVideo() {
  navigator.mediaDevices.getUserMedia(constraints).
  then(handleSuccess).catch(handleError);;
};

function handleError(error) {
  console.error('navigator.getUserMedia error: ', error);
}

function handleSuccess(stream) {
  video.srcObject = stream;
  console.log("video stream OK");
}

var myVar;

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  //const displaySize = { width: video.width, height: video.height };
  
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //faceapi.draw.drawDetections(canvas, resizedDetections)
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    //console.log(detections);
    myVar = detections;
    if(detections.length > 0) {
      printExpressionDetected(detections[0]);
    } else {
      detectionText.innerHTML = "Face Not Detected";
      detectionText.classList.remove('btn-success');
      detectionText.classList.add('btn-secondary');
      happyText.innerHTML ='Not Smile';
      happyText.classList.remove('btn-success');
      happyText.classList.remove('btn-danger');
      happyText.classList.add('btn-secondary');

    }
  }, detectionTime);
});

function printExpressionDetected(face){
  detectionText.innerHTML = "Face Detected ";
  detectionText.classList.remove('btn-secondary');
  detectionText.classList.add('btn-success');

  if(face.expressions.happy > 0.5){
    var percent = face.expressions.happy * 100;
    happyText.innerHTML ="Smile " + percent.toFixed(2) + "%";
    happyText.classList.remove('btn-secondary');
    happyText.classList.remove('btn-danger');
    happyText.classList.add('btn-success');
  } else {
    happyText.innerHTML ='Not Smile';
    happyText.classList.remove('btn-success');
    happyText.classList.remove('btn-secondary');
    happyText.classList.add('btn-danger');
  }
}

document.addEventListener('keydown',(event) => {
  var key = event.key;
  if (key == 'p' || key == 'P') {
    if(video.paused) {
      video.play();

    } else {
      video.pause();
    }
  }
},false);












