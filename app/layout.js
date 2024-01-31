
import { Jost } from 'next/font/google'
import "./global.css"

const jost = Jost({
  weight: ["700", "500", "800"],
  style: ["normal"],
  subsets: ["latin"]
})

export const metadata = {
  title: 'Sushi App',
  description: 'order sushi from our restoran',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <link rel='manifest' href='/manifest.json' /> */}






        <meta name="application-name" content="SUSHI" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SUSHI" />
        <meta name="description" content="order sushi from our restoran" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/assets/svg/logo.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/svg/logo.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/svg/logo.svg" />
        <link rel="apple-touch-icon" sizes="167x167" href="/assets/svg/logo.svg" />

        <link rel="icon" type="image/png" sizes="32x32" href="/assets/svg/logo.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/svg/logo.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/assets/svg/logo.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />






        {/* <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="PWA App" />
        <meta name="twitter:description" content="Best PWA App in the world" />
        <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PWA App" />
        <meta property="og:description" content="Best PWA App in the world" />
        <meta property="og:site_name" content="PWA App" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" /> */}




      </head>
      <body className={jost.className}>
        {children}
      </body>
    </html>
  )
}
