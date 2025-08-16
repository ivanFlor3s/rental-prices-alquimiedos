import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Alquileres CABA - Precios de Alquiler en Buenos Aires',
    description: 'Encuentra los mejores precios de alquiler en los barrios de CABA. Visualiza datos en tiempo real con nuestro mapa interactivo.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Navbar />
                <main className="min-h-screen bg-gray-50">{children}</main>
            </body>
        </html>
    );
}
