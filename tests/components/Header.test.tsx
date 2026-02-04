import { render } from '@testing-library/react'

import Header from '@/components/header/Header'

describe('Header component', () => {
    it('matches the snapshot', () => {
        const { container } = render(<Header />)
        expect(container).toMatchSnapshot()
    })
})

