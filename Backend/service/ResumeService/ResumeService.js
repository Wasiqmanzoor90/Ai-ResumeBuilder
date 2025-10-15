import { PrismaClient } from '@prisma/client';
import { genrateAiresponse } from '../../utils/openAi.js';
import { generatePdfBuffer } from '../../utils/pdfGenrator.js'

const prisma = new PrismaClient();

export const createResume = async (req, res) => {
  try {
    const { userId, personalInfo, education, experience, skills } = req.body;

    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

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
        userId: parsedUserId,
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
  const { userId, resumeId } = req.params;
  const { personalInfo, education, experience, skills } = req.body;
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

    return res.status(200).json({ message: "Resume Updated Sucessfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update resume" });
  }
}

export const DownloadResume = async (req, res) => {
  const { ResumeId } = req.params;
  try {
    const resume = await prisma.resume.findUnique({ where: { id: parseInt(ResumeId) } });
    if (!resume) {
      res.status(400).json({ message: "Resume not found!" })
    }
    const pdfBuffer = await generatePdfBuffer(resume);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume-${ResumeId}.pdf`,
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
}

export const DeleteResume =async (req,res)=>{
try {
 const { resumeId } = req.params;
  if(!resumeId){
    return res.status(400).json({message:"ResumeId is Required!"})
  }
  const resume = await prisma.resume.delete({
    where:{id:parseInt(resumeId)}
  });
  return res.status(200).json({message:"Resume Deleted Successfully!"});

} catch (error) {
     console.error(error);
    return res.status(500).json({ message: "Failed to delete resume" });
}
}
