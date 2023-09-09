'use client'


import {useRouter} from "next/navigation";

export default function DeleteDoc({href, className, children}: { href: string, className?:any, children:any }) {
    const router = useRouter();

    const deleteDoc = () => {
        fetch(href, {
            cache: "no-cache",
            method: "DELETE",
            credentials: "include"
        }).then(value => {
            router.refresh();
        }).catch(error => {
            console.error('Error:', error);
        });
    }


    return (
        <div className={className} onClick={deleteDoc}>{children}</div>
    )
}