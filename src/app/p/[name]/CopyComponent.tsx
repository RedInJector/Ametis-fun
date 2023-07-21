'use client'
import {CopyToClipboard} from "react-copy-to-clipboard";
import {useState} from "react";
import s from './page.module.css'


export default function CopyComponent({ textToCopy, children }:{textToCopy:string, children:any}){
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = () => {
        if(showTooltip)
            return
        setShowTooltip(true);
        setTimeout(() => {
            setShowTooltip(false);
        }, 2000);
    };

    return(
        <span className={`${s.clickable}`}>
            <CopyToClipboard onCopy={handleClick} text={textToCopy}>
                {children}
            </CopyToClipboard>
            {showTooltip ? "Скопійовано!" : null}
        </span>
    )
}