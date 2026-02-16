import { notFound } from 'next/navigation'
import { getActivityById } from '@/actions/activities'
import ActivityEditForm from '@/components/admin/ActivityEditForm'
import AdminHeader from '@/components/admin/Header'

export default async function EditActivityPage({ params }: { params: { id: string } }) {
    const activity = await getActivityById(params.id)

    if (!activity) notFound()

    return (
        <div>
            <AdminHeader title="Edit Activity" />
            <div className="p-8">
                <ActivityEditForm activity={activity} />
            </div>
        </div>
    )
}