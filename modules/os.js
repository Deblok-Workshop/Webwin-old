document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("clock") != null) {
    const timeElement = document.querySelector(".time");
    const dateElement = document.querySelector(".date");

    function updateDateTime() {
      const now = new Date();
      timeElement.innerText = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      dateElement.innerText = now.toLocaleDateString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
  }
});
function toggleStartMenu() {
  startmenu = document.querySelector("start-menu");
  taskbar = document.querySelector("taskbar");
  // startmenu.classList.add("reset");
  if (document.querySelector("start-menu").classList.contains("hidden")) {
    startmenu.classList.remove("hidden"); // just incase if it exists
  }
  setTimeout(() => {
    startmenu.classList.remove("reset");
  }, 100);
  setTimeout(() => {
    startmenu.classList.toggle("slideOut");
    startmenu.classList.toggle("slideIn");
    taskbar.classList.toggle("removeFilters");
  }, 200);
}
function MessageBox(title = "Message", message) {
  createWindow({
    title: title,
    content: `
    <div style="background:#EEE;height:fit-content;position:relative;top:-7px;">
    <p style="color:black;font-size:14px;margin-left:4px;margin-top:4px;">${message}</p><br>
    <br>
    <div style="background:#DDD;height:20%;position:absolute;bottom:-10px;width:100%;padding-bottom: 40px;">
    <button style="position:absolute;left:12px;bottom:6px;float:right;margin-right:auto;" onclick="closewindow(this.parentElement.parentElement.parentElement.parentElement)">OK</button>
    </div>
    </div>
    
    `,
    maxVisible: false,
    minVisible: false,
    disableResize: true,
  });
}
function sendNotification(title, description) {
  const n = document.createElement("notification");
  n.innerHTML = `
        <span class="notifrow">
            <icon></icon>
            <author >Webwin System</author>
            <span class="notifclosebtn" onclick="dismissNotification(this.parentElement.parentElement)">✕</span>
        </span>
        <h1>${title}</h1>
        <p>${description}</p>
        <footer>${window.location.host}</footer>
        <!-- please dont abuse this -->
        <audio autoplay controls src="audio/notify.mp3" class="hidden"></audio>
    `;
  document.querySelector(".notificationContainer").appendChild(n);
  setTimeout(() => {
    dismissNotification(n);
  }, 6000);
}
function dismissNotification(notification) {
  notification.style.opacity = "0";
  setTimeout(() => {
    notification.remove();
  }, 500);
}
function addToTaskbar(onclick, icon) {
  const taskbarItemsWrapper = document.querySelector(".taskbarItemsWrapper");
  taskbarItemsWrapper.innerHTML += `<item onclick="${onclick}"><img src="${icon}" loading="lazy"></img></item>`;
}
function addToStartMenu(onclick, icon, name) {
  const startMenu = document.querySelector("start-menu div");
  startMenu.innerHTML += `<item onclick="${onclick}">
 <icon class="mr-2 ml-0 startmenuico" style="background-image:url('${icon}')"></icon>
 ${name}
</item>`;
}
function addToDesktop(onclick, icon, name) {
  const desktop = document.querySelector(".desktop");
  desktop.innerHTML += `
  <desktop-icon ondblclick="${onclick}">
  <img style="width:32px;height:32px;" src="${icon}" loading="lazy">
<span class="text-xs max-h-[100px] overflow-hidden" style="line-break: anywhere;">${name}</span>
</desktop-icon>`;
}

