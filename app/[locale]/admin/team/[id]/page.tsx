import { notFound } from 'next/navigation'
import { getTeamMemberById } from '@/actions/team'
import TeamMemberEditForm from '@/components/admin/TeamMemberEditForm'
import AdminHeader from '@/components/admin/Header'

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
    const member = await getTeamMemberById(params.id)

    if (!member) {
        notFound()
    }

    return (
        <div>
            <AdminHeader title="Komanda Üzvünü Redaktə Et" />
            <div className="p-8">
                <TeamMemberEditForm member={member} />
            </div>
        </div>
    )
}