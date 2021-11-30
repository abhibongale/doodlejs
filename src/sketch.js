let dataObjectsArray = []; // contains all the data objects
let dataPreload = []; // contains the arrays of preloaded data
let model; // model

// Tensors
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
    console.log("dataPreload: " + dataPreload);
    console.log("DONE");
}

function setup() {
    console.log("setup");
    let canvas = createCanvas(280, 280);
    //canvas.parent("canvas");
    //background(0);
    let prepareData = new Preprocess(DOODLELABELLIST, dataPreload);
    prepareData.initializeData();
    console.log("CREATING TRAINING TENSORS");
    prepareData.prepareData(prepareData.testingData,prepareData.testingLabels);
    let doodleTensors;

}


function draw() {
    console.log("draw");
}