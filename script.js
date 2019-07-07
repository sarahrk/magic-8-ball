// three different categories of responses
var positiveResponses;
var neutralResponses;
var negativeResponses;

positiveResponses = [
    'Yes',
    'Very likely',
    'It is certain',
    'You can count on it',
    'So it shall be',
    'Definitely',
    'Signs point to yes',
    'As I see it, yes',
    'It is decidedly so',
    'Most likely',
    'Outlook good',
    'Without a doubt',
    'Yes - definitely',
    'You may rely on it'
];

neutralResponses = [
    'Maybe',
    'Answer unclear. Ask again later',
    'Whatever happens, happens',
    'Cannot foretell now',
    'Concentrate and ask again',
    'Consult me later',
    'Reply hazy, try again',
    "Can you repeat the question?",
    'Ask again later',
    'Better not tell you now',
    '…',
    'Focus and ask again',
    "I'm not so sure...",
    'idk'
];

negativeResponses = [
    'No',
    "Chances aren't good",
    'Maybe in a parallel universe',
    'I think not',
    'Nah',
    'The stars say no',
    'Outlook not good',
    'Yeah, nah',
    "Don't count on it",
    'My reply is no',
    'My sources say no',
    'Very doubtful',
    "Don't bet on it",
    'Unlikely'
];


// create an array of the response categories
var responseCategories = [positiveResponses, neutralResponses, negativeResponses];

// function for choosing a random index in any array
// returns a number which can be used to select an index
function chooseRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

$(document).ready(function () {
    // console.log("document ready!");
    // ensure focus is on input field
    $('#user-question').focus();
    // When the user submits a question
    $('#submit-btn').click(function (event) {
        event.preventDefault();

        // console.log("Button clicked!");

        // first check that the field isn't blank
        if ($('#user-question').val().trim() === "") {
            $('#question-error').show();

        } else {
            // ANSWER THE QUESTION

            // hide error message 
            $('#question-error').hide();

            // store the user's question in a local variable
            var userQuestion = $('#user-question').val();
            // console.log('user asked:' + userQuestion);

            // Fade out the question form
            $('#ask-question').addClass('animated fadeOut');

            // Fade out footer
            $('footer').fadeOut();

            // Shake the ball
            $('.ball-container').addClass('animated shake delay-1s');

            // Fade out the number eight
            var ballNumberEight = $('.ball-number-eight');
            ballNumberEight.addClass('animated fadeOut slow delay-2s');

            // Wait for number eight to fade out      
            ballNumberEight.one('animationend', function () {
                // console.log('number eight animation finished')
                // then show the back of the ball
                $('#ball-front').hide();
                $('#ball-back').show();
                $('.ball-window').delay(500).fadeIn(1000);
                $('#question-display').fadeIn(1000);
                $('#button-container').delay(5000).fadeIn(500);

                // Display the user's question on the page
                $('#question-display').html('&ldquo;' + userQuestion + '&rdquo;');

                //Clear the value in the question field
                $('#user-question').val("");

                // Randomly choose one of the response categories
                var chosenResponseCategory = chooseRandomIndex(responseCategories);
                chosenResponseCategory = responseCategories[chosenResponseCategory];

                // console.log("Chosen category is: " + chosenResponseCategory);

                // Then randomly choose a response in that category    
                var chosenResponse = chooseRandomIndex(chosenResponseCategory);
                chosenResponse = chosenResponseCategory[chosenResponse];

                // console.log("Chosen response is: " + chosenResponse);

                // Display the chosen response on the page
                $('#response-display').html(chosenResponse);
                $('.triangle').delay(2000).fadeIn(5000);
                $('#response-display').delay(2000).fadeIn(5000);
            });
        }
    });

    // When the user clicks 'ask another question'
    $('#ask-again').click(function (event) {
        event.preventDefault();

        // console.log("ask again clicked");

        // fade out all the elements on the back of the ball
        $('.ball-window').fadeOut(500);
        $('#question-display').fadeOut(500);
        $('.triangle').fadeOut(500);
        $('#response-display').fadeOut(500);
        $('#button-container').fadeOut(500);
        $('#ball-back').fadeOut(500);

        // clear animation classes that were added when the form was first submitted
        $('#ask-question').removeClass('animated fadeOut');
        $('.ball-container').removeClass('animated shake delay-1s');
        $('.ball-number-eight').removeClass('animated fadeOut slow delay-2s');

        // fade in all the elements on the front of the ball
        $('#ask-question').fadeIn(500)
        $('.ball-number-eight').fadeIn(500);
        $('#ball-front').delay(500).fadeIn(500);
        $('footer').delay(500).fadeIn(500);
    });

    //when 'about' is clicked
    $('#about').click(function (event) {
        event.preventDefault();
        // console.log('about button clicked');
        $('footer').hide();
        $('.ball-container').hide();
        // set display to flex, hide the element, then show() sets it back to previous non-hidden display value (flex)
        $('#about-overlay').css("display", "flex").hide().show();
    });

    //when 'close' is clicked in about-overlay
    $('#close-overlay').click(function (event) {
        event.preventDefault();
        // console.log('close button clicked');
        $('#about-overlay').hide();
        $('footer').show();
        $('.ball-container').show();
        // return focus to input field
        $('#user-question').focus();
    })
});
