import styles from './page.module.css'
import UserProvider from '@/components/Auth/UserProvider';
import NavBar from 'components/navbar2/_nav'
import Footer from '@/components/footer/footer'

export default function Map(){
    return(
        <>
        <UserProvider AuthorizedOnly={false}>
            <NavBar />
        </UserProvider>
        <main className={styles.main}>
            <iframe src="http://192.168.1.15:8123" className={styles.frame}></iframe>
        </main>
        <Footer />
        </>
    );
}