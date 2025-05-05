const { test, expect, request } = require('@playwright/test');

const frontendUrl = 'http://localhost:5173';
const backendUrl = 'http://localhost:3001';

test.describe('Blog app', () => {
  test.beforeEach(async ({ page }) => {
    const apiContext = await request.newContext();

    // Reset DB
    await apiContext.post(`${backendUrl}/api/testing/reset`);

    // Create test user
    await apiContext.post(`${backendUrl}/api/users`, {
      data: {
        username: 'testuser',
        name: 'Test User',
        password: 'testpass'
      }
    });

    await page.goto(frontendUrl);
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByPlaceholder('Username').fill('testuser');
      await page.getByPlaceholder('Password').fill('testpass');
      await page.getByRole('button', { name: 'login' }).click();

      await expect(page.getByText('Test User logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByPlaceholder('Username').fill('testuser');
      await page.getByPlaceholder('Password').fill('wrongpass');
      await page.getByRole('button', { name: 'login' }).click();

      await expect(page.getByText('wrong username or password')).toBeVisible();
    });
  });

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      const apiContext = await request.newContext();

      // Login to get token
      const res = await apiContext.post(`${backendUrl}/api/login`, {
        data: {
          username: 'testuser',
          password: 'testpass'
        }
      });

      const { token } = await res.json();

      // Save token to localStorage before visiting the page
      await page.addInitScript((token) => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify({ token, username: 'testuser', name: 'Test User' }));
      }, token);

      await page.goto(frontendUrl);
    });

    test('a new blog can be created', async ({ page }) => {
      await page.getByText('new blog').click();
      await page.getByPlaceholder('Title').fill('Test Blog');
      await page.getByPlaceholder('Author').fill('Author Name');
      await page.getByPlaceholder('Url').fill('http://example.com');
      await page.getByRole('button', { name: 'create' }).click();

      await expect(page.getByText('Test Blog Author Name')).toBeVisible();
    });

    test('a blog can be liked', async ({ page }) => {
      await page.getByText('new blog').click();
      await page.getByPlaceholder('Title').fill('Likeable Blog');
      await page.getByPlaceholder('Author').fill('Liker');
      await page.getByPlaceholder('Url').fill('http://like.com');
      await page.getByRole('button', { name: 'create' }).click();

      await page.getByText('Likeable Blog Liker').click();
      const likeButton = page.getByRole('button', { name: 'like' });
      await likeButton.click();

      await expect(page.getByText('likes 1')).toBeVisible();
    });

    test('user who created a blog can delete it', async ({ page }) => {
      await page.getByText('new blog').click();
      await page.getByPlaceholder('Title').fill('Deletable Blog');
      await page.getByPlaceholder('Author').fill('Deleter');
      await page.getByPlaceholder('Url').fill('http://delete.com');
      await page.getByRole('button', { name: 'create' }).click();

      await page.getByText('Deletable Blog Deleter').click();
      page.once('dialog', dialog => dialog.accept()); // accept window.confirm
      await page.getByRole('button', { name: 'remove' }).click();

      await expect(page.getByText('Deletable Blog Deleter')).not.toBeVisible();
    });

    test('only creator sees delete button', async ({ page }) => {
      // Create blog with testuser
      await page.getByText('new blog').click();
      await page.getByPlaceholder('Title').fill('Secret Blog');
      await page.getByPlaceholder('Author').fill('Tester');
      await page.getByPlaceholder('Url').fill('http://secret.com');
      await page.getByRole('button', { name: 'create' }).click();

      // Log out and login as another user
      await page.getByRole('button', { name: 'logout' }).click();

      const apiContext = await request.newContext();
      await apiContext.post(`${backendUrl}/api/users`, {
        data: {
          username: 'anotheruser',
          name: 'Another User',
          password: 'anotherpass'
        }
      });

      const res = await apiContext.post(`${backendUrl}/api/login`, {
        data: { username: 'anotheruser', password: 'anotherpass' }
      });
      const { token } = await res.json();

      await page.addInitScript((token) => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify({ token, username: 'anotheruser', name: 'Another User' }));
      }, token);

      await page.goto(frontendUrl);
      await page.getByText('Secret Blog Tester').click();

      await expect(page.getByRole('button', { name: 'remove' })).toHaveCount(0);
    });

    test('blogs are ordered by likes', async ({ page }) => {
      const blogs = [
        { title: 'Most Likes', author: 'Top', url: 'url1', likes: 5 },
        { title: 'Medium Likes', author: 'Mid', url: 'url2', likes: 3 },
        { title: 'Least Likes', author: 'Low', url: 'url3', likes: 1 }
      ];

      const apiContext = await request.newContext();
      const res = await apiContext.post(`${backendUrl}/api/login`, {
        data: { username: 'testuser', password: 'testpass' }
      });
      const { token } = await res.json();

      for (const blog of blogs) {
        await apiContext.post(`${backendUrl}/api/blogs`, {
          data: blog,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      await page.goto(frontendUrl);

      const blogElements = await page.locator('.blog').allTextContents();
      expect(blogElements[0]).toContain('Most Likes');
      expect(blogElements[1]).toContain('Medium Likes');
      expect(blogElements[2]).toContain('Least Likes');
    });
  });
});
