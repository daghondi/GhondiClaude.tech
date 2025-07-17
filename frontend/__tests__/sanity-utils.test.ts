import { getProjects, getProject, getBlogPosts, getBlogPost, getCategories } from '../sanity/utils'

// Mock the Sanity client
jest.mock('../sanity/config', () => ({
  client: {
    fetch: jest.fn(),
  },
}))

describe('Sanity Utils', () => {
  const mockClient = require('../sanity/config').client

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('getProjects should call client.fetch with correct query', async () => {
    const mockProjects = [
      { _id: '1', title: 'Test Project', slug: { current: 'test-project' } }
    ]
    mockClient.fetch.mockResolvedValue(mockProjects)

    const result = await getProjects()
    
    expect(mockClient.fetch).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockProjects)
  })

  test('getProject should call client.fetch with slug parameter', async () => {
    const mockProject = { _id: '1', title: 'Test Project' }
    mockClient.fetch.mockResolvedValue(mockProject)

    const result = await getProject('test-slug')
    
    expect(mockClient.fetch).toHaveBeenCalledTimes(1)
    expect(mockClient.fetch).toHaveBeenCalledWith(
      expect.stringContaining('slug.current == $slug'),
      { slug: 'test-slug' }
    )
    expect(result).toEqual(mockProject)
  })

  test('getBlogPosts should call client.fetch with correct query', async () => {
    const mockPosts = [
      { _id: '1', title: 'Test Post', slug: { current: 'test-post' } }
    ]
    mockClient.fetch.mockResolvedValue(mockPosts)

    const result = await getBlogPosts()
    
    expect(mockClient.fetch).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockPosts)
  })

  test('getCategories should call client.fetch with correct query', async () => {
    const mockCategories = [
      { _id: '1', name: 'Test Category', slug: { current: 'test-category' } }
    ]
    mockClient.fetch.mockResolvedValue(mockCategories)

    const result = await getCategories()
    
    expect(mockClient.fetch).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockCategories)
  })
})
