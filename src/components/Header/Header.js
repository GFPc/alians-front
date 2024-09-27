import React, {useState} from "react";
import './Header.css'

const link_About = "/#about"
const link_Objects = "/#objects"
const link_News = "/news"
const link_Contacts = "/#contacts"

const isMobile = () => {
    return window.innerWidth < 768
}
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="header">
            <div className="header-block">
                <span className={"header-org-title"}>АльянсСтрой</span>
            </div>
            <div
                className="header-block"
                style={{
                display: isMobile() ? "none" : "flex"
            }}
            >
                <a href={link_About}>О компании</a>
                <a href={link_Objects}>Наши объекты</a>
                <a href={link_News}>Новости</a>
                <a onClick={() => {
                    setMenuOpen(false)
                    if(window.location.pathname === "/") {
                        document.getElementById("contacts").scrollIntoView({behavior: "smooth"})
                    }
                    else {
                        window.location.href = link_Contacts
                    }

                }}>Контакты</a>
            </div>
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} style={{ display: isMobile() ? "block" : "none" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 18H21" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 6H21" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12H21" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className="menu-content" style={{display: menuOpen ? "block" : "none"}}>
                <div>
                    <a href={link_About} onClick={() => setMenuOpen(false)}>О компании</a>
                </div>
                <div>
                    <a href={link_Objects} onClick={() => setMenuOpen(false)}>Наши объекты</a>
                </div>
                <div>
                    <a href={link_News} onClick={() => setMenuOpen(false)}>Новости</a>
                </div>
                <div>
                    <a onClick={() => {
                        setMenuOpen(false)
                        document.getElementById("contacts").scrollIntoView({behavior: "smooth"})
                    }}>Контакты</a>
                </div>
            </div>
        </div>
    )
}

export default Header