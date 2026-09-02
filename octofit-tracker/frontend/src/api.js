const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(component) {
  const endpoint = component.startsWith('http')
    ? component
    : `${apiBaseUrl}/api/${component}/`
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Unable to load ${component}`)
  }

  const payload = await response.json()

  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items

  return []
}

export function displayName(user) {
  return user?.profile?.firstName
    ? `${user.profile.firstName} ${user.profile.lastName ?? ''}`.trim()
    : user?.username ?? user?.email ?? 'Unknown athlete'
}