import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');

// ******************************************************************************************
//  SHEER RELEASE EXPORT FUNCTION
// ******************************************************************************************

//  *** seems finished. run through diff checker?

const SheerExport = (props) => {
  const { cuesLoading, downloadCompletedChecker, inclusive, releaseFilter, resetDownload,
         selectedCategories, selectedComposers, selectedLibrary, selectedStyles, updateDownload, tempos
       } = props;

  const [xlsData, setXlsData] = useState([]);
  const [newRowData, setRowData] = useState([]);
  const [progress, setProgress] = useState(0.00);

  useEffect(() => {
    let downloadLink = `DLM_${releaseFilter.label + "_"}SHEER_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.xls`;
    progress === 1
      ? exportTools.generateDownload(xlsData.join('\n'), downloadLink)
      : updateDownload(progress)
  }, [progress])

  useEffect(() => {
    (progress !== 1 && newRowData.length !== 0 && xlsData.indexOf(newRowData.join('\t')) === -1) && setXlsData([...xlsData, newRowData.join('\t')]);
  }, [progress, newRowData, xlsData])

   const sheerExport = () => {
     resetDownload();
     downloadCompletedChecker();
     let progressCount = 0;
     let headersRow = [
       'Song Title', 'ISWC Code',	'Composer 1 Name',	'Composer 1 CAE',	'Composer 1 Controlled',
       'Composer 1 Capacity',	'Composer 1 Share',	'Composer 2 Name',	'Composer 2 CAE',
       'Composer 2 Controlled',	'Composer 2 Capacity',	'Composer 2 Share',	'Composer 3 Name',
       'Composer 3 CAE',	'Composer 3 Controlled',	'Composer 3 Capacity',	'Composer 3 Share',
       'Composer 4 Name',	'Composer 4 CAE',	'Composer 4 Controlled',	'Composer 4 Capacity',
       'Composer 4 Share',	'Composer 5 Name',	'Composer 5 CAE No',	'Composer 5 Controlled',
       'Composer 5 Capacity',	'Composer 5 Share',	'Composer 6 Name',	'Composer 6 CAE No',
       'Composer 6 Controlled',	'Composer 6 Capacity',	'Composer 6 Share',
       'Composer 1 Linked Publisher',	'Composer 2 Linked Publisher',
       'Composer 3 Linked Publisher',	'Composer 4 Linked Publisher',
       'Composer 5 Linked Publisher',	'Composer 6 Linked Publisher',	'Publisher 1 Name',
       'Publisher 1 CAE',	'Publisher 1 Capacity',	'Publisher 1 Controlled',
       'Publisher 1 MO Share',	'Publisher 1 PO Share',	'Publisher 1 MC Share',
       'Publisher 1 PC Share',	'Publisher 1 Linked Publisher',	'Publisher 2 Name',
       'Publisher 2 CAE',	'Publisher 2 Capacity',	'Publisher 2 Controlled',
       'Publisher 2 MC Share',	'Publisher 2 PC Share',	'Date',	'Type',	'Territory 1 Name',
       'Genre',	'Artist (CWR)',	'Album Title (CWR)',	'Record Label (CWR)',	'Song Notes',
       'Client 1 name',	'Client 1 share',	'Client 2 name',	'Client 2 share',
       'Composer 7 Name',	'Composer 7 Controlled',	'Composer 7 Capacity',	'Composer 7 Share',
       'Composer 8 Name',	'Composer 8 Controlled',	'Composer 8 Capacity',	'Composer 8 Share',
       'Composer 9 Name',	'Composer 9 Controlled',	'Composer 9 Capacity',	'Composer 9 Share',
       'Composer 10 Name',	'Composer 10 Controlled',	'Composer 10 Capacity',
       'Composer 10 Share',	'Composer 6 Linked Publisher',	'Composer 7 Linked Publisher',
       'Composer 8 Linked Publisher',	'Composer 9 Linked Publisher',
       'Composer 10 Linked Publisher',	'Publisher 3 Name',	'Publisher 3 Capacity',
       'Publisher 3 Controlled', 'Publisher 3 MO Share',	'Publisher 3 PO Share',
       'Publisher 3 MC Share', 'Publisher 3 PC Share'
      ];
      setXlsData([headersRow.join('\t')]);
      let releasesArray = isNaN(releaseFilter.value) && releaseFilter.value.includes('-') ? releaseFilter.value.split('-') : [];
      let filteredLibrary = selectedLibrary.library.filter(cue =>
        releasesArray.length !== 0
          ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0]
          : null
        )
      exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      // --------------------------------------------------------------------------------------------------
        let composerArray = selectedComposers.filter(composer =>
          composer.cue_id === row.cue_id).sort((a, b) =>
            b.composer_split - a.composer_split);
        // --------------------------------------------------------------------------------------------------
        //  these functions seperate publishers and add their splits up
        let pubMergeArray = [];

        Array.prototype.inArray = function(comparer) {
          for(var i=0; i < pubMergeArray.length; i++) {
            if(comparer(pubMergeArray[i])) return true;
          }
          return false;
        };

        Array.prototype.pushIfNotExist = function(element, comparer) {
          if (!pubMergeArray.inArray(comparer)) {
            pubMergeArray.push(element);
          } else {
            pubMergeArray.filter(pub =>
              pub.publisher_name === element.publisher_name).map(x =>
                x.composer_split += element.composer_split
            )
          }
        };

        composerArray.forEach((composer, i) => {
          let newPub = {publisher_name: composer.publisher_name.split(' (')[0], composer_split: composer.composer_split, ipi: composer.ipi, pro_name: composer.pro_name}
          pubMergeArray.pushIfNotExist(newPub, (c) => {
            return c.publisher_name === newPub.publisher_name;
          });
        })

    // --------------------------------------------------------------------------------------------------
        let newRow = [
          // Song Title
          row.cue_title,
          // ISWC Code
          `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
          // Composer 1 Name
          `${composerArray[0].first}${composerArray[0].middle ? " " + composerArray[0].middle : ''} ${composerArray[0].last}`,
          // Composer 1 CAE
          composerArray[0].cae,
          // Composer 1 Controlled
          composerArray[0] ? 'Y' : '',
          // Composer 1 Capacity
          isPublicDomain(row) ? 'AR' : 'CA',
          // Composer 1 Share
          composerArray[0].composer_split,
          // Composer 2 Name
          composerArray[1]
            ? `${composerArray[1].first}${composerArray[1].middle ? " " + composerArray[1].middle : ''} ${composerArray[1].last}`
            : '',
          // Composer 2 CAE
          composerArray[1] ? composerArray[1].cae : '',
          // Composer 2 Controlled
          composerArray[1] ? 'Y' : '',
          // Composer 2 Capacity
          composerArray[1] ? isPublicDomain(row) ? 'AR' : 'CA' : '',
          // Composer 2 Share
          composerArray[1] ? composerArray[1].composer_split : '',
          // Composer 3 Name
          composerArray[2]
            ? `${composerArray[2].first}${composerArray[2].middle ? " " + composerArray[2].middle : ''} ${composerArray[2].last}`
            : '',
          // Composer 3 CAE
          composerArray[2] ? composerArray[2].cae : '',
          // Composer 3 Controlled
          composerArray[2] ? 'Y' : '',
          // Composer 3 Capacity
          composerArray[2] ? isPublicDomain(row) ? 'AR' : 'CA' : '',
          // Composer 3 Share
          composerArray[2] ? composerArray[2].composer_split : '',
          // Composer 4 Name
          composerArray[3]
            ? `${composerArray[3].first}${composerArray[3].middle ? " " + composerArray[3].middle : ''} ${composerArray[3].last}`
            : '',
          // Composer 4 CAE
          composerArray[3] ? composerArray[3].cae : '',
          // Composer 4 Controlled
          composerArray[3] ? 'Y' : '',
          // Composer 4 Capacity
          composerArray[3] ? isPublicDomain(row) ? 'AR' : 'CA' : '',
          // Composer 4 Share
          composerArray[3] ? composerArray[3].composer_split : '',
          // Composer 5 Name
          composerArray[4]
            ? `${composerArray[4].first}${composerArray[4].middle ? " " + composerArray[4].middle : ''} ${composerArray[4].last}`
            : '',
          // Composer 5 CAE No
          composerArray[4] ? composerArray[4].cae : '',
          // Composer 5 Controlled
          composerArray[4] ? 'Y' : '',
          // Composer 5 Capacity
          composerArray[4] ? isPublicDomain(row) ? 'AR' : 'CA' : '',
          // Composer 5 Share
          composerArray[4] ? composerArray[4].composer_split : '',
          // Composer 6 Name
          composerArray[5]
            ? `${composerArray[5].first}${composerArray[5].middle ? " " + composerArray[5].middle : ''} ${composerArray[5].last}`
            : '',
          // Composer 6 CAE No
          composerArray[5] ? composerArray[5].cae : '',
          // Composer 6 Controlled
          composerArray[5] ? 'Y' : '',
          // Composer 6 Capacity
          composerArray[5] ? isPublicDomain(row) ? 'AR' : 'CA' : '',
          // Composer 6 Share
          composerArray[5] ? composerArray[5].composer_split : '',
          // Composer 1 Linked Publisher
          composerArray[0].publisher_name,
          // Composer 2 Linked Publisher
          composerArray[1] ? composerArray[1].publisher_name : '',
          // Composer 3 Linked Publisher
          composerArray[2] ? composerArray[2].publisher_name : '',
          // Composer 4 Linked Publisher
          composerArray[3] ? composerArray[3].publisher_name : '',
          // Composer 5 Linked Publisher
          composerArray[4] ? composerArray[4].publisher_name : '',
          // Composer 6 Linked Publisher
          composerArray[5] ? composerArray[5].publisher_name : '',
          // Publisher 1 Name
          pubMergeArray[0].publisher_name,
          // Publisher 1 CAE
          pubMergeArray[0].ipi,
          // Publisher 1 Capacity
          pubMergeArray[0] ? 'E' : '',
          // Publisher 1 Controlled
          pubMergeArray[0] ? 'Y' : '',
          // Publisher 1 MO Share
          pubMergeArray[0].composer_split,
          // Publisher 1 PO Share
          pubMergeArray[0].composer_split/2,
          // Publisher 1 MC Share
          pubMergeArray[0].composer_split,
          // Publisher 1 PC Share
          pubMergeArray[0].composer_split/2,
          // Publisher 1 Linked Publisher
          '',
          // Publisher 2 Name
          pubMergeArray[1] ? pubMergeArray[1].publisher_name : '',
          // Publisher 2 CAE
          pubMergeArray[1] ? pubMergeArray[1].ipi : '',
          // Publisher 2 Capacity
          pubMergeArray[1] ? 'E' : '',
          // Publisher 2 Controlled
          pubMergeArray[1] ? 'Y' : '',
          // Publisher 2 MC Share
          pubMergeArray[1] ? pubMergeArray[1].composer_split : '',
          // Publisher 2 PC Share
          pubMergeArray[0].composer_split/2,
          // Date
          moment(row.cue_reldate_h).format('YYYY-MM-DD HH:mm:ss'),
          // Type
          '',
          // Territory 1 Name
          '',
          // Genre
          '',
          // Artist (CWR)
          '',
          // Album Title (CWR)
          '',
          // Record Label (CWR)
          '',
          // Song Notes
          '',
          // Client 1 name
          '',
          // Client 1 share
          '',
          // Client 2 name
          '',
          // Client 2 share
          '',
          // Composer 7 Name
          '',
          // Composer 7 Controlled
          '',
          // Composer 7 Capacity
          '',
          // Composer 7 Share
          '',
          // Composer 8 Name
          '',
          // Composer 8 Controlled
          '',
          // Composer 8 Capacity
          '',
          // Composer 8 Share
          '',
          // Composer 9 Name
          '',
          // Composer 9 Controlled
          '',
          // Composer 9 Capacity
          '',
          // Composer 9 Share
          '',
          // Composer 10 Name
          '',
          // Composer 10 Controlled
          '',
          // Composer 10 Capacity
          '',
          // Composer 10 Share
          '',
          // Composer 6 Linked Publisher
          '',
          // Composer 7 Linked Publisher
          '',
          // Composer 8 Linked Publisher
          '',
          // Composer 9 Linked Publisher
          '',
          // Composer 10 Linked Publisher
          '',
          // Publisher 3 Name
          pubMergeArray[2] ? pubMergeArray[2].publisher_name : '',
          // Publisher 3 CAE
          pubMergeArray[2] ? pubMergeArray[2].ipi : '',
          // Publisher 3 Capacity
          pubMergeArray[2] ? 'E' : '',
          // Publisher 3 Controlled
          pubMergeArray[2] ? 'Y' : '',
          // Publisher 3 MO Share
          pubMergeArray[2] ? pubMergeArray[2].composer_split : '',
          // Publisher 3 PO Share
          pubMergeArray[2] ? pubMergeArray[2].composer_split/2 : '',
          // Publisher 3 MC Share
          pubMergeArray[2] ? pubMergeArray[2].composer_split : '',
          // Publisher 3 PC Share
          pubMergeArray[2] ? pubMergeArray[2].composer_split/2 : ''
        ]
        progressCount ++;
        let progress = (progressCount/filteredLibrary.length)
        setRowData(newRow);
        setProgress(progress);
      }, () => { // inProgress()
        // updateDownload(progress)
      },
      () => { // done()
        updateDownload(1)
        downloadCompletedChecker();
      })
    }

  const isPublicDomain = (row) => {
    if (row.style_id === 51 || row.style_id === 52 || row.cue_title.includes(' Arr ' || ' Arr. ')) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <a onClick={(() =>
      releaseFilter === 147 || cuesLoading
        ? exportTools.exportError()
        : !releaseFilter.value.toString().includes('-')
        ? exportTools.exportError('We Typically Only Send Sheer Releases. Please Select A Release.')
        :  selectedLibrary.libraryName === 'independent-artists'
        ? exportTools.exportError('We Don\'t Send Our Independent Artists Catalog To Sheer')
        : inclusive || releaseFilter.label === 'All'
          ? exportTools.exportError('We Typically Only Send Sheer One Release At A Time. Please Unselect Inclusive.')
          : sheerExport())
    } className={
      inclusive || cuesLoading
        ? 'strikethrough'
        : (releaseFilter.value
        && typeof releaseFilter.value === 'string')
        && releaseFilter.label !== 'All'
        ? 'download-links'
        : 'strikethrough'
      }>
      {`Sheer Release Export ${
        (releaseFilter.value
        && typeof releaseFilter.value === 'string')
        && releaseFilter.label !== 'All'
        ? releaseFilter.label
        : ''
      }`
    }
    </a>
  );
}

const mapStateToProps = (state) => ({
  batchesBI: state.batchesBI,
  downloadProgress: state.downloadProgress,
  selectedCategories: state.selectedCategories,
  selectedComposers: state.selectedComposers,
  selectedLibrary: state.selectedLibrary,
  selectedStyles: state.selectedStyles,
  tempos: state.tempos
});

const mapDispatchToProps = {
  resetDownload,
  updateDownload
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SheerExport));
