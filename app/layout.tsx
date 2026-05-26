import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alumni Network | Takshashila Education Foundation",

  description:
    "Connect with alumni and fellows across India for networking, mentorship, collaboration, jobs, and opportunities in the social impact sector.",

  keywords: [
    "Takshashila Education Foundation",
    "Alumni Network",
    "Gandhi Fellowship Alumni",
    "Social Impact Network",
    "Education Fellowship",
    "NGO Network India",
  ],

  openGraph: {
    title: "Alumni Network | Takshashila Education Foundation",

    description:
      "Connect with alumni and fellows across India for networking, mentorship, collaboration, jobs, and opportunities in the social impact sector.",

    siteName: "Takshashila Education Foundation",
  },

  twitter: {
    title: "Alumni Network | Takshashila Education Foundation",

    description:
      "Connect with alumni and fellows across India for networking, mentorship, collaboration, jobs, and opportunities in the social impact sector.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ww5lxz3lf3");
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-44P41T78RJ"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-44P41T78RJ');
          `}
        </Script>

        {children}

      </body>
    </html>
  );
}