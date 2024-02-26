const mongoose=require('mongoose');
const rout1=new mongoose.Schema({
    route:{
        type:Number,
        
    },
    stop:{
        type:Number,
       
    },
    ticketCount:{
        type:Number,
        

    },
    qrcodeurl :{
        type:String
    },
    idno:{
        type:Number
    }
    
    
    


})

const rout2=new mongoose.Schema({
    routno:{
        type:Number
    },
    count:{
        type:Number
    }
    
    
    


})



const  Rout1 =  mongoose.model( "rout1",rout1);
const  Rout2 =  mongoose.model( "rout2",rout2);


module.exports={Rout1,Rout2} ;
