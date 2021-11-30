class DoodleModel {
    constructor(DOODLELABELLIST, DATALENGTH, x, y) {
        console.log("DOODLE MODEL");
        this.tfModel = tf.sequential(); 
        this.DOODLELABELLIST = DOODLELABELLIST;
        this.DATALENGTH = DATALENGTH;
        console.log("DATALENGTH " + this.DATALENGTH);
        this.x = x;
        this.y = y;
    }

    buildModel() {
        console.log("buildModel");
        let tempModel = tf.sequential();
      
        const hiddenLayer1Units = 256;
        const hiddenLayersActivation = "sigmoid";
      
        const hiddenLayer1 = tf.layers.dense({
          units: hiddenLayer1Units,
          inputShape: this.DATALENGTH,
          activation: hiddenLayersActivation,
        });
      
        const hiddenLayer2Units = 128;
        const hiddenLayer2 = tf.layers.dense({
          units: hiddenLayer2Units,
          activation: hiddenLayersActivation,
        });
      
        const hiddenLayer3Units = 64;
        const hiddenLayer3 = tf.layers.dense({
          units: hiddenLayer3Units,
          activation: hiddenLayersActivation,
        });
      
        //output layer
        const outputLayerActivation = "softmax";
        const output = tf.layers.dense({
          units: this.DOODLELABELLIST.length,
          activation: outputLayerActivation,
        });
      
        tempModel.add(hiddenLayer1);
        tempModel.add(hiddenLayer2);
        tempModel.add(hiddenLayer3);
        tempModel.add(output);
      
        const modelLearningRate = 0.5;
        const modelOptimizer = tf.train.adagrad(modelLearningRate);
        const modelLoss = "meanSquaredError";
        tempModel.compile({
          optimizer: modelOptimizer,
          loss: modelLoss,
          metrics: ["accuracy"],
        });
        return tempModel;
      }

    
    async train(alert, model) {
        console.log("TRAINING STARTED...................");
        
        const trainDoshuffle = true;
        const trainValidSplit = 0.2;
        const trainBatchSize = 16;
        const trainEpochs = 50;
        await model.fit(
            this.x, 
            this.y, 
            {
            shuffle: trainDoshuffle,
            validationSplit: trainValidSplit,
            batchSize: trainBatchSize,
            epochs: trainEpochs,
            callbacks: {
              onEpochEnd: (epochs, logs) => {
                console.log("Epoch: " + (epochs + 1));
                console.log("Loss: " + logs.loss);
                console.log("Accuracy: " + logs.acc.toFixed(2));
                alert.innerHTML = `Training ${epochs * 2}% done...`;
              },
            },
          });
    }

    predict(image, tfModel) {
        return tfModel.predict(image);
    }
}
