import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const API_BASE = "http://localhost:4000";
const VerifyPaymentPage = () => {
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    let cancelled = false;
    const verifiedPayment = async()=>{
        const params = URLSearchParams(location.search || "");
        const sessionId = params.get("session_id");

        if(location.pathname === "/appointments/cancel"){
            if(!cancelled) navigate("/appointments?payment_status=Cancelled",{replace:true});
            return;
        }
        if(!sessionId){
            if(!cancelled) {
                navigate("/appointments?payment_status=Failed",{replace:true});
                return
            }
                
            
        }
        try {
            const res = await axios.get(`${API_BASE}/api/appointments/confirm`,{
                params:{sessionId},
                timeout:15000,
            });
            if(cancelled) return ;
            if(res.data?.success){
                navigate("/appointments?payment_status=Paid",{replace:true})
            }else{
                navigate("/appointments?payment_status=Failed",{replace:true});
            }
        } catch (error) {
            console.error("Payment Verification Failed",error);
            if(!cancelled){
                navigate("/appointments?payment_status=Failed",{replace:true});
            }
                
        }

    }
    verifiedPayment()
    return ()=>{
        cancelled = true;
    };
  },[location,navigate])
  return null;
}

export default VerifyPaymentPage