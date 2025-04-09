// arquivos de pré carregamento e reforço de segurança na comunicação entre processos (ipc)

const { contextBridge, ipcRenderer } = require("electron")


//importação dos recursos do framework electron
// contextBrigde - segurança - ipcrenderer - comunicação

//const {contextBridge, ipcRenderer} = require('electron')

// expor (autorizar a comunicação entre processos)
contextBridge.exposeInMainWorld('api',{
    clientWindow: ()=> ipcRenderer.send ('client-window'),
    osWindow: () => ipcRenderer.send('os-window')
}
)

function dbStatus(message){
    ipcRenderer.on('db-status', message)
}