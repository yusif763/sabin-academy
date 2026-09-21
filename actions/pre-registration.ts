'use server'

import { sendPreRegistration } from '@/lib/sabina-api'
import type { PreRegistrationInput, PreRegistrationResult } from '@/lib/sabina-api'

export async function submitPreRegistration(
  input: PreRegistrationInput
): Promise<PreRegistrationResult> {
  return sendPreRegistration(input)
}
