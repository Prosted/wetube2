import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email : {type:String, required : true, unique : true},
    userName : {type:String, required : true, unique : true},
    name : {type:String, required : true},
    password : {type:String },
    location:String,
    avatarUrl : {type : String},
    socialOnly : {type : Boolean},
});


userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 5);
});
const User = mongoose.model("User", userSchema);

export default User;