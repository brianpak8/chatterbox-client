// YOUR CODE HERE:
/*
libraries
keys

*/



var app = {
  server: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages'
};
$('document').ready(function() {
  app.init();
  app.fetch();
  
  //$('.username').on('click', app.handleUsernameClick);
  // for(var i = 0; i < text.length; i++) {
  //   console.log(this.renderMessage(text[i].data));
  // }
});
// app.fetch();


app.init = function() {
  $('.username').on('click', function() {
    app.handleUsernameClick();
  });
  
  
};

app.send = function(message) {
  $.ajax({
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });

};
app.fetch = function() {
  $.ajax({
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('message received', data);
      data.results.forEach(app.renderMessage);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  // console.log(document.body.getElementById('chats'));
  // var target = $('#chats').children();
  // for (var i = 0; i < target.length; i++) {
  //   target.pop();
  // }
  var childrenMessages = $('#chats').children();
  for (var i = 0; i < childrenMessages.length; i++) {
    childrenMessages[i].remove();
  }
};

app.renderMessage = function(message) {
  // var $message = <

  //`<div class = user> ${message.username} ${message.text} ${message.createAt} </div>`
  $('#chats').append(`<div class = user> ${message.username} ${message.text} ${message.createAt} </div>`);

};

app.renderRoom = function(name) {
  $('#roomSelect').append("<div>name</div>");
};

app.handleUsernameClick = function() {
  console.log('name');
};






