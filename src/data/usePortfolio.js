import { portfolio } from './fixtures.js'

/**
 * Returns portfolio content for the public site and dashboard.
 * Today it serves the fixtures module; milestone 3 swaps this for a cached
 * fetch of `/api/public/portfolio` while keeping the same return shape.
 */
export function usePortfolio() {
  return { data: portfolio, loading: false, error: null }
}
