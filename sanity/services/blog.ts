// lib/sanity.js

import { client } from "../lib/client";

// Fetch all blog posts
export const getAllPosts = async () => {
  const query = `
    *[_type == "post"]{
      title,
      slug,
      "mainImageUrl": mainImage.asset->url,
      "altText": mainImage.alt,
      publishedAt,
      body
    }
  `;
  const posts = await client.fetch(query);
  return posts;
};

// Fetch a single post by slug
export const getPostBySlug = async (slug: any) => {
    const query = `
      *[_type == "post" && slug.current == $slug]{
        title,
        slug,
        "mainImageUrl": mainImage.asset->url,
        "altText": mainImage.alt,
        publishedAt,
        body
      }[0]
    `;
    const post = await client.fetch(query, { slug });
    return post;
  };
  