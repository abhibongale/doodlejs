class DataObject {
    constructor(label, doodleLabelList, dataPreload) {
        this.label = label;
        this.totalData = [];
        this.trainingData = [];
        this.testingData = [];
        this.trainingLabels = [];
        this.testingLabels = [];
        this.dataPreload = dataPreload;
        this.PROPORTION = 0.8;
        this.NUMDOODLE = 1000;
        this.BYTELEN = 784;
        this.NUMEACHDOODLE = 1000;
        this.doodleLabelList = doodleLabelList;
        console.log(this.label);
        console.log(this.doodleLabelList);
        
    }

    get trainingData() {
        return this._trainingData;
      }

      get testingData() {
        return this._testingData;
      }

      get trainingLabels() {
        return this._trainingLabels;
      }
      
      get testingLabels() {
        return this._testingLabels;
      }
    
      set trainingData(data) {
        this._trainingData = data;
      }
    
      set testingData(data) {
        this._testingData = data;
      }
    
      set trainingLabels(data) {
        this._trainingLabels = data;
      }
    
      set testingLabels(data) {
        this._testingLabels = data;
      }
    

    loadBytesData() {
        console.log("LOAD BYTES DATA");
        let index = this.doodleLabelList.indexOf(this.label);
        //console.log("index: " +  index);
        let bytesObject = this.dataPreload[index];
        //console.log("this.dataPreload[index]: " +  this.dataPreload[index]);
        this.totalData = bytesObject.bytes; // bytesObject.bytes is the actual bytes array
    }

    splitData() {
        console.log("SPLIT DATA");
        for (let i = 0; i < this.NUMDOODLE; i++) {
            let offset = i * this.BYTELEN; // keeping track of index
            //console.log("offset: " + offset);
            let threshold = floor(this.PROPORTION * this.NUMDOODLE);
            //console.log("threshold: " + threshold);
            if (i < threshold) {
                this.trainingData[i] = this.totalData.subarray(offset, offset + this.BYTELEN);
                this.trainingLabels[i] = this.label;
            } else {
                this.testingData[i - threshold] = this.totalData.subarray(offset, offset + this.BYTELEN);
                this.testingLabels[i - threshold] = this.label;
            }
        }
    }


}

