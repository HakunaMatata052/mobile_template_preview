// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow
} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 640,
    height: 800,
    center: true,
    resizable:false,
    title: '手机站在线预览v1.0',
    // frame: false,
    titleBarStyle: 'hidden',
    webPreferences:{
      devTools:true,
      
    }
    // transparent: true,
  })


  const path = require('path');
  var _path = path.join(__dirname, '', '//index.html');
  var path1 = "m_temp\\index.html";
  var path2 = "m_temp\\ys.html";
  console.log(_path, path1); //测试路径对不对的
  var fs = require('fs');
  var content;
  let insertStr = (soure, start, newStr) => {
    return soure.slice(0, start) + newStr + soure.slice(start)
  }


  function setStr(content,ys) {

    content = content.replace(/>\s*?</gi, '><');
    content = content.replace(/<%template src="ys.html"%>/gi,ys)

    var reg = /<%foreach.*?%>(.|\s)*?<%\/foreach%>/gi;

    // while ((result = reg.exec(content)) != null)  {
    //   result = String(result);
    //   console.log(result)
    //   content = insertStr(content,reg[0],result+result);
    //  }
    // if(content.match(reg)!=null){
    //   for(var i=0;i<content.match(reg).length;i++){
    //     content = content.replace(content.match(reg)[i],"asd"+i)
    //     console.log(content.match(reg)[i])
    //   }
    // }



    content = content.replace(/<%templateskin%>/gi, 'm_temp')
    content = content.replace(/<%diy\("[a-z]*"\)%>/gi, "");
    content = content.replace(/<%.*?%>/gi, "");
    content = content.replace(/{[a-z]*\[image\]}/gi, "https://www.baidu.com/img/bd_logo1.png");
    content = content.replace(/{[a-z]*\[thumb\]}/gi, "https://www.baidu.com/img/bd_logo1.png");
    content = content.replace(/{[a-z]*\[title\]}/gi, "产品标题0123abcseABCDE");
    content = content.replace(/{[a-z]*\[zhaiyao\]}/gi, "摘要又称概要、内容提要。摘要是以提供文献内容梗概为目的，不加评论和补充解释，简明、确切地记述文献重要内容的短文。其基本要素包括研究目的、方法、结果和结论。具体地讲就是研究工作的主要对象和范围，采用的手段和方法");
    content = content.replace(/{[a-z]*\[catname\]}/gi, "分类名称0123ABCDancd");
    content = content.replace(/{site\.freecall}/gi, "400-888-8888");
    content = content.replace(/{site\.mcolor}/gi, "#f00");
    content = content.replace(/{site\.order_company}/gi, "动力无限信息科技股份有限公司");
    content = content.replace(/{site\.qrcode}/gi, "http://www.btoe.cn/uploads/201507/18/201507180920210891.jpg");
    content = content.replace(/{site\.[a-z]*?}/gi, "系统信息0123ABCDabcd");

    fs.writeFile(_path, content, function (err) {
      if (!err)
        mainWindow.loadURL(`file://${__dirname}/index.html`)
      console.log("写入成功！")
    })

  }

  fs.readFile(path1, 'utf8', function (err, data) {
        if (err) {
          return console.log(err)
        } else {
          fs.readFile(path2, 'utf8', function (err, ys) {
              if (err) {
                setStr(data)
                return console.log(err)
              } else {
                setStr(data,ys)

              }

          });

        }
      })



        // and load the index.html of the app.
        // mainWindow.loadFile('index.html')



        // Open the DevTools.
        // mainWindow.webContents.openDevTools()

        // Emitted when the window is closed.
        mainWindow.on('closed', function () {
          // Dereference the window object, usually you would store windows
          // in an array if your app supports multi windows, this is the time
          // when you should delete the corresponding element.
          mainWindow = null
        })
      }

      // This method will be called when Electron has finished
      // initialization and is ready to create browser windows.
      // Some APIs can only be used after this event occurs.
      app.on('ready', createWindow)

      // Quit when all windows are closed.
      app.on('window-all-closed', function () {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
          app.quit()
        }
      })

      app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) {
          createWindow()
        }
      })

      // In this file you can include the rest of your app's specific main process
      // code. You can also put them in separate files and require them here.