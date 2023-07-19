import './globals.css'
import { Inter, Manrope } from 'next/font/google'
import Script from 'next/script'
import UserProvider from "components/Auth/UserProvider";

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter', })

const manrope = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-manrope',})


export const metadata = {
  title: 'Ametis',
  description: 'Ametis minecraft server',
}

/*
export const Onest = localFont({
  src: [
    {
      path: './fonts/Onest/OnestThin1602-hint.ttf',
      weight: '100',
      style: 'normal'
    },
    {
      path: './fonts/Onest/OnestLight1602-hint.ttf',
      weight: '200',
      style: 'normal'
    }, {
      path: './fonts/Onest/OnestRegular1602-hint.ttf',
      weight: '300',
      style: 'normal'
    },{
      path: './fonts/Onest/OnestMedium1602-hint.ttf',
      weight: '400',
      style: 'normal'
    }, {
      path: './fonts/Onest/OnestBold1602-hint.ttf',
      weight: '500',
      style: 'normal'
    },{
      path: './fonts/Onest/OnestExtraBold1602-hint.ttf',
      weight: '600',
      style: 'normal'
    }, {
      path: './fonts/Onest/OnestBlack1602-hint.ttf',
      weight: '700',
      style: 'normal'
    }
  ],

  variable: '--font-Onest'
});
*/


export default async function RootLayout({children,}: { children: React.ReactNode}) {
    return (
    <html lang="en">
        <body className={`${manrope.variable} ${inter.variable}`}>

            {children}

            <Script src="https://www.googletagmanager.com/gtag/js?id=G-7B5NWL7HXJ" />
            <Script id="google-analytics">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-7B5NWL7HXJ');
                `}
            </Script>
        </body>
    </html>
    )
}
