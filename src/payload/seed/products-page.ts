import type { Page } from '../payload-types'

export const productsPage: Omit<Page, 'updatedAt' | 'createdAt' | 'id'> = {
  title: 'Shop All',
  slug: 'products',
  _status: 'published',
  meta: {
    title: 'Shop All — ROOTS',
    description: 'Browse the full ROOTS collection: considered essentials for everyday wear.',
  },
  hero: {
    type: 'lowImpact',
    media: null,
    richText: [
      {
        type: 'h1',
        children: [
          {
            text: 'Shop All',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Considered essentials for everyday wear. Filter by category or browse the full collection below.',
          },
        ],
      },
    ],
  },
  layout: [
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      introContent: [
        {
          type: 'h4',
          children: [
            {
              text: 'All Products',
            },
          ],
        },
      ],
      populateBy: 'collection',
      relationTo: 'products',
      limit: 24,
      categories: [],
    },
  ],
}
