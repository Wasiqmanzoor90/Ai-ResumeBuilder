import { AllUser, HandleLogin, HandleRegister } from "../service/AuthService/AuthService.js";

export const register =(req,res)=> HandleRegister(req,res)
export const login=(req,res)=> HandleLogin(req,res)
export const alluser = (req,res)=>AllUser(req,res);