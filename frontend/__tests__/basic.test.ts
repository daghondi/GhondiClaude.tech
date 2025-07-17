// Simple integration test for basic functionality
describe('Basic Application Tests', () => {
  test('environment variables are available', () => {
    expect(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID).toBe('test-project-id')
    expect(process.env.NEXT_PUBLIC_SANITY_DATASET).toBe('test')
    expect(process.env.SANITY_API_TOKEN).toBe('test-token')
  })

  test('Node.js version compatibility', () => {
    const nodeVersion = process.version
    expect(nodeVersion).toMatch(/^v\d+\.\d+\.\d+/)
    
    // Check if Node.js version is 18 or higher (required by package.json)
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])
    expect(majorVersion).toBeGreaterThanOrEqual(18)
  })

  test('Jest testing environment is working', () => {
    expect(1 + 1).toBe(2)
    expect('hello').toBe('hello')
    expect([1, 2, 3]).toHaveLength(3)
  })

  test('async/await functionality', async () => {
    const asyncFunction = async () => {
      return Promise.resolve('success')
    }
    
    const result = await asyncFunction()
    expect(result).toBe('success')
  })
})
