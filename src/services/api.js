import axios from 'axios'

const api = axios.create({
  baseURL: 'https://airbnb19.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
    'Content-Type': 'application/json',
  },
})

const mockListings = [
  { id: '1', name: 'Millennium Knickerbocker Hotel', city: 'Chicago', avgRating: 4.63, reviewsCount: 1822, pictures: [{ large: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' }, { large: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800' }, { large: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800' }, { large: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800' }], pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price: '$875' } } }, description: 'Experience the grandeur of this historic Chicago landmark. Located steps from Millennium Park and the Magnificent Mile, this stunning hotel offers world-class amenities and breathtaking city views.' },
  { id: '2', name: 'The Swissôtel Chicago', city: 'Chicago', avgRating: 4.75, reviewsCount: 657, pictures: [{ large: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800' }, { large: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800' }, { large: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800' }, { large: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800' }], pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price: '$852' } } }, description: 'A luxury haven in the heart of Chicago\'s financial district. Enjoy panoramic views of Lake Michigan and the city skyline from our elegantly appointed rooms and suites.' },
  { id: '3', name: 'Modern Design with VU Skyline', city: 'Chicago', avgRating: 4.7, reviewsCount: 189, pictures: [{ large: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800' }, { large: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' }, { large: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800' }, { large: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800' }], pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price: '$761' } } }, description: 'Sleek and modern apartment with stunning skyline views. Floor-to-ceiling windows, designer furniture, and top-of-the-line appliances make this the perfect urban retreat.' },
  { id: '4', name: 'Warwick Allerton Hotel Chicago', city: 'Chicago', avgRating: 4.64, reviewsCount: 265, pictures: [{ large: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' }, { large: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800' }, { large: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800' }, { large: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800' }], pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price: '$710' } } }, description: 'Historic elegance meets modern comfort at this iconic Chicago hotel. Located on the Magnificent Mile, enjoy easy access to world-class shopping, dining, and entertainment.' },
  { id: '5', name: 'Cozy Beach House', city: 'Miami', avgRating: 4.8, reviewsCount: 324, pictures: [{ large: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800' }, { large: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800' }, { large: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800' }, { large: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800' }], pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price: '$320' } } }, description: 'Wake up to the sound of waves in this stunning beachfront property. Steps from the ocean, this cozy beach house features a private deck, outdoor shower, and spectacular sunset views.' },
  { id: '6', name: 'Mountain Retreat Cabin', city: 'Denver', avgRating: 4.9, reviewsCount: 189, pictures: [{ large: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800' }, { large: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800' }, { large: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800' }, { large: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800' }], pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price: '$195' } } }, description: 'Escape to the mountains in this cozy cabin retreat. Surrounded by towering pines and fresh mountain air, this property features a hot tub, fireplace, and stunning Rocky Mountain views.' },
  { id: '7', name: 'Luxury Villa with Private Pool', city: 'Los Angeles', avgRating: 5.0, reviewsCount: 145, pictures: [{ large: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800' }, { large: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' }, { large: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' }, { large: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' }], pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price: '$550' } } }, description: 'Indulge in ultimate luxury at this stunning Hollywood Hills villa. Features a private infinity pool, home theater, chef\'s kitchen, and panoramic views of the Los Angeles skyline.' },
  { id: '8', name: 'Tropical Bungalow Paradise', city: 'Honolulu', avgRating: 4.9, reviewsCount: 298, pictures: [{ large: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800' }, { large: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800' }, { large: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800' }, { large: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800' }], pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price: '$400' } } }, description: 'Live the island dream in this stunning tropical bungalow. Steps from the beach, surrounded by lush gardens and swaying palms, with a private lanai perfect for watching Hawaiian sunsets.' },
  { id: '9', name: 'Historic Boston Townhouse', city: 'Boston', avgRating: 4.7, reviewsCount: 177, pictures: [{ large: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800' }, { large: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800' }, { large: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800' }, { large: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' }], pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price: '$340' } } }, description: 'Step back in time in this beautifully restored Victorian townhouse in Boston\'s historic Beacon Hill neighborhood. Original hardwood floors, exposed brick, and modern amenities create the perfect blend.' },
  { id: '10', name: 'Desert Oasis Retreat', city: 'Scottsdale', avgRating: 4.6, reviewsCount: 154, pictures: [{ large: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' }, { large: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' }, { large: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' }, { large: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' }], pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price: '$260' } } }, description: 'Experience the magic of the Sonoran Desert from this stunning oasis retreat. Features a private pool, outdoor fire pit, and breathtaking views of the McDowell Mountains and spectacular sunsets.' },
  { id: '11', name: 'Ski Chalet Aspen', city: 'Aspen', avgRating: 4.9, reviewsCount: 212, pictures: [{ large: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800' }, { large: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800' }, { large: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800' }, { large: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800' }], pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price: '$680' } } }, description: 'Ski-in ski-out luxury chalet in the heart of Aspen. Features a private hot tub, stone fireplace, gourmet kitchen, and stunning mountain views. Perfect for the ultimate winter getaway.' },
  { id: '12', name: 'Napa Valley Vineyard Estate', city: 'Napa', avgRating: 4.8, reviewsCount: 161, pictures: [{ large: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' }, { large: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' }, { large: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' }, { large: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' }], pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price: '$520' } } }, description: 'Immerse yourself in wine country luxury at this stunning vineyard estate. Surrounded by rolling hills of grapes, enjoy private wine tastings, farm-to-table dining, and romantic sunset views.' },
]

export const searchProperties = async (placeId = 'ChIJ7cv00DwsDogRAMDACa2m4K8') => {
  try {
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
        pricingQuote: { structuredStayDisplayPrice: { primaryLine: { price } } },
      }
    })
    return { data: { list: listings } }
  } catch (error) {
    console.warn('API unavailable, using mock data:', error?.response?.status)
    return { data: { list: mockListings } }
  }
}

export default api
