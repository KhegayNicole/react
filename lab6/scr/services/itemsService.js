const API_BASE = 'https://dummyjson.com/products'

export const itemsService = {
  /**
   * Fetch products with optional search query
   * @param {string} query - Search query parameter
   * @returns {Promise<{products: Array, total: number}>}
   */
  async getAll(query = '') {
    const url = query 
      ? `${API_BASE}/search?q=${encodeURIComponent(query)}`
      : `${API_BASE}?limit=100`
    
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
    }
    return res.json()
  },

  /**
   * Fetch a single product by ID
   * @param {string|number} id - Product ID
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const res = await fetch(`${API_BASE}/${id}`)
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Product not found')
      }
      throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`)
    }
    return res.json()
  }
}

