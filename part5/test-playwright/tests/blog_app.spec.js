const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Supermike',
        username: 'mike',
        password: 'mikepass'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByTestId('loginForm')
    await expect(locator).toBeVisible()
    
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      
      await page.getByTestId('username').fill('mike')
      await page.getByTestId('password').fill('mikepass')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Login success for user Supermike')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('fake')
      await page.getByTestId('password').fill('fakepass')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('ERROR: Wrong Credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('mike')
      await page.getByTestId('password').fill('mikepass')
      await page.getByRole('button', { name: 'login' }).click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByTestId('createBlogButton').click()
      await page.getByTestId('title').fill('titulo de prueba')
      await page.getByTestId('author').fill('mike')
      await page.getByTestId('url').fill('http://urldeprueba.com')
      await page.getByTestId('submitBlog').click()

      await expect(page.getByText('A new blog titulo de prueba by mike')).toBeVisible()
      await expect(page.getByText('titulo de prueba Supermike')).toBeVisible()
    })

    test('blog can be edited', async ({ page }) => {
      

      //primero creo el blog
      await page.getByTestId('createBlogButton').click()
      await page.getByTestId('title').fill('titulo de prueba2')
      await page.getByTestId('author').fill('mike')
      await page.getByTestId('url').fill('http://urldeprueba2.com')
      await page.getByTestId('submitBlog').click()

      //después aumento su número de likes pulsando el botón like y compruebo que el número de likes aumenta

      await page.getByRole('button', { name: 'View' }).click()
      await expect(page.getByTestId('likes')).toBeVisible()
      await expect(page.getByTestId('likes')).toContainText('0')

      await page.getByTestId('likeButton').click()
      await expect(page.getByTestId('likes')).toBeVisible()
      await expect(page.getByTestId('likes')).toContainText('1')
      
    })

    test('blog can be remove by his owner', async ({ page }) => {
      

      //primero creo el blog
      await page.getByTestId('createBlogButton').click()
      await page.getByTestId('title').fill('titulo de prueba3')
      await page.getByTestId('author').fill('mike')
      await page.getByTestId('url').fill('http://urldeprueba3.com')
      await page.getByTestId('submitBlog').click()

      //después lo elimino
      await page.reload()
      await page.getByRole('button', { name: 'View' }).click()
      //hago el confirm y elimino
      page.on('dialog', dialog => dialog.accept());
      await page.getByTestId('deleteButton').click()

      //compruebo que ya no está el blog después de eliminarlo
      await expect(page.getByText('titulo de prueba3 Supermike')).toHaveCount(0);
      
      
      
    })
  })
})