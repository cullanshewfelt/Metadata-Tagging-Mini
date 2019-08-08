import React from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import XLSX from 'xlsx';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');


class UsageReportTimeline extends React.Component {
   constructor(props) {
     super(props)
     // this.downloadCounter = this.downloadCounter.bind(this);
   }
   //
   // downloadCounter = (currentProgress, complete) => {
   //   let percentage =  parseFloat(((currentProgress/complete) * 100).toFixed(2))
   //    // this.setState({downloadProgress: percentage})
   //    return percentage;
   //

  generateUseageTimelineReport = () => {
    console.log(this.props)
    // this.props.resetDownload()
    this.props.updateDownload(0.00)
    let allSheetData = [];
    let sheetNames = [];
    let dlmStaff = this.props.clients.length !== 0 ? this.props.clients.filter((client) => client.company === 'DL Music') : [];
    let filteredClients = this.props.clients.length !== 0 ? this.props.clients.filter((client) =>
      client.client_id !== 360
      && client.client_id !== 1000
      && client.client_id !== 9
      && client.client_id !== 12
      && client.company !== 'DL Music'
    ) : [];

    // we must filter through our monitors and searches according to the times inputted by the user:

    let filteredMonitor = this.props.monitoring.length !== 0 ? this.props.monitoring.filter(actions =>
      actions.exe_time >= moment(this.props.startDate).toISOString() &&
      actions.exe_time <= moment(this.props.endDate).toISOString()
    ) : [];

    let filteredSearches = this.props.searches.length !== 0 ? this.props.searches.filter(actions =>
      actions.exe_time >= moment(this.props.startDate).toISOString() &&
      actions.exe_time <= moment(this.props.endDate).toISOString()
    ) : [];

    //  we then grab all the companies from those filtered monitors/searches

    let companies = [];

    for(let monitor in filteredMonitor){
      ! companies.includes(filteredMonitor[monitor].company) ? companies.push(filteredMonitor[monitor].company) : null;
    }

    let searchCompanies = [];

    for(let search in filteredSearches){
      ! searchCompanies.includes(filteredSearches[search].company) ? searchCompanies.push(filteredSearches[search].company) : null;
    }

    //  combine those arrays of companies using a new Set so there are no duplicate Worksheets

    let concatCompanies = Array.from(new Set(companies.concat(searchCompanies)))
    var wb = {SheetNames: concatCompanies, Sheets:{}};
    //  similarly concat the filtered searches and monitoring to create one data source, sort it by time descending

    let concatSandM = Array.from(new Set(filteredMonitor.concat(filteredSearches))).sort((a,b) => b.exe_time > a.exe_time ? 1 : -1)

    // the following will create data for the action info and action type columns in the XSLX workbook
    let actionInfo = '';
    let actionType = '';
    // a switch statement in a switch statement, refactored this since it gets used multiple times below
    // the function is recursive, so that if row.lib_id === 0, we run the same switch case, but on the
    // lib_id extracted from the row.path (the URL)
    const switchSwitch = (x, row) => {
      switch(parseInt(x)){
        case 0:
          switchSwitch(/page_lib_id=\d{1,}/m.exec(row.path)[0].split('=')[1], row);
          break;
        case 1:
          actionInfo = 'Background Instrumentals';
          break;
        case 2:
          actionInfo = 'Indie Artists';
          break;
        case 3:
          actionInfo = 'Maple Jam Music';
          break;
        case 4:
          actionInfo = 'Artist Select';
          break;
      }
      let downloadArray = []

      switch(actionType){
        case 'Search':
          actionInfo += ` | ${actionType} ${/qck_criteria=[^&\s]{1,}/m.test(row.path) ? /qck_criteria=[^&\s]{1,}/m.exec(row.path)[0].split('=')[1].toUpperCase().replace(/%2C/g, ', ').replace(/%20/g, ' ').replace(/%27/g, "'") : ''}`
          break;
        case 'Download':
          let downloadString = /cue_path=[^&\s]{1,}/m.test(row.path) ? /cue_path=[^&\s]{1,}/m.exec(row.path)[0].split('=')[1] : 'PLAYLIST';
          downloadArray = downloadString.replace(/\+/g, ' ').replace(/%2C/g, ', ').replace(/%20/g, ' ').replace(/%27/g, ' ').split('/')
          downloadArray[2] = !!downloadArray[2] && downloadArray[2].includes(' - ') ? downloadArray[2].split(' - ')[1] : null;
          actionInfo += downloadArray[2] === null ? ` | ${downloadArray[0]}` : ` | ${downloadArray.join(', ').trim()}`
          break;
        case 'Play':
          let infoArray = row.path.split('/')
          let newArray = [];
          switch(infoArray.length){
            case 1:
              infoArray.split(' - ')[1];
              break;
            case 3:
              infoArray.splice(0, 2)
              break;
            case 4:
              infoArray.splice(0, 1)
              break;
            case 6:
              infoArray.splice(0, 3)
              break;
          }
          // take out the library prefix
          infoArray[2] = !!infoArray[2] && infoArray[2].includes(' - ') ? infoArray[2].split(' - ')[1] : infoArray[2];
          actionInfo +=  ` | ${infoArray.join(', ')}`
          break;
      }
    }

    let progressCount = 0;
    let totalRows = concatCompanies.length;
    console.log(concatCompanies)
    for(let x in concatCompanies){
      sheetNames.push({sheetid: concatCompanies[x], header: true}) // create our XLSX sheet name
      let sheetData = concatSandM.filter(y =>
        y.company === concatCompanies[x]
      ).map((row, index, arr) => {
        progressCount += 1; // update the download progress
        console.log(140, parseFloat(((progressCount/concatSandM.length)*100).toFixed(2)))
        // this.props.updateDownload(parseFloat(((progressCount/concatSandM.length)*100).toFixed(2)))

        //  sets to 100% only
        // let downloadProgress = ( ) => {this.props.downloadCounter(progressCount, concatSandM.length)}
        // ((progressCount/concatSandM) === 1) ? clearInterval(downloadProgress) : setInterval(downloadProgress, 50);

        // works but only after the download finishes
        let downloadProgress = Promise.resolve(parseFloat(((progressCount/concatSandM.length)*100).toFixed(2)))
        downloadProgress.then(value => setTimeout(()=>{
          this.props.downloadCounter(progressCount, concatSandM.length, (x)=>{
            console.log(151, x)
            if( x === 100){

            }
          })
          }, 1000))

        // this.props.updateDownload(parseFloat(((progressCount/concatSandM.length)*100).toFixed(2)))
        // ((progressCount/concatSandM) === 1) ? clearInterval(updateDownloadProgress) : setInterval(updateDownloadProgress, 50);
        // setTimeout(this.props.updateDownload(parseFloat(((progressCount/concatSandM.length)*100).toFixed(2))), 50)
        // clearInterval()
        // creates a row for each search / download / play
        // action type will help us figure out things to render later so it's saved as a variable
        actionType = '';
        actionType = !!row.typ && row.typ === 1 ? 'Play' : !!row.typ && row.typ === 2 ? 'Download' : 'Search'
        actionInfo = '';
        // clear actionInfo since it's outside of this scope, we don't want the data to persist throughout the loop
        if(!!row.typ){
          switchSwitch(row.lib_id, row) // see above
        } else {
          let pathToLib = /page_lib_id=\d{1,}/m.exec(row.path) // perform a regex on the URL path to extract lib_id
          switchSwitch(pathToLib[0].split('=')[1], row) // see above
        }
        return {
          Name: `${row.first_name} ${row.last_name}`,
          Timestamp: moment(row.exe_time).format('YYYY-MM-DD HH:mm:ss'),
          Action:  actionType,
          Info: actionInfo
        }
      })
      // console.log(177, sheetNames)
      allSheetData.push(sheetData);
      let ws = XLSX.utils.json_to_sheet(allSheetData[x])
      if(!ws['!cols']) ws['!cols'] = [];
      ws['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 10 }, { wch: 100 }]; // setting the column widths of the XLSX files
      wb.Sheets[concatCompanies[x]] =  ws;
      if (progressCount === concatSandM.length){
        // XLSX.writeFile(wb, `Usage_Report_${moment(this.props.startDate).format('YYYY.MM.DD')}-${moment(this.props.endDate).format('YYYY.MM.DD')}.xlsx`);
      }
      // console.log(183, wb)
    }
  }
  render(){
    // console.log(this.props)
    return (
      <a onClick={(() => {
        (this.props.startDate < this.props.endDate)
          ? this.generateUseageTimelineReport()
          : exportTools.exportError('Please Select A Date Range To Export Usage Timeline.')})} className='download-links'>
          {`Usage Report Timeline ${moment(this.props.startDate).format('YYYY.MM.DD')}-${moment(this.props.endDate).format('YYYY.MM.DD')}`}
      </a>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    downloadProgress: state.downloadProgress
  };
}

const mapDispatchToProps = {
  resetDownload,
  updateDownload
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsageReportTimeline));
