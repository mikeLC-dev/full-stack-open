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
})