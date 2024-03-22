  
    console.log = function(...message) {
        let jsOut = document.querySelector(".js-out")
        let out = message.join(" ")
        let outEle = document.createElement("pre")
        outEle.classList.add("out")
        outEle.innerText = out
        outEle.style.color = "#999";
        jsOut.appendChild(outEle)
    };
    console.warn = function(...message) {
        let jsOut = document.querySelector(".js-out")
        let out = message.join(" ")
        let outEle = document.createElement("pre")
        outEle.classList.add("out")
        outEle.innerText = out
        outEle.style.color = "#00FF00";
        outEle.style.fontWeight = "600"
        jsOut.appendChild(outEle)
        
    };
    console.error = function(...message) {
        let jsOut = document.querySelector(".js-out")
        let out = message.join(" ")
        let outEle = document.createElement("pre")
        outEle.classList.add("out")
        let b = console.trace()
        outEle.innerText = out
        outEle.style.color = "#F08080";
        outEle.style.fontWeight = "600"
        jsOut.appendChild(outEle)
        
    };
    console.clear= function() {
        let jsOut = document.querySelector(".js-out")
        jsOut.innerHTML = ""
        console.log("Console was cleared.")
    };


        document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey ) {
        (()=>{
            let jsOut = document.querySelector(".js-out")
        let inpForm = document.querySelector(".input")
        if (inpForm.innerText.replaceAll(" ","").replaceAll("\n","") != "") {
    
        let inpEle = document.createElement("pre")
        
        inpEle.innerText = inpForm.innerText
        inpForm.innerText= "" 
        jsOut.appendChild(inpEle)

        window.scrollTo(0, document.body.scrollHeight);
        try {
        let out = eval(inpEle.innerText);
        let outEle = document.createElement("pre")
        outEle.classList.add("out")
        outEle.innerText = out
        outEle.style.color = "#999";
        jsOut.appendChild(outEle)
        } catch (c) {
        console.error(c)
        let out = c
        let outEle = document.createElement("pre")
        outEle.classList.add("out")
        outEle.innerText = out
        outEle.style.color = "#F08080";
        outEle.style.fontWeight = "600"
        jsOut.appendChild(outEle)
        }
        } else {
            inpForm.innerText = inpForm.innerText.replaceAll(" ","").replaceAll("\n","")
        }
        })();
        

    }
});