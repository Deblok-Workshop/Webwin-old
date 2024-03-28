



function gh() {
  a = document.createElement("a");
  a.target = "_blank";
  a.href = "https://deblok.link/webwin";
  a.click();
  a.remove();
}


function calc() {
  createWindow({
    title: "Calculator",
    content:
      "<iframe src='components/calc.html' style='width:99%;height:99%;min-width:300px;min-height:439px;top:0;left:0;'></iframe>",
    icon: "icons/calc.png",
    disableResize: true,
  });
}

function np() {
  createWindow({
    title: "Notepad",
    content:
      "<iframe src='runtimes/notepad/index.html' style='width:99%;height:99%;min-width:320px;min-height:240px;top:0;left:0;'></iframe>",
    icon: "icons/notes.png",
  });
}
function ms() {
  createWindow({
    title: "Minesweeper",
    content:
      "<iframe src='runtimes/minesweeper/index.html' style='width:99%;height:99%;min-width:320px;min-height:240px;top:0;left:0;'></iframe>",
    icon: "icons/ms.png",
  });
}
function pa() {
  createWindow({
    title: "Paint",
    content:
      "<iframe src='https://jspaint.app' style='width:99%;height:99%;min-width:320px;min-height:400px;top:0;left:0;'></iframe>",
    icon: "icons/paint.png",
  });
}
function sm() {
  createWindow({
    title: "SM64-JS",
    content:
      "<iframe src='https://s64.pages.dev' style='width:99%;height:99%;min-width:480px;min-height:360px;top:0;left:0;'></iframe>",
  });
}
function wr() {
  createWindow({
    title: "RetroArch",
    content:
      "<iframe src='https://wretro.pages.dev' style='width:99%;height:99%;min-width:128px;min-height:128px;top:0;left:0;'></iframe>",
  });
}
function ruf() {
  createWindow({
    title: "Ruffle",
    content:
      "<iframe src='https://ruf.pages.dev' style='width:99%;height:99%;min-width:128px;min-height:128px;top:0;left:0;'></iframe>",
    icon: "icons/ruf.png",
  });
}
function jsr() {
  createWindow({
    title: "JavaScript Terminal",
    content:
      "<iframe src='runtimes/jsrepl.html' style='width:99%;height:99%;min-width:50ch;min-height:24ch;top:0;left:0;'></iframe>",
    icon: "icons/konsole.png",
  });
}
