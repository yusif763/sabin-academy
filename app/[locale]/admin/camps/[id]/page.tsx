import { notFound } from 'next/navigation'
import { getCampById } from '@/actions/camps'
import CampEditForm from '@/components/admin/CampEditForm'
import AdminHeader from '@/components/admin/Header'

export default async function EditCampPage({ params }: { params: { id: string } }) {
    const camp = await getCampById(params.id)

    if (!camp) {
        notFound()
    }

    return (
        <div>
            <AdminHeader title="Edit Summer Camp" />
            <div className="p-8">
                <CampEditForm camp={camp} />
            </div>
        </div>
    )
}