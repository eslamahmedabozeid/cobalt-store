import type { Metadata } from 'next';
import './globals.css';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper';
import AmbientGlowOrbs from '@/components/layout/AmbientGlowOrbs';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'كوبالت | متجر الخدمات الرقمية والتسويقية والمواقع',
  description:
    'المتجر الإلكتروني المباشر لخدمات كوبالت الرقمية: السوشيال ميديا، تصميم موقع إلكتروني، المتجر الإلكتروني، موشن جرافيك وفيديو، والتسويق والإعلانات مع حاسبة تكلفة وسلة شراء سريعة.',
  icons: {
    icon: [
      { url: '/assets/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/assets/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ToastProvider>
          <CurrencyProvider>
            <CartProvider>
              <AmbientGlowOrbs />
              <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
              <Footer />
              <FloatingWhatsApp />
            </CartProvider>
          </CurrencyProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
