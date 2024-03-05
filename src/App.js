import './App.css';
import { useRef } from 'react';

function App() {
  const videoRef = useRef();

  // window.electronAPI.sendScreenId((event, screenId) => {
  //   console.log("Renderer...", screenId);
  // })

  const handleStream = (stream) => {
    // let {width, height} = stream.getVideoTracks()[0].getSettings()
    // global.electronAPI.setSize({ width, height })



    videoRef.current.srcObject = stream
    videoRef.current.onloadedmetadata = (e) => videoRef.current.play()
  }

  const getStreem = async (screenId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: screenId,
          }
        }
      })

      handleStream(stream)
    }
    catch(e) {
      console.log(e);
    }
  }

  global.electronAPI.sendScreenId((event, screenId) => {
    console.log("Renderer...", screenId);
    getStreem(screenId)
  })

  return (
    <div className="App">
      <>
        <span>800 x 600</span>
        <video ref={videoRef} className='video'>video not available</video>
      </>
    </div>
  );
}

export default App;
