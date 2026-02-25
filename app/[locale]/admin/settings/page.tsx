import { getAllSettings } from '@/actions/settings'
import SettingsForm from '@/components/admin/SettingsForm'

export default async function SettingsPage() {
    const settings = await getAllSettings()

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-secondary-900">Parametrlər</h1>
                <p className="text-secondary-600 mt-2">Saytın əsas parametrlərini idarə edin</p>
            </div>

            <SettingsForm initialSettings={settings} />
        </div>
    )
}