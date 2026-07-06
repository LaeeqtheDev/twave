import type { Page } from '../payload-types'

export const home: Partial<Page> = {
  title: 'Home',
  slug: 'home',
  _status: 'published',
  meta: {
    title: 'ROOTS — Back to Basics',
    description:
      'Timeless essentials, made to last. Shop ROOTS apparel: honest materials, considered design, no trend cycles.',
  },
  hero: {
    type: 'lowImpact',
    richText: [
      {
        children: [
          {
            text: 'Back to Basics',
          },
        ],
        type: 'h1',
      },
      {
        children: [
          {
            text: 'Clean lines. Honest materials. Clothing built for everyday life, not the next trend cycle.',
          },
        ],
        type: 'large-body',
      },
    ],
    links: [
      {
        link: {
          type: 'reference',
          appearance: 'primary',
          reference: {
            relationTo: 'pages',
            value: '{{PRODUCTS_PAGE_ID}}',
          },
          label: 'Shop New Arrivals',
          url: '',
        },
      },
    ],
  },
  layout: [
    {
      blockName: 'Why Roots',
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: [
            {
              children: [
                {
                  text: 'Why ROOTS',
                },
              ],
              type: 'h2',
            },
          ],
        },
        {
          size: 'oneThird',
          richText: [
            {
              children: [
                {
                  text: 'Honest Materials',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: 'Natural fibers and durable construction. Nothing synthetic pretending to be something it is not.',
                },
              ],
            },
          ],
          enableLink: false,
          link: {
            reference: null,
            url: '',
            label: '',
          },
        },
        {
          size: 'oneThird',
          richText: [
            {
              children: [
                {
                  text: 'Considered Design',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: 'Timeless silhouettes over fast trends. Pieces designed to be worn for years, not seasons.',
                },
              ],
            },
          ],
          enableLink: false,
          link: {
            reference: null,
            url: '',
            label: '',
          },
        },
        {
          size: 'oneThird',
          richText: [
            {
              children: [
                {
                  text: 'Easy Returns',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: 'Free shipping on orders above $150 and 30 days to exchange if something is not quite right.',
                },
              ],
            },
          ],
          enableLink: false,
          link: {
            reference: null,
            url: '',
            label: '',
          },
        },
      ],
    },
    {
      blockName: 'New Arrivals',
      blockType: 'archive',
      introContent: [
        {
          type: 'h4',
          children: [
            {
              text: 'New Arrivals',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'The latest additions to the collection.',
            },
          ],
        },
      ],
      populateBy: 'collection',
      relationTo: 'products',
      categories: [],
    },
    {
      blockType: 'cta',
      blockName: 'CTA',
      richText: [
        {
          children: [
            {
              text: 'Explore the full collection',
            },
          ],
          type: 'h4',
        },
        {
          children: [
            {
              text: 'Considered essentials for everyday wear, in every category.',
            },
          ],
        },
      ],
      links: [
        {
          link: {
            type: 'reference',
            url: '',
            label: 'Shop All',
            appearance: 'primary',
            reference: {
              value: '{{PRODUCTS_PAGE_ID}}',
              relationTo: 'pages',
            },
          },
        },
      ],
    },
  ],
}
