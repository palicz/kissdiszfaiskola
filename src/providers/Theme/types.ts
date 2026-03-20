/** Az oldal csak világos módot támogat. */
export type Theme = 'light'

export interface ThemeContextType {
  setTheme: (theme: Theme | null) => void
  theme: Theme
}
