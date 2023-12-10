// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("API", {
  receive: (channel, func) => {
    const validChannels = ["rename-files-reply"];

    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },

  setTitle: (t) => {
    ipcRenderer.send("get-title", t);
  },
});
