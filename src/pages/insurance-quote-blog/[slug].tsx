// pages/blog/[slug].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPostBySlug } from '../../../sanity/services/blog';
import { PortableText } from '@portabletext/react';
import { PortableText as PortableTextComponent, PortableTextComponents } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import Header from '@/components/layout/header';



// types/portableText.ts
export interface Block {
    _type: string;
    _key: string;
    children?: Child[];
    style?: string;
    list?: string;
    level?: number;
    listItem?: string;
}

export interface Child {
    _type: string;
    _key: string;
    text: string;
    marks?: string[];
}

export interface MarkDef {
    _key: string;
    _type: string;
    href?: string;
}

export interface ImageBlock {
    _type: 'image';
    asset: {
        _ref: string;
    };
    alt?: string;
}

// Initialize Sanity image URL builder with your project details
const builder = imageUrlBuilder({
  projectId: 'yourSanityProjectId',
  dataset: 'yourSanityDataset',
});

const urlFor = (source: ImageBlock) => builder.image(source).url();

// Define your serializers
const serializers: PortableTextComponents = {
  block: {
    // Example: Customizing heading levels
    normal: ({children}) => <p className="mb-4">{children}</p>,
    h1: ({children}) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    h2: ({children}) => <h2 className="text-3xl font-bold mb-3">{children}</h2>,
    // Add more styles for other types as needed
  },
  types: {
    image: ({value}) => {
      const src = urlFor(value as ImageBlock);
      return <img src={src} alt={value.alt || ''} className="max-w-full h-auto mb-4" />;
    },
    // Define other custom block types here
  },
  list: {
    bullet: ({children}) => <ul className="list-disc ml-5 mb-3">{children}</ul>,
    number: ({children}) => <ol className="list-decimal ml-5 mb-3">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li className='mb-4'>{children}</li>,
    number: ({children}) => <li className='mb-4'>{children}</li>,
  },
  marks: {
    link: ({value, children}) => <a href={value.href} className="text-blue-500 hover:underline">{children}</a>,
    // Define other mark styles here
  },
};

// PortableText component
interface PortableTextProps {
  content: Block[];
}


const Post = () => {

    const router = useRouter();
    const { slug } = router.query;
    const [post, setPost] = useState<any | null>(null);

    useEffect(() => {
        if (!slug || Array.isArray(slug)) return;
        getPostBySlug(slug).then((data) => {
            setPost(data);
        });
    }, [slug]);

    if (!post) return <p>Loading...</p>;

    const formatDate = (dateString: any) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined);
    };

    return (
        <>
            <Header/>
            <article className="max-w-4xl mx-auto p-5">
                <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
                {/* <div className="my-4">
                    <p>By {post.authorName} on {formatDate(post.publishedAt)}</p>
                </div> */}
                {post.mainImageUrl && (
                    <img
                        src={post.mainImageUrl}
                        alt={post.altText || 'Blog Post Image'}
                        className="w-full h-auto object-cover"
                    />
                )}
                <div className="mt-6">
                    {/* Render the block content using @portabletext/react */}
                    <PortableTextComponent 
                        components={serializers} 
                        value={post.body}
                    />
                </div>
            </article>
        </>
    );
};

export default Post;
