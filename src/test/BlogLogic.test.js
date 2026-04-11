import { describe, it, expect, vi } from 'vitest';

// Mock getCollection from astro:content
vi.mock('astro:content', () => ({
  getCollection: vi.fn(async () => [
    {
      slug: 'post-1',
      data: {
        title: 'Post 1',
        description: 'First post',
        pubDate: new Date('2026-01-01'),
      },
    },
    {
      slug: 'post-2',
      data: {
        title: 'Post 2',
        description: 'Second post',
        pubDate: new Date('2026-02-01'),
      },
    },
  ]),
}));

import { getCollection } from 'astro:content';

describe('Blog Collection', () => {
  it('retrieves and sorts posts correctly', async () => {
    const posts = (await getCollection('blog')).sort(
      (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );

    expect(posts).toHaveLength(2);
    expect(posts[0].slug).toBe('post-2'); // Should be the most recent one
    expect(posts[1].slug).toBe('post-1');
  });
});
