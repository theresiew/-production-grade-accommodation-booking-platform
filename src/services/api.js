import axios from 'axios'

const api = axios.create({
  baseURL: 'https://airbnb19.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
    'Content-Type': 'application/json',
  },
})

export const searchProperties = async (placeId = 'ChIJ7cv00DwsDogRAMDACa2m4K8') => {
  const response = await api.get('/api/v2/searchPropertyByPlaceId', {
    params: {
      placeId,
      adults: 1,
      guestFavorite: false,
      ib: false,
      currency: 'USD',
    },
  })

  const rawList = response.data?.data?.list || []

  const listings = rawList.map((item) => {
    const l = item?.listing || {}
    const pictures = item?.contextualPictures || []
    const price = item?.structuredDisplayPrice?.primaryLine?.discountedPrice
  || item?.structuredDisplayPrice?.primaryLine?.originalPrice
  || item?.structuredDisplayPrice?.primaryLine?.price
  || item?.pricingQuote?.structuredStayDisplayPrice?.primaryLine?.price
  || 'N/A'
    const ratingRaw = item?.avgRatingLocalized || ''
    const ratingMatch = ratingRaw.match(/[\d.]+/)
    const avgRating = ratingMatch ? parseFloat(ratingMatch[0]) : null

    const reviewMatch = ratingRaw.match(/\((\d+)\)/)
    const reviewsCount = reviewMatch ? parseInt(reviewMatch[1]) : 0

    return {
      id: l?.id,
      name: l?.legacyName || l?.title || item?.title,
      city: l?.legacyCity || l?.legacyLocalizedCityName || '',
      avgRating,
      reviewsCount,
      description: l?.description || '',
      pictures: pictures.map((p) => ({ large: p?.picture })),
      pricingQuote: {
        structuredStayDisplayPrice: {
          primaryLine: { price },
        },
      },
    }
  })

  return { data: { list: listings } }
}

export default api