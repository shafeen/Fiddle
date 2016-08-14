var Broker = function (socketio) {
  this.io = socketio;
  this.io.on('connection', function(socket){
    console.log('a user connected');

    var curntUsername = null;

    // this is the initial expected event to identify the user connected
    socket.on('identify', function (username) {
      console.log('username: '+username);
      curntUsername = username;
      userSocketsMap[curntUsername] = socket;
    });

    socket.on('disconnect', function () {
      if (curntUsername) {
        console.log(curntUsername+' disconnected');
        delete userSocketsMap[curntUsername];
      } else {
        console.log('a user disconnected');
      }
    });

    // msgObj format => {msg: ..., recvr: ...}
    socket.on('chat', function(msgObj) {
      console.log(msgObj.msg);
      if (!userSocketsMap[msgObj.recvr]) {
        console.log('receiver not found');
      } else {
        var replyMsgObj = {
          sendr: curntUsername,
          msg: msgObj.msg
        };
        userSocketsMap[msgObj.recvr].emit('chatreply', replyMsgObj);
      }
    });

  });

};

var userSocketsMap = {};

module.exports = Broker;