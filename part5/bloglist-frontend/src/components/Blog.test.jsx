/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Blog component tests', () => {

  const newUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen',
  }

  const blog = {
    title: 'Mike is great',
    author: 'Mike',
    id: 124124723573468,
    url: 'http://urldeprueba.com',
    user: newUser,
    likes: 5
  }

  let mockBlogService = vi.fn()
  let mockUpdateLikes = vi.fn()
  let mockDeleteBlog = vi.fn()


  test('renders title and author', async () => {

    render(<Blog key={blog.id} blog={blog} blogService={mockBlogService} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog} actualUser={newUser} />)

    const element = screen.getByText('Mike is great Mike')
    expect(element).toBeDefined()
  })

  test('clicking the view button displays url and number of likes', async () => {
    const component = render(<Blog key={blog.id} blog={blog} blogService={mockBlogService} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog} actualUser={newUser} />)
    const button = component.getByText('View')
    const user = userEvent.setup()
    await user.click(button)

    expect(component.container).toHaveTextContent(
      'http://urldeprueba.com'
    )

    expect(component.container).toHaveTextContent(
      '5'
    )
  })

})
