function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',modelLoaded);
}
function modelLoaded(){
  console.log('Model is Loaded!');
}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);
}
var previous_result='';
function gotResult(error,results){
  if(error){
 console.error(error);
}
else{
  if((result[0].confidence>0.5) && (previous_result != result[0].label)){
console.log(results);
previous_result=result[0].label;
var synth=window.speechSynthesis;
speak_data="Object detected is"+result[0].label;
var utter_this=new SpeechSynthesisUtterance(speak_data);
synth.speak(utter_this);
document.getElementById("result_object_name").innerHTML=result[0].label;
document.getElementById("result_object_accuracy").innerHTML=result[0].confidence.toFixed(3);
}
}
}

