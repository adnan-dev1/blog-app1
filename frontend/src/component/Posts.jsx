import React from 'react'
import Post from './Post'
import styles from './Posts.module.css'

const Posts = ({ posts }) => {
  return (
    <div className={styles.postsContainer}>
      {posts.length === 0 ?
        <span className={styles.noPosts}>No Posts Available Right Now.</span>
        :
        posts.map((post) => {
          return <Post key={post._id} post={post} />
        })}
    </div>
  )
}

export default Posts