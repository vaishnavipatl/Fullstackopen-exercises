import {render , screen ,waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Newblog from './Newblog'
import {vi} from 'vitest'

test('form calls event handler with correct blog details' ,async()=>{
    const createBlog = vi.fn()
    render(<Newblog handleNewBlog={createBlog} user={{ name: "Test User" }}/>)

    const titleInput= screen.getByPlaceholderText('Title')
    const contentInput = screen.getByPlaceholderText('Write your content')
    const fileInput =screen.getByLabelText('upload image')
    const postButton=screen.getByRole('button' ,{name: /post blog/i})
     
    await userEvent.type(titleInput , 'Test Blog Title')
    await userEvent.type(contentInput , 'This is test blog content')

    const file = new File(['dummy content'], 'test-image.png', { type: 'image/png' })
    await userEvent.upload(fileInput, file)
    await waitFor(() => {
        expect(fileInput.files[0]).toBe(file)
      })

    await userEvent.click(postButton)


    await waitFor(() => {
        expect(createBlog).toHaveBeenCalledTimes(1)
        expect(createBlog).toHaveBeenCalledWith('Test Blog Title', 'This is test blog content', file)
      })
  
})