export const playGame = (req, res) => {
    try {
      const { playerChoice } = req.body;
      
      // Define the choices array directly in the controller
      const choices = ["rock", "paper", "scissors"];
      
      const compChoice = choices[Math.floor(Math.random() * 3)];
  
      let result = "";
  
      if (playerChoice === compChoice) {
        result = "It's a tie!";
      } else {
        switch (playerChoice) {
          case "rock":
            result = compChoice === "scissors" ? "You win!" : "You lose!";
            break;
          case "paper":
            result = compChoice === "rock" ? "You win!" : "You lose!";
            break;
          case "scissors":
            result = compChoice === "paper" ? "You win!" : "You lose!";
            break;
          default:
            result = "Invalid choice!";
        }
      }
  
      res.status(200).json({ result, playerChoice, compChoice });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  