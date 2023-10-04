const mongoose= require("mongoose");
const validator=require("validator");

const userSchema= mongoose.Schema({
    email:{
        type:String, 
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter a valid Email");
            }
        }
    },

    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String, 
        required:true
    }

});

const Register = mongoose.model('Register',userSchema);
module.exports= Register; 