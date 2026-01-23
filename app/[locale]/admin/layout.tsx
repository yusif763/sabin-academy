import AdminSidebar from '@/components/admin/Sidebar'

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-secondary-50">
            <AdminSidebar />
            <div className="ml-64">
                {children}
            </div>
        </div>
    )
}