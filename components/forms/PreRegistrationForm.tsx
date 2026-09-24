'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { CheckCircle, ChevronDown, Send } from 'lucide-react'
import { submitPreRegistration } from '@/actions/pre-registration'
import type {
  PreRegistrationDeliveryMode,
  PreRegistrationGender,
  PreRegistrationInput,
  PreRegistrationPreferredTime,
  PreRegistrationSector,
  PublicCourse,
} from '@/lib/sabina-api'
import { PROGRAM_GROUPS } from '@/lib/catalog'

const OTHER_COURSE = '__OTHER__'

interface PreRegistrationFormProps {
  courses: PublicCourse[]
}

const EMPTY_FORM: Required<Pick<
  PreRegistrationInput,
  'firstName' | 'lastName' | 'phone' | 'courseId' | 'courseName' | 'email' |
  'birthDate' | 'gender' | 'gradeLevel' | 'schoolName' | 'district' |
  'targetScore' | 'experienceLevel' | 'preferredTime' | 'preferredStartDate' |
  'programCode' | 'deliveryMode' | 'sector'
>> = {
  firstName: '',
  lastName: '',
  phone: '',
  courseId: '',
  courseName: '',
  email: '',
  birthDate: '',
  gender: '',
  gradeLevel: '',
  schoolName: '',
  district: '',
  targetScore: '',
  experienceLevel: '',
  preferredTime: '',
  preferredStartDate: '',
  programCode: '',
  deliveryMode: '',
  sector: '',
}

