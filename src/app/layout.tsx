import type { Metadata } from 'next';
import { Concert_One, Heebo, Rubik } from 'next/font/google';
import './globals.css';
import { unstable_ViewTransition as ViewTransition } from 'react';
import Navbar from '../components/Navbar';

const concertOne = Concert_One({
    variable: '--font-concert-one',
    subsets: ['latin'],
    weight: ['400'],
});
const heebo = Heebo({
    variable: '--font-heebo',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});
const rubik = Rubik({
    variable: '--font-rubik',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
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
            <body className={`${heebo.variable} ${rubik.variable} antialiased ${concertOne.variable}`}>
                <Navbar />
                <ViewTransition name="page">
                    <main>{children}</main>
                </ViewTransition>
            </body>
        </html>
    );
}
