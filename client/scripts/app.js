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
  console.log('hi');

  //$('.username').on('click', app.handleUsernameClick);
  // for(var i = 0; i < text.length; i++) {
  //   console.log(this.renderMessage(text[i].data));
  // }
});
// app.fetch();


app.init = function() {
  $('.name').on('click', function() {
    app.handleUsernameClick();
    alert(1);
  });
  $('#submit').on('submit', function() {
    app.handleSubmit();
  });
  app.fetch();
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
//message is an object
app.renderMessage = function(message) {
  // var $message = <
  // message = message.text();
  //console.log(message);
  //`<div class = user> ${message.username} ${message.text} ${message.createAt} </div>`
  // console.log(message.createAt);
  var temp = $('.message').text(`${message.username} ${message.text} ${message.createdAt}`);
  var filtered = filterXSS(`<div class = user> <span class="name"> ${message.username} </span>: ${message.text} ${message.createdAt}</div>`);
  // console.log(temp);
  // // //console.log(temp)
  // // $('#chats').append(temp);
  // var re = new Regex("[;\\/:*?\"<>|&']");
  // var output = re.replace(inputString, " ");
  // var msg = output(message.username);
  // var createAt = output(message.createAt);
  // var text = output(message.text);
  $('#chats').append(filtered);
  //$('#chats').append(`<div class = user> <span class="name"> ${msg} </span>: ${createAt} ${text} </div>`);
  // $('#chats').append(`<div class = user> <span class="name">${message.username}</span>: ${message.text} ${message.createdAt} </div>`);
};

app.renderRoom = function(name) {
  $('#roomSelect').append("<div>name</div>");
};

app.handleUsernameClick = function() {
  alert(this.username);
};

app.handleSubmit = function(message) {
  app.send(message);

};

var getElementsByClassName = function(className, node) {
  node = node || document.body;
  var result = [];
  var nodeNames = node.className.split(' ');
  if ( nodeNames.includes(className) ) {
    result.push(node);
  }
  var childrenOfNode = node.children;
  for (var i = 0; i < childrenOfNode.length; i++)  {
    var tempChild = getElementsByClassName(className, childrenOfNode[i]);
    result = result.concat(tempChild);
  }
  return result;
};
