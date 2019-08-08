import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import Select from 'react-select';
import { handleToggleModal } from '../../../actions/modalActions';
import Loader from '../../SubComponents/Loader/Loader';
import { uploadMetadataBI } from '../../../actions/UploadActions/uploadActions';

const UploadMetadata = (props) => {
  document.title = 'DL Music | Metadata Upload | ';
  const { uploadMetadataBI } = props;
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    setFiles(acceptedFiles)
  }, []);

  const { getRootProps, getInputProps, isDragActive} = useDropzone({onDrop: onDrop, accept: 'text/plain,'})

  const removeFile = (index) => {
    let x = [...files];
    x.splice(index, 1)
    setFiles(x);
  }

  const onSubmit = () => {
    uploadMetadataBI(files)
  }

  const totalUploadSize = [...files].reduce((acc, curr) => {
    return acc += curr.size
  }, 0)

  // console.log(totalUploadSize)

  const fileList = [...files].map((file, i) => (
    <li
      key={i}
      className='file-upload'
    >
      {file.path} -  {file.size/1000 < 1000 ? (file.size/1000).toFixed(2) : (file.size/1000000).toFixed(2)} {file.size/1000 < 1000 ? 'KB' : 'MB'}
      <button
        id={i}
        value={i}
        style={{position: 'absolute', right: 0, marginRight: '20px'}}
        onClick={() => removeFile(i)}
      >x
      </button>
    </li>
  ))

  return (
    <div className='dashboard'>
      <div className='dropzone-area' {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the metadata here ...</p> :
            <p>Drag 'n' drop the iTunes metadata text file here</p>
        }
      </div>
      {files.length > 0 ?
        <button onClick={onSubmit} style={{float: 'right'}}>Submit</button> :
        null
      }
      <aside>
        <h4>Total Size - {totalUploadSize/1000 < 1000 ? (totalUploadSize/1000).toFixed(2) : (totalUploadSize/1000000).toFixed(2)} {totalUploadSize/1000 < 1000 ? 'KB' : 'MB'}</h4>
        <ul>{fileList}</ul>
      </aside>
    </div>
  )
}

const mapStateToProps = (state) => ({
   selectedLibrary: state.selectedLibrary
})

const mapDispatchToProps = {
  uploadMetadataBI
}


export default connect(mapStateToProps, mapDispatchToProps)(UploadMetadata);
