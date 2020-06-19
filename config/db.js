let mysql=require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'non-root',
  password : '1234',
  database : 'chat_messages'
}); 
connection.connect()
module.exports=connection;