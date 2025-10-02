import Image from 'next/image';

const ProviderImage = ({ provider }: { provider: string }) => {
    const providerLogos: { [key: string]: string } = {
        Zonaprop: 'brand-refresh-header-zonaprop.svg',
        ArgenProp: 'brand-refresh-header-argenprop.svg',
        'Mercado Libre': 'brand-refresh-header-mercadolibre.svg',
        'Properati.com': 'brand-refresh-header-properati.svg',
    };

    return <Image src={providerLogos[provider] || '/providers/default.png'} width={48} height={48} alt={provider} className="w-20" />;
};

export default ProviderImage;
