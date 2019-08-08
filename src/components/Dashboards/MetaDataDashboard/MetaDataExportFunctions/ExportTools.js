// ******************************************************************************************
import moment from 'moment';
import XLSX from 'xlsx';
// ******************************************************************************************
// CHECKER

const batchChecker = (batch) => {
  return batch !== 147 ? !!batch : false
}

const exportError = (message) => {
  alert(message || 'Please Select A Release To Export')
}

const asyncExport = (arr, originalLength, task, updateDownload, done) => { // asynchronous recursive forLoop
    setTimeout(() => {
      task(arr[0]);
      if (arr.length === 1) {
        updateDownload()
        done();
      } else {
        updateDownload()
        asyncExport(arr.slice(1), originalLength, task, updateDownload, done);
      }
    }, 0);
  }

// ******************************************************************************************
// parseData function
// ------------------------------------------------------------------------------------------
// this function capitalizes all the words in the descriptions and instruments of each cue,
// it also removes blank spaces and trailing commas
// ******************************************************************************************

const parseData = (array) => {
  let parsedArray = []
    if(array !== null){
      array.split(', ').forEach(desc => {
        let wordArray = []
        desc.replace(',', '').split(' ').forEach(word => {
           word.replace(/\w\S*/g, txt => {
             wordArray.push(txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
           })
        })
        if(wordArray[0] !== undefined){
         parsedArray.push(wordArray.join(' '))
        }
      })
    }
  return parsedArray;
}

// ******************************************************************************************
// generateDownload function
// ------------------------------------------------------------------------------------------
// this function takes the fileName as an argument and generates a link for that export
// ******************************************************************************************
const generateDownload = (csvData, fileName) => {
  let downloadLink = document.createElement("a");
  let blob = new Blob(["\ufeff", csvData]);
  let url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// this function is passed as the last argument in the Export functions so we can track the download progress.
const downloadProgress = (current, length) => {
  // console.log(current/length)
  return current/length
}


export {
  asyncExport, batchChecker, downloadProgress, exportError, generateDownload, parseData
};


// ******************************************************************************************











// ******************************************************************************************
