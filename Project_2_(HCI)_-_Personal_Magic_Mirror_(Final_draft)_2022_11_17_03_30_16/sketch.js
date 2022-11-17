let capture;
var weatherAPI;
var weather_link = 'https://api.openweathermap.org/data/2.5/weather?lat=33.5779&lon=-101.8552&appid=c4aa83fb9b0c902545632c8fbff0bbbe&units=imperial'

let Red=150, Green=150, Blue=150;

// CLOCK
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

// Calling/Displaying files
function preload() {
  table = loadTable('DailyEvents.csv', 'csv', 20, 75);
  table_1 = loadTable('Health.csv', 'csv', 200, 125);
  table_2 = loadTable('News.csv', 'csv', 20, 125);
}

function setup() {
  createCanvas(900, 655);
  capture = createCapture(VIDEO);
  capture.size(420, 460);
  capture.hide();
  // Create Button(s)
  var drawButton = createButton("Greenlight");
  drawButton.mousePressed(drawCircle);
  var drawButton1 = createButton("Bluelight");
  drawButton1.mousePressed(drawCircle1);
  var drawButton2 = createButton("Redlight");
  drawButton2.mousePressed(drawCircle2);
  var drawButton3 = createButton("Default");
  drawButton3.mousePressed(drawCircle3);
  textSize(12);
  fill(255);
  capture.hide();
  loadJSON(weather_link, retriveData);
}

// Button coloring
function drawCircle() {
  Red = 0;
  Green = 255;
  Blue = 0;
}

function drawCircle1() {
  Red = 0;
  Green = 0;
  Blue = 255;
}

function drawCircle2() {
  Red = 255;
  Green = 0;
  Blue = 0;
}

function drawCircle3() {
  Red = 155;
  Green = 155;
  Blue = 155;
}

// Implements and display the weather
function retriveData(data) {
  weatherAPI = data;
}

function draw() {
  background(255);
  // image(capture, 0, 0, 900, 655);
  translate(900,0);
  scale(-1,1);
  fill(10,10,10);
  image(capture, 0, 0, 900, 655);
  //image(capture, 0, 0);
  translate(900, 0);
  scale(-1,1);
  fill(Red, Green, Blue, 50);
  rect(0, 0, 900, 655);
  fill(255, 255, 255, 255);  
  //CLOCK
  stroke(0, 255, 255);
  strokeWeight(.5);  
  tint(255, 255, 255);
  tint(255, 255, 255);
  fill(175, 175, 175, 175);
  rect(15, 15, 145, 50);
  rect(15, 73, 192, 45);
  rect(15, 133, 225, 265);
  rect(15, 408, 155, 235);
  rect(430, 13, 462, 115);
  fill(255, 255, 255, 255);
  stroke(0);
  if(weatherAPI) {
    textSize(14);
    textFont('Time New Roman');
    text('Current temperature: ' + weatherAPI.main.temp + 'F', 20, 112);
    text('Feels like: ' + weatherAPI.main.feels_like + 'F', 20, 92);
    text('Tuesday, Nov. 15, 2022', 20, 55);
    textSize(14);
  }
  
  // Outputs data from files and implements it
  let count = 150;
  for (let row = 0; row < table.getRowCount(); row++)
    for(let j = 0; j < table.getColumnCount(); j++) {
      text(table.getString(row, j), 20, count);
      count = count + 30;
    }
  let count_1 = 425;
  for (let row = 0; row < table_1.getRowCount(); row++)
    for(let j = 0; j < table_1.getColumnCount(); j++) {
      text(table_1.getString(row, j), 20, count_1);
      count_1 = count_1 + 30;
    }
  let count_2 = 30;
  for (let row = 0; row < table_2.getRowCount(); row++)
    for(let j = 0; j < table_2.getColumnCount(); j++) {
      text(table_2.getString(row, j), 440, count_2);
      count_2 = count_2 + 30;
    }
  fill(255, 255, 255);
  textSize(20);
  textStyle(BOLD);
  text(formatAMPM(new Date), 20, 35);
}
