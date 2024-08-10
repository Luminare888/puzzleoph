document.addEventListener('DOMContentLoaded', () => {
    const piezas = document.querySelectorAll('.pieza');
    const dropzones = document.querySelectorAll('.dropzone');

    piezas.forEach(pieza => {
        pieza.addEventListener('dragstart', dragStart);
    });

    dropzones.forEach(zone => {
        zone.addEventListener('dragover', dragOver);
        zone.addEventListener('drop', drop);
    });

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    }

    function dragOver(event) {
        event.preventDefault();
        event.target.classList.add('over');
    }

    function drop(event) {
        event.preventDefault();
        const idPieza = event.dataTransfer.getData('text');
        const pieza = document.getElementById(idPieza);

        if (event.target.classList.contains('dropzone') && 
            event.target.getAttribute('data-id') === idPieza) {
            event.target.appendChild(pieza);
            event.target.classList.remove('over');
            checkPuzzleCompletion();
        }
    }

    function checkPuzzleCompletion() {
        const allPlaced = Array.from(dropzones).every(zone => 
            zone.children.length > 0 && 
            zone.children[0].id === zone.getAttribute('data-id')
        );

        if (allPlaced) {
            triggerCompletionEffects();
        }
    }

    function triggerCompletionEffects() {

        const message = document.createElement('div');
        message.textContent = '';
        message.classList.add('completion-message');
        document.body.appendChild(message);

        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
    }
});
