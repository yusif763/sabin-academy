import { notFound } from 'next/navigation'
import { getCourseById } from '@/actions/courses'
import CourseEditForm from '@/components/admin/CoursesEditForm'
import AdminHeader from '@/components/admin/Header'

export default async function EditCoursePage({ params }: { params: { id: string } }) {
    const course = await getCourseById(params.id)

    if (!course) {
        notFound()
    }

    return (
        <div>
            <AdminHeader title="Edit Course" />
            <div className="p-8">
                <CourseEditForm course={course} />
            </div>
        </div>
    )
}
