document.addEventListener('DOMContentLoaded', () => {

    if (document.querySelector('clock') != null) {
        const timeElement = document.querySelector('.time');
        const dateElement = document.querySelector('.date');
        
        function updateDateTime() {
          const now = new Date();
          timeElement.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
          dateElement.innerText = now.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }
})
function toggleStartMenu() {
    startmenu = document.querySelector('start-menu');
    startmenu.classList.add('reset');
    startmenu.classList.remove('hidden'); // just incase if it exists
    startmenu.style.display = 'block'; 
    setTimeout(() => {startmenu.classList.remove('reset');},100)
    setTimeout(() => {
        startmenu.classList.toggle('slideOut');
        startmenu.classList.toggle('slideIn');
    },200)
}
function MessageBox(title = "Message",message) {
    createWindow({"title":title,"content":`
    <div style="background:#EEE;height:fit-content;position:relative;top:-7px;">
    <p style="color:black;font-size:14px;margin-left:4px;margin-top:4px;">${message}</p><br>
    <br>
    <div style="background:#DDD;height:20%;position:absolute;bottom:-10px;width:100%;padding-bottom: 40px;">
    <button style="position:absolute;left:12px;bottom:6px;float:right;margin-right:auto;" onclick="closewindow(this.parentElement.parentElement.parentElement.parentElement)">OK</button>
    </div>
    </div>
    
    `,"maxVisible":false,"minVisible":false,"disableResize":true})
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
    document.querySelector('.notificationContainer').appendChild(n);
    setTimeout(() => {
        dismissNotification(n);
    }, 6000);
}
function dismissNotification(notification) {
    notification.style.opacity = '0';
    setTimeout(() => {notification.remove()},500)
}
function addToTaskbar(onclick, icon) {
    const taskbarItemsWrapper = document.querySelector('.taskbarItemsWrapper');
    taskbarItemsWrapper.innerHTML += `<item onclick="${onclick}"><img src="${icon}"></img></item>`;
}