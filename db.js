const mongodb = require("mongodb");

const connectionString =
  "mongodb+srv://j3ffh95:soccer1995@cluster0.ezsop.mongodb.net/WhatsGood?retryWrites=true&w=majority";

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    client.db();
  }
);
