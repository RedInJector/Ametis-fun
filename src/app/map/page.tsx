import styles from './page.module.css'

export default function Map(){
    return(
        <main className={styles.main}>
            <iframe src="http://192.168.1.15:8123" className={styles.frame}></iframe>
        </main>
    );
}