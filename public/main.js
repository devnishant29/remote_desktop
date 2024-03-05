const {
  app,
  BrowserWindow,
  desktopCapturer,
  ipcMain,
  Menu,
} = require("electron");
const path = require("path");

let availablScreens;
let mainWindow;

const sendSelectedScreen = (item) => {
  mainWindow.webContents.send("SET_SOURCE_ID", item.id);
}

const createTray = () => {
  const screensMenu = availablScreens.map((item) => {
    return {
      label: item.name,
      click: () => {
        sendSelectedScreen(item)
      },
    };
  });
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [{ role: "quit" }],
    },
    {
      label: "Screens",
      submenu: screensMenu,
    },
  ]);
  Menu.setApplicationMenu(menu);
};

const createWindow = () => {
    mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("set-size", (event, size) => {
    const { width, height } = size;
    try {
      mainWindow.setSize(width, height, true);
    } catch (e) {
      console.log(e);
    }
  });

  mainWindow.loadURL("http://localhost:4000");

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.setPosition(0, 0);

    desktopCapturer.getSources({ types: ["screen"] }).then(async (sources) => {
      availablScreens = sources;
      createTray();
      // for (const source of sources) {
      //   console.log(source.name);
      //   if (source.name === "Entire screen") {
      //     mainWindow.webContents.send("SET_SOURCE_ID", source.id);
      //   }
      // }
    });
  });

  mainWindow.webContents.openDevTools();
};

app.on("ready", () => {
  createWindow();
});