function installWWApp(uri, config) {
  if (!uri.startsWith("data:application/json;base64")) {
    alert("Not a wwapp url.");
    throw new Error("Not a wwapp url.");
    return -1;
  }
  let wwappdat = JSON.parse(localStorage["wwapp_data"]) || {
    version: 1,
    installed: [],
  };
  wwappdat["uri"].push(uri);
  let wwappconf = JSON.parse(localStorage["wwapp_config"]) || {
    version: 1,
    uri: [],
  };
  let meta = JSON.parse(atob(uri.replace("data:application/json;base64,", "")));
  config.push(meta.wwapp.title);
  wwappconf["installed"].push(config);
  localStorage["wwapp_data"] = JSON.stringify(wwappdat);
  localStorage["wwapp_config"] = JSON.stringify(wwappconf);
  console.log(`wwapp ${meta.wwapp.title} installed successfully!`);
  return 0;
}
function uninstallWWApp(identifier) {
  function idxPop(idx) {
    let wwappdat = JSON.parse(localStorage["wwapp_data"]) || {
      version: 1,
      uri: [],
    };
    let wwappconf = JSON.parse(localStorage["wwapp_config"]) || {
      version: 1,
      installed: [],
    };
    wwappdat.uri.pop(idx);
    wwappconf.installed.pop(idx);
    localStorage["wwapp_data"] = JSON.stringify(wwappdat);
    localStorage["wwapp_config"] = JSON.stringify(wwappconf);
  }
  if ((typeof identifier).toString() == "number") {
    idxPop(identifier);
  } else if ((typeof identifier).toString() == "string") {
    let idx = wwappconf.installed.findIndex((item) => item[3] === searchString);
    if (idx != -1) {
      idxPop(idx);
    } // do nothing if it does not exist
  } else {
    console.log(typeof identifier);
    throw new Error("Unknown identifier");
  }
  return 0;
}
function addWWApp(identifier) {
  console.log((typeof identifier).toString());
  let wwappdat = JSON.parse(localStorage["wwapp_data"]) || {
    version: 1,
    uri: [],
  };
  let wwappconf = JSON.parse(localStorage["wwapp_config"]) || {
    version: 1,
    installed: [],
  };
  let idx = 0;
  if ((typeof identifier).toString() == "number") {
    idx = identifier;
  } else if ((typeof identifier).toString() == "string") {
    let found = wwappconf.installed.findIndex((item) => item[3] === identifier);
    if (found == -1) {
      throw new Error("This app does not exist.");
    }
    idx = found;
  } else {
    throw new Error("Invalid identifier.");
  }
  let meta = JSON.parse(
    atob(wwappdat.uri[idx].replace("data:application/json;base64,", "")),
  );
  if (wwappconf.installed[idx][0] == 1) {
    addToStartMenu(
      `launchWWApp(${idx})`,
      decodeURIComponent(meta.wwapp.iconurl),
      decodeURIComponent(meta.wwapp.title),
    );
  }
  if (wwappconf.installed[idx][1] == 1) {
    addToTaskbar(`launchWWApp(${idx})`, decodeURIComponent(meta.wwapp.iconurl));
  }
  if (wwappconf.installed[idx][2] == 1) {
    addToDesktop(
      `launchWWApp(${idx})`,
      decodeURIComponent(meta.wwapp.iconurl),
      decodeURIComponent(meta.wwapp.title),
    );
  }
}

function addAllWWApp() {
  let wwappdat = JSON.parse(localStorage["wwapp_data"]) || {
    version: 1,
    uri: [],
  };
  let wwappconf = JSON.parse(localStorage["wwapp_config"]) || {
    version: 1,
    installed: [],
  };
  for (let i = 0; i < wwappconf.installed.length; i++) {
    console.log(i);
    addWWApp(i);
  }
}

function launchWWApp(identifier) {
  let wwappdat = JSON.parse(localStorage["wwapp_data"]) || {
    version: 1,
    uri: [],
  };
  let wwappconf = JSON.parse(localStorage["wwapp_config"]) || {
    version: 1,
    installed: [],
  };
  let idx = 0;
  if ((typeof identifier).toString() == "number") {
    idx = identifier;
  } else {
    let found = wwappconf.installed.findIndex(
      (item) => item[3] === searchString,
    );
    if (found == -1) {
      throw new Error("This app does not exist.");
    }
    idx = found;
  }
  // closewindow(t.className)
  let meta = JSON.parse(
    atob(wwappdat.uri[idx].replace("data:application/json;base64,", "")),
  );

  createWindow({
    content: atob(meta.execCode),
    icon: decodeURIComponent(meta.wwapp.iconurl),
    title: decodeURIComponent(meta.wwapp.title),
    disableResize: meta.wwapp.windowOpts[0],
    minVisible: !meta.wwapp.windowOpts[1],
    maxVisible: !meta.wwapp.windowOpts[2],
  });
  // meta.execCode
}

async function uploadTempFile(file, expirationTime = "24h") {
  const apiUrl =
    "https://cors.rare1k.workers.dev?https://litterbox.catbox.moe/resources/internals/api.php";
  const formData = new FormData();
  formData.append("reqtype", "fileupload");
  formData.append("time", expirationTime);
  formData.append("fileToUpload", file);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to upload file:", response.statusText);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

function setWallpaper(url) {
  document.querySelector("body").style.backgroundImage = `url(${url})`;
}

if (!localStorage["wwglob_config"]) {
  localStorage["wwglob_config"] = JSON.stringify({
    version: 1,
    wallpaper: "img/img0_1903.jpg",
    tabSettings: {
      enabled: true,
      onUnfocus: false,
      title: "Webwin",
      icon: "webwin-logo-xs.png",
    },
    panicKey: "",
  });
}
let wwglob_config = JSON.parse(localStorage["wwglob_config"]);
setWallpaper(wwglob_config.wallpaper);

function changeFavicon(newFaviconUrl) {
  const link =
    document.querySelector("link[rel='icon']") ||
    document.createElement("link");
  link.type = "image/png";
  link.rel = "icon";
  link.href = newFaviconUrl;
  document.head.appendChild(link);
}

if (wwglob_config.tabSettings.enabled == true) {
  document.title = wwglob_config.tabSettings.title;
  changeFavicon(wwglob_config.tabSettings.icon);
}
