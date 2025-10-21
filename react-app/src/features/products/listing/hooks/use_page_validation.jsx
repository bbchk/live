import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export const usePageValidation = (numPages) => {
  const router = useRouter()

  useEffect(() => {
    const { filtersStr } = router.query

    const match = filtersStr.match(/page=(\d+)/)
    const pageValue = match ? match[1] : null

    if (pageValue > numPages || pageValue < 1) {
      router.push(`/404`)
    }
  }, [router.query, numPages])
}
