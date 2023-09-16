import s from './page.module.css'
import Image from "next/image";
import React from "react";
import Navbar from "components/nav3/start";
import Footer from "components/footer/footer";
import Link from "next/link";

export default function Page(){
    return(
        <>
            <Navbar/>
            <main className={s.main}>
                <div className={s.container}>
                    <Image
                        draggable="false"
                        priority
                        src="/Wait.svg"
                        width={224}
                        height={41}
                        className={s.BigAuthorize}
                        alt="Logo"
                    />
                    <div className={s.panel}>
                        <div className={s.Title}>Ця сторінка наразі у розробці</div>
                        <div>Ми працюємо для вас, щоб як найшвидше зробити її доступною</div>
                        <div>
                        <Link href="/" className={s.button}>
                            <Image
                                src={'/Refund_back.svg'}
                                width={20}
                                height={20}
                                alt={""}>

                            </Image>
                            Повернутись на головну
                        </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}