import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Hero from './Pages/Hero';
import Home from './Pages/Home';
import { useUser } from '@clerk/react';
import Add from './Pages/Add';
import List from './Pages/List';
import Appointment from './Pages/Appointment';
import SetDashBoard from './Pages/SetDashBoard';
import AddSer from './Pages/AddSer';
import ListService from './Pages/ListService';
import ServiceAppointments from './Pages/ServiceAppointments';

function RequireAuth({ children }) {
  const { isLoaded, isSignedIn } = useUser();
  
  if (!isLoaded) return null;
  
  if (!isSignedIn) return (
      <div className="min-h-screen font-mono flex items-center justify-center bg-linear-to-b from-emerald-50 via-green-50 to-emerald-100 px-4">
        <div className="text-center">
          <p className="text-emerald-800 font-semibold text-lg sm:text-2xl mb-4 animate-fade-in">
            Please sign in to access the admin panel.
          </p>
          <div className="flex justify-center">
            <Link 
              to="/" 
              className="px-4 py-2 text-sm rounded-full bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md transition-all duration-300 ease-in-out animate-subtle"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
    return children;
  }
  
  


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero/>} />
      <Route 
        path="/h" 
        element={
          <RequireAuth>
            <Home/>
          </RequireAuth>
        } 
      />
      <Route path='/add' element={<RequireAuth>
        <Add/>
      </RequireAuth>}/>
      <Route path='/list' element={<RequireAuth>
        <List/>
      </RequireAuth>}/>
      <Route path='/appointments' element={<RequireAuth>
        <Appointment/>
      </RequireAuth>}/>
      <Route path='/service-dashboard' element={<RequireAuth>
        <SetDashBoard/>
      </RequireAuth>}/>
      <Route path='/add-service' element={<RequireAuth>
        <AddSer/>
      </RequireAuth>}/>
      <Route path='/list-service' element={<RequireAuth>
        <ListService/>
      </RequireAuth>}/>
      <Route path='/service-appointments' element={<RequireAuth>
        <ServiceAppointments/>
      </RequireAuth>}/>
    </Routes>
  )
}

export default App;