const url__gameGuessWord = "./pages/game__guessWord.html"
fetch(url__gameGuessWord)
.then(response=> response.text())
.then(data=> document.querySelector("gameGuessWord").innerHTML = data)
.then(function(){gameGuessWord()});

function gameGuessWord() {
    const desk = document.querySelector(".games__guessWord__desk");
    document.querySelector(".games__guessWord__startBtn").addEventListener("click", startGame);

    function comment(text) {
        document.querySelector(".games__guessWord__computer-text").innerHTML = text;
    }

    function shine(spans, letter) {
        for (let i = 0; i < spans.length; i++) {
            if (spans[i].textContent === letter) {
                spans[i].classList.toggle("shine");
            }
        }
    }

    function flicker(spans) {
        for (let i = 0; i < spans.length; i++) {
            spans[i].classList.toggle("flicker");
        }
    }

    function blink(spans) {
        const random = Math.floor(Math.random() * spans.length);
        spans[random].classList.toggle("blink");
    }

    function startGame() {
        // создаем состояние игры
        const words = [
            "string",
            "boolean",
            "number",
            'bigint',
            "object",
        ]
        const word = words[Math.floor(Math.random() * words.length)];
        let remainingLetters = word.split("");
        desk.innerHTML = null;
        for (let i = 0; i < word.length; i++) {
            let span = document.createElement("span");
            span.classList.add("span");
            span.textContent = "_"
            desk.appendChild(span);
        }

        document.addEventListener("keyup", user);
        comment("Write a letter");
        let spans = document.querySelectorAll(".span");

        // игровой цикл
        function user(e) {
            // запрашиваем ответ игрока
            let letter = e.key;
            if (letter.length > 1 || letter.search(/[a-z]/i) == -1) comment("write a single letter")
            else {
                if (remainingLetters.includes(letter)) {

                    // обновляем состояние игры
                    remainingLetters = remainingLetters.filter(e => e != letter);
                    for (let i = 0; i < word.length; i++) {
                        if (word[i] === letter) spans[i].textContent = letter;
                    }
                    shine(spans, letter);

                    // показываем
                    if (remainingLetters.length) comment(`Correct letter! The remaining letters are ${remainingLetters.length}`)
                    else {
                        document.removeEventListener("keyup", user);
                        flicker(spans);
                        blink(spans);
                        comment("Congratulations! You are the winner!");
                    }
                }
                else {
                    comment(`No, it's wrong. <br>Write another letter.`);
                }
            }
        }

    }

}
