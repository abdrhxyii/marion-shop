import { getBaseURL } from "@lib/util/env"
import Script from "next/script";
import { Metadata } from "next"
import { Geist } from "next/font/google"
import "styles/globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={geist.variable}>
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={geist.className}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
