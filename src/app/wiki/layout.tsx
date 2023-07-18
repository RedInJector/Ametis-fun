
import UserProvider from "components/Auth/UserProvider";
import Navbar from "components/navbar2/_nav";
import s from "@/app/wiki/[...slug]/page.module.css";
import Footer from "components/footer/footer";

export default function layout({children,}: { children: React.ReactNode}){
    return(
        <>
            <UserProvider AuthorizedOnly={false}>
                <Navbar />
            </UserProvider>


                {children}

            <Footer />
        </>
    )
}