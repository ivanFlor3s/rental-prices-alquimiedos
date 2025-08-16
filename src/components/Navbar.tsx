'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo y título */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-blue-600 text-white p-1 rounded-lg">
                                <Image src="/building-svgrepo.svg" alt="Logo" width={32} height={32} />
                            </div>
                            <span className="text-xl font-bold text-gray-900">Alquimiedos</span>
                        </Link>
                    </div>

                    {/* Menú desktop */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Mapa
                            </Link>
                            <Link href="/buscar" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Buscar
                            </Link>
                            <Link href="/estadisticas" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Estadísticas
                            </Link>
                            <Link href="/barrios" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Barrios
                            </Link>
                            <Link href="/contacto" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                Contacto
                            </Link>
                        </div>
                    </div>

                    {/* Botón hamburguesa para móvil */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2" aria-label="Toggle menu">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Menú móvil */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                            <Link href="/" className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200" onClick={() => setIsOpen(false)}>
                                Mapa
                            </Link>
                            <Link href="/buscar" className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200" onClick={() => setIsOpen(false)}>
                                Buscar
                            </Link>
                            <Link
                                href="/estadisticas"
                                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                Estadísticas
                            </Link>
                            <Link href="/barrios" className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200" onClick={() => setIsOpen(false)}>
                                Barrios
                            </Link>
                            <Link href="/contacto" className="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 mt-2" onClick={() => setIsOpen(false)}>
                                Contacto
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
