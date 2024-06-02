const mongoose = require("mongoose");
function connect() {
  mongoose.connect(
    "mongodb+srv://eu:SENHA@cluster0.t4wiie6.mongodb.net/reciclagem?retryWrites=true&w=majority"
  );
}

module.exports = connect;