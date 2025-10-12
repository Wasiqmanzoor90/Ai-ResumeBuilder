
import axios from 'axios'
import React, { useEffect } from 'react'

function GetResume() {
  const id = localStorage.getItem('UserId');
  const token = localStorage.getItem('token')
  useEffect(()=>{
    const fetchData=async()=>{
    try {
      const res = await axios.get(`http://localhost:4441/api/Response/${id}`,
        {
              headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response data:", res.data);
    } catch (error) {
      
    }
 };fetchData();
 },[id,token]);

  return (
    <div>
      <div>Check console for data</div>;
    </div>
  )
}

export default GetResume
