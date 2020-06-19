let connection=require('../config/db')
let moment=require('../config/moment')

class Message{

    constructor(row){
        this.row=row;
    }

    get id_message(){
        return this.row.id_message;
    }

    get contents_message(){
        return this.row.contents_message;
    }

    get creat_at(){
        return moment(this.row.creat_at);
    }

    static create(contents_message, cb){
        connection.query('INSERT INTO messages SET contents_message=?, creat_at=?',
        [contents_message, new Date()], (err, resultat)=>{
            if(err) throw err
            cb(resultat)//colback resultat de mysql
        })
    }

    static all(cb){
        connection.query('SELECT * FROM messages', (err, rows)=>{
            if(err) throw err
            console.log(rows)
            cb(rows.map((row)=> new Message(row)));
            
        })
    }

    static find(id_message, cb){
        connection.query('SELECT * FROM messages WHERE id_message=? LIMIT 1', [id_message], (err, rows)=>{
            if(err) throw err
            console.log(rows)
            cb(new Message(rows[0]));
            
        })
    }
}
module.exports=Message 