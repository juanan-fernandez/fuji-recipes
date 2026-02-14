import type { RecipeFormState } from './recipes.types'

export function parseSignedInt(value: string): number {
  return Number(value.replace('+', '').trim())
}

export function validateForm(form: RecipeFormState, token: string): string[] {
  const errors: string[] = []

  if (!token.trim()) errors.push('Falta token JWT para autorizar el envío.')
  if (!form.recipeName.trim()) errors.push('Recipe Name es obligatorio.')
  if (!form.author.trim()) errors.push('Author es obligatorio.')
  if (!form.film.trim()) errors.push('Film es obligatorio.')

  const tonalFields: Array<[string, number]> = [
    ['highlight', parseSignedInt(form.highlight)],
    ['shadow', parseSignedInt(form.shadow)],
    ['color', parseSignedInt(form.color)],
    ['sharpness', parseSignedInt(form.sharpness)],
    ['nr', parseSignedInt(form.nr)],
  ]

  for (const [field, value] of tonalFields) {
    if (value < -2 || value > 4) {
      errors.push(`${field} debe estar entre -2 y +4.`)
    }
  }

  const clarityValue = parseSignedInt(form.clarity)
  if (clarityValue < -5 || clarityValue > 5) {
    errors.push('clarity debe estar entre -5 y +5.')
  }

  if (form.url.trim()) {
    try {
      new URL(form.url)
    } catch {
      errors.push('URL no es válida.')
    }
  }

  return errors
}
