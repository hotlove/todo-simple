// import { ipcRenderer } from 'electron'
// (window as any).ipcRenderer = ipcRenderer
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
	ipcRenderer,
});