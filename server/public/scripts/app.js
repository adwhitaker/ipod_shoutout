$(document).ready(function(){
  var personShoutout = [];
  var currentPerson = 0;
  var timer;

    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        // data: name, githubUserName, shoutout

        // this puts each person into an index of the personShoutout array;
        data.forEach(function(person) {
          personShoutout.push(person);
        })

        // prints first person on document load;
        printPerson(personShoutout[currentPerson]);
        progressBar(personShoutout, currentPerson);

        // event listener for the previous button
        // removes current shoutout from the POM
        // decrements currentPerson and prints the previous shoutout
        $('#previous').on('click', function() {
          $('.person').fadeOut('slow', function () {
            clearTimeout(timer);
            $(this).remove();
            currentPerson--;
            if (currentPerson < 0) {
              currentPerson = (personShoutout.length) - 1;
            }
          printPerson(personShoutout[currentPerson]);
          progressBar(personShoutout, currentPerson);
          nextPerson();
          });
        })

        // event listener for the next button
        // removes current shoutout from the POM
        // decrements currentPerson and prints the next shoutout
        $('#next').on('click', function() {
          $('.person').fadeOut('slow', function (){
            clearTimeout(timer);
            $(this).remove();
            currentPerson++;
            if (currentPerson > (personShoutout.length) - 1) {
              currentPerson = 0;
            }
            printPerson(personShoutout[currentPerson]);
            progressBar(personShoutout, currentPerson);
            nextPerson();

          });
        })

        // event listener to jump ahead or back to the counter box clicked on
        $('.counter').on('click', '.box', function() {
          currentPerson = $(this).data('boxPerson');
          $('.person').fadeOut('slow', function (){
            clearTimeout(timer);
            $(this).remove();
            printPerson(personShoutout[currentPerson]);
            progressBar(personShoutout, currentPerson);
            nextPerson();
          });
        })

        // 10 second timer to change to next shoutout if no button is clicked
        function nextPerson() {
        	timer = setTimeout(function() { $("#next").click(); nextPerson() }, 10000);
        }
        nextPerson(); // initial nextPerson
      } // end of success
    }); // end of AJAX
}); // end of $(function )

// prints a shoutout to the DOM
function printPerson(person) {
  var $personDiv = $('<div class="person"></div>');
  $personDiv.append('<h2>' + person.name + '</div>');
  $personDiv.append('<p><span class="github">github@ </span>' + person.githubUserName + '</div>');
  $personDiv.append('<p>' + person.shoutout + '</div>');

  $('#shoutout-person').append($personDiv);
  $personDiv.fadeIn('slow');
}

// adds progress bar to DOM
function progressBar(peopleArray, currentPerson) {
  $('.box').remove();
  for (var i = 0; i < peopleArray.length; i++) {
    var $box = $('<div class="box"></div>');
    $box.data('boxPerson', i);
    $('.counter').append($box);
    if (i <= currentPerson) {
      $('.box').addClass('boxColor');
    }
  }
}
