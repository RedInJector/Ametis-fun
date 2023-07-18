import styles from './page.module.css'
import UserProvider from '@/components/Auth/UserProvider';
import NavBar from 'components/navbar2/_nav'
import * as c from '@/config/config'
import Footer from '@/components/footer/footer'

export default function Map(){
    return(
        <>
        <UserProvider AuthorizedOnly={false}>
            <NavBar />
        </UserProvider>
        <main className={styles.main}>
            <iframe src={c.mapURL} className={styles.frame}></iframe>
        </main>
        </>
    );
}