import {
  ratings,
  rating,
  createRating,
  getAverageRating,
  // updateRating,
  // deleteRating,
} from './ratings'

describe('ratings', () => {
  scenario('returns all ratings', async (scenario) => {
    const result = await ratings()

    expect(result.length).toEqual(Object.keys(scenario.rating).length)
  })

  scenario('returns a single rating', async (scenario) => {
    const result = await rating({ id: scenario.rating.one.id })

    expect(result).toEqual(scenario.rating.one)
  })

  scenario('creates a rating', async () => {
    const result = await createRating({
      input: { score: 2 },
    })

    expect(result.score).toEqual(2)
  })

  scenario('averages correctly', async () => {
    const result = await getAverageRating()
    expect(result.avg).toBe(3)
    expect(result.count).toBe(2)
  })

  //   scenario('updates a rating', async (scenario) => {
  //     const original = await rating({ id: scenario.rating.one.id })
  //     const result = await updateRating({
  //       id: original.id,
  //       input: { score: 2266055 },
  //     })

  //     expect(result.score).toEqual(2266055)
  //   })

  //   scenario('deletes a rating', async (scenario) => {
  //     const original = await deleteRating({
  //       id: scenario.rating.one.id,
  //     })
  //     const result = await rating({ id: original.id })

  //     expect(result).toEqual(null)
  //   })
})
