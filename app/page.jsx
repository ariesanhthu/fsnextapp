import Link from 'next/link';
import Post from './components/Post';
import styles from './page.module.css'
import prisma from '@/lib/prisma'
export const dynamic = "auto"; //force-dynamic //force-static
export const dynamicParams = true; //else we can use false
async function getPosts(){
  const posts = await prisma.post.findMany({
    where: {published: true},
    include: {
      author: {
        select: {name: true}
      }
    }
  })
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className={styles.main}>
      <Link href={'/add-post'}>Add Post</Link>
      <h1>Feed</h1>
      {
        posts.map((post) => {
          return (
            <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            authorName={post.author.name}
            />
          )
        })
      }
    </main>
  )
}