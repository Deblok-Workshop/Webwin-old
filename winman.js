/*
 WinMan:
 A Windows 10 window manager made in JavaScript, pair with app.css
*/


const globInnerHeight = window.innerHeight;
const globInnerWidth = window.innerWidth;
let max = false;
let poscache = ["0px","0px"];
let windowoffset=16;
let windows = []
let topidx=1;
const randomString = (length) => [...Array(length)].map(() => Math.random().toString(36)[2]).join('');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
function closewindow(win) {
  windows.splice(windows.indexOf(win.classList[0]),1);
  win.classList.add('closing');
  setTimeout(() => {win.remove();},360)
}
function togmax(win) {
 if (max) {
max=false;
win.style.height="fit-content";
win.style.width="fit-content";
win.style.left=poscache[1];
win.style.top=poscache[0];

} else {
max=true;
poscache[0]=win.style.top
poscache[1]=win.style.left
win.style.height="99.9svh";
win.style.width="99.9svw";
win.style.left="0px";
win.style.top="0px";
}
}
function indexing(win) {
  win.querySelector('nav').addEventListener("mousedown",() => {win.style.zIndex = "100"; topidx++;})
  win.querySelector('nav').addEventListener("mouseup",() => {win.style.zIndex = topidx.toString();})
}
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.querySelector('nav').onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
if (!max) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    console.log((elmnt.offsetTop - pos2),(elmnt.offsetLeft - pos1))
    if ((elmnt.offsetTop - pos2) > (globInnerHeight * 0.9)) {return}
    if ((elmnt.offsetLeft - pos1) > (globInnerWidth * 2)) {max = true; elmnt.classList.add('dvd')}
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function createWindow(meta) {
  // json checking
  if (typeof meta === 'object' && meta !== null) {
    if (typeof meta.title === 'string' && meta.title.trim() !== '') {
      if (typeof meta.content === 'string' && meta.content.trim() !== '') {
        const icon = typeof meta.icon === 'string' ? meta.icon : '';
        const contentClass = typeof meta.contentClass === 'string' ? meta.contentClass : '';
        const maxVisible = meta.maxVisible ?? true;
        const minVisible = meta.minVisible ?? true;
        const disableResize = meta.disableResize ?? false;
        // create the window
        const windowHTML = `
          <window>
            <nav>
              ${icon ? `<icon><img src="${icon}" loading="lazy"></icon>` : '<icon></icon>'}
              <name>${meta.title}</name>
              <actions>
                ${minVisible ? `<div class="minbtn">⎯</div>` : ''}
                ${maxVisible ? `<div class="maxbtn" onclick="togmax(this.parentElement.parentElement.parentElement)"><span class="maxico"></span></div>` : ''}
                <div class="closebtn" onclick="closewindow(this.parentElement.parentElement.parentElement); ">✕</div>
              </actions>
            </nav>
            <content class="${contentClass}">
              ${meta.content}
            </content>
          </window>
        `;

        // temp container
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = windowHTML;

        // window
        const windowElement = tempDiv.querySelector('window');
        windowElement.style.top = `${windowoffset}px`;
        windowElement.style.left = `${windowoffset}px`;
        windowoffset = (windowoffset + 24) % (6 * 24);

        // management
        let classname = `window_${randomString(8)}_${Math.floor(Math.random() * 1000)}`;
        windowElement.classList.add(classname);
        windows.push(classname);

        setTimeout(() => {
          document.querySelector('container').appendChild(windowElement);
          dragElement(windowElement);
          indexing(windowElement);
if (!disableResize) {
  let isResizing = false;

  windowElement.addEventListener('mousedown', (event) => {
    const rect = windowElement.getBoundingClientRect();
  const isNearRight = event.clientX > rect.right - 8 && event.clientX < rect.right + 8;
  const isNearBottom = event.clientY > rect.bottom - 8 && event.clientY < rect.bottom + 8;

  if (isNearRight || isNearBottom) {
    event.preventDefault(); // Disable text selection during resizing
    isResizing = true;

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = parseInt(document.defaultView.getComputedStyle(windowElement).width, 10);
    const startHeight = parseInt(document.defaultView.getComputedStyle(windowElement).height, 10);

    function handleMouseMove(e) {
      if (isResizing) {

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
if (startWidth + dx >= window.innerWidth || startHeight + dy >= window.innerHeight) {
         return
        }
        windowElement.style.width = startWidth + dx + 'px';
        windowElement.style.height = startHeight + dy + 'px';
        
      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {isResizing = false;});
  }
  });
  windowElement.addEventListener('mousemove', (event) => {
    const rect = windowElement.getBoundingClientRect();
    const isNearBottomRight = event.clientX > rect.right - 32 && event.clientY > rect.bottom - 32;

    if (isNearBottomRight) {
      windowElement.style.cursor = 'se-resize';
    } else {
      windowElement.style.cursor = 'default';
    }
  });
}

          setTimeout(() => {
            const jsEle = windowElement.querySelectorAll('javascript');
          jsEle.forEach(scrEle => {
            scrEle.style.display = 'none';
            const scrCtx = scrEle.innerText;
            const scr = new Function(scrCtx);
            scr.call(windowElement); // Setting "this" to the spawned window
            
          });
          },300)
          setTimeout(() => {windowoffset = 32;},5000)
        }, windowoffset * 5);

        return classname;
      } else {
        console.error("'content' must be a non-empty string.");
        return 1;
      }
    } else {
      console.error("'title' must be a non-empty string.");
      return 1;
    }
  } else {
    console.error('Invalid metadata format. Expected [object Object].');// :trolling:
    return 1; 
  }
}


function closeWindows() {
  let times = Math.floor(windows.length/10) + 3 // formula
  for (let x = 0; x < times;x++) {
    closeWindowsPart(); // spam this function so all windows are closed.
  }
}

function closeWindowsPart() {
  for (let i = 0; i < windows.length; i++) {
  
    let b = i;
    let win = document.querySelector(`.${windows[b]}`);
    //while (true) {
    try {
      
      closewindow(win);
    //  break;
    } catch (e) {
      console.log(win,document.querySelector(`.${windows[b]}`),b,windows[b])
      console.log(e)
   //      }
  }
 }
}
let speed = 10;
let off = 0.1
let velocity = 0.0001
setInterval(() => {
  if (document.querySelector('.dvd') == null) {return}
  const dvdElements = document.querySelectorAll('.dvd');
  
  dvdElements.forEach(dvdElement => {
    if (speed < 100) {
      const radius = window.innerHeight / 2;
      speed = speed + off
      const angle = performance.now() * speed / 1000;
      const x = radius * Math.cos(angle) + window.innerWidth / 2;
      const y = radius * Math.sin(angle) + (window.innerHeight - 200) / 2;

      dvdElement.style.left = `${x}px`;
      dvdElement.style.top = `${y}px`;
      off = off + 0.1;
    } else {
      velocity = velocity + 0.0005
      let y = Number(dvdElement.style.top.slice(0,-2))
      y = y + y * velocity
      
      dvdElement.style.top = `${y}px`;
      setTimeout(() => {dvdElement.remove();speed = 2; off = 0.1; velocity = 0.005;max = false;},2000)
      
    }

  });
}, 16); // 60 FPS
