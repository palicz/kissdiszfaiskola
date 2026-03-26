import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import useClickableCard from '@/utilities/useClickableCard'

const pushMock = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}))

function CardHarness(props: Parameters<typeof useClickableCard<HTMLDivElement>>[0]) {
  const { card, link } = useClickableCard<HTMLDivElement>(props)
  return (
    <div ref={card.ref}>
      <span data-testid="card-surface">surface</span>
      <a ref={link.ref} href="https://example.com/post">
        link
      </a>
    </div>
  )
}

function ExternalHarness(props: Parameters<typeof useClickableCard<HTMLDivElement>>[0]) {
  const { card, link } = useClickableCard<HTMLDivElement>(props)
  return (
    <div ref={card.ref}>
      <span data-testid="ext-surface">surface</span>
      <a ref={link.ref} href="https://ext.example/x">
        link
      </a>
    </div>
  )
}

describe('useClickableCard', () => {
  beforeEach(() => {
    pushMock.mockReset()
  })

  it('calls router.push when click starts on non-anchor surface', () => {
    const { getByTestId } = render(<CardHarness />)
    const surface = getByTestId('card-surface')
    fireEvent.mouseDown(surface, { button: 0 })
    fireEvent.mouseUp(surface, { button: 0 })
    expect(pushMock).toHaveBeenCalledWith('https://example.com/post', { scroll: true })
  })

  it('does not navigate when mousedown starts on the anchor', () => {
    const { getByRole } = render(<CardHarness />)
    const anchor = getByRole('link')
    fireEvent.mouseDown(anchor, { button: 0 })
    fireEvent.mouseUp(anchor, { button: 0 })
    expect(pushMock).not.toHaveBeenCalled()
  })

  it('opens external links via window.open', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const { getByTestId } = render(<ExternalHarness external newTab />)
    const surface = getByTestId('ext-surface')
    fireEvent.mouseDown(surface, { button: 0 })
    fireEvent.mouseUp(surface, { button: 0 })
    expect(openSpy).toHaveBeenCalledWith('https://ext.example/x', '_blank')
    openSpy.mockRestore()
  })

  it('uses _self when external without newTab', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    const { getByTestId } = render(<ExternalHarness external newTab={false} />)
    fireEvent.mouseDown(getByTestId('ext-surface'), { button: 0 })
    fireEvent.mouseUp(getByTestId('ext-surface'), { button: 0 })
    expect(openSpy).toHaveBeenCalledWith('https://ext.example/x', '_self')
    openSpy.mockRestore()
  })
})
