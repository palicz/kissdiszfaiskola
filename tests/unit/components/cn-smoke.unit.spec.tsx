import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { cn } from '@/utilities/ui'

describe('RTL smoke (cn)', () => {
  it('merges conflicting Tailwind utilities in the DOM', () => {
    function Box() {
      return <div data-testid="box" className={cn('px-2', 'px-4')} />
    }
    render(<Box />)
    expect(screen.getByTestId('box')).toHaveClass('px-4')
  })
})
