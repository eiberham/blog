import { jest  } from '@jest/globals'
import { render } from '@testing-library/react'

import Footer from '@/components/footer/Footer'

describe('Footer Component', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('matches the snapshot', () => {
        const { container } = render(<Footer />)
        expect(container).toMatchSnapshot()
    })

    it('redirects to github on icon click', () => {
        const { getByLabelText } = render(<Footer />)
        const link = getByLabelText('github') as HTMLAnchorElement
        expect(link.href).toBe('https://github.com/eiberham')
    })
})