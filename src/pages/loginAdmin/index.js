
import Head from "next/head";
import LoginDashboard from "./LoginDashboard";



export default function FormDashboard() {
    return (
        <>
            
            <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0  minimum-scale=1.0" />
        <link rel="icon" href="/pinocho.png" type="image/png"/>
        <title>ADMIN PINOCHO</title>
        
        <meta name="robots" content="noindex, nofollow"/>
      </Head>
            <LoginDashboard/>
        </>
    );
}



