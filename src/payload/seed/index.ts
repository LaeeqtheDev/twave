import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import { cartPage } from './cart-page'
import { home } from './home'
import { productsPage } from './products-page'

const collections = ['categories', 'media', 'pages', 'products']
const globals = ['header', 'settings', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not

  payload.logger.info(`— Clearing media...`)

  const mediaDir = path.resolve(__dirname, '../../media')
  if (fs.existsSync(mediaDir)) {
    fs.rmdirSync(mediaDir, { recursive: true })
  }

  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all([
    ...collections.map(async collection =>
      payload.delete({
        collection: collection as 'media',
        where: {},
      }),
    ), // eslint-disable-line function-paren-newline
    ...globals.map(async global =>
      payload.updateGlobal({
        slug: global as 'header',
        data: {},
      }),
    ), // eslint-disable-line function-paren-newline
  ])

  payload.logger.info(`— Seeding categories...`)

  // Real apparel categories for the ROOTS storefront.
  // No products are seeded here - add your real products (with your own
  // photos) through the admin dashboard and assign them to these categories.
  await Promise.all([
    payload.create({
      collection: 'categories',
      data: {
        title: 'New Arrivals',
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'T-Shirts & Tops',
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Outerwear',
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Bottoms',
      },
    }),
  ])

  payload.logger.info(`— Seeding products page...`)

  const productsPageDoc = await payload.create({
    collection: 'pages',
    data: productsPage,
  })

  let productsPageID = productsPageDoc.id

  if (payload.db.defaultIDType === 'text') {
    productsPageID = `"${productsPageID}"`
  }

  payload.logger.info(`— Seeding home page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(home).replace(/"\{\{PRODUCTS_PAGE_ID\}\}"/g, productsPageID)),
  })

  payload.logger.info(`— Seeding cart page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(cartPage).replace(/"\{\{PRODUCTS_PAGE_ID\}\}"/g, productsPageID),
    ),
  })

  payload.logger.info(`— Seeding settings...`)

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      productsPage: productsPageDoc.id,
    },
  })

  payload.logger.info(`— Seeding header...`)

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: productsPageDoc.id,
            },
            label: 'Shop',
          },
        },
      ],
    },
  })

  payload.logger.info(`— Seeding footer...`)

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      copyright: `© ${new Date().getFullYear()} ROOTS. All rights reserved.`,
      navItems: [],
    },
  })

  payload.logger.info('Seeded database successfully!')
}
