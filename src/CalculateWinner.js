const calculateWinner = (squares) => {
    // defining all possible winning combinations
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // loop through combinations
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // check if there is a win
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            // return winner
            return squares[a];
        }
    }
    // if no one wins, return null
    return null;
};

const checkTie = (squares) => {
    // check if all squares are filled -- if true, there is a tie
    return squares.every(square => square !== null);
};

// export functions to use in other files
export default {
    calculate: calculateWinner,
    checkTie: checkTie,
};