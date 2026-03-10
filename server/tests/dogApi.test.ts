import { describe, expect, test } from "vitest"
import request from "supertest"
import { app } from "../index"

describe("Dog API", () => {

  test("GET /api/dogs/random returns dog image", async () => {

    const res = await request(app)
      .get("/api/dogs/random")

    expect(res.status).toBe(200)

    expect(res.body.success).toBe(true)

    expect(res.body.data).toBeDefined()

    expect(res.body.data.imageUrl).toBeDefined()

    expect(typeof res.body.data.imageUrl).toBe("string")

  })


  test("GET /api/dogs/invalid returns 404", async () => {

    const res = await request(app)
      .get("/api/dogs/invalid")

    expect(res.status).toBe(404)

    expect(res.body.error).toBeDefined()

    expect(res.body.error).toBe("Route not found")

  })

})