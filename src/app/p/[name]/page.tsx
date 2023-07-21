import * as config from "@/config/config";
import {notFound} from "next/navigation";
import {PublicUser} from "@/types/publicUser";
import UserPage from "@/app/p/[name]/userpage";
import UserProvider from "components/Auth/UserProvider";
import Navbar from "components/navbar2/_nav";
import Footer from "components/footer/footer";


export default async function Page({ params }: { params: { name: string } }){

    const res = await fetch(`${config.apiUri}/api/v2/p/${params.name}?type=all`, {
        method: 'GET',
        //next: {revalidate: 120},
        cache: 'no-store'
    });
    if(!res.ok)
        notFound()

    const publicuser = await res.json() as PublicUser;


    return(
        <>
            <UserProvider AuthorizedOnly={false}>
                <Navbar />
            </UserProvider>
            <main>
                <UserPage publicUser={publicuser}/>
            </main>
            <Footer/>
        </>
    )
}