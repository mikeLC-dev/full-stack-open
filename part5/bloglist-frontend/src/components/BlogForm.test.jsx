import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm component tests', () => {

  test('the form calls the event handler it received as props with the correct details when a new blog is created', async() => {
    const createBlog = vi.fn()

    const component = render(
      <BlogForm addBlog={createBlog} />
    )

    const user = userEvent.setup()
    const input = screen.getByTitle('title')
    const sendButton = screen.getByText('create')

    await user.type(input, 'testing a form...')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  })


})