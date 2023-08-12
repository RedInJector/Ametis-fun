

import Footer from "components/footer/footer";
import Navbar from "components/nav3/start";

export default function layout({children,}: { children: React.ReactNode}){
    return(
        <>
            <Navbar />
                {children}
            <Footer />
        </>
    )
}