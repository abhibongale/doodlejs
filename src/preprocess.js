// preprocess class 
class Preprocess {
    constructor() {
        this.trainingData = [];
        this.trainingLabels = [];

        this.testData = [];
        this.testLabel = [];
        
        this.doodles = [];
        
        this.labelData = [];
        this.tensorData = [];

        this.totalPixels = 784;
        this.doodleLabels = ["flower", "cat", "bird"];
    }

    prepareData(data, labels) {
        console.log("converting the data into tensors");

        for (let row = 0; row < this.data.length; row++) {
            let pixels = []; // store the image pixels.
            for (let col = 0; col <  totalPixels; col++) {
                pixels[col] = data[row][col] /255;
            }
            this.doodles[i] = pixels; // store the all images pixels.
            let doodleIdx = doodleLabels.indexOf(labels[row]);
            this.labelData[i] = doodleIdx;
        }
        x = tf.tensor2d(doodles); // Creates rank-2 tf.Tensor
        let labelTensor = tf.tensor1d(this.labelData, "int32"); // Creates rank-1 tf.Tensor.
        y = tf.oneHot(labelTensor, this.doodleLabels.length).cast("float32"); // Creates a one-hot tf.Tensor (one-hot encoding)
        labelTensor.dispose(); // Disposes tf.Tensor from memory.
        // store the tensors of data and labels as (labels, data)
        this.tensorData[0] = x;
        this.tensorData[1] = y;

        return this.tensorData;
    }

    initializeData() {
        console.log("Initialising data.........");
        for (let i = 0; i < this.doodleLabels.length; i++) {
            let label = this.doodleLabels[i];
            // create data object array
            console.log("started with: " + label);
            dataObject[i] = new Object(label);
            dataObject[i].loadBytesData();
            dataObject[i].splitData();
        }

        for (let i = 0; i < dataObject.length; i++) {
            this.trainingData = this.trainingData.concat(dataObject[i].trainingData);
            this.trainingLabels = this.trainingLabels.concat(dataObject[i].trainingLabels);
            this.testingData = this.testingData.concat(dataObject[i].trainingData);
            this.testingLabels = this.testingLabels.concat(dataObject[i].testingLabels);
            console.log(this.trainingData, this.trainingLabels);
        }
        console.log("done");
    }
}
