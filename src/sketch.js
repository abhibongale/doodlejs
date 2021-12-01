//import DoodleModel from './doodle_model.js';
const IMAGE_SIZE = 784;
const CLASSES = ['flashlight', 'belt', 'mushroom', 'pond', 'strawberry', 'pineapple', 'sun', 'cow', 'ear', 'bush', 'pliers', 'watermelon', 'apple', 'baseball', 'feather', 'shoe', 'leaf', 'lollipop', 'crown', 'ocean', 'horse', 'mountain', 'mosquito', 'mug', 'hospital', 'saw', 'castle', 'angel', 'underwear', 'traffic_light', 'cruise_ship', 'marker', 'blueberry', 'flamingo', 'face', 'hockey_stick', 'bucket', 'campfire', 'asparagus', 'skateboard', 'door', 'suitcase', 'skull', 'cloud', 'paint_can', 'hockey_puck', 'steak', 'house_plant', 'sleeping_bag', 'bench', 'snowman', 'arm', 'crayon', 'fan', 'shovel', 'leg', 'washing_machine', 'harp', 'toothbrush', 'tree', 'bear', 'rake', 'megaphone', 'knee', 'guitar', 'calculator', 'hurricane', 'grapes', 'paintbrush', 'couch', 'nose', 'square', 'wristwatch', 'penguin', 'bridge', 'octagon', 'submarine', 'screwdriver', 'rollerskates', 'ladder', 'wine_bottle', 'cake', 'bracelet', 'broom', 'yoga', 'finger', 'fish', 'line', 'truck', 'snake', 'bus', 'stitches', 'snorkel', 'shorts', 'bowtie', 'pickup_truck', 'tooth', 'snail', 'foot', 'crab', 'school_bus', 'train', 'dresser', 'sock', 'tractor', 'map', 'hedgehog', 'coffee_cup', 'computer', 'matches', 'beard', 'frog', 'crocodile', 'bathtub', 'rain', 'moon', 'bee', 'knife', 'boomerang', 'lighthouse', 'chandelier', 'jail', 'pool', 'stethoscope', 'frying_pan', 'cell_phone', 'binoculars', 'purse', 'lantern', 'birthday_cake', 'clarinet', 'palm_tree', 'aircraft_carrier', 'vase', 'eraser', 'shark', 'skyscraper', 'bicycle', 'sink', 'teapot', 'circle', 'tornado', 'bird', 'stereo', 'mouth', 'key', 'hot_dog', 'spoon', 'laptop', 'cup', 'bottlecap', 'The_Great_Wall_of_China', 'The_Mona_Lisa', 'smiley_face', 'waterslide', 'eyeglasses', 'ceiling_fan', 'lobster', 'moustache', 'carrot', 'garden', 'police_car', 'postcard', 'necklace', 'helmet', 'blackberry', 'beach', 'golf_club', 'car', 'panda', 'alarm_clock', 't-shirt', 'dog', 'bread', 'wine_glass', 'lighter', 'flower', 'bandage', 'drill', 'butterfly', 'swan', 'owl', 'raccoon', 'squiggle', 'calendar', 'giraffe', 'elephant', 'trumpet', 'rabbit', 'trombone', 'sheep', 'onion', 'church', 'flip_flops', 'spreadsheet', 'pear', 'clock', 'roller_coaster', 'parachute', 'kangaroo', 'duck', 'remote_control', 'compass', 'monkey', 'rainbow', 'tennis_racquet', 'lion', 'pencil', 'string_bean', 'oven', 'star', 'cat', 'pizza', 'soccer_ball', 'syringe', 'flying_saucer', 'eye', 'cookie', 'floor_lamp', 'mouse', 'toilet', 'toaster', 'The_Eiffel_Tower', 'airplane', 'stove', 'cello', 'stop_sign', 'tent', 'diving_board', 'light_bulb', 'hammer', 'scorpion', 'headphones', 'basket', 'spider', 'paper_clip', 'sweater', 'ice_cream', 'envelope', 'sea_turtle', 'donut', 'hat', 'hourglass', 'broccoli', 'jacket', 'backpack', 'book', 'lightning', 'drums', 'snowflake', 'radio', 'banana', 'camel', 'canoe', 'toothpaste', 'chair', 'picture_frame', 'parrot', 'sandwich', 'lipstick', 'pants', 'violin', 'brain', 'power_outlet', 'triangle', 'hamburger', 'dragon', 'bulldozer', 'cannon', 'dolphin', 'zebra', 'animal_migration', 'camouflage', 'scissors', 'basketball', 'elbow', 'umbrella', 'windmill', 'table', 'rifle', 'hexagon', 'potato', 'anvil', 'sword', 'peanut', 'axe', 'television', 'rhinoceros', 'baseball_bat', 'speedboat', 'sailboat', 'zigzag', 'garden_hose', 'river', 'house', 'pillow', 'ant', 'tiger', 'stairs', 'cooler', 'see_saw', 'piano', 'fireplace', 'popsicle', 'dumbbell', 'mailbox', 'barn', 'hot_tub', 'teddy-bear', 'fork', 'dishwasher', 'peas', 'hot_air_balloon', 'keyboard', 'microwave', 'wheel', 'fire_hydrant', 'van', 'camera', 'whale', 'candle', 'octopus', 'pig', 'swing_set', 'helicopter', 'saxophone', 'passport', 'bat', 'ambulance', 'diamond', 'goatee', 'fence', 'grass', 'mermaid', 'motorbike', 'microphone', 'toe', 'cactus', 'nail', 'telephone', 'hand', 'squirrel', 'streetlight', 'bed', 'firetruck'];
const k = 10;
let canvas;
let dataObjectsArray = []; // contains all the data objects
let dataPreload = []; // contains the arrays of preloaded data
let premodel;

