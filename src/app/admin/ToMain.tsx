import Link from "next/link";
import s from './page.module.css'
import {ArrowLeftIcon} from "@radix-ui/react-icons";

export default function ToMain(){
    return(
        <>
            <Link className={s.Button} href={"/admin"}>
                <ArrowLeftIcon className={s.arrowIcon}/>
                ToMain
            </Link>
        </>
    )
}