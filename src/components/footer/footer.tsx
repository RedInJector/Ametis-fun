import s from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

import * as config from "@/config/config";

 function Footer(){
    return(
      <footer className={s.footer}>
        <div className={s.wrapper}>
            <div className={s.top}>
                <div className={s.topLeft}>
                    <AmetisIcon />
                    Ametis
                </div>
                <div className={s.topRight}>
                    <Icon src="/Telegram-icon.svg" href={config.telegramUrl}/>
                    <Icon src="/discord-icon.svg" href={config.discordUrl}/>
                </div>
            </div>
            <div className={s.middle}>
                <span className={s.middleText}>Контакти</span>
                <span className={s.middleText}>Користувацька угода</span>
                <span className={s.middleText}>Дизайн</span>
            </div>
            <div className={s.bottom}>
            Уся розміщена інформація на сайті не є публічною офертою. We are in no way affiliated with or endorsed by Mojang, AB.
            </div>
        </div>
      </footer>  
    );
}

export default Footer;

function AmetisIcon(){
    return(
        <Image
        draggable="false"
        priority
        src="/Ametis-icon.svg"
        width={36}
        height={39}
        className={s.AmetisIcon}
        alt="Logo"
      />
    );
}

function Icon({src, href}:{src:string, href:string}){
    return(
        <a href = {href} className={s.iconButton} draggable="false"> 
            <Image
            draggable="false"
            priority
            src={src}
            width={24}
            height={24}
            className={s.Icon}
            alt="Social icon"
        />
      </a>
    );
}