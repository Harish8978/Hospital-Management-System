import React, { use, useRef, useState,useEffect } from 'react'
import { navbarStyles } from '../assets/dummyStyles'
import { href, Link, useLocation, useNavigate } from 'react-router-dom';
import { SignIn, SignOutButton, useClerk, UserButton ,useUser} from '@clerk/react';
import { Key, Menu, User, Users, X } from 'lucide-react';
import logo from "../assets/logo.png"

const STORAGE_KEY = "doctorToken_v1"

const NavBar = () => {
    const {isSignedIn} = useUser();
    const [isOpen,setIsOpen] = useState(false);
    const [showNavBar,setShowNavBar] = useState(true);
    const [lastScrollY,setLastScrollY] = useState(0);
    const [isDoctorLoggedIn,setIsDoctorLoggedIn] = useState(()=>{
        try{
            return Boolean(localStorage.getItem(STORAGE_KEY));
        }catch(error){
            return false;
        }
    })
    const location = useLocation();
    const navRef = useRef(null);
    const clerk = useClerk();
    const navigate = useNavigate();
    
    // Hide and show the navbar
     useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavBar(false);
      } else {
        setShowNavBar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

//   Sync the doctor login state
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setIsDoctorLoggedIn(Boolean(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

//   Toogle the menu option when and all the mouse is clicked outside the bax!
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);


    const navItems = [
        {label:"Home" , href:"/"},
        {label:"Doctors" , href:"/doctors"},
        {label:"Services" , href:"/services"},
        {label:"Appointments" , href:"/appointments"},
        {label:"Contact" , href:"/contact"},
    ];

  return (
    <>
        <div className={navbarStyles.navbarBorder}>

        </div>
        <nav className={`${navbarStyles.navbarContainer} ${
            showNavBar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden
        }`} ref={navRef}>
            <div className={navbarStyles.contentWrapper}>
                <div className={navbarStyles.flexContainer}>

                        {/* Logo */}
                        <Link to={'/'} className={navbarStyles.logoLink}>
                            <div className={navbarStyles.logoContainer}>
                                <div className={navbarStyles.logoImageWrapper}>
                                        <img src={logo} alt='Logo' className={navbarStyles.logoImage}/>
                                </div>
                            </div>
                            <div className={navbarStyles.logoTextContainer}>
                                <h1 className={navbarStyles.logoTitle}>MediCare</h1>
                                <p className={navbarStyles.logoSubtitle}>Helath Care Solution</p>
                                     
                            </div>
                        </Link>
                        <div className={navbarStyles.desktopNav}>
                            <div className={navbarStyles.navItemsContainer}>
                                {navItems.map((item)=>{
                                    const isActive = location.pathname === item.href;
                                    return(
                                        <Link key={item.href} to={item.href} className={`${navbarStyles.navItem} ${
                                            isActive ? navbarStyles.navItemActive : navbarStyles.navItemInactive
                                        }`}>
                                            {item.label}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                        {/* Right Side nav */}
                        <div className={navbarStyles.rightContainer}>
                                    <Link to="/doctor-admin/login" className={navbarStyles.doctorAdminButton}>
                                        <User className={navbarStyles.doctorAdminIcon}/>
                                        <span className={navbarStyles.doctorAdminText}>
                                            Doctor Admin
                                        </span>
                                    </Link>
                                {/* Patient login */}
                                {
                                    !isSignedIn?
                                        <button onClick={()=>clerk.openSignIn()} className={navbarStyles.loginButton}>
                                        <Key className={navbarStyles.loginIcon}/>
                                        Login
                                        </button> :
                                        <UserButton afterSignOutUrl = "/"/>
                                }
                                {/* to toggle for mobile */}
                                <button onClick={()=>setIsOpen(!isOpen)} className={navbarStyles.mobileToggle}>
                                    {
                                        isOpen ? <X className={navbarStyles.toggleIcon}/> : <Menu className={navbarStyles.toggleIcon}/>
                                    }

                                </button>
                        </div>
                </div>
                {/* mobile navigation */}
                {isOpen && (
                    <div className={navbarStyles.mobileMenu}>
                        {navItems.map((item,index)=>{
                            const isActive = location.pathname === item.href;
                            return(
                                <Link key={index} to={item.href} onClick={()=>setIsOpen(false)} className={`${navbarStyles.mobileMenuItem}
                                    ${
                                    isActive ? navbarStyles.mobileMenuItemActive : navbarStyles.mobileMenuItemInactive
                                    }
                                `}>
                                    {item.label}
                                </Link>
                            )
                        })}
                        <Link to={'/doctor-admin/login'} className={navbarStyles.mobileDoctorAdminButton} onClick={()=>setIsOpen(false)}>
                            Doctor Admin
                        </Link>
                         <div className={navbarStyles.mobileLoginContainer}>
                             {
                                !isSignedIn ? 
                                <button onClick={()=>{
                                    setIsOpen(false);
                                    clerk.openSignIn();
                                }} className={navbarStyles.mobileLoginButton}>
                                    Login
                                </button> :
                                <UserButton afterSignOutUrl="/" />
                             }
                                
                            </div>
                    </div>
                )}
            </div>
            <style>
                {navbarStyles.animationStyles}
            </style>
        </nav>
    </>
  )
}

export default NavBar