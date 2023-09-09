'use client'
import * as config from "@/config/config";
import { useRouter } from 'next/navigation'


interface Props {
    children: React.ReactNode,
    className?: any,
    onClick?: () => void;
}

export default function LogoutComponent({ children, className, onClick }: Props){
    const router = useRouter();
    const Click = () =>{
        try {
            fetch(`${config.apiUri}/api/v2/logout`, {
                method: 'DELETE',
                cache: 'no-store',
                credentials: 'include',
            }).then(
                (res) => {
                    if (!res.ok) {
                        console.error('An unknown error occurred ');
                        return;
                    }
                    if (onClick) {
                        onClick();
                    }
                    //router.refresh();
                    router.push('?logout=1');
                    router.refresh();

                }
            );
        }
        catch (error) {
            console.error('An error occurred ' + error);
        }
    }
    return(
        <div className={className} style={{cursor: "pointer"}} onClick={Click}>
            {children}
        </div>
    )
}

export function Logout(){
    const router = useRouter();
    try {
        fetch(`${config.apiUri}/api/v2/logout`, {
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