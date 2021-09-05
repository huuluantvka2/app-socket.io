const express = require('express');
const app = express();
const port = process.env.PORT || 4200;

const server = require('http').Server(app);
const io = require('socket.io')(server);
const hbs = require('express-handlebars');
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));
// view engine setup
app.engine('hbs', hbs({ defaultLayout: 'index', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res, next) => {
  res.render('index');
});
listInfo = [];
io.on('connection', (socket) => {
  console.log('Client ', socket.id, 'đã kết nối');
  io.sockets.emit('server-send-listInfo', listInfo);
  socket.on('hocvien-send-data', (data) => {
    listInfo.push(new SV(data.name, data.email, data.email));
    io.sockets.emit('server-send-listInfo', listInfo);
  });
});
class SV {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

server.listen(port);
