import PDFDocument from "pdfkit";

export const generatePdfBuffer = (resume) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];

      doc.fontSize(20).text("Resume", { align: "center" });
      doc.moveDown();

      const info = resume.personalInfo || {};
      doc.fontSize(14).text(`Name: ${info.name || ""}`);
      doc.text(`Email: ${info.email || ""}`);
      doc.text(`Phone: ${info.phone || ""}`);
      doc.moveDown();

      doc.fontSize(16).text("Education:");
      if (resume.education && resume.education.length) {
        resume.education.forEach((edu) => {
          doc.fontSize(12).text(`- ${edu.degree} from ${edu.institution} (${edu.year})`);
        });
      } else {
        doc.text("No education details provided.");
      }
      doc.moveDown();

      doc.fontSize(16).text("Experience:");
      if (resume.experience && resume.experience.length) {
        resume.experience.forEach((exp) => {
          doc.fontSize(12).text(`- ${exp.role} at ${exp.company} (${exp.years})`);
        });
      } else {
        doc.text("No experience details provided.");
      }
      doc.moveDown();

      doc.fontSize(16).text("Skills:");
      doc.fontSize(12).text(resume.skills?.join(", ") || "No skills listed.");
      doc.moveDown();

      doc.fontSize(16).text("AI Summary:");
      doc.fontSize(12).text(resume.GeneratedText || "No summary generated.");
      doc.end();

      doc.on("data", chunks.push.bind(chunks));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
    } catch (err) {
      reject(err);
    }
  });
};
