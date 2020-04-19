import React from 'react';

import Dropzone from 'react-dropzone'
import { NXRecoveryKeyContext, NXRecoveryKeyClient } from '../../contexts/NXRecoveryKeyContext';

class GetStartedLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadError: false
    }
  }

  async processAcceptedFiles (acceptedFiles) {
    this.setState({loading: true});
    let loadError = false;
    let attemptLoad = false;
    if( acceptedFiles.length > 1 ) {
      loadError = 'Please only attempt to load 1 file.';
    } else if( acceptedFiles.length === 1 ) {
      let attemptFile = acceptedFiles[0];
      let fileType = attemptFile.type;
      if( fileType === "text/plain" ) {
        attemptLoad = await this.readAcceptedFile(attemptFile);
      } else {
        loadError = "This file type is not valid";
      }
    }
    this.setState({loading: false, loadError: loadError});
  }

  readAcceptedFile(file) {
    const fileReader = new FileReader();
    fileReader.onload = (result) => {
      this.onloadAcceptedFile(result.currentTarget.result);
    };

    fileReader.readAsText(file);
  }

  onloadAcceptedFile(result) {
    console.log(result);
  }

  render () {
    let loadErrorClass = "LoadError";
    let loadError;

    if( this.state.loadError !== false ) {
      loadErrorClass = "LoadError vis";
      loadError = this.state.loadError;
    }

    let dropzoneClass = "dropzone";
    if( this.state.loading ) {
      dropzoneClass = "dropzone disabled";
    }

    return (
      <div className="cont get-started get-started-load">
        <h2>Load your Recovery Key</h2>
        <span className="desc">If you have got a NXSwap Recovery Key, you can load it below!</span>
        <div className={loadErrorClass}>{loadError}</div>
        <div className={dropzoneClass}>
        <Dropzone accept="text/plain" onDrop={acceptedFiles => this.processAcceptedFiles(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()} className="dropzonecont">
                <input {...getInputProps()} />
                <p>Drag and Drop It Here<br />Or Click Here to Select It</p>
              </div>
            </section>
          )}
        </Dropzone>
        <span className="manually" >Or click here to enter it manually</span>
        </div>
      </div>
    );
  }
}

/*function GetStartedLoad(props) {
  let loadError = false;
  console.log(props);

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    if( acceptedFiles.length === 0 ) return false;
    if( acceptedFiles.length === 1 ) {
      loadError = true;
      return false;
    }

    for( let file of acceptedFiles ) {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        console.log(this.result);
      };

    fileReader.readAsText(file);
      //console.log(file);
    }

  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({onDrop: onDrop});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);

  console.log(loadError)

  return (
    <div className="cont get-started get-started-load">
      <h2>Load your Recovery Key</h2>
      <span className="desc">If you have got a NXSwap Recovery Key, you can load it below!</span>
      <div className="LoadError">error</div>
      <div className="dropzone">
        <div {...getRootProps({style})} className="dropzonecont">
          <input {...getInputProps()} />
          <p>Drag and Drop It Here<br />Or Click Here to Select It</p>
        </div>
      </div>
      <span className="manually" >Or click here to enter it manually</span>
    </div>
  );
}

const baseStyle = {
  
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};
*/

GetStartedLoad.contextType = NXRecoveryKeyContext;
export default GetStartedLoad;