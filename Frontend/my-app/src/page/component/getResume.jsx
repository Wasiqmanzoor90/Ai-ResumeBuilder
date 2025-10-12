
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'; 

function GetResume() {
  const id = localStorage.getItem('UserId');
  const token = localStorage.getItem('token')
   const [resumeId, setResumeId] = useState(null);
  useEffect(()=>{
    const fetchData=async()=>{
    try {
      const res = await axios.get(`http://localhost:4441/api/Response/${id}`,
        {
              headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response data:", res.data);
         if (res.data.resume && res.data.resume.length > 0) {
          setResumeId(res.data.resume[0].id); // Extract resume ID
        }
    } catch (error) {
      
    }
 };fetchData();
 },[id,token]);

  return (
       <div>
      <div>Check console for data</div>

      {resumeId ? (
        <Link to={`/edit/${id}/${resumeId}`}>
          <button>Edit Resume</button>
        </Link>
      ) : (
        <button disabled>Loading...</button>
      )}
    </div>
  )
}

export default GetResume
