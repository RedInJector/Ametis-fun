
import Image from 'next/image'

export default async function Page(){

    return(
        
        <>
            <Image src={"http://localhost:8080/api/v1/image"} quality={100}  width={128} height={128} alt="asdad"/>
        </>
    )
}

//