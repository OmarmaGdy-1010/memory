

let body = document.querySelector("body");
let start = document.querySelector(".control-buttons span");
let startmain = document.querySelector(".control-buttons");


start.onclick = function () {
    //------------------------ create section -----------------------

    let myDiv = document.createElement("div");
    let mypop = document.createElement("div");
    let quisthon = document.createElement("h3");
    let btn = document.createElement("button");
    let inp = document.createElement("input");
    myDiv.setAttribute("class", "submit");
    mypop.setAttribute("id", "mypop");
    quisthon.innerText = "What's Your Name?";
    btn.innerHTML = "Play";
    //------------------------ append in html -------------------
    mypop.appendChild(myDiv);
    myDiv.prepend(inp);
    myDiv.appendChild(btn);
    myDiv.prepend(quisthon);
    body.prepend(mypop);
    startmain.remove();

    //--------------------------------------
    btn.onclick = function () {


        if (inp.value == null || inp.value == "") {
            document.querySelector(".name").innerHTML += "Unknown";
        } else {
            document.querySelector(".name").innerHTML += inp.value;
        }
        mypop.remove();
    };
};




//---------------------------------------------------------------------------------------------------------------------------------------
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocks.length).keys());







let macth = 0;
blocks.forEach((block) => {
    block.style.order = Math.floor(Math.random() * blocks.length) + 1;
    block.addEventListener("click", function () {
        document.getElementById("flip").play();
        block.classList.add("is-flipped");
        let allFlippedBlocks = blocks.filter(block => block.classList.contains("is-flipped"));
        if (allFlippedBlocks.length == 2) {
            macth += 1;
            stopClicking();
            checkMatchedBlocks(allFlippedBlocks[ 0 ], allFlippedBlocks[ 1 ]);
            if (macth == 10) {
                for (let i = 0; i < 10; i++) {
                    setInterval(() => {
                        blocks[ i++ ].style.transform = 'rotateX(90deg)';
                    }, 100);
                }
                playagain();
            }
        }
    });
});















function stopClicking() {
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}





function checkMatchedBlocks(f, s) {
    
    let triesElement = document.querySelector(".tries span");
    if (f.dataset.num === s.dataset.num) {
        
        document.getElementById("sucsess").play();
        f.classList.remove("is-flipped");
        s.classList.remove("is-flipped");
        f.classList.add("has-match");
        s.classList.add("has-match");
        console.log(macth)

    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        document.getElementById("negative").play();
        setTimeout(() => {
            f.classList.remove("is-flipped");
            s.classList.remove("is-flipped");
        }, duration);
        document.getElementById('fail').play();
    }
}





function playagain() {
    let endContainer = document.querySelector(".end-container");
    let btnTryAgain = document.getElementById("try");
    document.getElementById("win").play();
    setTimeout(() => {
        endContainer.style.display = "block";
    }, 3000);
    btnTryAgain.addEventListener("click", function () {
        endContainer.style.display = "none";
        location.reload();
    });
}





