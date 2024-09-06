// Load audio files
const happySound = new Audio('Triumph.mp3');
const sadSound = new Audio('Lose.mp3');



const buttons = document.querySelectorAll('.key-btn');
let activeListener = null;
let activeButton = null;

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const expectedKey = this.getAttribute('data-key');

        // Reset all buttons to their default state
        buttons.forEach(btn => btn.classList.remove('active', 'correct', 'wrong'));

        // Mark the current button as active
        this.classList.add('active');
        activeButton = this;

        // Remove any existing event listener before adding a new one
        if (activeListener) {
            document.removeEventListener('keydown', activeListener);
        }

        activeListener = function(event) {
            if (event.key.toLowerCase() === expectedKey) {
                // If the correct key is pressed
                happySound.play();
                activeButton.classList.remove('active', 'wrong');
                activeButton.classList.add('correct');
                document.removeEventListener('keydown', activeListener);

                // Reset color after the happy sound ends
                happySound.onended = () => {
                    activeButton.classList.remove('correct');
                    activeButton.classList.add('key-btn');
                };
            } else {
                // If the wrong key is pressed
                sadSound.play();
                activeButton.classList.add('wrong');
            }
        };

        document.addEventListener('keydown', activeListener);
    });
});