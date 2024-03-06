import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../../sanity/services/blog';
import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Header from '@/components/layout/header';

const BlogPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts().then((posts) => {
            setPosts(posts)
            console.log("posts: ", posts);
        });
    }, []);

    return (
        <>
            <Header/>
            <section>
                <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
                    <div className="flex flex-col items-center">
                        <h2 className="text-center text-3xl font-bold md:text-5xl">
                            The latest and greatest news
                        </h2>
                        <p className="mb-8 mt-4 text-center text-sm text-[#636262] sm:text-base md:mb-12 lg:mb-16">
                            Stay updated with our latest insights and stories.
                        </p>
                        <div className="mb-8 grid gap-5 sm:grid-cols-2 sm:justify-items-stretch md:mb-12 md:grid-cols-3 lg:mb-16 lg:gap-6">
                            {posts.map((post: any) => (
                                <Link href={`/insurance-quote-blog/${post.slug.current}`} key={post.slug.current}>
                                    <div className="flex shadow-sm border border-gray-400/20 flex-col rounded-md px-4 py-8 md:py-4">
                                        <img
                                            src={post.mainImageUrl}
                                            alt={post.altText || 'Blog post image'}
                                            className="h-60 w-full object-cover rounded-md"
                                        />
                                        <div className="flex flex-col items-start py-4">
                                            {post.categories && post.categories.length > 0 && (
                                                <div className="mb-2 rounded-md bg-[#f2f2f7] p-2">
                                                    <p className="text-sm font-semibold text-[#6574f8]">
                                                        {post.categories[0].title}
                                                    </p>
                                                </div>
                                            )}
                                            <p className="mb-4 text-xl font-bold md:text-2xl">
                                                {post.title}
                                            </p>
                                            <div className="flex flex-col items-start text-sm text-[#636262] lg:flex-row lg:items-center">
                                                {/* <p>{post.authorName}</p>
                                                <p className="mx-2 hidden lg:block">-</p> */}
                                                <p>{formatDistanceToNow(new Date(post.publishedAt))} ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogPosts;
