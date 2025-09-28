import { Building, Home, MapPin, TrendingUp } from 'lucide-react';
import { Amount } from '../reports/PricePerSurface';

export function Stats() {
    const stats = [
        {
            icon: Building,
            value: 15247,
            label: 'Propiedades Analizadas',
            description: 'Datos recopilados en el último mes',
        },
        {
            icon: MapPin,
            value: 48,
            label: 'Barrios Cubiertos',
            description: 'En Capital Federal',
        },
        {
            icon: TrendingUp,
            value: 6291,
            label: 'Alquileres Activos',
            description: 'Datos actualizados semanalmente',
        },
    ];

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Datos que Respaldan Nuestros Reportes</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Nuestra base de datos se actualiza constantemente con información del mercado inmobiliario para brindarte los datos más precisos y actuales.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-6 text-center hover:shadow-lg transition-shadow border border-neutral-200 rounded-lg">
                            <div className="mb-2 flex justify-center">
                                <div className="p-3">
                                    <stat.icon className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Amount value={stat.value} variant="plain" />
                                <div className="font-medium">{stat.label}</div>
                                <div className="text-sm text-muted-foreground">{stat.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Stats;
