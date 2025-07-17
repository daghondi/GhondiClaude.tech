// Mock the Sanity client to avoid ESM issues
jest.mock('@sanity/client', () => ({
  createClient: jest.fn(() => ({
    config: jest.fn(() => ({
      projectId: 'test-project-id',
      dataset: 'test',
      apiVersion: '2024-01-01',
      useCdn: false,
    })),
  })),
}))

describe('Sanity Configuration', () => {
  test('environment variables should be set', () => {
    expect(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID).toBe('test-project-id')
    expect(process.env.NEXT_PUBLIC_SANITY_DATASET).toBe('test')
  })

  test('config should export correct values', () => {
    // Import after mocking to avoid ESM issues
    const { config } = require('../sanity/config')
    
    expect(config).toEqual({
      projectId: 'test-project-id',
      dataset: 'test',
      apiVersion: '2024-01-01',
    })
  })

  test('client should be created with correct configuration', () => {
    const { createClient } = require('@sanity/client')
    require('../sanity/config') // This will trigger the createClient call
    
    expect(createClient).toHaveBeenCalledWith({
      projectId: 'test-project-id',
      dataset: 'test',
      apiVersion: '2024-01-01',
      useCdn: false,
    })
  })
})
