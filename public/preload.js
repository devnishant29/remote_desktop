const { ipcRenderer, contextBridge } = require('electron')
let screenId

// ipcRenderer.on('SET_SOURCE_ID', (event, sourceId) => {
//   console.log(sourceId);
//   screenId = sourceId;
// })

contextBridge.exposeInMainWorld('electronAPI', {
  setSize: (size) => ipcRenderer.send("set-size", size),
  sendScreenId: (callback) => ipcRenderer.on("SET_SOURCE_ID", callback)
}); 
