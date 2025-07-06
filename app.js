let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX playerO

//2D Array
//Game Pattern
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        if(turnO){
            box.innerText = "O";
            turnO = false;
        } else{
            box.innerText = "X";
            box.style.color = "darkblue"
            turnO = true;
        }
        box.disabled = true; //SO THAT EACH BOXES CAN BE CLICKED ONLY ONCE

        checkWinner();
    });

    const checkWinner = () => {
        for(let pattern of winPatterns){
            // console.log(pattern[0], pattern[1], pattern[2]);

            // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
                //If none of the box is not empty then only check
                if(pos1Val === pos2Val && pos2Val === pos3Val){
                    console.log(pos1Val,"is the Winner!!");
                    showWinner(pos1Val);
                }
            }
        }
    }

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }

    const disableBoxes = () => {
        //DISABLE ALL BOXES IF GAME IS OVER
        for(let box of boxes){
            box.disabled = true;
        }
    }

});

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);