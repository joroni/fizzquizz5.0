
$('#pop-alert').hide();
/*********** RUN ONLY ONCE JUST TO GET THE LATEST USER'S QUIZ RECORD IN A TABLE ****************/
function get_Quiz_History() {
    //$('#output').empty();
    var user_id = localStorage.getItem('user_id');
    $('#output').html('<th style="padding: 0 5px; background: silver;"><h5>Stats</h5></th><th style="padding: 0 5px; background: silver;"><h5>Score</h5></th>');
    $.getJSON(base_url + '/index.php/get_user_quiz_history/' + user_id, function (results) {


        //$.each(result, function ( i, field ) {
        $.each(results, function (i, fields) {

            $("#output").append("<tr><td> " + fields.datefrom + " </td><td>" + fields.score_bottle + "</td></tr>");


        });
    })
}


/*********** RUN ONLY ONCE JUST TO GET THE DATE FROM LAST ROW ON THE TABLE ****************/
function get_last_quiz_row() { //get_last_quiz_row
    //$('#output').empty();
    var user_id = localStorage.getItem('user_id');

    $.getJSON(base_url + '/index.php/get_user_quiz_last_record/' + user_id, function (results) {


        //$.each(result, function ( i, field ) {
        $.each(results, function (i, fields) {

            $("#output2").append("<li> " + fields.datefrom + " </li>");
            //$('#user_id').text(field.id);
            //    console.log(field.attempts);
            //  console.log(field.datefrom);
            //  console.log(field.score_bottle);
            var checkLQuiz = fields.datefrom;

            localStorage.setItem('checkLQuiz', checkLQuiz);
            console.log("checkLQuiz", checkLQuiz);


        });
    })
}
//get_Quiz_History();



function myFunction() {
    $('#capturePhoto').hide();
    // window.location.replace('main.html');
}



function delayAlertShow() {
    setTimeout(function () {
        $('#pop-alert').show();
        $('#getStarted2').show();
        $('#getStarted2').removeAttr('disabled', 'disabled');
    }, 10000);
    $('#getStarted2').attr('disabled', 'disabled');
    $('#getStarted2').html('LOADING PROFILE...');



}

/*********** RUN ONLY ONCE JUST TO GET THE DATE FROM LAST ROW ON THE TABLE ****************/
function validateMyTurn() {
    //getInitQuizData


    var myDivision2 = localStorage.getItem('user_division');
    $.getJSON(base_url + '/index.php/jsonQuiz/' + myDivision2, function (result) {


        console.log('date_published', result.date_published);
        console.log('date_expire', result.date_expire);
        localStorage.setItem('dateFrString', result.date_published);
        localStorage.setItem('dateToString', result.date_expire);
        dateFrStringVerify = localStorage.getItem('dateFrString');
        var checkLastQuiz = localStorage.getItem('checkLQuiz');
        if (dateFrStringVerify === checkLastQuiz) {
            $('#pop-alert').hide();
            loaderSpinMini();
            alertCalculating();
            console.log('Already took');
            $('#getStarted2').attr('disabled', 'disabled');
            $('#getStarted2').html('<p>See you on the next round...</p>');

        } else {
           loaderSpinMini();
            alertCalculatingNewSet();
            console.log('Ok really first time');
            $('#getStarted2').html('<p>PLAY!</p>');
            $('#getStarted2').removeAttr('disabled', 'disabled');
            delayAlertShow();
           // $('#pop-alert').show();

        }


        function alertCalculating(){

            setTimeout(function () {



            $('.sweet-alert .sa.sa-custom').css('display', 'inline-block');
            $('.sweet-alert .sa-icon.sa-success').hide();

            $('.sweet-alert h2').html('checking');
            $('.sweet-alert .sa-confirm-button-container').hide();



            }, 3000);
        }




        function alertCalculatingNewSet(){
            delayAlertShow();
            $('.sweet-alert .sa.sa-custom').css('display', 'inline-block');

            $('.sweet-alert .sa-icon.sa-success').show();

            $('.sweet-alert h2').html('New set of questions available');
            $('.sweet-alert .sa-confirm-button-container').show();
        }

        /*  getInitQuizData(); */


    });
}


/*********** GETTING THE QUESTIONS AND ANSWER SCRIPT  ****************/
function pullFreshQuizItems() { //getQuizData


    var myDivision2 = localStorage.getItem('user_division');
    var endDate = localStorage.getItem('dateToString');


    $.get("http://ec2-54-191-6-205.us-west-2.compute.amazonaws.com/fizzquizzserver/index.php/jsonQuiz/" + myDivision2 + "/" + endDate, function (data) {
        // $( ".result" ).html( data );
        console.log(data);
        // alert( "Load was performed." );
        localStorage.setItem('QuizData', data);
    });


}


function ConfirmOk() {

    $('#pop-alert').hide();
    window.location.replace('fizzquizzData.html');
}



function goto_home() {
    window.location.replace('main.html');
}



//getQuizData();


/*

 function checkQuizTake() {
 var checkAttempt = localStorage.getItem('checkLQuiz');
 var checkDateFrString = localStorage.getItem('dateFrString');
 // $('#modal1').show();

 Date.parse(checkAttempt);
 Date.parse(checkDateFrString);
 //console.log("checkAttempt:", checkAttempt);
 //console.log("checkDateFrString", checkDateFrString);
 if (checkAttempt === checkDateFrString) {
 console.log("2nd Time");
 // $('#popupDialog').show();
 // $('#playQuiz').hide();
 alert("Thank you for taking the quiz! See you for the next rounds.");
 window.location.replace("index.html");

 } else {
 console.log("First Time");
 $('#playQuiz').removeAttr('disabled');
 //  videoScreen();
 // window.open(base_url + "/app/views/media/video.php", "_blank", "location=no", "closebuttoncaption=Return");
 // window.open(base_url + "/app/views/media/teaser.html", "_blank", "location=no", "closebuttoncaption=Return");

 }
 }



 */


$('#playQuiz').on('click', function () {
    $('#raysDemoHolder').hide();
});


get_last_quiz_row();
pullFreshQuizItems();
get_Quiz_History();
validateMyTurn();



