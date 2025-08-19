export const metadata = {
    title: 'Detalle',
    description: 'Página de detalle de la propiedad',
};

export default async function Detalle({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Detalle de la Propiedad en {slug}</h1>
            <p>Aquí se mostrarán los detalles de la propiedad seleccionada.</p>
            {/* Aquí puedes agregar más contenido relacionado con el detalle de la propiedad */}
        </div>
    );
}
