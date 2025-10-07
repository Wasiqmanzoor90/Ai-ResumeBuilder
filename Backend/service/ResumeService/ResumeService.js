import { PrismaClient } from '@prisma/client';
import { genrateAiresponse } from '../../utils/openAi.js';

const prisma = new PrismaClient();

export const createResume = async (req, res) => {
    try {
        const { userId, personalInfo, education, experience, skills } = req.body;

        // Generate resume text using AI
        const generatedText = await genrateAiresponse({
            name: personalInfo.name,
            personalInfo,
            education,
            experience,
            skills,
        });

        const resume = await prisma.resume.create({
            data: {
                userId,
                personalInfo,
                education,
                experience,
                skills,
                GeneratedText: generatedText, 
            },
        });

        res.status(201).json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create resume" });
    }
};


export const GetResume = async (req, res) => {
      const { id } = req.params; 


    if (!id) {
      return res.status(400).json({ message: "UserId parameter is required" });
    }
    try {
        const resume = await prisma.resume.findMany({
            where: { userId: parseInt(id) },
            orderBy: { createdAt: "desc" },
        });
        return res.status(200).json({ resume })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch resumes" });
    }
}

export const UpdateResume = async (req, res) => {
    const { userId,resumeId} = req.params;
    const {personalInfo, education, experience, skills } = req.body;
  try {
    if (!userId || !resumeId) {
      return res.status(400).json({ message: "UserId and ResumeId are required" });
    }

    const resume = await prisma.resume.update({
      where: { 
        id: parseInt(resumeId),
        userId: parseInt(userId) 
      },
      data: {
        personalInfo,
        education,
        experience,
        skills,
      },
    });

    return res.status(200).json({ message:"Resume Updated Sucessfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update resume" });
  }
}
