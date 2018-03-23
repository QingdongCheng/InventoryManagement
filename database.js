var sqlite3 = require('sqlite3').verbose(); // makes long stack traces

//Open a SQLite database file, or create it if it doesn't exist
var db = new sqlite3.Database('./project.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
   if (err) {
       return console.error(err.message);
   }
   console.log('Connected to the in-memory SQlite database.');
});

//Close the database healthily
// db.close((err) => {
//    if (err) {
//        return console.error(err.message);
//    }
//    console.log('Close the database connection.');
// });


// Create a table users with columns for id, email, and a pswd
db.run("CREATE TABLE IF NOT EXISTS users(" +
   "id INTEGER PRIMARY KEY AUTOINCREMENT," +
   "email varchar(50) NOT NULL," +
   "pswd varchar(50) NOT NULL," +
   "UNIQUE (email));",
   function(err) {
       if (err)
           throw err;
       console.log("Created users if it didn't exist already")
   });

var query = "CREATE TABLE IF NOT EXISTS groceries(" +
"id INTEGER PRIMARY KEY AUTOINCREMENT," +
"name VARCHAR(50) NOT NULL," +
"price VARCHAR(50) NOT NULL," +
"type VARCHAR(50) NOT NULL" +
");";

db.run(query, function(err){
  if (err) {
    throw err;
    console.log("Created groceries if it did't exist already");
  }
}); 

// This exports db to a file that calls require() on this one
module.exports = db
