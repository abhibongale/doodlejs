//import DoodleModel from './doodle_model.js';

let dataObjectsArray = []; // contains all the data objects
let dataPreload = []; // contains the arrays of preloaded data
let model;

// dataset
x = {};
y = {};
testingX = {};
testingY = {};

const NUMEACHDOODLE = 1000;
const PROPORTION = 0.8;
const DOODLELABELLIST = ["airplane", "apple", "bed"];

function preload() {
    console.log("PRELOAD");
    let filename;
    for (let i = 0; i < DOODLELABELLIST.length; i++) {
        filename = DOODLELABELLIST[i].toLocaleLowerCase();
        dataPreload[i] = loadBytes("../dataset/" + filename + ".bin");
    }
    //console.log("dataPreload: " + dataPreload);
    console.log("DONE");
}

async function setup() {
    console.log("SETUP");
    
    let canvas = createCanvas(280, 280);
    canvas.parent("canvas");
    background(0);

    let prepareData = new Preprocess(DOODLELABELLIST, dataPreload);
    prepareData.initializeData();
    let DATALENGTH = prepareData.DATALENGTH;
    
    // loading the training dataset
    console.log("CREATING TRAINING TENSORS");
    let doodleTensors = prepareData.prepareData(prepareData.trainingData,prepareData.trainingLabels);
    x = doodleTensors[0];
    y = doodleTensors[1];
    console.log("DONE");
    
    // loading the test dataset
    console.log("CREATING TESTING TENSORS");
    doodleTensors = prepareData.prepareData(prepareData.testingData, prepareData.testingLabels);
    testingX = doodleTensors[0];
    testingY = doodleTensors[1];
    console.log("DONE");
    
    // laoding the training model
    console.log("MODEL MODULE LOADING.....");
    model = new DoodleModel(DOODLELABELLIST, DATALENGTH,x, y);
    let tfModel = model.buildModel();
    console.log("DONE");

    // on-click training 
    let trainButton = select("#train");
    let trainingAlert = document.getElementById("training-alert");
    trainingAlert.style.display = "none";
    trainButton.mousePressed(
        () => {
            trainingAlert.style.display = "inline";
            model.train(trainingAlert, tfModel).then(async () => {
                console.log("Done");
                trainingAlert.style.display = "none";
                trainingAlert.className = "btn btn-disabled";
            });
        }
    );
    //on-click predecting
    let guessButton = select("#guess");
    guessButton.mousePressed(function () {
        let inputs = [];
        let inputImage = [];
        let img = get();
        img.resize(28, 28);
        img.loadPixels();
        for (let i = 0; i < DATALENGTH; i++) {
            let alpha = img.pixels[i * 4];
            inputs[i] = alpha / 255.0;
            console.log(alpha);
        }
        inputImage[0] = inputs;
        console.log("inputImage" + inputImage);
        
        let tensorToPredict = tf.tensor2d(inputImage);
        console.log("tensorToPredict: " + tensorToPredict);

        let guess = model.predict(tensorToPredict, tfModel);
        let argMax = guess.argMax(1);
        let classifiedLabel = argMax.dataSync()[0];

        let classifiedDoodleLabel = DOODLELABELLIST[classifiedLabel];
        const output = select("#output");
        output.html(classifiedDoodleLabel);
        console.log("Guessed " + classifiedDoodleLabel);
    });

    let clearButton = select("#clear");
    clearButton.mousePressed(function () {
        background(0);
    });

}


function draw() {
    console.log("draw");
    strokeWeight(8);
    stroke(255);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}