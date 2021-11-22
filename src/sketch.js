// contain all the object array
let dataObjects = [];

// contains the arrays of preload data
let dataPreload = [];

let model = new Model();
let preprocess = new Preprocess();

x = {};
y = {};
testingX = {};
testingY = {};

const numDoodle = 1000;
const dataProportion = 0.8;


function preload() {
    console.log("preloading data");
    let filename;
    for (let i = 0; i < preprocess.doodleLabel.length; i++) {
        filename = preprocess.doodleLabel[i].toLowerCase();
        dataPreload[i] = loadBytes("./datasets/" + filename + ".bin");
    }
    console.log(dataPreload);
    console.log("Done");
}

// Setup function of p5.js (called after preload)
async function setup() {

    let canvas = createCanvas(280, 280);
    canvas.parent("canvas");
    background(0);
    preprocess.initializeData();

    console.log("creating training tensors.........");
    let trainingData = preprocess.prepareData(preprocess.trainingData, preprocess.trainingLabels);
    xTrain = trainingData[0];
    yTrain = trainingData[1];
    console.log("Done");
    
    console.log("creating testing tensors.........");
    let testingData = preprocess.prepareData(preprocess.testingData, preprocess.testingLabels);
    xTest = testingData[0];
    yTest = testingData[1];
    console.log("Done");

    console.log("Creating Model.........");
    modelBuild = model.buildModel();
    console.log("Done");
    
    // training button
    let trainButton = select("#train");
    let trainingAlert = document.getElementById("training-alert");
    trainingAlert.style.display = "none";
    trainButton.mousePressed(() => {
        trainingAlert.style.display = "inline";
        console.log("Training model");

        // Let's train the model (this .then(() => thingy is an application of the
        // new ES6 functionnality combined with the js promises).
        trainingAlert(trainingAlert).then(async() => {
            // Log progress
            console.log("Done");
            trainingAlert.style.display = "none";
            trainingAlert.className = "btn btn-disabled";
        });
    });

    // guess button
    let guessButton = select("#guess");
    guessButton.mousePressed(function() {
        let inputs = [];
        let inputImage = [];
        let img = get();
        img.resize(28, 28);
        img.loadPixels();
        // Convert black in white drawings to white in black drawings 
        for (let i = 0; i < preprocess.totalPixels; i++) {
            let alpha = img.pixels[i * 4];
            // normalize the pixels
            inputs[i] = alpha / 255.0;
        }
        
        // create 2D array with this pixels
        inputImage[0] = inputs;

        // Convert array to tensor
        let tensorTOPredict = tf.tensor2d(inputImage);
        console.log(tensorToPredict);

        // predict the doodle
        let guess = model.predict(tensorToPredict);
        let argMax = guess.argMax(1);
        let classifiedLabel = argMax.dataSync()[0];

        let classifiedDoodleLabel = preprocess.doodleLabel[classifiedLabel];
        const ouput = select("#ouput");
        output.html(classifiedDoodleLabel + "!!!");
        console.log("Guessed: " + classifiedDoodleLabel);
    });

    // clear button
    let clearButton = select("#clear");
    clearButton.mousePressed(function() {
        background(0);
    });

    let generateButton = select("#generate");

    generateButton.mousePressed(function(){
        background(0);
        let randomIndex = floor(random(numDoodle * reprocess.doodleLabel.length * (1 - dataProportion)));
        // testing X
        let offset = randomIndex * preprocess.totalPixels;
        let doodlePixels = testingX.dataSync().subarray(offset, offset + preprocess.totalPixels);
        // testing y
        let otherOffset = randomIndex * preprocess.doodleLabels.length;
        let labelResult = testingY.dataSync().subarray(offset, offset + preprocess.totalPixels);

        let doodleIndex;
        for (let i = 0; i < array.length; i++) {
            if (labelResult[i] === 1) {
                doodleIndex = i;
            }
        }
        console.log(preprocess.doodleLabels[doodleIndex]);
        let img = createImage(28, 28);
        img.loadPixels();
        for (let i = 0; i < preprocess.totalPixels; i++) {
            let val = doodlePixels[i] * 255;
            img.pixels[i * 4 + 0] = val;
            img.pixels[i * 4 + 1] = val;
            img.pixels[i * 4 + 2] = val;
            img.pixels[i * 4 + 3] = 255;
        }
        img.updatePixels();
        img.resize(280, 280);
        image(img, 0, 0);
    });
}

function draw() {
    strokeWeight(8);
    stroke(255);
    if (mouseIsPressed) {
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }