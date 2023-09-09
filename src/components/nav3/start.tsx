import Navbar3 from "components/nav3/_nav3";
import {ServerUserProviderBuilder} from "components/Auth/ServerUserBuilder";


export default async function Navbar() {
    const user = await ServerUserProviderBuilder()
        .addUser()
        .execute();

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