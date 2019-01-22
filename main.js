// 在主进程中.
const {
  app,
  BrowserWindow,
} = require('electron')

// 或者从渲染进程中使用 `remote`.
// const { BrowserWindow } = require('electron').remote
let win;

global.sharedObject = {
  newTel: '123'
};

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 200,    
    resizable: false,
    // frame: false,
  })
  win.on('closed', () => {
    win = null
  })
  // 或加载本地HTML文件
  win.loadURL(`file://${__dirname}/index.html`)
}


const path = require('path')
const url = require('url')
const fs = require('fs');
const ipc = require('electron').ipcMain
const remote = require('electron').remote
let newwin;

ipc.on('add', (sys,val) => {
  newwin = new BrowserWindow({    
    width: 640,
    height: 800,
    center: true,
    resizable: false,
    parent: win, //win是主窗口
  });

  console.log(val)
  var _path = path.join(__dirname, '', '//app.html');
  var path1 = val+"\\index.html";
  var path2 = val+"\\ys.html";
  // console.log(_path, path1); //测试路径对不对的
  
  var content;
  fs.readFile(path1, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    } else {
      fs.readFile(path2, 'utf8', function (err, ys) {
        if (err) {
          setStr(newwin,_path,data,val)
          return console.log(err)
        } else {
          setStr(newwin,_path,data, val,ys)
        }
      });
    }
  })
})


app.on('ready', createWindow)



function setStr(newwin,_path,content,val, ys) {
  content = content.replace(/>\s*?</gi, '><');
  content = content.replace(/<%template src="ys.html"%>/gi, ys)
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

  content = content.replace(/<%templateskin%>/gi, val)
  content = content.replace(/<%diy\("[a-z]*"\)%>/gi, "");
  content = content.replace(/<%.*?%>/gi, "");
  content = content.replace(/{[a-z]*\[image\]}/gi, "http://test.btoe.cn/lb/123.png");
  content = content.replace(/{[a-z]*\[thumb\]}/gi, "http://test.btoe.cn/lb/123.png");
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
    newwin.loadURL(`file://${__dirname}/app.html`)
    console.log("写入成功！")
  })

}