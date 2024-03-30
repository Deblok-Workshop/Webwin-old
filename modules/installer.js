if (!localStorage["wwapp_config"]) {
    localStorage["wwapp_config"] = JSON.stringify({"version":1,"installed":[]})
  }
if (!localStorage["wwapp_data"]) {
    localStorage["wwapp_data"] = JSON.stringify({"version":1,"uri":[]})
  }
  if (!localStorage["wwglob_config"]) {
    localStorage["wwglob_config"] = JSON.stringify({"version":1,"wallpaper":"img/img0_1903.jpg","tabSettings":{"enabled":true,"onUnfocus":false,"title":"Webwin","icon":"webwin-logo-xs.png"},"panicKey":""});
  }
if (localStorage["wwapp_config"] == JSON.stringify({"version":1,"installed":[]}) || localStorage["wwapp_data"] == JSON.stringify({"version":1,"uri":[]})) {
    localStorage["wwapp_config"] = JSON.stringify({"version":1,"installed":[]})
    localStorage["wwapp_data"] = JSON.stringify({"version":1,"uri":[]})
    let installer = createWindow({
        "title":"...","content":`
       <div style="background:#0078D7;width:100%;height:100%;display:flex;justify-content:center;align-items:center;flex-direction:column;"><p style="margin-bottom:32px;font-size:24px;">Installing default apps...</p> <img src="modules/loader.gif" style="width:48px;height:48px;"></div>
       <javascript>this.style.width = "100vw";this.style.height = "108vh"; this.style.zIndex = "9999999999";this.style.top = "-32px";this.style.left = "0px";this.style.position = "absolute"</javascript>
       `
       })
    
    setTimeout(()=>{
    // GitHub
    installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij81YTI5N2M1Mi1jYmE3LTRjNmUtYTU0My0xMTU3MGZlNjIxYWQiLCJ0aXRsZSI6IkdpdEh1YiIsImljb251cmwiOiJpY29ucyUyRmdoLmljbyIsIndpbmRvd09wdHMiOltmYWxzZSxmYWxzZSxmYWxzZV19LCJleGVjQ29kZSI6IlBHcGhkbUZ6WTNKcGNIUStDaUFnWVNBOUlHUnZZM1Z0Wlc1MExtTnlaV0YwWlVWc1pXMWxiblFvSW1FaUtUc0tJQ0JoTG5SaGNtZGxkQ0E5SUNKZllteGhibXNpT3dvZ0lHRXVhSEpsWmlBOUlDSm9kSFJ3Y3pvdkwyUmxZbXh2YXk1c2FXNXJMM2RsWW5kcGJpSTdDaUFnWVM1amJHbGpheWdwT3dvZ0lHRXVjbVZ0YjNabEtDazdDaUFnZEdocGN5NXlaVzF2ZG1Vb0tUc0tQQzlxWVhaaGMyTnlhWEIwUGc9PSJ9",[0,0,1])
//Chrome
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij9iZTIxMmVkNi0yOGYyLTRlODItYWRjMS1hYjUwMmIzZmY1NjgiLCJ0aXRsZSI6IkNocm9tZSIsImljb251cmwiOiJodHRwcyUzQSUyRiUyRndlYndpbi5wYWdlcy5kZXYlMkZpY29ucyUyRmNocm9tZS5wbmciLCJ3aW5kb3dPcHRzIjpbZmFsc2UsZmFsc2UsZmFsc2VdfSwiZXhlY0NvZGUiOiJQR2xtY21GdFpTQnpjbU05SjJoMGRIQnpPaTh2Wm5KbFpYSmhiUzVyYVc1dVlXMWhibVJwYzNReUxtTnZiUzhuSUdsa1BTZGxKeUJ6ZEhsc1pUMG5kMmxrZEdnNk9Ua2xPMmhsYVdkb2REbzVPU1U3YldsdUxYZHBaSFJvT2pRNE1IQjRPMjFwYmkxb1pXbG5hSFE2TWpRd2NIZzdkRzl3T2pBN2JHVm1kRG93T3ljK1BDOXBabkpoYldVKyJ9",[1,1,1])   

// Microsoft Edge
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij9iOGU2NzBlYy1lYWM4LTQ0NTQtYmYzNy1iODdhZjI0YmRlZTMiLCJ0aXRsZSI6Ik1pY3Jvc29mdCUyMEVkZ2UiLCJpY29udXJsIjoiaWNvbnMlMkZlZGdlLnBuZyIsIndpbmRvd09wdHMiOltmYWxzZSxmYWxzZSxmYWxzZV19LCJleGVjQ29kZSI6IlBHcGhkbUZ6WTNKcGNIUStDaUJqYjI1emRDQnBjMWRwYm1SdmQzTWdQU0J1WVhacFoyRjBiM0l1ZFhObGNrRm5aVzUwTG1sdVkyeDFaR1Z6S0NKWGFXNWtiM2R6SWlrN0NpQWdhV1lnS0dselYybHVaRzkzY3lrZ2V3b2dJQ0FnVFdWemMyRm5aVUp2ZUNnS0lDQWdJQ0FnSWsxcFkzSnZjMjltZENCRlpHZGxJaXdLSUNBZ0lDQWdJa0VnY0hKdmJYQjBJR2hoY3lCaVpXVnVJSE5vYjNkdUlHOXVJSE5qY21WbGJpQjBieUJ2Y0dWdUlFMXBZM0p2YzI5bWRDQkZaR2RsTGladVluTndPeUlzQ2lBZ0lDQXBPd29nSUNBZ2MyVjBWR2x0Wlc5MWRDZ29LU0E5UGlCN0NpQWdJQ0FnSUdSdlkzVnRaVzUwTG14dlkyRjBhVzl1SUQwZ0ltMXBZM0p2YzI5bWRDMWxaR2RsT2lJN0NpQWdJQ0I5TENBeE1EQXdLVHNLSUNCOUlHVnNjMlVnZXdvZ0lDQWdjMlZ1WkU1dmRHbG1hV05oZEdsdmJpZ2lSWEp5YjNJaUxDQWlXVzkxSUdSdmJpZDBJSE5sWlcwZ2RHOGdZbVVnY25WdWJtbHVaeUJYYVc1a2IzZHpMaUlwT3dvZ0lIMEtZMnh2YzJWM2FXNWtiM2NvZEdocGN5a0tQQzlxWVhaaGMyTnlhWEIwUGc9PSJ9",[1,1,1])

//Eaglercraft
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij9mNjM2MDZlNC0yYmFjLTQyNTAtYWNiMy1iMjhiOWRmMTM5ZGEiLCJ0aXRsZSI6IkVhZ2xlciIsImljb251cmwiOiJodHRwcyUzQSUyRiUyRndlYndpbi5wYWdlcy5kZXYlMkZpY29ucyUyRmdyYXNzLnBuZyIsIndpbmRvd09wdHMiOltmYWxzZSxmYWxzZSxmYWxzZV19LCJleGVjQ29kZSI6IlBHbG1jbUZ0WlNCemNtTTlKM0oxYm5ScGJXVnpMM0oxYm01bGNsOWxZMTl0ZFd4MGRtVnlZMmh2YjNObGNpNW9kRzFzSnlCemRIbHNaVDBuZDJsa2RHZzZPVGtsTzJobGFXZG9kRG81T1NVN2JXbHVMWGRwWkhSb09qUTRNSEI0TzIxcGJpMW9aV2xuYUhRNk1qUXdjSGc3ZEc5d09qQTdiR1ZtZERvd095YytQQzlwWm5KaGJXVSsifQ==",[1,1,1])

    // Discord
    installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij9hOTBhZmM4Yi0xNGY2LTQzYzgtYjk4Ni04MmUwMzkxYzNiYTAiLCJ0aXRsZSI6IkRpc2NvcmQiLCJpY29udXJsIjoiaHR0cHMlM0ElMkYlMkZ3ZWJ3aW4ucGFnZXMuZGV2JTJGaWNvbnMlMkZkaXNjb3JkLnBuZyIsIndpbmRvd09wdHMiOltmYWxzZSxmYWxzZSxmYWxzZV19LCJleGVjQ29kZSI6IlBHbG1jbUZ0WlNCemNtTTlKMmgwZEhCek9pOHZibTh4Ym5wM1l6SnJibmQyTG5Ob1lYSmxMbnB5YjJzdWFXOHZkMlZpTDE5aFNGSXdZMGhOTmt4NU9XdGhXRTVxWWpOS2EweHRUblppVVQwOVh5OG5JR2xrUFNkbEp5QnpkSGxzWlQwbmQybGtkR2c2T1RrbE8yaGxhV2RvZERvNU9TVTdiV2x1TFhkcFpIUm9PalE0TUhCNE8yMXBiaTFvWldsbmFIUTZNalF3Y0hnN2RHOXdPakE3YkdWbWREb3dPeWMrUEM5cFpuSmhiV1UrIn0=",[1,1,1])

    // Ruffle
    installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij9hOTg5MjVhNi05ZDE5LTRmOTEtYTVjZS1kNThkNDk4ZWY2YzgiLCJ0aXRsZSI6IlJ1ZmZsZSIsImljb251cmwiOiJpY29ucyUyRnJ1Zi5wbmciLCJ3aW5kb3dPcHRzIjpbZmFsc2UsZmFsc2UsZmFsc2VdfSwiZXhlY0NvZGUiOiJQR2xtY21GdFpTQnpjbU05SjJoMGRIQnpPaTh2Y25WbUxuQmhaMlZ6TG1SbGRpY2djM1I1YkdVOUozZHBaSFJvT2prNUpUdG9aV2xuYUhRNk9Ua2xPMjFwYmkxM2FXUjBhRG94TWpod2VEdHRhVzR0YUdWcFoyaDBPakV5T0hCNE8zUnZjRG93TzJ4bFpuUTZNRHNuUGp3dmFXWnlZVzFsUGc9PSJ9",
    [1,0,0])
    // JS Terminal
    installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij8wOGJkYWM3Ny05NjcwLTQ3OTItYmU0ZC02ODczODQ0ZmQ5MDUiLCJ0aXRsZSI6IkphdmFTY3JpcHQlMjBUZXJtaW5hbCIsImljb251cmwiOiJpY29ucyUyRmtvbnNvbGUucG5nIiwid2luZG93T3B0cyI6W2ZhbHNlLGZhbHNlLGZhbHNlXX0sImV4ZWNDb2RlIjoiUEdsbWNtRnRaU0J6Y21NOUozSjFiblJwYldWekwycHpjbVZ3YkM1b2RHMXNKeUJ6ZEhsc1pUMG5kMmxrZEdnNk9Ua2xPMmhsYVdkb2REbzVPU1U3YldsdUxYZHBaSFJvT2pVd1kyZzdiV2x1TFdobGFXZG9kRG95TkdOb08zUnZjRG93TzJ4bFpuUTZNRHNuUGp3dmFXWnlZVzFsUGc9PSJ9"
    ,[1,0,0]);
    
//vscode
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij9jZmUzMWExNS1jMDYzLTRhYWMtYWQ0Zi1mYzMyYWE5MThiM2YiLCJ0aXRsZSI6IlZpc3VhbCUyMFN0dWRpbyUyMENvZGUiLCJpY29udXJsIjoiaHR0cHMlM0ElMkYlMkZ3ZWJ3aW4ucGFnZXMuZGV2JTJGaWNvbnMlMkZ2c2NvZGUucG5nIiwid2luZG93T3B0cyI6W2ZhbHNlLGZhbHNlLGZhbHNlXX0sImV4ZWNDb2RlIjoiUEdsbWNtRnRaU0J6Y21NOUoyaDBkSEJ6T2k4dmJtOHhibnAzWXpKcmJuZDJMbk5vWVhKbExucHliMnN1YVc4dmQyVmlMMTloU0ZJd1kwaE5Oa3g1T1RKak1rNTJXa2RWZFZwSFZqSmZMeWNnYVdROUoyVW5JSE4wZVd4bFBTZDNhV1IwYURvNU9TVTdhR1ZwWjJoME9qazVKVHR0YVc0dGQybGtkR2c2TkRnd2NIZzdiV2x1TFdobGFXZG9kRG95TkRCd2VEdDBiM0E2TUR0c1pXWjBPakE3Sno0OEwybG1jbUZ0WlQ0PSJ9",[1,0,0])

//turbowarpEditor
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij84ODZlNjNmMC1hZmY4LTRkMDgtYjIwOC1hM2ZhNDAwMjljZDEiLCJ0aXRsZSI6IlR1cmJvV2FycCUyMEVkaXRvciIsImljb251cmwiOiJodHRwcyUzQSUyRiUyRndlYndpbi5wYWdlcy5kZXYlMkZpY29ucyUyRnR3LnBuZyIsIndpbmRvd09wdHMiOltmYWxzZSxmYWxzZSxmYWxzZV19LCJleGVjQ29kZSI6IlBHbG1jbUZ0WlNCemNtTTlKM0oxYm5ScGJXVnpMM0oxYm01bGNsOTBkeTVvZEcxc0p5QnpkSGxzWlQwbmQybGtkR2c2T1RrbE8yaGxhV2RvZERvNU9TVTdiV2x1TFhkcFpIUm9PalE0TUhCNE8yMXBiaTFvWldsbmFIUTZNalF3Y0hnN2RHOXdPakE3YkdWbWREb3dPeWMrUEM5cFpuSmhiV1UrIn0=",[1,0,0])

//turboWarpClient
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij9kODQyZTAxYS03YzYxLTRiYzQtOTFlYS02MmYyZTEwN2VkYjciLCJ0aXRsZSI6IlR1cmJvV2FycCUyMENsaWVudCIsImljb251cmwiOiJodHRwcyUzQSUyRiUyRndlYndpbi5wYWdlcy5kZXYlMkZpY29ucyUyRnR3LnBuZyIsIndpbmRvd09wdHMiOltmYWxzZSxmYWxzZSxmYWxzZV19LCJleGVjQ29kZSI6IlBHbG1jbUZ0WlNCemNtTTlKM0oxYm5ScGJXVnpMM0oxYm01bGNsOTBkMk11YUhSdGJDY2djM1I1YkdVOUozZHBaSFJvT2prNUpUdG9aV2xuYUhRNk9Ua2xPMjFwYmkxM2FXUjBhRG8wT0RCd2VEdHRhVzR0YUdWcFoyaDBPakkwTUhCNE8zUnZjRG93TzJ4bFpuUTZNRHNuUGp3dmFXWnlZVzFsUGc9PSJ9",[1,0,0])

//Space pinball
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij83MDEyNmNjMi04MzlmLTQ2NTEtOTRjOS02NzEwYTEzOWQ0NTEiLCJ0aXRsZSI6IlNwYWNlJTIwQ2FkZXQlMjBQaW5iYWxsIiwiaWNvbnVybCI6Imh0dHBzJTNBJTJGJTJGd2Vid2luLnBhZ2VzLmRldiUyRmljb25zJTJGcGIucG5nIiwid2luZG93T3B0cyI6W2ZhbHNlLGZhbHNlLGZhbHNlXX0sImV4ZWNDb2RlIjoiUEdsbWNtRnRaU0J6Y21NOUozSjFiblJwYldWekwzQnBibUpoYkd3dmMzQmhZMlV0WTJGa1pYUXVhSFJ0YkNjZ2MzUjViR1U5SjNkcFpIUm9Pams1SlR0b1pXbG5hSFE2T1RrbE8yMXBiaTEzYVdSMGFEbzBPREJ3ZUR0dGFXNHRhR1ZwWjJoME9qTTJNSEI0TzNSdmNEb3dPMnhsWm5RNk1Ec25Qand2YVdaeVlXMWxQZz09In0=",[1,0,0])

// Minesweeper
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij9kOTYzM2NhMi00ZWFkLTQzYjctODMyYy04Y2VhZTZhOWFlNjEiLCJ0aXRsZSI6Ik1pbmVzd2VlcGVyIiwiaWNvbnVybCI6Imljb25zJTJGbXMucG5nIiwid2luZG93T3B0cyI6W2ZhbHNlLGZhbHNlLGZhbHNlXX0sImV4ZWNDb2RlIjoiUEdsbWNtRnRaU0J6Y21NOUozSjFiblJwYldWekwyMXBibVZ6ZDJWbGNHVnlMMmx1WkdWNExtaDBiV3duSUhOMGVXeGxQU2QzYVdSMGFEbzVPU1U3YUdWcFoyaDBPams1SlR0dGFXNHRkMmxrZEdnNk16SXdjSGc3YldsdUxXaGxhV2RvZERveU5EQndlRHQwYjNBNk1EdHNaV1owT2pBN0p6NDhMMmxtY21GdFpUND0ifQ==",[1,0,0])

// Calculator
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij80MDk0ZWQ2YS1kNTUxLTQyYjgtODNkNC1lNTgyMTU3MDA5MDciLCJ0aXRsZSI6IkNhbGN1bGF0b3IiLCJpY29udXJsIjoiaWNvbnMlMkZjYWxjLnBuZyIsIndpbmRvd09wdHMiOlt0cnVlLGZhbHNlLHRydWVdfSwiZXhlY0NvZGUiOiJQR2xtY21GdFpTQnpjbU05SjJOdmJYQnZibVZ1ZEhNdlkyRnNZeTVvZEcxc0p5QnpkSGxzWlQwbmQybGtkR2c2T1RrbE8yaGxhV2RvZERvNU9TVTdiV2x1TFhkcFpIUm9Pak13TUhCNE8yMXBiaTFvWldsbmFIUTZORE01Y0hnN2RHOXdPakE3YkdWbWREb3dPeWMrUEM5cFpuSmhiV1UrIn0=",[1,0,0])
  
// Notepad
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij8zZTlmMzQyMi05OGRlLTQ2ZWUtODgxZS0zODk3ZjgzNDk3YTUiLCJ0aXRsZSI6Ik5vdGVwYWQiLCJpY29udXJsIjoiaWNvbnMlMkZub3Rlcy5wbmciLCJ3aW5kb3dPcHRzIjpbZmFsc2UsZmFsc2UsZmFsc2VdfSwiZXhlY0NvZGUiOiJQR2xtY21GdFpTQnpjbU05SjNKMWJuUnBiV1Z6TDI1dmRHVndZV1F2YVc1a1pYZ3VhSFJ0YkNjZ2MzUjViR1U5SjNkcFpIUm9Pams1SlR0b1pXbG5hSFE2T1RrbE8yMXBiaTEzYVdSMGFEb3pNakJ3ZUR0dGFXNHRhR1ZwWjJoME9qSTBNSEI0TzNSdmNEb3dPMnhsWm5RNk1Ec25Qand2YVdaeVlXMWxQZz09In0=",[1,0,0])

// Paint
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij9mZmY5OTk5My0zYWYxLTQyNTEtODU2Zi05MmJlYmJkMjlhNzQiLCJ0aXRsZSI6IlBhaW50IiwiaWNvbnVybCI6Imljb25zJTJGcGFpbnQucG5nIiwid2luZG93T3B0cyI6W2ZhbHNlLGZhbHNlLGZhbHNlXX0sImV4ZWNDb2RlIjoiUEdsbWNtRnRaU0J6Y21NOUoyaDBkSEJ6T2k4dmFuTndZV2x1ZEM1aGNIQW5JSE4wZVd4bFBTZDNhV1IwYURvNU9TVTdhR1ZwWjJoME9qazVKVHR0YVc0dGQybGtkR2c2TXpJd2NIZzdiV2x1TFdobGFXZG9kRG8wTURCd2VEdDBiM0E2TUR0c1pXWjBPakE3Sno0OEwybG1jbUZ0WlQ0PSJ9",[1,0,0])

// Super Mario 64
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij80NzI5MTMzNC1lNWFkLTQ1NGQtODg5Zi0yZGIzZmU5ZDUxM2EiLCJ0aXRsZSI6IlN1cGVyJTIwTWFyaW8lMjA2NCIsImljb251cmwiOiJpY29ucyUyRnNtNjQucG5nIiwid2luZG93T3B0cyI6W2ZhbHNlLGZhbHNlLGZhbHNlXX0sImV4ZWNDb2RlIjoiUEdsbWNtRnRaU0J6Y21NOUoyaDBkSEJ6T2k4dmN6WTBMbkJoWjJWekxtUmxkaWNnYzNSNWJHVTlKM2RwWkhSb09qazVKVHRvWldsbmFIUTZPVGtsTzIxcGJpMTNhV1IwYURvME9EQndlRHR0YVc0dGFHVnBaMmgwT2pNMk1IQjRPM1J2Y0Rvd08yeGxablE2TURzblBqd3ZhV1p5WVcxbFBnPT0ifQ==",[1,0,0])

// RetroArch
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij9lNTIyYTQ3NS1hMzgwLTRiZDQtYjZiMS03ZTE0MWY5N2YwMWEiLCJ0aXRsZSI6IlJldHJvQXJjaCIsImljb251cmwiOiJpY29ucyUyRndyLnBuZyIsIndpbmRvd09wdHMiOltmYWxzZSxmYWxzZSxmYWxzZV19LCJleGVjQ29kZSI6IlBHbG1jbUZ0WlNCemNtTTlKMmgwZEhCek9pOHZkM0psZEhKdkxuQmhaMlZ6TG1SbGRpY2djM1I1YkdVOUozZHBaSFJvT2prNUpUdG9aV2xuYUhRNk9Ua2xPMjFwYmkxM2FXUjBhRG94TWpod2VEdHRhVzR0YUdWcFoyaDBPakV5T0hCNE8zUnZjRG93TzJ4bFpuUTZNRHNuUGp3dmFXWnlZVzFsUGc9PSJ9",[1,0,0])

// set wallpaper
let wwglob_config = JSON.parse(localStorage["wwglob_config"]);
setWallpaper(wwglob_config.wallpaper)

    setTimeout(()=>{document.querySelector(`.${installer}`).classList.add("closing");setTimeout(()=>{document.querySelector(`.${installer}`).remove()},360)},500)
    setTimeout(()=>{addAllWWApp();
    
// webwin virus
installWWApp("data:application/json;base64,eyJ3d2FwcCI6eyJ2ZXJzaW9uIjoxLCJpZCI6Ij82MWM4NGY3OS1mMThlLTRmZWQtODA0OS0wOTlkMjcxY2U5ZTMiLCJ0aXRsZSI6IndlYndpbiUyMHZpcnVzIiwiaWNvbnVybCI6Imljb25zJTJGa29uc29sZS5wbmciLCJ3aW5kb3dPcHRzIjpbdHJ1ZSx0cnVlLHRydWVdfSwiZXhlY0NvZGUiOiJQR3BoZG1GelkzSnBjSFErQ21WMllXd29ZWFJ2WWlnaVdUTktiRmxZVW14V01teDFXa2M1TTB0SWMybGtSMnd3WWtkVmFVOXBTak5hVjBvellWYzBaMlJ0Ykhsa1dFMXBURU5LYW1JeU5UQmFWelV3U1dwd1oxQkhjR2hrYlVaNldUTktjR05JVVN0Wk1uaDJZekpXTTJGWE5XdGlNMk52WkVkb2NHTjVhemRqTWxZd1ZrZHNkRnBYT1RGa1EyZHZTMVF3SzJVeWVIWlpNa1p6VlROU2RtTnRSbTVhVm5OcFpETmthR05JUW1aWk1qbDFXbTFzYmtsc01HZFFVMEZ1WlhsS01scFlTbnBoVnpsMVNXcHZlRXhEU25CaWJrNHdXVmQ0YzFwWFVXbFBiSFJpVFVOM2QweEVRWE5KYVVwa1dGZ3diazkzY0dwamJWWm9aRWRXV0dGWE5XdGlNMk52WlhsS01HRllVbk5hVTBrMlNXNVdiMGxIT1c5SmFYZHBXVEk1ZFdSSFZuVmtRMGsyU1dwNGQyTnRWU3RKUTBKYVlqTldlVWxJWkd4WmJtUndZbWxDY0dKdVRqQlpWM2h6V1ZoU2NHSXlOR2RoV0UxblltMDVNMGxGTVVwVWExVm9TVVIzZG1OSVNteFFhVWx6U1c1a2NHSnRVblprTVU0d1pWZDRiR041U1RaSmJVcG9XVEowYm1OdE9URmliVkUyV1cxNE1WcFRTamxMVkhSc1pHMUdjMHRIUmpCaU1rbHZTVzFLU0ZacVFrcFNNblJ1VlVaT1FtUXdPVE5qUjNCcVlsWmFiMXBGWkZkWFIwWllUbGQwYVUweVRuWmFXR3hMVFVkR1dWVnVUbUZWTUdzeVUxZHJNR1JWZUhCVFdFNUtZbFUxTWxsdE5WTmlSMHAxVlZkc1VHRlZjSFpaVm1SeVlWVjRSRk5xVG1oV2VsWnlXV3BPYTFaSFVrbGlTRTVoVjBVeGNGUXliRXRoVm14WVZHNUtZVTB3Y0RKYVJtTXhZVEE1ZFZOdGVHRlJNRzgxVXpGR2QyRXlTWGxVYWtacFZqRmFNVnBGVFRGaFYwbDVWV3BXVFdKck5IZGFWbVEwWWtWNGRGTnRhRnBOYmxKMVdUSXdOVTFYU25SVlYyUlJWVEJHY0ZkclpFZGxWMFY2VTIxNFlWRXdiRXhYYTJNMVlXMVNXRTFYZUdsaWJFWXhWMWN3TldFeVZsUk9XSEJyVTBkNGVsZHNUVEZpVjBsNVRsUkNVMkpWV2pCWlZtUTBUbFZzUlUxSFpFcGlhelZ6V1RJeGMySlZiRzVqU0hCaFYwWktWbGxXWTNoaVIwbDZWbXBDVEZFeVpIZFZSbEV4VGpCT2JtTkljR0ZYUmtwTFdXMDFVMkpIVG5WWGJXaHBVVEprZGxNeFVYZExNbFl6WTBoQ1NsSkVRbTVaVms1Q1kydHNSVk5WZEdsU01WbDNVMVZrUzAwd2JFVk5SMlJhVFRCd2MxZFdhRk5pUmxsNVlraFdZVko2YTNwVE1HaDZZVmRTU0dKRVFtbFNNVlp3VkRKc1NtUlZlSEJPUjJ4TlVUQndjVmxxU1RGTlJuQllUbFJDU21GdVFtNVRhMmd3WkZac1dWZHVRbUZOYTFsM1dXcE9TbVJYVWxsVWJYaHFZVEJhZFZkc1l6Rk5SMXBWWlVoR1dsZEdjRzlaZWtwUFpWZEdXVkZxUWxGaWJFcDJXVlpvVG1SWFRYcFZhbFpwVWpGV01WcEZZelZrTUd4RlRVZGtTbUZXU1ROV1JtUkhUVWRHUkU1WWJGcFdlbFp5V1dwSmQySXdkRlJSV0VaS1VrVXhNMVJWWjNoa01sWkVVMVJrYTFJeWFIZFpNMnN4WlcxU1NXSklUbUZWZWxaNlYyeGtZVTFGYkVWTlIyUktZVlpKTTFaR1pFZE5SMFpFVGxoc1dsWjZWbkpaYWtsM1lqQjBWRkZZUmtwU1JURXpWRlZuZUdReVZrUlRWR1JSVVhwc2VGZFdhR0ZoUjAxNVZHNXNhRmRGU1hkVlJ6RkNZekJzZFZwSVFtbGlWa295V2tSR1QwMUhWbGhsUjNocVpWVnJNbE5YTVV0aFJtdDVaRWMxYW1KVWEzaFpiVEZTVG0xT2RGWnRkRXBpYWtKM1VUSXhVMlJzYTNwV2JsSmhWbnBWZDFSSE1VdGtiSEJKWVROV2FrMHhTVEZaYTJSV1pGZFNTVk50YUdsaWF6VjBXV3BPUzJSRmJFVk5SMlJhVTBVMWNWZFdaRFJpUm1SRVdqSjBiR1ZYYUU5WFZtaFRZakI0ZEZkdVRtbE5hbXcxVXpCVmVHRkhVa2hhTTFacVlsVmFNVmRyWXpWa1JYUkVZVEprVEdGVlJqUlVWVTV5WkdzeFZWRllRa3hsYTFZeFZGYzBkMk5GYkVsVWJYQmFWak5vYzFZeFRtNWhNbFkxWVVVMVdsZEdTblpVUnpGaFl6SkplVTlZYkV4U1ZFWnZXa1ZrYm1SWFRuUlNibFpoVW5wc01GTXdUbkphTUhSd1VWUkdURlY2YURSVVZVNXlZMnN4UkU1RVRtMVZNblJ1V1RJd05VMUdiRmxWYlhoWVlWZGtjbHBVU25OUFZuQklWbTAxVEZZd1JUTlRWV1JUWkd4cmVsWnVVbUZXZWxWM1ZFYzFSMDFXY0ZsVGFsWldUV3hhZWxkc1pFOU5SMGw2VTFjNVNtRlVWbkpYYkdoUFkyMVNTRTlZWkVwaFYzUXhXWHBPVTA1WFNraFdXRlpxVW5wc05sbFdhRk5qUjBsNVRrZGtVVlV3Um5CWk1qRlhZekZzV1ZWdVFtdGlWbFp3VkROc1EyRXlTWGxVYWtacFZqRmFNVnBGVFRGbFIxSllWbTVzYkZack5YTlphMlJYWVcxU1NFOVliRXhSTUd3eFYydGtWMlZ0UlhwVmJscHFVVEJzZDFSSE5VOU5SMVpZWlVkNFRXSnNTakpaTUU1Q1QxVnNTRkZYZEd4TlJFWnZXa1ZrYm1SV2NIUmxTRnBwVFRCc2RsWkdaRWROUjBaRVRsaHNXbFo2Vm5KWmFrbDNZakIwVkZGWVJrcFNSMDR6VXpGbmVHUXlWa2hSVlhSaFVucHNjVnBHWTNoaVIwcDFWVmhXYWxkR1duTlpNalZ6Vmtad1dHVkhlRnBOTVVveVdUSnNibUZWZUhSVmJYaHFUVzVSZDFscVRrSmhWWFJVVGxod2ExTkhlSHBYYkUweFl6RndXRmRxUWtwU1JFSnVWMVZPVTA0eFVsaFNha0pvVVhwV2RGbHJZelZrYlU1d1lVVTFXbGRHU25aVVJ6VkxZVWRLZEZWdVdtbFZNbVIzVTFWT2Rsb3dOVFpSV0VKdFYwVkpNRmRWUm5kUFZYaEZVbGhrVGxFeWRFeGFiRTR6WlVVeE5sRllaRXhWVkRBNVNXbHJjRU51TUhOT1ZFRjNTMVIwZWxwWVVsVmhWekZzWWpOV01FdERaM0JRVkRVM1lrYzVhbGxZVW5CaU1qUjFZMjFXYzJJeVJtdExRMnc1VEVSRmQwMUVRWGRMVjBJNVMxRnZTeUlwS1E9PSJ9",[1,0,0])
    
    },700)
    
},600)
}