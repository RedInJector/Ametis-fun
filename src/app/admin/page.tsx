import Table from './Table';
import Link from "next/link";
import s from './page.module.css'

export default async function Page() {
    return(
        <main className={s.main}>
            <div className={s.AdminNavigation}>
                <Link className={s.link} href={'/admin/markdown'}>[Pages]</Link>
            </div>
            <Table />
        </main>
    )

}

