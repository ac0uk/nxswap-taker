import React from 'react';

import Dropzone from 'react-dropzone'
import { NXRecoveryKeyContext, NXRecoveryKeyClient } from '../../contexts/NXRecoveryKeyContext';

class GetStartedLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      manualLoad: false,
      loadError: false
    }

    this.toggleEnterManually = this.toggleEnterManually.bind(this);
    this.manualLoadOnChange = this.manualLoadOnChange.bind(this);
  }

  async processAcceptedFiles (acceptedFiles) {
    this.setState({loading: true});
    let loadError = false;
    let loadedRecoveryKey = false;
    if( acceptedFiles.length > 1 ) {
      loadError = 'Please only attempt to load 1 file.';
    } else if( acceptedFiles.length === 1 ) {
      let attemptFile = acceptedFiles[0];
      let fileType = attemptFile.type;
      if( fileType === "text/plain" ) {
        let attemptRead = await this.readAcceptedFile(attemptFile);
        if( attemptRead !== false && attemptRead !== undefined && attemptRead.length > 0 ) {
          // Attempt to load recovery key..
          let validateRecoveryKey = NXRecoveryKeyClient.validateEncryptedRecoveryKey(attemptRead);
          if( ! validateRecoveryKey ) {
            loadError = 'This is not a valid Recovery Key';
          } else {
            // Good..save it..
            let saveRecoveryKey = await NXRecoveryKeyClient.saveEncryptedRecoveryKeyBrowser(attemptRead);
            if( ! saveRecoveryKey ) {
              loadError = 'Failed to load recovery key to local storage.';
            } else {
              // good.
              loadedRecoveryKey = true;
            }
          }
        } else {
          loadError = 'Unable to load file';
        }
      } else {
        loadError = "This file type is not valid";
      }
    }

    if( loadedRecoveryKey ) {
      return false;
    }

    this.setState({loading: false, loadError: loadError});
  }

  async readAcceptedFile(file) {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        resolve(this.result);
      };
      fileReader.readAsText(file);
    });
  }

  toggleEnterManually () {
    this.setState({
      manualLoad: this.state.manualLoad ? false : true
    });
  }

  async manualLoadOnChange (event) {
    let recoveryKey = event.target.value;
    let loadError = false;
    let loadedRecoveryKey = false;
    
    if( recoveryKey !== undefined && recoveryKey !== null && recoveryKey.length > 0 ) {
      // Attempt to validate it..
      let validateRecoveryKey = NXRecoveryKeyClient.validateEncryptedRecoveryKey(recoveryKey);
      if( ! validateRecoveryKey ) {
        loadError = 'This is not a valid Recovery Key';
      } else {
        // Good..save it..
        let saveRecoveryKey = await NXRecoveryKeyClient.saveEncryptedRecoveryKeyBrowser(recoveryKey);
        if( ! saveRecoveryKey ) {
          loadError = 'Failed to load recovery key to local storage.';
        } else {
          // good.
          loadedRecoveryKey = true;
        }
      }
    }

    if( loadedRecoveryKey ) {
      return false;
    }

    this.setState({
      loading: false, loadError: loadError
    })
  }

  renderDropzone () {
    let loadErrorClass = "Error";
    let loadError;

    if( this.state.loadError !== false ) {
      loadErrorClass = "Error vis";
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
        <span className="manually" onClick={this.toggleEnterManually}>Or click here to enter it manually</span>
        </div>
      </div>
    );
  }

  renderManual () {
    let loadErrorClass = "LoadError";
    let loadError;

    if( this.state.loadError !== false ) {
      loadErrorClass = "LoadError vis";
      loadError = this.state.loadError;
    }

    return (
      <div className="cont get-started get-started-load">
        <h2>Load your Recovery Key</h2>
        <span className="desc">If you have got a NXSwap Recovery Key, you can load it below!</span>
        <div className={loadErrorClass}>{loadError}</div>
        <div className="manualLoad">
          <textarea onChange={this.manualLoadOnChange} placeholder="Paste your Recovery Key here"></textarea>
        
        
        <span className="manually" onClick={this.toggleEnterManually}>Or click here to upload it</span>
        </div>
      </div>
    )
  }

  render () {
    if( this.state.manualLoad ) {
      return this.renderManual();
    } else {
      return this.renderDropzone();
    }
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