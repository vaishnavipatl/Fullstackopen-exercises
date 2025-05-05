import { render ,screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from './Blog'
import { expect } from "vitest"

describe('blog test' ,()=>{ 
    test ('displaying a blog renders the blogs title and author, but does not render its URL or number of likes by default' ,() =>{
        const blog =[{
            _id: '1',
            title : 'Test blog',
            author: 'fdgec4563718935' ,
            content: 'test content',
            likes : [],
            image: { contentType: 'image/png', data: 'dummy' },
            comment :[],
            views:9
    
        }]
        render(<Blog blog={blog} />) 

        const element = screen.getByText('Test blog')
        expect(element).toBeDefined()
        expect(screen.getByText('fdgec4563718935')).toBeDefined()

        expect(screen.queryByText('test content')).toBeNull()
        expect(screen.queryByText('Likes:')).toBeNull()
       
    })

    test('the blogs URL and number of likes are shown when button clicked ') ,async()=>{
        const blog =[{
            _id: '1',
            title : 'Test blog',
            author: 'fdgec4563718935' ,
            content: 'test content',
            likes : [],
            image: { contentType: 'image/png', data: 'dummy' },
            comment :[],
            views:9
    
        }]

        render(<Blog blog={blog}/>)

        const user=userEvent.setup()
        const viewButton = screen.getByText('View More')
        await user.click(viewButton)

        expect(screen.getByText('test content')).toBeDefined()
        expect(screen.getByText('Likes:')).toBeDefined()
    }

    test('calls handleLike twice when like button is clicked twice',async()=>{
        const blog =[{
            _id: '1',
            title : 'Test blog',
            author: 'fdgec4563718935' ,
            content: 'test content',
            likes : [],
            image: { contentType: 'image/png', data: 'dummy' },
            comment :[],
            views:9
    
        }]

        const mockLike =vi.fn()
        const user =userEvent.setup()

        render(<Blog blog={blog} handleLike={mockLike} />)
    
        const viewButton = screen.getByText('View More')
        await user.click(viewButton)

        const likeButton = screen.getByText('👍 Like / Unlike')

        await user.click(likeButton)
        await user.click(likeButton)
    
        expect(mockLike).toHaveBeenCalledTimes(2)
    })
})


