
import { Jost } from 'next/font/google'
import "./global.css"

const jost = Jost({
  weight: ["700", "500", "800"],
  style: ["normal"],
  subsets: ["latin"]
})

export const metadata = {
  title: 'Yesh Pizza',
  description: 'Закажи любимые блюда в нашем сайте от Yesh Pizza',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        <meta name="application-name" content="Yesh Pizza" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Yesh Pizza" />
        <meta name="description" content="Закажи любимые блюда в нашем сайте от Yesh Pizza" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="keywords" content="сущи, Ош, доставка пиццы Ош, пицца, суши, доставка, быстро, доставка еды, еда" />

        <link rel="apple-touch-icon" href="/assets/YP_logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/YP_logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/YP_logo.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/assets/YP_logo.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/assets/YP_logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/YP_logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/assets/YP_logo.png" color="#FFFFFF" />
        <link rel="shortcut icon" href="/assets/YP_logo.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="Yesh Pizza" />
        <meta name="twitter:description" content="Закажи любимые блюда в нашем сайте от Yesh Pizza" />
        <meta name="twitter:image" content="/assets/YP_logo.png" />
        <meta name="twitter:creator" content="@YeshPizza" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Yesh Pizza" />
        <meta property="og:description" content="Закажи любимые блюда в нашем сайте от Yesh Pizza" />
        <meta property="og:site_name" content="YP App" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="/assets/YP_logo.png" />

      </head>
      <body className={jost.className}>
        {children}
      </body>
    </html>
  )
}
