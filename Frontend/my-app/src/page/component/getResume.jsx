import axios from 'axios'
import { Loader, Plus, FileText, Edit, Eye, Trash2, Calendar, Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react'


function GetResume() {
  const id = localStorage.getItem('UserId');
  const token = localStorage.getItem('token')
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4441/api/Response/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Response data:", res.data);
        if (res.data.resume && res.data.resume.length > 0) {
          setResumes(res.data.resume);
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, token]);


const Delete = async (resumeId) => {
  try {
    const token = localStorage.getItem("token");
    const del = await axios.post(
      `http://localhost:4441/api/Response/Delete/${resumeId}`,
      {}, // body is empty since delete just needs params
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Resume deleted successfully!");
  } catch (error) {
    console.log("Error deleting resume:", error.response?.data || error.message);
  }
};


  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">My Resumes</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your professional resumes
              </p>
            </div>
            <a
              href="/create"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Resume
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {isLoading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="w-8 h-8 text-gray-400 animate-spin mb-3" />
            <p className="text-gray-500 text-sm">Loading resumes...</p>
          </div>
        ) : resumes.length > 0 ? (
          /* Resume Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {resumes.map((resume, index) => (
              <div
                key={resume.id || index}
                className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden"
              >
                {/* Card Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
                          {resume.personalInfo?.name || 'Untitled Resume'}
                        </h3>
                        {resume.updatedAt && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Updated {formatDate(resume.updatedAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-3 mb-6">
                    {resume.personalInfo?.email && (
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{resume.personalInfo.email}</span>
                      </div>
                    )}

                    {resume.personalInfo?.phone && (
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{resume.personalInfo.phone}</span>
                      </div>
                    )}

                    {resume.education && resume.education.length > 0 && (
                      <div className="flex items-start gap-3 text-sm text-gray-600">
                        <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="truncate">
                          {resume.education[0].degree}
                        </span>
                      </div>
                    )}

                    {resume.experience && resume.experience.length > 0 && (
                      <div className="flex items-start gap-3 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="truncate">
                          {resume.experience[0].role}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <a
                      href={`/edit/${id}/${resume.id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </a>
                    <button className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                     <button
            onClick={() => Delete(resume.id)}
            className="flex items-center justify-center border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 px-3 py-2.5 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                No Resumes Yet
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                Create your first resume to get started
              </p>
              <a
                href="/create"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GetResume