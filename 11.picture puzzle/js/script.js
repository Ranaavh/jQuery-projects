$(document).ready(function() {
    const imageUrl = 'images/Free-Photo-740x492-2148873023.jpg'; // Corrected image path
    const pieceSize = 100;
    const puzzleSize = 3; // 3x3 puzzle

    const totalPieces = puzzleSize * puzzleSize;
    let pieces = [];

    // Create partitions on the center side
    for (let i = 0; i < totalPieces; i++) {
        const partition = $('<div></div>').addClass('partition').attr('data-index', i);
        $('#center-container').append(partition);
    }

    // Create puzzle pieces
    for (let row = 0; row < puzzleSize; row++) {
        for (let col = 0; col < puzzleSize; col++) {
            const piece = $('<div></div>').addClass('puzzle-piece').attr('data-row', row).attr('data-col', col);
            piece.css({
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: `-${col * pieceSize}px -${row * pieceSize}px`
            });
            pieces.push(piece);
        }
    }

    // Randomly select 3 pieces to fill the partitions
    const shuffledPieces = pieces.sort(() => Math.random() - 0.5);
    const selectedPieces = shuffledPieces.slice(0, 3);
    const remainingPieces = shuffledPieces.slice(3);

    selectedPieces.forEach((piece, index) => {
        const partition = $(`#center-container .partition`).eq(index);
        piece.css({
            top: 0,
            left: 0,
            position: 'absolute'
        });
        partition.append(piece);
    });

    // Append remaining pieces to the below container
    remainingPieces.forEach(piece => {
        piece.css({ position: 'relative', top: 0, left: 0 });
        $('#below-container').append(piece);
    });

    // Make pieces draggable and droppable
    $('.puzzle-piece').draggable({
        containment: 'body',
        revert: 'invalid'
    });

    $('.partition').droppable({
        accept: '.puzzle-piece',
        drop: function(event, ui) {
            const $this = $(this);
            const droppedPiece = ui.draggable;

            // Check if the partition is already filled
            if ($this.children().length === 0) {
                droppedPiece.css({
                    top: 0,
                    left: 0,
                    position: 'absolute'
                });
                $this.append(droppedPiece);
            }

            // Check if the puzzle is complete
            checkPuzzleCompletion();
        }
    });

    // Function to check if the puzzle is complete
    function checkPuzzleCompletion() {
        let isComplete = true;
        $('#center-container .partition').each(function() {
            const partitionIndex = $(this).data('index');
            const piece = $(this).children('.puzzle-piece');
            if (piece.length === 0) {
                isComplete = false;
                return false;
            }
            const pieceRow = piece.data('row');
            const pieceCol = piece.data('col');
            const expectedIndex = pieceRow * puzzleSize + pieceCol;
            if (partitionIndex !== expectedIndex) {
                isComplete = false;
                return false;
            }
        });
        if (isComplete) {
            alert('Congratulations! You have completed the puzzle!');
        }
    }
});
