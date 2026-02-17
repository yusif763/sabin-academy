import { notFound } from 'next/navigation'
import { getResultById } from '@/actions/results'
import ResultEditForm from '@/components/admin/ResultEditForm'
import AdminHeader from '@/components/admin/Header'

export default async function EditResultPage({ params }: { params: { id: string } }) {
    const result = await getResultById(params.id)

    if (!result) {
        notFound()
    }

    return (
        <div>
            <AdminHeader title="Nəticəni Redaktə Et" />
            <div className="p-8">
                <ResultEditForm result={result} />
            </div>
        </div>
    )
}