export default function ReportTag({ value }: { value: string }) {
    return <span className={`rounded-full bg-gray-300 text-slate-700 px-2 text-xs`}>{value}</span>;
}
