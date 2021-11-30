class Preprocess {
    constructor(DOODLELABELLIST, dataPreload) {
        
        // train split
        this.trainingData = [];
        this.trainingLabels = [];
        // test split
        this.testingData = [];
        this.testingLabels = [];

        this.DATALENGTH = 784;
        this.DOODLELABELLIST = DOODLELABELLIST;
        this.dataPreload = dataPreload;
       // console.log("dataPreload " + this.dataPreload);
       // console.log("DOODLELABELLIST " + this.DOODLELABELLIST);
    }

    prepareData(data, labels) {
        console.log("PREPARE DATA MODULE RUNNING.....");
        let doodles = [];
        let labelsData = [];
        let returnedTensors = []; 
        
        for (let row = 0; row < data.length; row++) {
            let pixels = []; //pixels
            for (let col = 0; col < this.DATALENGTH; col++) {
                pixels[col] = data[row][col] / 255;
            }
            doodles[row] = pixels;
            let doodleIndex = this.DOODLELABELLIST.indexOf(labels[row]);
            labelsData[row] = doodleIndex;   
        }
        x = tf.tensor2d(doodles);
        let labelsTensor = tf.tensor1d(labelsData, "int32");
        y = tf.oneHot(labelsTensor, this.DOODLELABELLIST.length).cast("float32");
        labelsTensor.dispose();
        returnedTensors[0] = x;
        returnedTensors[1] = y;
        return returnedTensors;
    }

    initializeData() {
        console.log("INITIALIZE DATA MODULE RUNNING....");
        for (let i = 0; i < this.DOODLELABELLIST.length; i++) {
            let label = this.DOODLELABELLIST[i];
            dataObjectsArray[i] = new DataObject(label, this.DOODLELABELLIST, this.dataPreload);
            dataObjectsArray[i].loadBytesData();
            dataObjectsArray[i].splitData();
        }

        for (let i = 0; i < dataObjectsArray.length; i++) {
            this.trainingLabels = this.trainingLabels.concat(dataObjectsArray[i].trainingLabels);
            this.testingLabels  = this.testingLabels.concat(dataObjectsArray[i].testingLabels);
            this.trainingData   = this.trainingData.concat(dataObjectsArray[i].trainingData);
            this.testingData    = this.testingData.concat(dataObjectsArray[i].testingData);
            console.log(this.trainingData, this.trainingLabels);
        };
        console.log("Done");
    }
}