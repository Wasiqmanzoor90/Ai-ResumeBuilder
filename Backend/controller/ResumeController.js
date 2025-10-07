import { createResume, GetResume, UpdateResume } from "../service/ResumeService/ResumeService.js";


export const Response =(req, res)=> createResume(req,res);
export const Resume = (req,res)=> GetResume(req,res);
export const update = (req,res)=>UpdateResume(req,res);