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