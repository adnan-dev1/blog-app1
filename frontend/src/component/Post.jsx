import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Post.module.css';

const Post = ({ post }) => {

  const PF = process.env.REACT_APP_API_ENDPOINT;
  return (
    <div className={styles.postContainer}>
      <img className={styles.postImage} src={PF + post.photo} alt="Img Does not Load Correctly" />
      <div className={styles.postInfo}>
        <div className={styles.categoriesContainer}>
          {post.categories.map((cat) => {
            return <Link key={cat} className={styles.link} to={`/?cat=${cat}`}>
              <span className={styles.category}>{cat}</span>
            </Link>
          })}
        </div>
        <Link className={styles.link} to={`/post/${post._id}`}>
          <span className={styles.postTitle}>{post.title}</span>
        </Link>
        <div className={styles.postSubInfo}>
          <Link className={styles.link} to={`/?username=${post.username}`}>
            <span className={styles.postAuthor}>Author:  {post.username}</span>
          </Link>
          <span className={styles.postDate}>{new Date(post.createdAt).toDateString()}</span>
        </div>
      </div>
    </div>
  )
}

export default Post