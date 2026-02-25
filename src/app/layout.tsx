import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import Script from 'next/script';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '구도윤',
  url: 'https://doyoon.site',
  jobTitle: 'Frontend Developer',
  description:
    '프론트엔드 개발자 구도윤의 포트폴리오 사이트입니다. React, Next.js 프로젝트 경험을 확인해보세요.',
  sameAs: [
    'https://github.com/rhehfl',
    'https://velog.io/@rhehfl',
    'https://rhehfl418q.tistory.com/',
    'https://www.linkedin.com/in/%EB%8F%84%EC%9C%A4-%EA%B5%AC-117b76377/',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Frontend Development',
    'JavaScript',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Modern Agile',
  },
};

const themeInitializer = `
  (function () {
    const storageKey = 'gd-theme';
    try {
      const stored = window.localStorage.getItem(storageKey);
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const theme = stored === 'dark' || stored === 'light' ? stored : system;
      const root = document.documentElement;
      root.classList.toggle('dark', theme === 'dark');
      root.setAttribute('data-theme', theme);
      root.style.colorScheme = theme;
    } catch (error) {
      // ignore
    }
  })();
`;

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://doyoon.site'),

  title: {
    template: '%s | 구도윤 포트폴리오',
    default: '구도윤 포트폴리오 - 프론트엔드 개발자',
  },
  description:
    '프론트엔드 개발자 구도윤의 포트폴리오 사이트입니다. React, Next.js 프로젝트 경험을 확인해보세요.',

  keywords: [
    '프론트엔드',
    '개발자',
    '포트폴리오',
    'React',
    'Next.js',
    '구도윤',
    '웹 개발',
    'JavaScript',
    'TypeScript',
  ],

  verification: {
    google: '5-SZDPt7c3VV52-P0HBICIR2zOuHhXIVwQeI4T2uw2o',
    other: {
      'naver-site-verification': 'a8db12f931a042afc4d44c7c64f5508592eca691',
    },
  },

  openGraph: {
    title: '구도윤 포트폴리오',
    description: '프론트엔드 개발자 구도윤의 프로젝트와 경험을 소개합니다.',
    url: 'https://doyoon.site',
    siteName: '구도윤 포트폴리오',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '구도윤 포트폴리오 미리보기',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: '구도윤 포트폴리오',
    description: '프론트엔드 개발자 구도윤의 포트폴리오입니다.',
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
  modal,
  photo,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
  photo?: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SX6N24DZS6"
        ></script>

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SX6N24DZS6"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SX6N24DZS6');
`,
          }}
        ></script>
        <ThemeProvider>
          <Header />
          {children}
          {modal}
          {photo}
        </ThemeProvider>
      </body>
    </html>
  );
}
