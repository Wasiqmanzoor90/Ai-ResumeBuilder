import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditResume() {
  const token = localStorage.getItem("token");
  const { userId, resumeId } = useParams();

  const [formData, setFormData] = useState({
    personalInfo: { phone: "", address: "", summary: "" },
    education: [],
    experience: [],
    skills: [],
  });

  // ✅ Fetch existing resume data to pre-fill form
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`http://localhost:4441/api/Response/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const resume = res.data.resume.find(
          (r) => r.id === parseInt(resumeId)
        );
        if (resume) {
          setFormData({
            personalInfo: resume.personalInfo || {},
            education: resume.education || [],
            experience: resume.experience || [],
            skills: resume.skills || [],
          });
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    fetchResume();
  }, [userId, resumeId, token]);

  // ✅ Handle personal info input changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };

  // ✅ Update resume
  const editResume = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4441/api/Response/${userId}/${resumeId}`,
        formData, // 👈 contains personalInfo, education, experience, skills
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Updated resume:", res.data);
      alert("Resume updated successfully!");
    } catch (error) {
      console.error("Error updating resume:", error);
      alert("Failed to update resume");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Resume</h2>

      <h3>Personal Info</h3>
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.personalInfo.phone || ""}
        onChange={handlePersonalInfoChange}
      />
      <br />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.personalInfo.address || ""}
        onChange={handlePersonalInfoChange}
      />
      <br />
      <textarea
        name="summary"
        placeholder="Summary"
        value={formData.personalInfo.summary || ""}
        onChange={handlePersonalInfoChange}
        rows={5}
        cols={80}
      />
      <br />

      <button onClick={editResume}>Save Changes</button>
    </div>
  );
}

export default EditResume;
