type RecipeValidationListProps = {
  errors: string[]
}

function RecipeValidationList({ errors }: RecipeValidationListProps) {
  if (errors.length === 0) return null

  return (
    <ul className="full-width validation-list">
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  )
}

export default RecipeValidationList
