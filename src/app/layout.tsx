import './globals.css'
import { Inter } from 'next/font/google'
import { Manrope } from 'next/font/google'
import localFont from 'next/font/local'
import NavBar from './nav'
import Footer from './footer'

export const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const manrope = Manrope({ subsets: ['latin', 'cyrillic']})

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


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
