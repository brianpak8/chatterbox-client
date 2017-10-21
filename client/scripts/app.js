// YOUR CODE HERE:

var app = {
  server: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages'
};
$('document').ready(function(event) {
  app.init();

  $('#inputcontainer').on('submit', function(event) {
    console.log('running !!!!!!!!!!!!!!!!!!');
    event.preventDefault();
    app.handleSubmit(event);
  });

});


app.init = function() {
  // $('.name').on('click', function() {
  //   app.handleUsernameClick();
  //   alert(1);
  // });
  // $('#submit').on('submit', function(message) {
  //   app.handleSubmit(message);
  // });

  //preventdefault
  app.fetch();
};

app.send = function(message) {
  $.ajax({
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
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
    data: 'order=-createdAt',
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
  var childrenMessages = $('#chats').children();
  for (var i = 0; i < childrenMessages.length; i++) {
    childrenMessages[i].remove();
  }
};
app.renderMessage = function(message) {
  var temp = $('.message').text(`${message.username} ${message.text} ${message.createdAt}`);
  var filtered = filterXSS(`<div class = user> <span class="name"> ${message.username} </span>: ${message.text} ${message.createdAt}</div>`);
  $('#chats').append(filtered);
};

app.renderRoom = function(name) {
  $('#roomSelect').append("<div>name</div>");
};

app.handleUsernameClick = function() {
  alert(this.username);
};

app.handleSubmit = function(event) {
  event.preventDefault();
  var msg = $('.input').val();
  console.log(msg, '!!!!!!!!!!!!!!!!!!!!!!!!!');

  var message = {
    username: window.location.href.split('=')[1],
    text: msg
  }
  app.send(message);
};

// var getElementsByClassName = function(className, node) {
//   node = node || document.body;
//   var result = [];
//   var nodeNames = node.className.split(' ');
//   if ( nodeNames.includes(className) ) {
//     result.push(node);
//   }
//   var childrenOfNode = node.children;
//   for (var i = 0; i < childrenOfNode.length; i++)  {
//     var tempChild = getElementsByClassName(className, childrenOfNode[i]);
//     result = result.concat(tempChild);
//   }
//   return result;
// };
