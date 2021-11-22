class Object {
    constructor(label) {
        this.label = label;
        this.totalData = [];
        this.trainingData = [];
        this.trainingLabels = [];
        this.testingData = [];
        this.testingLabels = [];
        this.dataProportion = 0.8;
        this.eachDoodle = 1000;
        this.totalPixels = 784;
        this.numDoodles = 1000;
    }

    get trainingData() {
        return this._trainingData;
    }

    get trainingLabels() {
        return this._trainingLabels;
    }

    get testingData() {
        return this._trainingData;
    }

    get testingLabels() {
        return this._trainingLabels;
    }

    set trainingData(data) {
        return this._trainingData = data;
    }

    set trainingLabels(data) {
        return this._testingData = data;
    }

    set testingData(data) {
        return this._testingData = data;
    }

    set testingLabels(data) {
        return this._testingLabels = data;
    }

    loadBytesData() {
        let index = doodleLabel.indexOf(this.label);
        let bytesObject = dataPreload[index];
        this.totalData = bytesObject.bytes;
    }

    splitData() {
        console.log("spliting the data of: " + this.numDoodles);
        for (let i = 0; i < this.numDoodles; i++) {
            let offset = i * this.totalPixels; // keeping track of index
            let threshold = floor(this.dataProportion * this.numDoodles); // threshold for test/train splitData
            // spliting based on threshold e.g threshold = 0.8 * 1000 will be training data
            if (i < threshold) { 
                this.trainingData[i] = this.totalData.subarray(offset, offset + this.totalPixels);
                this.trainingLabels[i] = this.label;
            } else {
                this.testingData[i - threshold] = this.totalData.subarray(offset, offset + this.totalPixels);
                this.testingLabels[i - threshold] = this.label;
            }
        }

    }
}