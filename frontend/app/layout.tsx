import type { Metadata } from 'next'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import StoreProvider from '@/lib/store/StoreProvider'




export const metadata: Metadata = {
  title: 'IIT Mandi iHub – Human-Computer Interaction & Innovation Hub',
  description: 'IIT Mandi iHub and HCI Foundation — a Technology Innovation Hub dedicated to Human-Computer Interaction (HCI), driving research, skill development, incubation and industry collaboration.',
  keywords: 'IIT Mandi, iHub, HCI, Human Computer Interaction, Innovation Hub, Research, Technology, Incubation, Skill Development',
  authors: [{ name: 'IIT Mandi iHub' }],
  metadataBase: new URL('https://www.ihubiitmandi.in'),
  icons: {
    icon: '/assets/img/iHub-logo.png',
    shortcut: '/assets/img/iHub-logo.png',
    apple: '/assets/img/iHub-logo.png',
  },
  openGraph: {
    title: 'IIT Mandi iHub – Human-Computer Interaction & Innovation Hub',
    description: 'A Technology Innovation Hub at IIT Mandi focusing on Human-Computer Interaction, incubation, research, and skill development.',
    url: 'https://www.ihubiitmandi.in',
    siteName: 'IIT Mandi iHub',
    type: 'website',
    // Optionally add images, if you have a social preview image:
    // images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IIT Mandi iHub – HCI & Innovation Hub',
    description: 'Technology Innovation Hub at IIT Mandi dedicated to HCI, research, incubation, and skills.',
    // images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.ihubiitmandi.in',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/img/iHub-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700;900&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="bg-gray-50">
        <StoreProvider>
          <ConditionalLayout>
              {children}
          </ConditionalLayout>
        </StoreProvider>
      </body>
    </html>
  )
}

