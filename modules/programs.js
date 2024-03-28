function edge() {
  const isWindows = navigator.userAgent.includes("Windows");
  if (isWindows) {
    MessageBox(
      "Microsoft Edge",
      "A prompt has been shown on screen to open Microsoft Edge.&nbsp;",
    );
    setTimeout(() => {
      document.location = "microsoft-edge:";
    }, 1000);
  } else {
    sendNotification("Error", "You don't seem to be running Windows.");
  }
}
function discord() {
  createWindow({
    title: "Discord",
    content:
      "<iframe src='https://discord.com' id='e' style='width:99%;height:99%;min-width:480px;min-height:240px;top:0;left:0;'></iframe>",
    icon: "icons/discord.png",
  });
}
function vscode() {
  createWindow({
    title: "VS Code",
    content:
      "<iframe src='https://vscode.dev/' id='e' style='width:99%;height:99%;min-width:480px;min-height:240px;top:0;left:0;'></iframe>",
    icon: "icons/vscode.png",
  });
}
function chrome() {
  createWindow({
    title: "Google Chrome",
    content:
      "<iframe src='https://google.com/' id='e' style='width:99%;height:99%;min-width:480px;min-height:240px;top:0;left:0;'></iframe>",
    icon: "icons/chrome.png",
  });
}
function ec() {
  createWindow({
    title: "Eagler",
    content:
      "<iframe src='runtimes/runner_ec_multverchooser.html' style='width:99%;height:99%;min-width:480px;min-height:240px;top:0;left:0;'></iframe>",
    icon: "icons/grass.png",
  });
}
function gh() {
  a = document.createElement("a");
  a.target = "_blank";
  a.href = "https://deblok.link/webwin";
  a.click();
  a.remove();
}
function tw() {
  createWindow({
    title: "TurboWarp",
    content:
      "<iframe src='runtimes/runner_tw.html' style='width:99%;height:99%;min-width:480px;min-height:240px;top:0;left:0;'></iframe>",
    icon: "icons/tw.png",
  });
}
function twc() {
  createWindow({
    title: "TurboWarp",
    content:
      "<iframe src='runtimes/runner_twc.html' style='width:99%;height:99%;min-width:480px;min-height:240px;top:0;left:0;'></iframe>",
    icon: "icons/tw.png",
  });
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
function pb() {
  createWindow({
    title: "3D Pinball for Windows - Space Cadet",
    content:
      "<iframe src='runtimes/pinball/space-cadet.html' style='width:99%;height:99%;min-width:480px;min-height:360px;top:0;left:0;'></iframe>",
    icon: "icons/pb.png",
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
