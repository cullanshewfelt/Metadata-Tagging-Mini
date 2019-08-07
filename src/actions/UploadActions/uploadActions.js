// ==============================================================================================================
//  UPLOAD ACTIONS
// ==============================================================================================================

export const uploadAudio = (files) => {
  // console.log(6, files)

  const formData = new FormData();

  files.map((file, i) => {
    formData.append(`file${i}`, file)
  });

  fetch(`https://react-metadata-beta.herokuapp.com/upload/proc_music/`, {
    method: 'POST',
    body: formData
  })
  .then(response => response)
  .then(json => {
    console.log(20, json)
  })
  .catch(error => console.log(error))
};

export const uploadMetadataBI = (files) => {
  // console.log(26, files);

  const formData = new FormData();

  files.map((file, i) => {
    formData.append(`file${i}`, file)
  });

  fetch(`https://react-metadata-beta.herokuapp.com/upload/bi/metadata/`, {
    method: 'POST',
    body: formData
  })
  .then(response => response)
  .then(json => {
    // console.log(40, json.status)
  })
  .catch(error => console.log(error))
}
