import { useLocation, useNavigate } from '@tanstack/react-router'

export function useScrollToSection() {
  const location = useLocation()
  const navigate = useNavigate()

  return (sectionId: string) => {
    if (location.pathname === '/') {
      const element = document.querySelector(`#${sectionId}`)
      element?.scrollIntoView({ behavior: 'smooth' })
    } else {
      void navigate({ to: '/', hash: sectionId })
    }
  }
}
