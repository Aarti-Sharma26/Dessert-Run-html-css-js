$(document).ready(function() {
    var giphyContainer = $('.giphy-container');
    var camelContainer = $('.camel-container');
    var camel = $('.camel');
    var runningBoy = $('.runningBoy');
    var collisionOccurred = false;
    var scoreInterval;

    // Key events for moving giphyContainer
    $(document).keydown(function(event) {
        if (event.keyCode == 38) { // 38 is the keyCode for the up arrow key
            giphyContainer.animate({ top: '20%' }, 600);
        }
    });

    $(document).keyup(function(event) {
        if (event.keyCode == 38) { // 38 is the keyCode for the up arrow key
            giphyContainer.animate({ top: '55%' }, 700);
        }
    });

    // Collision check function
    function checkCollision() {
        if (!collisionOccurred) {
            // Get positions and dimensions
            var giphyOffset = runningBoy.offset();
            var giphyWidth = runningBoy.width();
            var giphyHeight = runningBoy.height();

            var camelOffset = camel.offset();
            var camelWidth = camel.width();
            var camelHeight = camel.height();

            // Calculate boundaries
            var giphyLeft = giphyOffset.left;
            var giphyRight = giphyOffset.left + giphyWidth;
            var giphyTop = giphyOffset.top;
            var giphyBottom = giphyOffset.top + giphyHeight;

            var camelLeft = camelOffset.left;
            var camelRight = camelOffset.left + camelWidth;
            var camelTop = camelOffset.top;
            var camelBottom = camelOffset.top + camelHeight;

            // Check for collision
            if (!(giphyBottom < camelTop ||
                  giphyTop > camelBottom ||
                  giphyRight < camelLeft ||
                  giphyLeft > camelRight)) {
                // Collision detected
                camelContainer.css('animation', 'none');
                var scoreValue = $('.score').text();
                $('.myScore').html(scoreValue);
                $('.outModalContainer').css('display', 'block');
                collisionOccurred = true;

                clearInterval(scoreInterval); // Stop score counter
            }
        }
    }

    // Initialize collision check
    setInterval(checkCollision, 100);

    // Score counter function
    function scoreCounter() {
        var count = 0;
        var counterElement = $('.score');

        function updateCounter() {
            if (!collisionOccurred) {
                counterElement.text(++count);
            }
        }

        scoreInterval = setInterval(updateCounter, 100); // Update score every 100ms
    }

    // Initialize score counter
    scoreCounter();

    // Try Again button click handler
    $('.tryAgain').on('click', function(event){
        event.preventDefault();
        $('.outModalContainer').css('display', 'none');
        collisionOccurred = false; // Reset collision flag
        $('.score').text('0'); // Reset score
        scoreCounter(); // Restart score counter
        camelContainer.css('animation', ''); // Remove inline style
    });
});
