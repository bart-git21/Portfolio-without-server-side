
const url__MoveDot = "./pages/game__moveDot.html"
fetch(url__MoveDot)
.then(response=> response.text())
.then(data => document.querySelector("gameMoveDot").innerHTML = data)
.then(function(){gameMoveDot()});

function gameMoveDot() {
    let dot__scene = document.querySelector(".dot__scene");
    
    let dotCounter = 0;
    class Dot {
        constructor(title, xCoord, yCoord, color, speed) {
            this.title = title;
            this.xCoord = xCoord;
            this.yCoord = yCoord;
            this.color = color;
            this.speed = speed;
            // this.myCircle = document.createElement("div");
            this.myCircle = document.createElement("input");
        }

        draw() {
            this.myCircle.setAttribute("input", "text");
            // this.myCircle.style.appearance = "none";

            this.myCircle.classList = "dot";
            this.myCircle.title = dotCounter;
            this.myCircle.style.backgroundColor = this.color;
            this.myCircle.style.borderColor = this.color;
            this.myCircle.addEventListener("click", whoIsActiveDot);
            
            Promise.resolve(this)
            .then(function(val) {
                val.myCircle.style.top = `${val.yCoord - val.myCircle.offsetHeight/2}px`;
                val.myCircle.style.left = `${val.xCoord - val.myCircle.offsetWidth/2}px`;
            })
            
            dot__scene.appendChild(this.myCircle);
        }

        moveRight(speed=200) {
            this.xCoord += this.speed;
            if (this.xCoord >= dot__scene.clientWidth) this.xCoord = dot__scene.clientWidth - 20;
            this.myCircle.style.left = `${this.xCoord}px`;
        }
        moveLeft() {
            this.xCoord -= this.speed;
            if (this.xCoord < 0) this.xCoord = 0;
            this.myCircle.style.left = `${this.xCoord}px`;
        }
        moveUp() {
            this.yCoord -= this.speed;
            if (this.yCoord < 0) this.yCoord = 0;
            this.myCircle.style.top = `${this.yCoord}px`;
        }
        moveDown() {
            this.yCoord += this.speed;
            if (this.yCoord >= dot__scene.clientHeight) this.yCoord = dot__scene.clientHeight - 20;
            this.myCircle.style.top = `${this.yCoord}px`;
        }
    }

    // ========================= create a dot ================================
    let circles = [];
    document.querySelector(".btn-view").addEventListener("click", ()=>{
        let xCoord = document.getElementById("dot-xCoord").value;
        let yCoord = document.getElementById("dot-yCoord").value;
        let color = document.getElementById("dot-color");
        circles.push(new Dot(++dotCounter,+xCoord,+yCoord,color.value,20));
        circles[circles.length-1].draw();
    });

    // ====================== choose the dot to move ==================================
    let activeDot;
    function whoIsActiveDot(e) {
        if ([...this.classList].includes("pulseDot")) {
            activeDot = null;
            this.classList.remove("pulseDot");
            this.removeEventListener("keydown", moveDotByKeyboard);
        }
        else {
            activeDot = circles[this.title-1];
            let dots = document.querySelectorAll(".dot");
            for (let i = 0; i<circles.length; i++) {
                dots[i].classList.remove("pulseDot");
            }
            this.classList.add("pulseDot");
            this.style.caretColor = window.getComputedStyle(this).backgroundColor;
            this.style.outline = "none";
            this.addEventListener("keydown", moveDotByKeyboard);
        }
    }

    // =========================== move ==========================================
    document.querySelector(".move-right").addEventListener("click", ()=>activeDot.moveRight());
    document.querySelector(".move-left").addEventListener("click", ()=>activeDot.moveLeft());
    document.querySelector(".move-up").addEventListener("click", ()=>activeDot.moveUp());
    document.querySelector(".move-down").addEventListener("click", ()=>activeDot.moveDown());

    function moveDotByKeyboard (e) {
        console.log();
        switch (e.key) {
            case "ArrowRight":
                activeDot.moveRight();
                break;
            case "ArrowLeft":
                activeDot.moveLeft();
                break;
            case "ArrowUp":
                activeDot.moveUp();
                break;
            case "ArrowDown":
                activeDot.moveDown();
                break;
        }
    }
    // document.querySelector(".html").addEventListener("keydown", (e) => {
    //     console.log(1);
    //     switch (e.key) {
    //         case "ArrowRight":
    //             activeDot.moveRight();
    //             break;
    //         case "ArrowLeft":
    //             activeDot.moveLeft();
    //             break;
    //         case "ArrowUp":
    //             activeDot.moveUp();
    //             break;
    //         default: 
    //             activeDot.moveDown();
    //     }
    // })
}