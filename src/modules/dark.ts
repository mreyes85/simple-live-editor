import { setTheme } from "./monaco"
import { getElement as $ } from "./utilities"

let darkModeState = false

export const useDark = window.matchMedia('(prefers-color-scheme: dark)')

export const setDarkMode = (state: boolean) => {
    document.documentElement.classList.toggle('dark-mode', state)
    darkModeState = state
    setTheme(darkModeState ? 'dark' : 'light')
}
export const toggleDarkMode = () => {
    setDarkMode(!document.documentElement.classList.contains('dark-mode'))
}
useDark.addEventListener('change', (evt: MediaQueryListEvent) => setDarkMode(evt.matches))
setDarkMode(useDark.matches)

const toggleThemeEl = $('#toggleTheme')
toggleThemeEl.addEventListener('click', toggleDarkMode)