
// set up some Cross Browser vars

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent


var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];

// set up a schema - which is a combo of the list of colours plus this heading #JSGF V1.0 - schema type stuff
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

// initialise the speech recognition instance - tell it what grammar rules/schema to use
// and this all comes from the browser so wow we don't need to install anything!
var recognition = new SpeechRecognition();

var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

/**
 *
 * From here on is CSS and HTML specicic to demo we dont care about this
 */
var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
colors.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

// so what we care about is how to trigger it:  recognition.start();
// what to do when it understands the input
// do something IF the word is STOP



// what to do when it can't understand the input
// how to end it




document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  console.log(event.results);

  var cmd = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + cmd + '.';

  console.log(typeof cmd);

  // do this ONLY IF the word is DELETE!
  if (cmd === 'delete') {
    console.log('Calling delete-files...');
    $.get( "http://localhost:3000/delete-files", function( data ) {
      console.log(`got result back: ${data}`);
    });
  }





  // tidy up, productionise, add tests and promises


  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  console.log('onspeechend');
  recognition.stop();
}

recognition.onnomatch = function(event) {
  console.log('onnomatch');
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {

  console.log('onerror');

  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
