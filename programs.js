function edge() {

    const isWindows = navigator.userAgent.includes('Windows');
        if (isWindows) {
          MessageBox("Microsoft Edge","A prompt has been shown on screen to open Microsoft Edge.&nbsp;")
          setTimeout(() => {document.location = 'microsoft-edge:';},1000)
      } else {
          sendNotification('Error','You don\'t seem to be running Windows.')
      }
   }
function ec() {
    createWindow({"title":"Eagler","content":"<iframe src='runtimes/runner_ec_multverchooser.html' style='width:99%;height:99%;min-width:480px;min-height:240px;top:0;left:0;'></iframe>"})
}