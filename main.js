
console.log("Processo principal")


const { app, BrowserWindow, nativeTheme, Menu, ipcMain } = require('electron')
// esta linha esta relacionada ao preload.js
const path = require('node:path')

///////////////////////////////////////////

// Importação dos modulos de conectar e desconectar (modulo de conexão)
//const {conectar, desconecatar} = require('./database.js')


    //Importação do Schema clientes da chamada model
   // const clientModel = require ('/src/models/cliente.js')
   // const {title} = require ('node:process')
   // const {jspdf, default: jsPDF} = require('jspdf')
    
    //importação da biblioteca fs (nativa js) p manipulção de arquivos (no caso, uso dp pdf)
    
   // const fs = require('fs')

///////////////////////////////////////////////////////////////////////////
// Janela principal
let win
const createWindow = () => {
    // a linha abaixo define o tema (claro ou escuro)
    nativeTheme.themeSource = 'dark' //(dark ou light)
    win = new BrowserWindow({
        width: 800,
        height: 600,
        //autoHideMenuBar: true,
        //minimizable: false,
        resizable: false,
        // ativar o preload,js
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
    // recebimento dos pedidos do renderizador para abertura das janelas
    ipcMain.on('client-window', () => {
        clientWindow()
    })
    ipcMain.on('os-window', () =>{
        osWindow()
    })
}

// Janela sobre
function aboutWindow() {
    nativeTheme.themeSource = 'dark'
    // a linha abaixo obtém a janela principal
    const main = BrowserWindow.getFocusedWindow()
    let about
    // Estabelecer uma relação hierárquica entre janelas
    if (main) {
        // Criar a janela sobre
        about = new BrowserWindow({
            width: 360,
            height: 220,
            autoHideMenuBar: true,
            resizable: false,
            minimizable: false,
            parent: main,
            modal: true
        })
    }
    //carregar o documento html na janela
    about.loadFile('./src/views/sobre.html')
    os.center()
}

// Janela clientes
let client
function clientWindow() {
    nativeTheme.themeSource = 'dark'
    const main = BrowserWindow.getFocusedWindow()
    if(main) {
        client = new BrowserWindow({
            width: 1010,
            height: 680,
            //autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true
        })
    }
    client.loadFile('./src/views/cliente.html')   
    client.center()
}

// Janela OS
let os
function osWindow() {
    nativeTheme.themeSource = 'dark'
    const main = BrowserWindow.getFocusedWindow()
    if(main) {
        os = new BrowserWindow({
<<<<<<< HEAD
            width: 900,
            height: 900,
=======
            width: 850,
            height: 850,
>>>>>>> ea2f6834c28627e5e127ca33bff26746949cd3be
           // autoHideMenuBar: true,
            resizable: false,
            parent: main,
            modal: true
        })
    }
    os.loadFile('./src/views/os.html')   
}

// Iniciar a aplicação
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//reduzir logs não críticos
app.commandLine.appendSwitch('log-level', '3')

// template do menu
const template = [
    {
        label: 'Cadastro',
        submenu: [
            {
                label: 'Clientes',
                click: () => clientWindow()
            },
            {
                label: 'OS',
                click: () => osWindow()
            },
            {
                type: 'separator'
            },
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    
    },
    {
        label: 'Relatórios',
        submenu: [
            {
                label: 'Clientes'
            },
            {
                label: 'OS abertas'
            },
            {
                label: 'OS concluídas'
            }
        ]
    },
    {
        label: 'Ferramentas',
        submenu: [
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            },
            {
                type: 'separator'
            },
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas do desenvolvedor',
                role: 'toggleDevTools'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]

