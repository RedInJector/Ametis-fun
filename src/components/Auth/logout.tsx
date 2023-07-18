'use client'
import * as config from "@/config/config";
import { useRouter } from 'next/navigation'


interface Props {
    children: React.ReactNode,
}

export default function Logout({ children }: Props){
    const router = useRouter();
    const Click = () =>{
        try {
            fetch(`${config.apiUri}/api/v1/logout2`, {
                method: 'DELETE',
                cache: 'no-store',
                credentials: 'include',
            }).then(
                (res) => {
                    if (!res.ok) {
                        console.error('An unknown error occurred ');
                    }
                    router.push('/');
                }
            );
        }
        catch (error) {
            console.error('An error occurred ' + error);
        }
    }
    return(
        <div style={{cursor: "pointer"}} onClick={Click}>
            {children}
        </div>
    )
}