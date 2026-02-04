import { render } from '@testing-library/react'

import { PostItem } from '@/components/post-item/PostItem'

describe('PostItem Component', () => {
    it('matches the snapshot', () => {
        const { container } = render(<PostItem title="Sample Post" date="2024-01-01" />)
        expect(container).toMatchSnapshot()
    })
})