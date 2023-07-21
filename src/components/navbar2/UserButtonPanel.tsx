import {useEffect, useState} from "react";
import useWindowDimensions from "components/hooks/useWindowDimension";
import {useUser} from "components/Auth/UserProvider";


export default function UserButtonPanel(){
    const { width } = useWindowDimensions();
    const user = useUser();
    const [isOpened, setOpened] = useState(false);

    const handleclick = () => {
        setOpened(!isOpened);
    }
    useEffect(() => {


        const onScroll = () => {
            if(width < 800)
                return;

            setOpened(false)
        };

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [width]);


}