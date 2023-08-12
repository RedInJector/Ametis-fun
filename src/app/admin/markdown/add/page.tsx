import MdDocumentForm from "@/app/admin/markdown/add/form";
import s from './page.module.css'
import Link from "next/link";

export default function Page(){



    return(
        <main className={s.main}>
            <Link className={s.EditLink} href={`/admin/markdown`}>Back</Link>
            <MdDocumentForm />
        </main>
    )
}