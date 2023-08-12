import {ServerPUserProvider} from "components/Auth/serverUserProvider";
import Navbar3 from "components/nav3/_nav3";


export default async function Navbar() {
    const user = await ServerPUserProvider(false);

    return(
        <>
            <Navbar3 user={user} NavBarList={NavBarList}/>
        </>
    )
}


export const NavBarList = [
    {
        pathname: "/",
        text: "Головна"
    },
    {
        pathname: "/wiki/first_time_on_server/rules",
        text: "Правила"
    },
    {
        pathname: "/wiki",
        text: "Вікі"
    },
    {
        pathname: "/map",
        text: "Мапа"
    },
]