export default function PreRegistrationForm({ courses }: PreRegistrationFormProps) {
  const t = useTranslations('register')

  // Kurs siyahısı gəlməyibsə birbaşa sərbəst mətn soruşuruq.
  const hasCourseList = courses.length > 0

  const [formData, setFormData] = useState(EMPTY_FORM)
  const [courseChoice, setCourseChoice] = useState(hasCourseList ? '' : OTHER_COURSE)
  const [showOptional, setShowOptional] = useState(false)
  // Massiv olduğu üçün `update` helper-inə uyğun gəlmir, ayrıca saxlanılır.
  const [days, setDays] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const isOtherCourse = courseChoice === OTHER_COURSE
  const inputClass =
    'w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all'
  const labelClass = 'block text-sm font-medium mb-2 text-secondary-700'

  const update = (field: keyof typeof EMPTY_FORM, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const updateGender = (value: string) =>
    setFormData((prev) => ({ ...prev, gender: value as PreRegistrationGender | '' }))

  const updatePreferredTime = (value: string) =>
    setFormData((prev) => ({ ...prev, preferredTime: value as PreRegistrationPreferredTime | '' }))

  const updateDeliveryMode = (value: string) =>
    setFormData((prev) => ({ ...prev, deliveryMode: value as PreRegistrationDeliveryMode | '' }))

  const updateSector = (value: string) =>
    setFormData((prev) => ({ ...prev, sector: value as PreRegistrationSector | '' }))

  const toggleDay = (day: string) =>
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))

  const handleCourseChange = (value: string) => {
    setCourseChoice(value)
    setFormData((prev) => ({
      ...prev,
      courseId: value === OTHER_COURSE ? '' : value,
      courseName: value === OTHER_COURSE ? prev.courseName : '',
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    // courseId və courseName sahələrindən ən azı biri getməlidir.
    if (!formData.courseId && !formData.courseName.trim()) {
      setError(t('errors.courseRequired'))
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const result = await submitPreRegistration({ ...formData, preferredDays: days })

      if (result.ok) {
        setSuccess(result.message || t('success.fallback'))
        setFormData(EMPTY_FORM)
        setDays([])
        setCourseChoice(hasCourseList ? '' : OTHER_COURSE)
        setShowOptional(false)
        return
      }

      if (result.code === 'VALIDATION' && result.message) {
        setError(result.message)
      } else if (result.code === 'RATE_LIMIT') {
        setError(t('errors.rateLimit'))
      } else {
        setError(t('errors.generic'))
      }
    } catch {
      setError(t('errors.generic'))
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-2xl flex items-center justify-center">
          <CheckCircle className="w-9 h-9 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-secondary-900 mb-3">{t('success.title')}</h3>
        <p className="text-secondary-600 mb-8 whitespace-pre-line">{success}</p>
        <button type="button" onClick={() => setSuccess('')} className="btn-outline">
          {t('success.again')}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 whitespace-pre-line">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t('form.firstName')} *</label>
          <input
            type="text"
            required
            minLength={2}
            maxLength={100}
            value={formData.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className={inputClass}
            placeholder={t('form.firstNamePlaceholder')}
          />
        </div>

        <div>
          <label className={labelClass}>{t('form.lastName')} *</label>
          <input
            type="text"
            required
            minLength={2}
            maxLength={100}
            value={formData.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className={inputClass}
            placeholder={t('form.lastNamePlaceholder')}
          />
        </div>

        <div>
          <label className={labelClass}>{t('form.phone')} *</label>
          <input
            type="tel"
            required
            minLength={7}
            maxLength={32}
            value={formData.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={inputClass}
            placeholder="+994 50 123 45 67"
          />
        </div>

        <div>
          <label className={labelClass}>{t('form.course')} *</label>
          {hasCourseList ? (
            <select
              required
              value={courseChoice}
              onChange={(e) => handleCourseChange(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                {t('form.coursePlaceholder')}
              </option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
              <option value={OTHER_COURSE}>{t('form.courseOther')}</option>
            </select>
          ) : (
            <input
              type="text"
              required
              minLength={2}
              maxLength={150}
              value={formData.courseName}
              onChange={(e) => update('courseName', e.target.value)}
              className={inputClass}
              placeholder={t('form.courseNamePlaceholder')}
            />
          )}
        </div>

        {hasCourseList && isOtherCourse && (
          <div className="md:col-span-2">
            <label className={labelClass}>{t('form.courseName')} *</label>
            <input
              type="text"
              required
              minLength={2}
              maxLength={150}
              value={formData.courseName}
              onChange={(e) => update('courseName', e.target.value)}
              className={inputClass}
              placeholder={t('form.courseNamePlaceholder')}
            />
          </div>
        )}
      </div>


      <div className="mt-5 grid md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t('form.program')}</label>
          <select
            value={formData.programCode}
            onChange={(e) => update('programCode', e.target.value)}
            className={inputClass}
          >
            <option value="">{t('form.programPlaceholder')}</option>
            {PROGRAM_GROUPS.map((group) => (
              <optgroup key={group.key} label={group.label}>
                {group.items.map((item) => (
                  <option key={item.code} value={item.code}>{item.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>{t('form.deliveryMode')}</label>
          <select
            value={formData.deliveryMode}
            onChange={(e) => updateDeliveryMode(e.target.value)}
            className={inputClass}
          >
            <option value="">{t('form.notSelected')}</option>
            <option value="OFFLINE">{t('form.modeOffline')}</option>
            <option value="ONLINE">{t('form.modeOnline')}</option>
            <option value="INDIVIDUAL">{t('form.modeIndividual')}</option>
            <option value="SPEAKING">{t('form.modeSpeaking')}</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>{t('form.sector')}</label>
          <select
            value={formData.sector}
            onChange={(e) => updateSector(e.target.value)}
            className={inputClass}
          >
            <option value="">{t('form.notSelected')}</option>
            <option value="AZ">{t('form.sectorAz')}</option>
            <option value="RU">{t('form.sectorRu')}</option>
            <option value="EN">{t('form.sectorEn')}</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>{t('form.preferredDays')}</label>
          <div className="flex flex-wrap gap-2">
            {([
              ['MON', t('form.dayMon')], ['TUE', t('form.dayTue')], ['WED', t('form.dayWed')],
              ['THU', t('form.dayThu')], ['FRI', t('form.dayFri')], ['SAT', t('form.daySat')],
              ['SUN', t('form.daySun')],
            ] as const).map(([code, label]) => (
              <button
                key={code}
                type="button"
                onClick={() => toggleDay(code)}
                aria-pressed={days.includes(code)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  days.includes(code)
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-secondary-300 text-secondary-600 hover:bg-secondary-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowOptional(!showOptional)}
        className="mt-6 flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
      >
        <ChevronDown className={`w-5 h-5 transition-transform ${showOptional ? 'rotate-180' : ''}`} />
        {showOptional ? t('form.optionalHide') : t('form.optionalShow')}
      </button>

      {showOptional && (
        <div className="mt-5 pt-6 border-t border-secondary-200 grid md:grid-cols-2 gap-5 animate-slide-down">
          <div>
            <label className={labelClass}>{t('form.email')}</label>
            <input
              type="email"
              maxLength={150}
              value={formData.email}
              onChange={(e) => update('email', e.target.value)}
              className={inputClass}
              placeholder="nigar@example.com"
            />
          </div>

          <div>
            <label className={labelClass}>{t('form.birthDate')}</label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => update('birthDate', e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>{t('form.gender')}</label>
            <select
              value={formData.gender}
              onChange={(e) => updateGender(e.target.value)}
              className={inputClass}
            >
              <option value="">{t('form.notSelected')}</option>
              <option value="MALE">{t('form.genderMale')}</option>
              <option value="FEMALE">{t('form.genderFemale')}</option>
              <option value="OTHER">{t('form.genderOther')}</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>{t('form.gradeLevel')}</label>
            <input
              type="text"
              maxLength={50}
              value={formData.gradeLevel}
              onChange={(e) => update('gradeLevel', e.target.value)}
              className={inputClass}
              placeholder={t('form.gradeLevelPlaceholder')}
            />
          </div>

          <div>
            <label className={labelClass}>{t('form.schoolName')}</label>
            <input
              type="text"
              maxLength={150}
              value={formData.schoolName}
              onChange={(e) => update('schoolName', e.target.value)}
              className={inputClass}
              placeholder={t('form.schoolNamePlaceholder')}
            />
          </div>

          <div>
            <label className={labelClass}>{t('form.district')}</label>
            <input
              type="text"
              maxLength={150}
              value={formData.district}
              onChange={(e) => update('district', e.target.value)}
              className={inputClass}
              placeholder={t('form.districtPlaceholder')}
            />
          </div>

          <div>
            <label className={labelClass}>{t('form.targetScore')}</label>
            <input
              type="text"
              maxLength={50}
              value={formData.targetScore}
              onChange={(e) => update('targetScore', e.target.value)}
              className={inputClass}
              placeholder="7.0"
            />
          </div>

          <div>
            <label className={labelClass}>{t('form.experienceLevel')}</label>
            <input
              type="text"
              maxLength={100}
              value={formData.experienceLevel}
              onChange={(e) => update('experienceLevel', e.target.value)}
              className={inputClass}
              placeholder={t('form.experienceLevelPlaceholder')}
            />
          </div>

          <div>
            <label className={labelClass}>{t('form.preferredTime')}</label>
            <select
              value={formData.preferredTime}
              onChange={(e) => updatePreferredTime(e.target.value)}
              className={inputClass}
            >
              <option value="">{t('form.notSelected')}</option>
              <option value="MORNING">{t('form.timeMorning')}</option>
              <option value="AFTERNOON">{t('form.timeAfternoon')}</option>
              <option value="EVENING">{t('form.timeEvening')}</option>
              <option value="ANY">{t('form.timeAny')}</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>{t('form.preferredStartMonth')}</label>
            <input
              type="month"
              value={formData.preferredStartDate.slice(0, 7)}
              onChange={(e) =>
                update('preferredStartDate', e.target.value ? `${e.target.value}-01` : '')
              }
              className={inputClass}
            />
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-secondary-500">{t('form.note')}</p>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Send className="w-5 h-5" />
          {loading ? t('form.submitting') : t('form.submit')}
        </button>
      </div>
    </form>
  )
}
