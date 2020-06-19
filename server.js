let express=require("express");
const { request, response } = require("express");

let app=express()
let bodyParser=require('body-parser')
let session=require('express-session')

//Moteur de Template
app.set('view engine', 'ejs'); 


//middleware
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(session({
  secret: 'sylla',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(require('./middlewares/flash'))

//les routes
app.get('/', (request, response)=>{
   // response.send('Boujour Sylla!!!');
/* pour le gere dans le middlewares
   if(request.session.error){
      
      response.locals.error= request.session.error;
      request.session.error=undefined;
   }
   */
  //console.log(request.session)
  let Message=require('./models/message')
   Message.all((messages)=>{
      response.render('page/index',{messages:messages})
   })
})

app.post('/', (request, response)=>{
   //console.log(request.body)
   if(request.body.message===undefined || request.body.message===''){
     // response.render('page/index', {error:"vous n'avez pas renté de message:("}) pour gerer autre part
    // request.session.error ="Il y a une erreur:("; pour le gere dans le middlewares
    request.flash('error', "vous n'avez pas posté de messages:(")
    response.redirect('/')
   }else{
      let Message=require('./models/message')
      Message.create(request.body.message, ()=>{
         request.flash('success', "Merci!!")
         response.redirect('/')
      })
   }
   
})

app.get('/message/:id_message', (request, response)=>{
      //response.send( request.params.id_message); //pour recuperer l'id qui es envoyé
      let Message=require('./models/message')
      Message.find(request.params.id_message, (message)=>{
         response.render('message/view', {message:message})
      })
} )
app.listen(8000)
/*process.on('uncaughtException',()=>{app.listen(8000)})
process.on('SIGTERM', ()=>{
   app.listen(8000)
})
*/