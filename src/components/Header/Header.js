import React, {useState} from "react";
import './Header.css'
import ReactDOM from "react-dom/client";

const link_About = "/"
const link_Objects = "/objects"
const link_News = "/news"
const link_Contacts = "/#contacts"

const isMobile = () => {
    return window.innerWidth < 768
}
const Header = ({menuOpen, setMenuOpen}) => {
    return (
        <div className="header">
            <div className="menu-screen" style={{display: menuOpen ? "block" : "none"}} onScroll={(e) => e.stopPropagation()}>
                <div className="top">
                    <div className="logo" onClick={ () => window.location.href = "/"}>
                        <img src={"/company-logo.svg"} alt="" height={"40px"} width={"40px"}/>
                    </div>
                    <div className="close-btn" onClick={ () => setMenuOpen(false)}>
                        <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7386 15.7643C14.8599 16.643 14.8599 18.0676 15.7386 18.9463L23.8052 27.0128L15.7386 35.0795C14.8599 35.9581 14.8599 37.3828 15.7386 38.2615C16.6173 39.1401 18.0419 39.1401 18.9206 38.2615L26.9871 30.1948L35.0538 38.2615C35.9324 39.1401 37.3572 39.1401 38.2358 38.2615C39.1144 37.3828 39.1144 35.9581 38.2358 35.0795L30.1691 27.0128L38.2358 18.9463C39.1144 18.0676 39.1144 16.643 38.2358 15.7643C37.3569 14.8856 35.9324 14.8856 35.0538 15.7643L26.9871 23.8309L18.9206 15.7643C18.0419 14.8856 16.6173 14.8856 15.7386 15.7643Z" fill="#AEAEAE"/>
                        </svg>
                    </div>
                    <div className="phone">
                        <span>
                            +7 (495) 123-45-67
                        </span>
                    </div>
                </div>
                <div className="middle">
                    <div className="links">
                        <div className="group">
                            <div className="text">
                                <a href={link_About}>Главная</a>
                            </div>
                            <div className="arrow">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.54651 18.1532C8.93702 18.5437 9.57022 18.5437 9.96072 18.1532L14.8481 13.2609C15.6285 12.4798 15.6282 11.214 14.8475 10.4332L9.95712 5.54289C9.56662 5.15237 8.93342 5.15237 8.5429 5.54289C8.15237 5.93342 8.15237 6.56658 8.5429 6.95711L12.7285 11.1427C13.1191 11.5332 13.1191 12.1664 12.7285 12.5569L8.54651 16.739C8.15598 17.1295 8.15598 17.7626 8.54651 18.1532Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                        <div className="group">
                            <div className="text">
                                <a>Наши объекты</a>
                            </div>
                        </div>
                        <div className="group sub-group">
                            <div className="text">
                                <a href={link_Objects + "/commercial"}>Коммерческие</a>
                            </div>
                            <div className="arrow">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.54651 18.1532C8.93702 18.5437 9.57022 18.5437 9.96072 18.1532L14.8481 13.2609C15.6285 12.4798 15.6282 11.214 14.8475 10.4332L9.95712 5.54289C9.56662 5.15237 8.93342 5.15237 8.5429 5.54289C8.15237 5.93342 8.15237 6.56658 8.5429 6.95711L12.7285 11.1427C13.1191 11.5332 13.1191 12.1664 12.7285 12.5569L8.54651 16.739C8.15598 17.1295 8.15598 17.7626 8.54651 18.1532Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                        <div className="group sub-group" >
                            <div className="text">
                                <a href={link_Objects + "/residential"}>Жилые</a>
                            </div>
                            <div className="arrow">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.54651 18.1532C8.93702 18.5437 9.57022 18.5437 9.96072 18.1532L14.8481 13.2609C15.6285 12.4798 15.6282 11.214 14.8475 10.4332L9.95712 5.54289C9.56662 5.15237 8.93342 5.15237 8.5429 5.54289C8.15237 5.93342 8.15237 6.56658 8.5429 6.95711L12.7285 11.1427C13.1191 11.5332 13.1191 12.1664 12.7285 12.5569L8.54651 16.739C8.15598 17.1295 8.15598 17.7626 8.54651 18.1532Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                        <div className="group">
                            <div className="text">
                                <a href={link_News}>Новости</a>
                            </div>
                            <div className="arrow">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.54651 18.1532C8.93702 18.5437 9.57022 18.5437 9.96072 18.1532L14.8481 13.2609C15.6285 12.4798 15.6282 11.214 14.8475 10.4332L9.95712 5.54289C9.56662 5.15237 8.93342 5.15237 8.5429 5.54289C8.15237 5.93342 8.15237 6.56658 8.5429 6.95711L12.7285 11.1427C13.1191 11.5332 13.1191 12.1664 12.7285 12.5569L8.54651 16.739C8.15598 17.1295 8.15598 17.7626 8.54651 18.1532Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                        <div className="group">
                            <div className="text">
                                <a href={link_Contacts} onClick={ () => setMenuOpen(false)}>Контакты</a>
                            </div>
                            <div className="arrow">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.54651 18.1532C8.93702 18.5437 9.57022 18.5437 9.96072 18.1532L14.8481 13.2609C15.6285 12.4798 15.6282 11.214 14.8475 10.4332L9.95712 5.54289C9.56662 5.15237 8.93342 5.15237 8.5429 5.54289C8.15237 5.93342 8.15237 6.56658 8.5429 6.95711L12.7285 11.1427C13.1191 11.5332 13.1191 12.1664 12.7285 12.5569L8.54651 16.739C8.15598 17.1295 8.15598 17.7626 8.54651 18.1532Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_30_177)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM24.8601 17.7179C22.5257 18.6888 17.8603 20.6984 10.8638 23.7466C9.72766 24.1984 9.13251 24.6404 9.07834 25.0726C8.98677 25.803 9.90142 26.0906 11.1469 26.4822C11.3164 26.5355 11.4919 26.5907 11.6719 26.6492C12.8973 27.0475 14.5457 27.5135 15.4026 27.5321C16.1799 27.5489 17.0475 27.2284 18.0053 26.5707C24.5423 22.158 27.9168 19.9276 28.1286 19.8795C28.2781 19.8456 28.4852 19.803 28.6255 19.9277C28.7659 20.0524 28.7521 20.2886 28.7372 20.352C28.6466 20.7383 25.0562 24.0762 23.1982 25.8036C22.619 26.3421 22.2081 26.724 22.1242 26.8113C21.936 27.0067 21.7443 27.1915 21.56 27.3692C20.4215 28.4667 19.5678 29.2896 21.6072 30.6336C22.5873 31.2794 23.3715 31.8135 24.1539 32.3463C25.0084 32.9282 25.8606 33.5085 26.9632 34.2313C27.2442 34.4155 27.5125 34.6068 27.7738 34.7931C28.7681 35.5019 29.6615 36.1388 30.7652 36.0373C31.4065 35.9782 32.0689 35.3752 32.4053 33.5767C33.2004 29.3263 34.7633 20.1169 35.1244 16.3219C35.1561 15.9895 35.1163 15.5639 35.0843 15.3771C35.0523 15.1904 34.9855 14.9242 34.7427 14.7272C34.4552 14.4939 34.0113 14.4447 33.8127 14.4482C32.91 14.4641 31.5251 14.9456 24.8601 17.7179Z" fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_30_177">
                                    <rect width="48" height="48" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className="icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_30_180)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.37413 3.37413C0 6.74826 0 12.1788 0 23.04V24.96C0 35.8212 0 41.2517 3.37413 44.6259C6.74826 48 12.1788 48 23.04 48H24.96C35.8212 48 41.2517 48 44.6259 44.6259C48 41.2517 48 35.8212 48 24.96V23.04C48 12.1788 48 6.74826 44.6259 3.37413C41.2517 0 35.8212 0 24.96 0H23.04C12.1788 0 6.74826 0 3.37413 3.37413ZM8.10012 14.6001C8.36012 27.0801 14.6001 34.5801 25.5401 34.5801H26.1602V27.4401C30.1802 27.8401 33.22 30.7801 34.44 34.5801H40.1201C38.5601 28.9001 34.4599 25.7601 31.8999 24.5601C34.4599 23.0801 38.0599 19.4801 38.9199 14.6001H33.7598C32.6398 18.5601 29.3202 22.1601 26.1602 22.5001V14.6001H21V28.4401C17.8 27.6401 13.7601 23.7601 13.5801 14.6001H8.10012Z" fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_30_180">
                                    <rect width="48" height="48" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className="icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 48L3.374 35.674C1.292 32.066 0.198 27.976 0.2 23.782C0.206 10.67 10.876 0 23.986 0C30.348 0.002 36.32 2.48 40.812 6.976C45.302 11.472 47.774 17.448 47.772 23.804C47.766 36.918 37.096 47.588 23.986 47.588C20.006 47.586 16.084 46.588 12.61 44.692L0 48ZM13.194 40.386C16.546 42.376 19.746 43.568 23.978 43.57C34.874 43.57 43.75 34.702 43.756 23.8C43.76 12.876 34.926 4.02 23.994 4.016C13.09 4.016 4.22 12.884 4.216 23.784C4.214 28.234 5.518 31.566 7.708 35.052L5.71 42.348L13.194 40.386ZM35.968 29.458C35.82 29.21 35.424 29.062 34.828 28.764C34.234 28.466 31.312 27.028 30.766 26.83C30.222 26.632 29.826 26.532 29.428 27.128C29.032 27.722 27.892 29.062 27.546 29.458C27.2 29.854 26.852 29.904 26.258 29.606C25.664 29.308 23.748 28.682 21.478 26.656C19.712 25.08 18.518 23.134 18.172 22.538C17.826 21.944 18.136 21.622 18.432 21.326C18.7 21.06 19.026 20.632 19.324 20.284C19.626 19.94 19.724 19.692 19.924 19.294C20.122 18.898 20.024 18.55 19.874 18.252C19.724 17.956 18.536 15.03 18.042 13.84C17.558 12.682 17.068 12.838 16.704 12.82L15.564 12.8C15.168 12.8 14.524 12.948 13.98 13.544C13.436 14.14 11.9 15.576 11.9 18.502C11.9 21.428 14.03 24.254 14.326 24.65C14.624 25.046 18.516 31.05 24.478 33.624C25.896 34.236 27.004 34.602 27.866 34.876C29.29 35.328 30.586 35.264 31.61 35.112C32.752 34.942 35.126 33.674 35.622 32.286C36.118 30.896 36.118 29.706 35.968 29.458Z" fill="white"/>
                        </svg>

                    </div>
                </div>
            </div>
            <div className="header-block">
                <span className={"header-org-title"} onClick={ () => window.location.href = "/"}>АльянсСтрой</span>
            </div>
            <div
                className="header-block"
                style={{
                display: isMobile() ? "none" : "flex"
            }}
            >
                <a href={link_About}>Главная</a>
                <a href={link_Objects + "/commercial"}>Наши объекты</a>
                <a href={link_News}>Новости</a>
                <a href={"#"} onClick={() => {
                    setMenuOpen(false)
                    if(window.location.pathname === "/") {
                        document.getElementById("contacts").scrollIntoView({behavior: "smooth"})
                    }
                    else {
                        window.location.href = link_Contacts
                    }

                }} >Контакты</a>
            </div>
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} style={{ display: isMobile() ? "block" : "none" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 18H21" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 6H21" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12H21" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    )
}

export default Header