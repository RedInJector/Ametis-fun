import s from './page.module.css'
import BottomSlider from "@/app/map/BottomSlider";
import styles from "@/app/map/page.module.css";
import SearchBar from "@/app/map/SearchBar";
import FetchOnScroll from "@/app/map/FetchOnScroll";
import * as c from "@/config/config";
import Navbar from "components/nav3/start";


export default async function Page(){

    return(
        <>
        <Navbar/>
        <main className={s.main}>
            <iframe src={c.mapURL} className={styles.frame}></iframe>
            <BottomSlider>
                <SearchBar>
                    <FetchOnScroll/>
                </SearchBar>
            </BottomSlider>
        </main>
        </>
    )
}