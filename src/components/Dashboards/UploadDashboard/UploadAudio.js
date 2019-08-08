import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { uploadAudio } from "../../../actions/UploadActions/uploadActions";

const UploadAudio = (props) => {
  document.title = "DL Music | Audio Upload | ";
  const { uploadAudio } = props;
  const [files, setFiles] = useState([]);
  const [limitTo, setLimit] = useState(15);

  const loadMore = () => {
    setLimit(limitTo + 15);
  };

  const onDrop = useCallback(acceptedFiles => {
    console.log(14, acceptedFiles);
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive} = useDropzone({onDrop: onDrop, accept: "audio/*"});

  const removeFile = (event) => {
    let x = [...files];
    x.splice(event.target.value, 1);
    setFiles(x);
  };

  const onSubmit = () => {
    uploadAudio(files);
  };

  const totalUploadSize = [...files].reduce((acc, curr) => {
    return acc += curr.size;
  }, 0);

  const fileList = [...files].map((file, i) => (
    <div
      key={i}
      className='file-upload'
    >
      <button
        id={i}
        value={i}
        onClick={(e) => removeFile(e)}
      >x
      </button>
      {file.path} -  {file.size/1000 < 1000 ? (file.size/1000).toFixed(2) : (file.size/1000000).toFixed(2)} {file.size/1000 < 1000 ? "KB" : "MB"}
    </div>
  ));

  for(let x = 0; x < 5; x++){
    fileList.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>);
  }

  return (
    <div className='dashboard'>
      <div {...getRootProps({className: "dropzone-area"})}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the audio files here ...</p> :
            <p>Drag 'n' drop some audio files here, or click to select songs</p>
        }
      </div>
      {files.length > 0 ?
        <button onClick={onSubmit} style={{float: "right"}}>Submit</button> :
        null
      }
      <aside>
        <h4>Total Size - {totalUploadSize/1000 < 1000 ? (totalUploadSize/1000).toFixed(2) : (totalUploadSize/1000000).toFixed(2)} {totalUploadSize/1000 < 1000 ? "KB" : "MB"}</h4>
        <InfiniteScroll
          className='scrollableDiv'
          dataLength={limitTo}
          hasMore={true}
          height={520}
          id='scrollableDiv'
          next={loadMore}
          endMessage={
            <p style={{textAlign: "center"}}>
              <b></b>
            </p>}
        >
          {fileList}
        </InfiniteScroll>
      </aside>
    </div>

  );
};

const mapStateToProps = (state) => ({
  selectedLibrary: state.selectedLibrary
});

const mapDispatchToProps = {
  uploadAudio
};


export default connect(mapStateToProps, mapDispatchToProps)(UploadAudio);
