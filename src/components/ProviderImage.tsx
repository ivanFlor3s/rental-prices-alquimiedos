import Image from 'next/image';

const ProviderImage = ({ provider }: { provider: string }) => {
    const providerLogos: { [key: string]: string } = {
        Zonaprop: 'brand-refresh-header-zonaprop.svg',
        ArgenProp: '/argenprop-logo.webp',
        'Mercado Libre': 'brand-refresh-header-mercadolibre.svg',
        'Properati.com': 'brand-refresh-header-properati.svg',
    };

    return <Image src={providerLogos[provider] || '/providers/default.png'} width={100} height={60} alt={provider} />;
};

export default ProviderImage;
