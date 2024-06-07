const matrix = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function generateSudokuGrid() {
    const $sudokuGrid = $('#sudoku-grid');

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const $cell = $('<div>').addClass('cell');

            const $input = $('<input>')
                .attr({
                    type: 'number',
                    min: '1',
                    max: '9',
                    maxlength: '1',
                    size: '1'
                })
                .addClass('input-field');

            // Set initial value from matrix
            $input.val(matrix[i][j] === 0 ? '' : matrix[i][j]);

            $cell.append($input);
            $sudokuGrid.append($cell);
        }
    }
}

function validateSudoku() {
    const $sudokuCells = $('.input-field');
    const sudokuArray = [];

    $sudokuCells.each(function() {
        const value = $(this).val().trim();
        sudokuArray.push(value === '' ? 0 : parseInt(value));
    });

    // Correct Sudoku matrix
    const correctMatrix = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

    let isValid = true;

    for (let i = 0; i < 9 && isValid; i++) {
        for (let j = 0; j < 9 && isValid; j++) {
            if (sudokuArray[i * 9 + j] !== correctMatrix[i][j]) {
                isValid = false;
            }
        }
    }

    $('#result').text(isValid ? 'Valid Sudoku!' : 'Not valid');
}

$(document).ready(function() {
    generateSudokuGrid();
});
