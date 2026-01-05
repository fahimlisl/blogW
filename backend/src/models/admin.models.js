import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      requried: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
    },
    refreshToken:{
        type:String,
    }
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  // next();
});

adminSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password,this.password)
}


adminSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id:this._id,
      username:this.username,
      email:this.email,
      role: "admin"
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    },
  )
}


adminSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id:this._id
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
export const Admin = mongoose.model("Admin", adminSchema);
