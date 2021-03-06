import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email : {type:String, required : true, unique : true},
    userName : {type:String, required : true, unique : true},
    name : {type:String, required : true},
    password : {type:String },
    location:String,
    avatarUrl : {type : String},
    socialOnly : {type : Boolean, default:false},
    videos : [{type:mongoose.Schema.Types.ObjectId, ref:"Video"}],
});


userSchema.pre("save", async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 5);
    }
});

const User = mongoose.model("User", userSchema);

export default User;