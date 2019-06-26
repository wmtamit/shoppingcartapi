const Event = use('Event')
const Mail = use('Mail')

Event.on('new::user',async(user)=>{
   
    await Mail.send('mail',user.toJSON(),(message)=>{
        message.from('amitk.wmt@gmail.com').to(user.email).subject("Welcome Message")
        console.log("Messages of event " )
    })
    
})

Event.on('new::addindatabase',async(messages)=>{
    console.log(messages)
    await Mail.send('filemail',messages,(message)=>{
        message.from('amitk.wmt@gmail.com').to("amit.kadivar1@gmail.com").subject("Information ")
        console.log("Messages of event " )
    })
})