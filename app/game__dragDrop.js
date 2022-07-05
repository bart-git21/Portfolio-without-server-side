const url__gameDragDrop = "./pages/game__dragDrop.html"
fetch(url__gameDragDrop)
.then(response=> response.text())
.then(data=> document.querySelector("gameDragDrop").innerHTML = data)
.then(function(){dragDrop()});

function dragDrop() {
    const CATS = [ // src, alt && innerHTML for answers, id
        ["https://img.freepik.com/free-photo/purebred-abyssinian-young-cat-portrait_155003-1529.jpg?t=st=1651939498~exp=1651940098~hmac=bdc7999bea67436b07d157bfed6d3abe9df6145c393db3ef907e8e52e5c114e9&w=1060", "Абиссинская кошка", "abyssinian"],
        ["https://img.freepik.com/free-photo/gold-bengal-cat-white-space_155003-12734.jpg?t=st=1651942026~exp=1651942626~hmac=bb13570993fdcf2d26bca1469e40b2df91f915c49c675f8bf10642bed44f6d41&w=1380", "Бенгальская", "bengal"],
        ["https://cattime.com/assets/uploads/2011/12/file_2738_american-bobtail-460x290-460x290.jpg", "бобтейл", "bobtail"],
        ["https://petsi.net/images/catbreed/munchkin.jpg", "Манчкин", "munchkin"],
        ["https://images.unsplash.com/photo-1612467669054-4a7101fed458?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80", "Ориентал", "oriental"],
        ["https://img.freepik.com/free-photo/adorable-persian-cat-is-sitting-table-lamp_613910-19883.jpg?t=st=1656954484~exp=1656955084~hmac=3f6d6bf8178465ee9dfbb53bb620c0c581e5d75b977172abcc651c16ba197a86&w=1380", "Персидская длинношерстная", "persian"],
        ["https://www.thehappycatsite.com/wp-content/uploads/2018/09/where-do-savannah-cats-come-from-SC-long.jpg", "Саванна", "savannah"],
        ["https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80", "Сиамская", "siamese"],
        ["https://www.hillspet.ru/content/dam/cp-sites/hills/hills-pet/en_us/exported/cat-care/images/singapura-cat-on-purple-background.jpg", "Сингапура", "singapura"],
        ["https://images.unsplash.com/photo-1607623488989-d22660f2cc17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3BoeW54JTIwY2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", "Канадский сфинкс", "Sphynx"],
    ]
    
    let draggablePictureAlt = "";
    let draggablePictureParent;
    
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
            [array[i], array[j]] = [array[j], array[i]];
        }
      }
    
    
    // ============================ START ===========================
    
    document.querySelector(".dragDrop__startBtn").addEventListener("click", dragDrop__start);
    function dragDrop__start() {
        shuffle(CATS);
        let firstFiveCats = CATS.slice(0,5);
        shuffle(firstFiveCats);
    
        document.querySelector(".dragDrop__pictures").innerHTML = null;
        for (let i = 0; i<5; i++) {
            document.querySelector(".dragDrop__pictures").innerHTML += 
            `
                <div class="imageBox"><img id="pic-${CATS[i][2]}" src="${CATS[i][0]}" alt="${CATS[i][1]}" draggable="true"></div>
            `;
        }
        
        document.querySelector(".dragDrop__catBreeds").innerHTML = null;
        for (let i = 0; i<5; i++) {
            document.querySelector(".dragDrop__catBreeds").innerHTML += 
            `
                <div class="box imageBox">${firstFiveCats[i][1]}</div>
            `;
        }
    
        const boxes = document.querySelectorAll(".wrapper > .box");
        const images = document.querySelectorAll("img");
    
        boxes.forEach(function(item) {
            item.addEventListener("dragstart", dragStartEvent);
            item.addEventListener("dragover", dragOverEvent);
            item.addEventListener("dragenter", dragEnterEvent);
            item.addEventListener("dragleave", dragLeaveEvent);
            item.addEventListener("drop", dropEvent);
            item.addEventListener("dragend", dragEndEvent);
        })
        images.forEach(function(item) {
            item.addEventListener("dragstart", dragStartEvent);
            item.addEventListener("dragend", dragEndEvent);
        })
    }
    
    // ===================== DnD functions
    
    function dragStartEvent(e) {
        e.target.style.borderColor = "red";
        e.target.style.scale = 0.5;
        
        draggablePictureAlt = e.target.alt;
        e.dataTransfer.setData("text", e.target.id);
        draggablePictureParent = this.parentElement;
    
    }
    function dragOverEvent(e) {
        e.preventDefault();
        return false;
    }
    function dragEnterEvent() {
        this.classList.add("over");
    }
    function dragLeaveEvent(e) {
        e.target.classList.remove("over");
    }
    function dropEvent(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.classList.remove("over");
        
        let droppedPictureId = e.dataTransfer.getData("text");
        if (this.innerHTML == draggablePictureAlt) {
            this.appendChild(document.getElementById(droppedPictureId));
            draggablePictureParent.style.display = "none";
        }
        else console.log("no");
        
    }
    function dragEndEvent(e) {
        e.target.style.borderColor = "";
        e.target.style.scale = 1;
    }

}
