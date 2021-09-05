const socket = io();
$(document).ready(() => {
  $('.btn-submit').click(() => {
    socket.emit('hocvien-send-data', {
      name: $('#txtName').val(),
      email: $('#txtEmail').val(),
      phone: $('#txtPhone').val(),
    });
    $('#txtName').val('');
    $('#txtEmail').val('');
    $('#txtPhone').val('');
  });
  socket.on('server-send-listInfo', (info) => {
    $('#listCurrentInfo').html('');
    for (let item in info) {
      $('#listCurrentInfo').append(`
      <div class="onePerson">
        <div>id : ${item + 1} || <span class="name">${
        info[item].name
      }</span></div>
        <div>${info[item].email} || ${info[item].phone}</span></div>
      </div>
      `);
    }
  });
});
