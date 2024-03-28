if (!localStorage["wwapp_config"]) {
    localStorage["wwapp_config"] = JSON.stringify({"version":1,"installed":[]})
  }
if (!localStorage["wwapp_data"]) {
    localStorage["wwapp_data"] = JSON.stringify({"version":1,"uri":[]})
  }
if (localStorage["wwapp_config"] == JSON.stringify({"version":1,"installed":[]}) || localStorage["wwapp_data"] == JSON.stringify({"version":1,"uri":[]})) {
    localStorage["wwapp_config"] = JSON.stringify({"version":1,"installed":[]})
    localStorage["wwapp_data"] = JSON.stringify({"version":1,"uri":[]})
    let installer = createWindow({
        "title":"...","content":`
       <div style="background:#111;width:100%;height:100%;display:flex;justify-content:center;align-items:center;flex-direction:column;"><p style="margin-bottom:32px;font-size:24px;">Installing default apps...</p> <img src="modules/loader.gif" style="width:48px;height:48px;"></div>
       <javascript>this.style.width = "100vw";this.style.height = "108vh"; this.style.zIndex = "9999999999";this.style.top = "-32px";this.style.left = "0px";this.style.position = "absolute"</javascript>
       `
       })
    
    setTimeout(()=>{
    // GitHub
    installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij81YTI5N2M1Mi1jYmE3LTRjNmUtYTU0My0xMTU3MGZlNjIxYWQiLCJ0aXRsZSI6IkdpdEh1YiIsImljb251cmwiOiJpY29ucyUyRmdoLmljbyIsIndpbmRvd09wdHMiOltmYWxzZSxmYWxzZSxmYWxzZV19LCJleGVjQ29kZSI6IlBHcGhkbUZ6WTNKcGNIUStDaUFnWVNBOUlHUnZZM1Z0Wlc1MExtTnlaV0YwWlVWc1pXMWxiblFvSW1FaUtUc0tJQ0JoTG5SaGNtZGxkQ0E5SUNKZllteGhibXNpT3dvZ0lHRXVhSEpsWmlBOUlDSm9kSFJ3Y3pvdkwyUmxZbXh2YXk1c2FXNXJMM2RsWW5kcGJpSTdDaUFnWVM1amJHbGpheWdwT3dvZ0lHRXVjbVZ0YjNabEtDazdDaUFnZEdocGN5NXlaVzF2ZG1Vb0tUc0tQQzlxWVhaaGMyTnlhWEIwUGc9PSJ9",[0,0,1])

    // Edge
    installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij9iODUwZGFlYS0xODE4LTQ5YjQtYWJiNS03ZDU0MGQ3YWEwYzkiLCJ0aXRsZSI6Ik1pY3Jvc29mdCUyMEVkZ2UiLCJpY29udXJsIjoiaWNvbnMlMkZlZGdlLnBuZyIsIndpbmRvd09wdHMiOltmYWxzZSxmYWxzZSxmYWxzZV19LCJleGVjQ29kZSI6IklDQmpiMjV6ZENCcGMxZHBibVJ2ZDNNZ1BTQnVZWFpwWjJGMGIzSXVkWE5sY2tGblpXNTBMbWx1WTJ4MVpHVnpLQ0pYYVc1a2IzZHpJaWs3Q2lBZ2FXWWdLR2x6VjJsdVpHOTNjeWtnZXdvZ0lDQWdUV1Z6YzJGblpVSnZlQ2dLSUNBZ0lDQWdJazFwWTNKdmMyOW1kQ0JGWkdkbElpd0tJQ0FnSUNBZ0lrRWdjSEp2YlhCMElHaGhjeUJpWldWdUlITm9iM2R1SUc5dUlITmpjbVZsYmlCMGJ5QnZjR1Z1SUUxcFkzSnZjMjltZENCRlpHZGxMaVp1WW5Od095SXNDaUFnSUNBcE93b2dJQ0FnYzJWMFZHbHRaVzkxZENnb0tTQTlQaUI3Q2lBZ0lDQWdJR1J2WTNWdFpXNTBMbXh2WTJGMGFXOXVJRDBnSW0xcFkzSnZjMjltZEMxbFpHZGxPaUk3Q2lBZ0lDQjlMQ0F4TURBd0tUc0tJQ0I5SUdWc2MyVWdld29nSUNBZ2MyVnVaRTV2ZEdsbWFXTmhkR2x2YmlnaVJYSnliM0lpTENBaVdXOTFJR1J2YmlkMElITmxaVzBnZEc4Z1ltVWdjblZ1Ym1sdVp5QlhhVzVrYjNkekxpSXBPd29nSUgwPSJ9",[1,1,1])

    // Discord
    installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij8zNTQwOTY0NC0yYTYyLTQ4ZjctOWI0Ny03YjVjNjFhYTlhYzgiLCJ0aXRsZSI6IkRpc2NvcmQiLCJpY29udXJsIjoiaWNvbnMlMkZkaXNjb3JkLnBuZyIsIndpbmRvd09wdHMiOltmYWxzZSxmYWxzZSxmYWxzZV19LCJleGVjQ29kZSI6IlBHbG1jbUZ0WlNCemNtTTlKMmgwZEhCek9pOHZaMlozTW1veWRtZGhabVEyTG5Ob1lYSmxMbnB5YjJzdWFXOHZkMlZpTDE5aFNGSXdZMGhOTmt4NU9XdGhXRTVxWWpOS2EweHRUblppVVQwOVh5OG5JR2xrUFNkbEp5QnpkSGxzWlQwbmQybGtkR2c2T1RrbE8yaGxhV2RvZERvNU9TVTdiV2x1TFhkcFpIUm9PalE0TUhCNE8yMXBiaTFvWldsbmFIUTZNalF3Y0hnN2RHOXdPakE3YkdWbWREb3dPeWMrUEM5cFpuSmhiV1UrIn0=",[1,1,1])

    // Ruffle
    installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij9hOTg5MjVhNi05ZDE5LTRmOTEtYTVjZS1kNThkNDk4ZWY2YzgiLCJ0aXRsZSI6IlJ1ZmZsZSIsImljb251cmwiOiJpY29ucyUyRnJ1Zi5wbmciLCJ3aW5kb3dPcHRzIjpbZmFsc2UsZmFsc2UsZmFsc2VdfSwiZXhlY0NvZGUiOiJQR2xtY21GdFpTQnpjbU05SjJoMGRIQnpPaTh2Y25WbUxuQmhaMlZ6TG1SbGRpY2djM1I1YkdVOUozZHBaSFJvT2prNUpUdG9aV2xuYUhRNk9Ua2xPMjFwYmkxM2FXUjBhRG94TWpod2VEdHRhVzR0YUdWcFoyaDBPakV5T0hCNE8zUnZjRG93TzJ4bFpuUTZNRHNuUGp3dmFXWnlZVzFsUGc9PSJ9",
    [1,0,0])
    // JS Terminal
    installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij8wOGJkYWM3Ny05NjcwLTQ3OTItYmU0ZC02ODczODQ0ZmQ5MDUiLCJ0aXRsZSI6IkphdmFTY3JpcHQlMjBUZXJtaW5hbCIsImljb251cmwiOiJpY29ucyUyRmtvbnNvbGUucG5nIiwid2luZG93T3B0cyI6W2ZhbHNlLGZhbHNlLGZhbHNlXX0sImV4ZWNDb2RlIjoiUEdsbWNtRnRaU0J6Y21NOUozSjFiblJwYldWekwycHpjbVZ3YkM1b2RHMXNKeUJ6ZEhsc1pUMG5kMmxrZEdnNk9Ua2xPMmhsYVdkb2REbzVPU1U3YldsdUxYZHBaSFJvT2pVd1kyZzdiV2x1TFdobGFXZG9kRG95TkdOb08zUnZjRG93TzJ4bFpuUTZNRHNuUGp3dmFXWnlZVzFsUGc9PSJ9"
    ,[1,0,0]);
    
    setTimeout(()=>{document.querySelector(`.${installer}`).classList.add("closing");setTimeout(()=>{document.querySelector(`.${installer}`).remove()},360)},300)
    setTimeout(()=>{addAllWWApp()},500)
    
},600)
}