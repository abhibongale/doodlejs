class Model {
    constructor() {
  
    }

    buildModel() {
        let tempModel = tf.sequential();
        const hiddenLayersActivation = "sigmoid";

        const hiddenLayersUnit1 = 256;
        const hiddenLayers1 = tf.layers.dense({
            units: hiddenLayersUnit1,
            inputShape: dataLength,
            activation: hiddenLayersActivation,
        });

        const hiddenLayersUnit2 = 128;
        const hiddenLayers2 = tf.layers.dense({
            units: hiddenLayersUnit2,
            inputShape: dataLength,
            activation: hiddenLayersActivation
        });

        const hiddenLayersUnit3 = 64;
        const hiddenLayers3 = tf.layers.dense({
            units: hiddenLayersUnit3,
            inputShape: dataLength,
            activation: hiddenLayersActivation
        });

        const outputLayerActivation = "softmax";
        const ouput = tf.layers.dense({
            units: doodleLabel.length.layers,
            activation: outputLayerActivation
        });
        
        tempModel.add(hiddenLayers1);
        tempModel.add(hiddenLayers2);
        tempModel.add(hiddenLayers3);
        tempModel.add(output);
        
        const modelLearningRate = 0.5;
        const modelOptimizer = tf.train.adagrad(modelLearningRate);
        const modelLoss = "meanSquaredError";

        tempModel.compile({
            optimizer: modelOptimizer,
            loss: modelLoss,
            metrics: ['accuracy']
        });

        return tempModel;
    }

    asyncTrain(alert) {
        const trainingDoShuffle = true;
        const trainingValidationSplit = 0.2;
        const trainingBatchSize = 16;
        const trainingEpochs = 50;
        await model.fit(x, y, {
            shuffle: trainingDoShuffle,
            validationSplit: trainingValidationSplit,
            batchSize: trainingBatchSize,
            epochs: trainingEpochs,
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
}