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
  if (document.querySelector("start-menu").classList.contains('hidden')) {
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
function addToStartMenu(onclick, icon,name) {
 const startMenu = document.querySelector("start-menu div")
 startMenu.innerHTML += `<item onclick="${onclick}">
 <icon class="mr-2 ml-0 startmenuico" style="background-image:url('${icon}')"></icon>
 ${name}
</item>`

}
function addToDesktop(onclick, icon,name) {
  const desktop = document.querySelector(".desktop")
  desktop.innerHTML+= `
  <desktop-icon ondblclick="${onclick}" class="cursor-pointer px-2 duration-75 border border-transparent text-xs  hover:border-[#585F66]/95 hover:bg-[#202A33]/80 min-h-[50px] max-h-[100px] max-w-[70px] flex flex-col justify-center align-middle items-center">
  <img style="width:32px;height:32px;" src="${icon}" loading="lazy">
<span class="max-w-[70px] max-h-[100px] overflow-hidden" style="line-break: anywhere;">${name}</span>
</desktop-icon>`
 
 }
 
