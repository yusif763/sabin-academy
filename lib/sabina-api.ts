/**
 * Sabina Academy publik API-si ilə əlaqə (yalnız server tərəfi).
 *
 * X-Api-Key heç vaxt brauzerə düşməməlidir, ona görə bu modul yalnız
 * server component-lərdən və 'use server' action-lardan çağırılır.
 */

const API_BASE_URL = (process.env.SABINA_API_URL || 'https://dashboard.sabinaacademy.com/api/v1').replace(/\/$/, '')
const API_KEY = process.env.SABINA_API_KEY || ''

export interface PublicCourse {
  id: string
  name: string
  description?: string
}

export type PreRegistrationGender = 'MALE' | 'FEMALE' | 'OTHER'
export type PreRegistrationPreferredTime = 'MORNING' | 'AFTERNOON' | 'EVENING' | 'ANY'
export type PreRegistrationDeliveryMode = 'OFFLINE' | 'ONLINE' | 'INDIVIDUAL' | 'SPEAKING'
export type PreRegistrationSector = 'AZ' | 'RU' | 'EN'

export interface PreRegistrationInput {
  firstName: string
  lastName: string
  phone: string
  courseId?: string
  courseName?: string
  email?: string
  birthDate?: string
  gender?: PreRegistrationGender | ''
  gradeLevel?: string
  schoolName?: string
  district?: string
  targetScore?: string
  experienceLevel?: string
  preferredTime?: PreRegistrationPreferredTime | ''
  preferredStartDate?: string
  deliveryMode?: PreRegistrationDeliveryMode | ''
  sector?: PreRegistrationSector | ''
  programCode?: string
  preferredDays?: string[]
}

/** VALIDATION → API-nin mətnini göstər, qalanları tərcümə olunmuş mesajla əvəz olunur. */
export type PreRegistrationResult =
  | { ok: true; message: string }
  | { ok: false; code: 'VALIDATION' | 'RATE_LIMIT' | 'GENERIC'; message?: string }

/** API `message` sahəsini ya string, ya da string massivi kimi qaytarır. */
function readMessage(message: unknown): string {
  if (Array.isArray(message)) return message.filter(Boolean).join('\n')
  if (typeof message === 'string') return message
  return ''
}

function apiHeaders(): HeadersInit {
  return {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json',
  }
}

/**
 * Kurs siyahısı. API əlçatmazdırsa boş massiv qaytarır —
 * bu halda forma kurs adını sərbəst mətn kimi soruşur.
 */
export async function fetchPublicCourses(): Promise<PublicCourse[]> {
  if (!API_KEY) {
    console.error('[sabina-api] SABINA_API_KEY təyin edilməyib, kurs siyahısı çəkilmədi')
    return []
  }

  try {
    const response = await fetch(`${API_BASE_URL}/public/courses`, {
      headers: apiHeaders(),
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      console.error(`[sabina-api] GET /public/courses uğursuz oldu: ${response.status}`)
      return []
    }

    const body = await response.json()
    const courses = body?.data?.courses

    if (!Array.isArray(courses)) return []

    return courses
      .filter((course: any) => course?.id && course?.name)
      .map((course: any) => ({
        id: String(course.id),
        name: String(course.name),
        description: course.description ? String(course.description) : undefined,
      }))
  } catch (error) {
    console.error('[sabina-api] GET /public/courses xətası:', error)
    return []
  }
}

/** Boş sahələri göndərmirik — API null qəbul etmir, naməlum sahələri isə səssizcə atır. */
function buildPayload(input: PreRegistrationInput): Record<string, string | string[]> {
  const payload: Record<string, string | string[]> = {}

  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'string' && value.trim() !== '') {
      payload[key] = value.trim()
    } else if (Array.isArray(value) && value.length > 0) {
      payload[key] = value
    }
  }

  return payload
}

/**
 * Qeydiyyatın açıq olub-olmaması. API əlçatmazdırsa açıq sayılır —
 * şəbəkə problemi səbəbindən formu gizlətmək real müraciətləri itirər.
 */
export async function fetchPreRegistrationOpen(): Promise<boolean> {
  if (!API_KEY) return true

  try {
    const response = await fetch(`${API_BASE_URL}/public/settings`, {
      headers: apiHeaders(),
      next: { revalidate: 60 },
    })
    if (!response.ok) return true

    const body = await response.json()
    const open = body?.data?.preRegistrationOpen
    return typeof open === 'boolean' ? open : true
  } catch (error) {
    console.error('[sabina-api] GET /public/settings xətası:', error)
    return true
  }
}

export async function sendPreRegistration(input: PreRegistrationInput): Promise<PreRegistrationResult> {
  if (!API_KEY) {
    console.error('[sabina-api] SABINA_API_KEY təyin edilməyib, müraciət göndərilmədi')
    return { ok: false, code: 'GENERIC' }
  }

  const payload = buildPayload(input)

  if (!payload.courseId && !payload.courseName) {
    return { ok: false, code: 'GENERIC' }
  }

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}/public/pre-registrations`, {
      method: 'POST',
      headers: apiHeaders(),
      body: JSON.stringify(payload),
      cache: 'no-store',
    })
  } catch (error) {
    console.error('[sabina-api] POST /public/pre-registrations şəbəkə xətası:', error)
    return { ok: false, code: 'GENERIC' }
  }

  let body: any = null
  try {
    body = await response.json()
  } catch {
    body = null
  }

  if (response.ok) {
    return { ok: true, message: readMessage(body?.data?.message) }
  }

  const message = readMessage(body?.message)

  switch (response.status) {
    case 400:
      return { ok: false, code: 'VALIDATION', message }
    case 429:
      return { ok: false, code: 'RATE_LIMIT' }
    // 401 = açar yanlışdır, 503 = API konfiqurasiya edilməyib.
    // İstifadəçiyə ümumi mesaj, detal isə log-a.
    default:
      console.error(`[sabina-api] POST /public/pre-registrations uğursuz oldu: ${response.status} ${message}`)
      return { ok: false, code: 'GENERIC' }
  }
}
