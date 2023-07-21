'use client'
import s from "components/navbar2/_nav.module.css";
import {useEffect, useState} from "react";


export default function BackgroundScroll({children}:{children:any}){
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return(
        <>
            <div className={`${s.scrollhook} ${isScrolled ? s.navDesktopSticky : null}`}>
                {children}
            </div>
        </>
    )
}