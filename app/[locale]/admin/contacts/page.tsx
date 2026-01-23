'use client'

import { useEffect, useState } from 'react'
import AdminHeader from '@/components/admin/Header'
import { Mail, MailOpen, Trash2 } from 'lucide-react'

export default function ContactsAdminPage() {
    const [contacts, setContacts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
    const [selectedContact, setSelectedContact] = useState<any>(null)

    useEffect(() => {
        fetchContacts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    const fetchContacts = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (filter === 'unread') params.append('read', 'false')
            if (filter === 'read') params.append('read', 'true')

            const response = await fetch(`/api/contact?${params.toString()}`)
            const data = await response.json()

            if (data?.success) {
                setContacts(data.data || [])
            } else {
                setContacts([])
            }
        } catch (error) {
            console.error('Error fetching contacts:', error)
            setContacts([])
        } finally {
            setLoading(false)
        }
    }

    const markAsRead = async (id: string) => {
        try {
            const response = await fetch(`/api/contact/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ read: true }),
            })

            if (response.ok) {
                fetchContacts()
            }
        } catch (error) {
            console.error('Error marking as read:', error)
        }
    }

    const deleteContact = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return

        try {
            const response = await fetch(`/api/contact/${id}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                fetchContacts()
                setSelectedContact(null)
            }
        } catch (error) {
            console.error('Error deleting contact:', error)
        }
    }

    const unreadCount = contacts.filter((c) => !c.read).length

    return (
        <div>
            <AdminHeader title="Contact Messages" />

            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-secondary-900">Messages</h2>
                        <p className="text-secondary-600 mt-1">
                            {contacts.length} total messages • {unreadCount} unread
                        </p>
                    </div>

                    {/* Filter */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'all'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white text-secondary-700 border border-secondary-300 hover:bg-secondary-50'
                            }`}
                        >
                            All
                        </button>

                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'unread'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white text-secondary-700 border border-secondary-300 hover:bg-secondary-50'
                            }`}
                        >
                            Unread ({unreadCount})
                        </button>

                        <button
                            onClick={() => setFilter('read')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'read'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white text-secondary-700 border border-secondary-300 hover:bg-secondary-50'
                            }`}
                        >
                            Read
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Messages List */}
                    <div className="lg:col-span-1 bg-white rounded-xl border border-secondary-200 overflow-hidden">
                        <div className="divide-y divide-secondary-100 max-h-[calc(100vh-300px)] overflow-y-auto">
                            {loading ? (
                                <div className="p-8 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto" />
                                </div>
                            ) : contacts.length === 0 ? (
                                <div className="p-8 text-center">
                                    <Mail className="w-12 h-12 text-secondary-300 mx-auto mb-3" />
                                    <p className="text-secondary-500">No messages found</p>
                                </div>
                            ) : (
                                contacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        onClick={() => {
                                            setSelectedContact(contact)
                                            if (!contact.read) markAsRead(contact.id)
                                        }}
                                        className={`p-4 cursor-pointer transition-colors ${
                                            selectedContact?.id === contact.id
                                                ? 'bg-primary-50 border-l-4 border-primary-500'
                                                : 'hover:bg-secondary-50'
                                        } ${!contact.read ? 'bg-blue-50' : ''}`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                {!contact.read ? (
                                                    <Mail className="w-4 h-4 text-primary-600 flex-shrink-0" />
                                                ) : (
                                                    <MailOpen className="w-4 h-4 text-secondary-400 flex-shrink-0" />
                                                )}
                                                <p className="font-semibold text-secondary-900 truncate">
                                                    {contact.name}
                                                </p>
                                            </div>

                                            {!contact.read && (
                                                <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-1" />
                                            )}
                                        </div>

                                        <p className="text-sm text-secondary-600 truncate mb-1">
                                            {contact.subject || contact.message}
                                        </p>

                                        <p className="text-xs text-secondary-400">
                                            {new Date(contact.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Message Detail */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-secondary-200 p-6">
                        {selectedContact ? (
                            <div>
                                {/* Header */}
                                <div className="flex items-start justify-between mb-6 pb-6 border-b border-secondary-200">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-bold text-lg">
                          {selectedContact.name?.charAt(0)?.toUpperCase()}
                        </span>
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-xl text-secondary-900">
                                                    {selectedContact.name}
                                                </h3>
                                                <p className="text-sm text-secondary-500">
                                                    {selectedContact.email}
                                                </p>
                                            </div>
                                        </div>

                                        {selectedContact.phone && (
                                            <p className="text-sm text-secondary-600 ml-15">
                                                📞 {selectedContact.phone}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => deleteContact(selectedContact.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Message Content */}
                                <div className="space-y-4">
                                    {selectedContact.subject && (
                                        <div>
                                            <label className="text-sm font-semibold text-secondary-700 block mb-1">
                                                Subject:
                                            </label>
                                            <p className="text-lg font-medium text-secondary-900">
                                                {selectedContact.subject}
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <label className="text-sm font-semibold text-secondary-700 block mb-1">
                                            Message:
                                        </label>
                                        <div className="bg-secondary-50 p-4 rounded-lg">
                                            <p className="text-secondary-900 whitespace-pre-wrap">
                                                {selectedContact.message}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-secondary-200">
                                        <p className="text-xs text-secondary-500">
                                            Received:{' '}
                                            {new Date(selectedContact.createdAt).toLocaleString()}
                                        </p>

                                        <p className="text-xs text-secondary-500 mt-1">
                                            Status:{' '}
                                            {selectedContact.read ? (
                                                <span className="text-green-600 font-semibold">Read</span>
                                            ) : (
                                                <span className="text-primary-600 font-semibold">
                          Unread
                        </span>
                                            )}
                                        </p>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex items-center space-x-3 pt-4">
                                        <a
                                            href={`mailto:${selectedContact.email}`}
                                            className="btn-primary inline-flex items-center space-x-2"
                                        >
                                            <Mail className="w-4 h-4" />
                                            <span>Reply via Email</span>
                                        </a>

                                        {selectedContact.phone && (
                                            <a
                                                href={`tel:${selectedContact.phone}`}
                                                className="btn-outline inline-flex items-center space-x-2"
                                            >
                                                📞 <span>Call</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                <MailOpen className="w-16 h-16 text-secondary-300 mb-4" />
                                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                                    No message selected
                                </h3>
                                <p className="text-secondary-600">
                                    Select a message from the list to view details
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
