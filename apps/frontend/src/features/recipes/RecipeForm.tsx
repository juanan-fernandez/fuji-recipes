import { useMemo, useState } from 'react'
import RecipeValidationList from './RecipeValidationList'
import {
  cameraSensorOptions,
  clarityOptions,
  colorChromeOptions,
  dynamicRangeOptions,
  expCompOptions,
  filmOptions,
  grainOptions,
  initialFormState,
  isoOptions,
  tonalRangeOptions,
  whiteBalanceOptions,
} from './recipes.constants'
import { parseSignedInt, validateForm } from './recipes.validators'
import type { RecipeFormState } from './recipes.types'

type RecipeFormProps = {
  token: string
}

const API_BASE = '/api/v1'

function RecipeForm({ token }: RecipeFormProps) {
  const [form, setForm] = useState<RecipeFormState>(initialFormState)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validationErrors = useMemo(() => validateForm(form, token), [form, token])
  const canSubmit = validationErrors.length === 0

  const handleSubmitRecipe = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) {
      setSubmitMessage(validationErrors[0])
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

    const body = {
      ...form,
      highlight: parseSignedInt(form.highlight),
      shadow: parseSignedInt(form.shadow),
      color: parseSignedInt(form.color),
      sharpness: parseSignedInt(form.sharpness),
      nr: parseSignedInt(form.nr),
      clarity: parseSignedInt(form.clarity),
    }

    try {
      const response = await fetch(`${API_BASE}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify(body),
      })

      const payload = (await response.json()) as { id?: string; message?: string; error?: string }
      if (!response.ok) {
        setSubmitMessage(payload.error ?? payload.message ?? 'No se pudo guardar la receta.')
        return
      }

      setSubmitMessage(`Receta guardada con ID ${payload.id ?? '-'}.`)
      setForm(initialFormState)
    } catch {
      setSubmitMessage('Error de red al enviar la receta.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <h2>2) Nueva receta Fuji</h2>
      <form onSubmit={handleSubmitRecipe} className="form-grid recipe-form">
        <label>
          Recipe Name *
          <input
            value={form.recipeName}
            onChange={(event) => setForm((prev) => ({ ...prev, recipeName: event.target.value }))}
            required
          />
        </label>
        <label>
          Author *
          <input
            value={form.author}
            onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))}
            required
          />
        </label>
        <label>
          URL
          <input
            type="url"
            value={form.url}
            onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))}
            placeholder="https://..."
          />
        </label>
        <label>
          Camera Sensor
          <select
            value={form.cameraSensor}
            onChange={(event) => setForm((prev) => ({ ...prev, cameraSensor: event.target.value }))}
          >
            {cameraSensorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Film *
          <select
            value={form.film}
            onChange={(event) => setForm((prev) => ({ ...prev, film: event.target.value }))}
            required
          >
            {filmOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Grain
          <select
            value={form.grain}
            onChange={(event) => setForm((prev) => ({ ...prev, grain: event.target.value }))}
          >
            {grainOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Color Chrome Effect
          <select
            value={form.colorChromeEffect}
            onChange={(event) => setForm((prev) => ({ ...prev, colorChromeEffect: event.target.value }))}
          >
            {colorChromeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Color Chrome FX Blue
          <select
            value={form.colorChromeFxBlue}
            onChange={(event) => setForm((prev) => ({ ...prev, colorChromeFxBlue: event.target.value }))}
          >
            {colorChromeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          White Balance
          <select
            value={form.whiteBalance}
            onChange={(event) => setForm((prev) => ({ ...prev, whiteBalance: event.target.value }))}
          >
            {whiteBalanceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Dynamic Range
          <select
            value={form.dynamicRange}
            onChange={(event) => setForm((prev) => ({ ...prev, dynamicRange: event.target.value }))}
          >
            {dynamicRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Highlight (-2..+4)
          <select
            value={form.highlight}
            onChange={(event) => setForm((prev) => ({ ...prev, highlight: event.target.value }))}
          >
            {tonalRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Shadow (-2..+4)
          <select
            value={form.shadow}
            onChange={(event) => setForm((prev) => ({ ...prev, shadow: event.target.value }))}
          >
            {tonalRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Color (-2..+4)
          <select
            value={form.color}
            onChange={(event) => setForm((prev) => ({ ...prev, color: event.target.value }))}
          >
            {tonalRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sharpness (-2..+4)
          <select
            value={form.sharpness}
            onChange={(event) => setForm((prev) => ({ ...prev, sharpness: event.target.value }))}
          >
            {tonalRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          NR (-2..+4)
          <select
            value={form.nr}
            onChange={(event) => setForm((prev) => ({ ...prev, nr: event.target.value }))}
          >
            {tonalRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Clarity (-5..+5)
          <select
            value={form.clarity}
            onChange={(event) => setForm((prev) => ({ ...prev, clarity: event.target.value }))}
          >
            {clarityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Exp Compensation
          <select
            value={form.expCompensation}
            onChange={(event) => setForm((prev) => ({ ...prev, expCompensation: event.target.value }))}
          >
            {expCompOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          ISO
          <select
            value={form.iso}
            onChange={(event) => setForm((prev) => ({ ...prev, iso: event.target.value }))}
          >
            {isoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="full-width">
          Notes
          <textarea
            value={form.notes}
            rows={4}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
          />
        </label>

        <RecipeValidationList errors={validationErrors} />

        <button type="submit" className="primary" disabled={!canSubmit || isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar receta'}
        </button>
      </form>
      {submitMessage ? <p className="feedback">{submitMessage}</p> : null}
    </>
  )
}

export default RecipeForm
