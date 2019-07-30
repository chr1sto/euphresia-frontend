"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var request = require("request");
var fs = require("fs");
var zlib = require("zlib");
var readline = require("readline");
var child_process = require("child_process");
var win, serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });
var configEntries = null;
var serverRoot = 'https://patch.euphresia-flyff.com/patch2/';
var localClientPath = process.env.PORTABLE_EXECUTABLE_DIR + '\\'; //'E:\\Flyff\\Euphresia FlyFF - Beta\\'//
var tempExecPath = path.join(localClientPath + 'binary\\Euphresia.exe');
var appdata = path.join(process.env.LOCALAPPDATA, 'Euphresia\\Flyff\\');
var iniPath = path.join(appdata, 'Euphresia.ini');
var patchConfigPath = path.join(appdata, 'EuphresiaLauncher.ini');
var selectedAccountId = null;
var token = null;
var fileList;
var runningClients = [];
function createWindow() {
    var electronScreen = electron_1.screen;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: 1024,
        height: 576,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        transparent: true,
        icon: path.join(__dirname, 'dist\\assets\\logo.png')
    });
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron")
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    if (serve) {
        win.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
    mkDirByPathSync(appdata);
    electron_1.ipcMain.on('check-for-updates', function (event, arg) {
        downloadGzipFileTo(serverRoot + 'list.txt.gz', appdata + 'list.txt', function () {
            event.sender.send('status-update', 'Checking for updates...');
            processPatchList(appdata + 'list.txt', function () {
                if (fileList.length > 0) {
                    event.sender.send('patch-available', 'New Patch avalaible!');
                }
                else {
                    event.sender.send('up-to-date', 'Up to date!');
                }
            }, function (error) { return console.log('err' + error); });
        }, function () { return console.log('error'); });
    });
    electron_1.ipcMain.on('start-download-process', function (event, arg) {
        var currentFile = 0;
        event.sender.send('status-update', 'Retrieving Patchlist...');
        downloadGzipFileTo(serverRoot + 'list.txt.gz', appdata + 'list.txt', function () {
            event.sender.send('status-update', 'Processing Patchlist...');
            processPatchList(appdata + 'list.txt', function () {
                if (fileList.length == 0) {
                    event.sender.send('up-to-date', 'Up to date!');
                }
                else {
                    event.sender.send('file-count', fileList.length);
                    event.sender.send('status-update', 'Applying Patches...');
                    downloadFiles(function (i) { return event.sender.send('update-progress', ++currentFile); }, function () { return console.log('fin'); }, //event.sender.send('status-update','Finished'),
                    function () {
                        ++currentFile;
                        if (currentFile == fileList.length || currentFile % 10)
                            event.sender.send('update-progress', currentFile);
                        event.sender.send('status-update', 'ERROR');
                    });
                }
            }, function (error) { return console.log(error); });
        }, function () { return console.log('error'); });
    });
    electron_1.ipcMain.on('start-game', function (event, arg) {
        if (arg) {
            var id = arg.replace('-', '');
            var params = ['127.0.0.1', id, currToken];
            console.log(params.join('\n'));
            var process = child_process.spawn(tempExecPath, params, { detached: true, stdio: ['ignore', 'ignore', 'ignore'], cwd: localClientPath }); //.unref();
            runningClients.push({ account: id, process: process });
            event.sender.send('update-client-list', runningClients);
            process.on('close', function (code, signal) {
                for (var i = 0; i < runningClients.length; i++) {
                    if (runningClients[i].id == id) {
                        runningClients.splice(i, 1);
                    }
                }
                event.sender.send('update-client-list', runningClients);
            });
        }
    });
    electron_1.ipcMain.on('token', function (event, arg) {
        currToken = arg;
        var filter = { urls: ["http://*/*", "https://*/*"] };
        electron_1.session.defaultSession.webRequest.onBeforeSendHeaders(filter, setToken);
    });
    electron_1.ipcMain.on('config-get', function (event, arg) {
        console.log('????');
        if (!configEntries) {
            console.log('in');
            loadIni(function () {
                event.sender.send('config', configEntries);
            });
        }
        else {
            event.sender.send('config', configEntries);
        }
    });
    electron_1.ipcMain.on('config-post', function (event, args) {
        configEntries = args;
        console.log(args);
        writeIni();
    });
    electron_1.ipcMain.on('select-account', function (event, args) {
        selectedAccountId = args;
    });
    electron_1.ipcMain.on('open-web', function (event, args) {
        child_process.execSync('start ' + args);
    });
    process.on('uncaughtException', function (error) {
        if (error.message.includes('ECONNRESET')) {
            notifyError('Unable to connect to patch Server.\n This is either due to a bad connection to our services or to many people patching at the same time.\n Try restarting the Launcher in a few Minutes.');
        }
        else {
            notifyError('UNCAUGHT EXCEPTION\nContact the Euphresia Staff if this error persists!\n\n' + error.message);
        }
    });
}
var notifyError = function (message) { return win.webContents.send('errorMessage', message); };
var currToken;
var setToken = function (details, callback) {
    if (currToken) {
        details.requestHeaders['Authorization'] = "Bearer " + currToken;
    }
    callback({ cancel: false, requestHeaders: details.requestHeaders });
};
var loadIni = function (callback) {
    //LOAD NEUZ options
    fs.exists(iniPath, function (exists) {
        console.log(exists);
        if (exists) {
            var inp = fs.createReadStream(iniPath);
            inp.on('error', function () { return notifyError('Error while accessing ' + iniPath + '.\n'); });
            var rl = readline.createInterface({
                input: inp,
                output: process.stdout,
                terminal: false
            });
            var entries_1 = [];
            rl.on('line', function (line) {
                var params = line.split(' ');
                if (params.length > 0) {
                    switch (params[0].toUpperCase()) {
                        case 'RESOLUTION':
                            entries_1.push({ key: 'resolution', value: params[1] + 'x' + params[2] });
                            break;
                        case '//':
                            break;
                        default:
                            var name = params.shift();
                            entries_1.push({ key: name, value: params.join(' ') });
                            break;
                    }
                }
            });
            rl.on('close', function () {
                configEntries = entries_1;
                loadLauncherConfig(callback);
            });
        }
        else {
            var entries = [
                {
                    key: 'resolution',
                    value: '1024x768'
                },
                {
                    key: 'fullscreen',
                    value: '0'
                },
                {
                    key: 'interversion',
                    value: '0'
                },
                {
                    key: 'fovincrease',
                    value: '0'
                },
                {
                    key: 'anisotrophy',
                    value: '0'
                },
                {
                    key: 'ntask',
                    value: '0'
                },
                {
                    key: 'multisample',
                    value: '0'
                }
            ];
            configEntries = entries;
            loadLauncherConfig(callback);
        }
    });
};
var loadLauncherConfig = function (callback) {
    //load launcher options
    fs.exists(patchConfigPath, function (exists) {
        if (exists) {
            var count_1 = 0;
            var inp = fs.createReadStream(patchConfigPath);
            inp.on('error', function () { return notifyError('Error while accessing ' + patchConfigPath + '.\n'); });
            var rl = readline.createInterface({
                input: inp,
                output: process.stdout,
                terminal: false
            });
            rl.on('line', function (line) {
                var params = line.split(' ');
                if (params.length > 1) {
                    var name = params.shift();
                    configEntries.push({ key: name, value: params.join(' ') });
                    count_1++;
                }
            });
            rl.on('close', function () {
                if (count_1 == 0) {
                    configEntries.push({ key: 'autoupdate', value: '1' });
                    callback();
                }
            });
        }
        else {
            configEntries.push({ key: 'autoupdate', value: '1' });
            callback();
        }
    });
};
var writeIni = function () {
    var iniContent = "// Options\r\n";
    var launcherIniContent = "";
    for (var i = 0; i < configEntries.length; i++) {
        var obj = configEntries[i];
        switch (obj.key.toUpperCase()) {
            case 'RESOLUTION':
                iniContent += "resolution " + obj.value.replace('x', ' ') + '\r\n';
                break;
            case 'AUTOUPDATE':
                launcherIniContent += "autoupdate " + obj.value + '\r\n';
                break;
            default:
                iniContent += obj.key + ' ' + obj.value + '\r\n';
                break;
        }
    }
    console.log(iniContent);
    fs.writeFile(iniPath, iniContent, function (err) {
        if (err)
            notifyError('Error while updating ' + iniPath + '.\n\n' + err);
    });
    fs.writeFile(patchConfigPath, launcherIniContent, function (err) {
        if (err)
            notifyError('Error while updating ' + patchConfigPath + '.\n\n' + err);
    });
};
var downloadFiles = function (updateFileCount, onSuccess, onError) {
    var index = 0;
    try {
        dlSingle(index, updateFileCount, onSuccess);
    }
    catch (_a) {
        onError();
    }
    onSuccess();
};
var dlSingle = function (index, updateFileCount, onSuccess) {
    var file = fileList[index];
    var url1 = serverRoot + file.replace('\\', '/') + '.gz';
    var error = false;
    downloadGzipFileTo(url1, localClientPath + file, function () {
        updateFileCount(1);
        if (index + 1 < fileList.length && !error)
            dlSingle(index + 1, updateFileCount, onSuccess);
        else
            onSuccess();
    }, function (err) {
        notifyError(err);
        updateFileCount();
        error = true;
    });
};
var processPatchList = function (path, onFinished, onError) {
    var rl = readline.createInterface({
        input: fs.createReadStream(path),
        output: process.stdout,
        terminal: false
    });
    fileList = new Array();
    var folder = '';
    rl.on('line', function (line) {
        if (line[0] === 'v') {
            //handle patcher update.
        }
        else if (line[0] == 'd') {
            folder = line.substring(2);
        }
        else if (line[0] == 'f') {
            var cols = line.split(' ');
            var date = new Date(parseInt(cols[1]));
            var file = cols[3];
            var size = parseInt(cols[2]);
            var fileNotFound = false;
            var exSize;
            var exDate;
            try {
                var path = localClientPath + folder + '\\' + file;
                if (fs.existsSync(path)) {
                    var fileInfo = fs.statSync(path);
                    exSize = fileInfo.size;
                    exDate = fileInfo.mtime;
                }
                else {
                    fileNotFound = true;
                }
            }
            catch (ex) {
                console.log('File not found!');
                fileNotFound = true;
            }
            if (fileNotFound || exSize != size || exDate < date) {
                //enqueue Files
                fileList.push(folder + '\\' + file);
            }
        }
    });
    rl.on('close', function (sum) {
        onFinished();
    });
};
var downloadGzipFileTo = function (path, saveAs, onSuccess, onError) {
    var ws = fs.createWriteStream(saveAs);
    ws.on('error', function () {
        return onError('Unable to save file ' + saveAs + '.\n Make sure that your launcher is in the same Directory as your Game Client!');
    });
    var req = request.get(path);
    req.on('error', function () {
        return onError('Unable to retrieve ' + path + '.\n There is either a problem with your connection or the service is currently unavailable.\nTry restarting the Launcher.\nIf the error persists, contact the Euphresia Staff.');
    });
    var unz = zlib.createGunzip();
    var headers = {
        'Accept-Encoding': 'gzip'
    };
    try {
        request({ url: path, 'headers': headers, method: 'GET' })
            .pipe(unz) // unzip
            .pipe(ws);
        ws.on('finish', function () { return onSuccess(); });
        unz.on('error', function (err) { return onError(err); });
    }
    catch (_a) {
        onError();
    }
};
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setTimeout(function () {
                createWindow();
            });
            return [2 /*return*/];
        });
    }); });
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
function mkDirByPathSync(targetDir, _a) {
    var _b = (_a === void 0 ? {} : _a).isRelativeToScript, isRelativeToScript = _b === void 0 ? false : _b;
    var sep = path.sep;
    var initDir = path.isAbsolute(targetDir) ? sep : '';
    var baseDir = isRelativeToScript ? __dirname : '.';
    return targetDir.split(sep).reduce(function (parentDir, childDir) {
        var curDir = path.resolve(baseDir, parentDir, childDir);
        try {
            fs.mkdirSync(curDir);
        }
        catch (err) {
            if (err.code === 'EEXIST') { // curDir already exists!
                return curDir;
            }
            // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
            if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
                throw new Error("EACCES: permission denied, mkdir '" + parentDir + "'");
            }
            var caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
            if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
                throw err; // Throw if it's just the last created dir.
            }
        }
        return curDir;
    }, initDir);
}
//# sourceMappingURL=main.js.map