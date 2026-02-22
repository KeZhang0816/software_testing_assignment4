import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import { getRandomDogImage } from '../services/dogService'

describe('DogService.getRandomDogImage', () => {

  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('Returns imageUrl when API returns success', async () => {

    const mockedApiResponse = {
      message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success'
    }

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockedApiResponse
    } as Response)

    const result = await getRandomDogImage()

    expect(result).toEqual({
      imageUrl: mockedApiResponse.message,
      status: 'success'
    })

    expect(fetch).toHaveBeenCalledOnce()
  })

  test('Throws error when API call fails', async () => {

    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500
    } as Response)

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    )
  })
})