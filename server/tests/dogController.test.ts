import { describe, expect, test, vi } from "vitest"
import { getDogImage } from "../controllers/dogController"
import * as dogService from "../services/dogService"

vi.mock('../services/dogService')

const createMockResponse = () => {
    const res: any = {}
    res.status = vi.fn().mockReturnThis()
    res.json = vi.fn()
    return res
}

describe('DogController.getDogImage', () => {

    test('Returns dog image when service succeeds', async () => {
        const req: any = {}
        const res = createMockResponse()

        const payload = {
            imageUrl: 'https://images.dog.ceo/test.jpg',
            status: 'success'
        }

        vi.mocked(dogService.getRandomDogImage).mockResolvedValue(payload)

        await getDogImage(req, res)

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: payload
        })
    })

    test('Returns 500 when service throws error', async () => {
        const req: any = {}
        const res = createMockResponse()

        vi.mocked(dogService.getRandomDogImage)
            .mockRejectedValue(new Error('Network error'))

        await getDogImage(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: 'Network error'
        })
    })
})