async function loadMyModel() {
    premodel = await tf.loadLayersModel('model/model.json');
    premodel.summary();
  }
  


// dataset
x = {};
y = {};
testingX = {};
testingY = {};

const NUMEACHDOODLE = 1000;
const PROPORTION = 0.8;
const DOODLELABELLIST = ["flower", "cat", "bird"];

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
    loadMyModel();
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
         // Get input image from the canvas
        const inputs = getInputImage();

        // Predict
        let guess = premodel.predict(tf.tensor([inputs]));

        // Format res to an array
        const rawProb = Array.from(guess.dataSync());

        // Get top K res with index and probability
        const rawProbWIndex = rawProb.map((probability, index) => {
            return {
                index,
                probability
            }
        });

        const sortProb = rawProbWIndex.sort((a, b) => b.probability - a.probability);
        const topKClassWIndex = sortProb.slice(0, k);
        const topKRes = topKClassWIndex.map(i => `<br>${CLASSES[i.index]} (${(i.probability.toFixed(2) * 100)}%)`);
        const output = select("#output");
        output.html(topKRes);
        /*
        let inputs = [];
        let inputImage = [];
        let img = get();
        img.resize(28, 28);
        img.loadPixels();
        for (let i = 0; i < DATALENGTH; i++) {
            let alpha = img.pixels[i * 4];
            inputs[i] = alpha / 255.0;
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
        */


    });

    let mymodelButton = select("#mymodel");
    mymodelButton.mousePressed(function (){
        const inputs = getInputImage();
        const inputImage = tf.util.flatten(inputs);
        tensorToPredict = tf.tensor2d([inputImage]);
        console.log("tensorToPredict: " + tensorToPredict);
        let mymodel = model.predict(tensorToPredict, tfModel);
        const rawProb = Array.from(mymodel.dataSync());

        // Get top K res with index and probability
        const rawProbWIndex = rawProb.map((probability, index) => {
            return {
                index,
                probability
            }
        });

        const sortProb = rawProbWIndex.sort((a, b) => b.probability - a.probability);
        const topKClassWIndex = sortProb.slice(0, 3);
        const topKRes = topKClassWIndex.map(i => `<br>${DOODLELABELLIST[i.index]} (${(i.probability.toFixed(2) * 100)}%)`);
        const output = select("#output");
        output.html(topKRes);
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



function getInputImage() {
    let inputs = [];
    // p5 function, get image from the canvas
    let img = get();
    img.resize(28, 28);
    img.loadPixels();
  
    // Group data into [[[i00] [i01], [i02], [i03], ..., [i027]], .... [[i270], [i271], ... , [i2727]]]]
    let oneRow = [];
    for (let i = 0; i < IMAGE_SIZE; i++) {
      let bright = img.pixels[i * 4];
      let onePix = [parseFloat((255 - bright) / 255)];
      oneRow.push(onePix);
      if (oneRow.length === 28) {
        inputs.push(oneRow);
        oneRow = [];
      }
    }
    return inputs;
}