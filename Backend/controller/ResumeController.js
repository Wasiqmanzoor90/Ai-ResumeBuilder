import { createResume, DownloadResume, GetResume, UpdateResume } from "../service/ResumeService/ResumeService.js";


export const Create =(req, res)=> createResume(req,res);
export const Resume = (req,res)=> GetResume(req,res);
export const update = (req,res)=>UpdateResume(req,res);
export const Download=(req,res)=>DownloadResume(req,res);