import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';

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
    <html lang="ko">
      <meta
        name="google-site-verification"
        content="5-SZDPt7c3VV52-P0HBICIR2zOuHhXIVwQeI4T2uw2o"
      />
      <meta
        name="naver-site-verification"
        content="a8db12f931a042afc4d44c7c64f5508592eca691"
      />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Header />
        {children}
        {modal}
        {photo}
      </body>
    </html>
  );
}
