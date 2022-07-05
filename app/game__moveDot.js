
const url__MoveDot = "./pages/game__moveDot.html"
fetch(url__MoveDot)
.then(response=> response.text())
.then(data => document.querySelector("gameMoveDot").innerHTML = data)
.then(function(){gameMoveDot()});

function gameMoveDot() {
    let dot__scene = document.querySelector(".dot__scene");
    
    function createCircle() {
        let circle = document.createElement("div");
        return circle;
    }

    let dotCounter = 0;
    class Dot {
        constructor(title, xCoord, yCoord, color, speed) {
            this.title = title;
            this.xCoord = xCoord;
            this.yCoord = yCoord;
            this.color = color;
            this.speed = speed;
            this.myCircle = createCircle();
        }

        draw() {
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
        }
        else {
            activeDot = circles[this.title-1];
            let dots = document.querySelectorAll(".dot");
            for (let i = 0; i<circles.length; i++) {
                dots[i].classList.remove("pulseDot");
            }
            this.classList.add("pulseDot");
        }

        // let dots = document.querySelectorAll(".dot");
        // // если выбрать ту же точку - она перестанет моргать и перестанет двигаться
        // if([...e.target.classList].find(e=>e=="pulseDot")) {
        //     e.target.classList.remove("pulseDot");
        //     activeDot = null;
        // }
        // // если выбрать другую точку - предыдущая вернет первоначальный вид, а данная начнет моргать и двигаться
        // else {
        //     for (let i = 0; i<circles.length; i++) {
        //         dots[i].style.backgroundColor = circles[i].color;
        //         dots[i].classList.remove("pulseDot");
        //     }
        //     e.target.classList.toggle("pulseDot");
        //     e.target.style.backgroundColor = null;
        //     activeDot = circles.find(elem=> elem.title === +e.target.title);
        // };
    }

    // =========================== move ==========================================
    document.querySelector(".move-right").addEventListener("click", ()=>activeDot.moveRight());
    document.querySelector(".move-left").addEventListener("click", ()=>activeDot.moveLeft());
    document.querySelector(".move-up").addEventListener("click", ()=>activeDot.moveUp());
    document.querySelector(".move-down").addEventListener("click", ()=>activeDot.moveDown());

    document.querySelector("html").addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") activeDot.moveRight()
        else if (e.key === "ArrowLeft") activeDot.moveLeft()
        else if (e.key === "ArrowUp") activeDot.moveUp()
        else if (e.key === "ArrowDown") activeDot.moveDown()
    })
}