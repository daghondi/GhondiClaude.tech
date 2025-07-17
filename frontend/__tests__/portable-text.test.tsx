import { render, screen } from '@testing-library/react'
import PortableTextRenderer from '../components/sanity/PortableTextRenderer'

// Mock the PortableText component
jest.mock('@portabletext/react', () => ({
  PortableText: ({ value, components }: any) => {
    // Simple mock that renders basic content
    if (Array.isArray(value)) {
      return (
        <div data-testid="portable-text-content">
          {value.map((block, index) => {
            if (block._type === 'block' && block.children) {
              return (
                <p key={index}>
                  {block.children.map((child: any, childIndex: number) => (
                    <span key={childIndex}>{child.text}</span>
                  ))}
                </p>
              )
            }
            return null
          })}
        </div>
      )
    }
    return <div data-testid="portable-text-content">Empty content</div>
  },
}))

// Mock the urlFor function
jest.mock('../sanity/utils', () => ({
  urlFor: jest.fn(() => ({
    url: () => 'https://example.com/image.jpg',
  })),
}))

describe('PortableTextRenderer', () => {
  test('renders without crashing', () => {
    const { container } = render(<PortableTextRenderer content={[]} />)
    expect(container.querySelector('[data-testid="portable-text-content"]')).toBeTruthy()
  })

  test('renders basic text content', () => {
    const mockContent = [
      {
        _type: 'block',
        children: [{ text: 'Hello, world!' }],
        style: 'normal',
      },
    ]

    render(<PortableTextRenderer content={mockContent} />)
    expect(screen.getByText('Hello, world!')).toBeTruthy()
  })

  test('renders empty content gracefully', () => {
    const { container } = render(<PortableTextRenderer content={[]} />)
    expect(container.querySelector('[data-testid="portable-text-content"]')).toBeTruthy()
  })

  test('returns null for undefined content', () => {
    const { container } = render(<PortableTextRenderer content={undefined as any} />)
    expect(container.firstChild).toBeNull()
  })

  test('applies custom className', () => {
    const { container } = render(<PortableTextRenderer content={[]} className="custom-class" />)
    const element = container.firstChild as HTMLElement
    expect(element.className).toContain('custom-class')
  })
})
