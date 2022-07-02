import React, { useEffect, useState } from 'react'
import Header from "./Header";
import Posts from './Posts';
import http from '../services/httpService';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import styles from './Home.module.css';
import { showToast } from '../services/showToastNotify';

const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api';

const Home = ({ itemsPerPage }) => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  showToast('info');

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const fetchPosts = async () => {
      const res = await http.get(apiUrl + '/post' + search);
      setPosts(res.data);
      setCurrentItems(res.data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(res.data.length / itemsPerPage));
    };
    fetchPosts();
  }, [search, itemOffset, itemsPerPage]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Header />
      <Posts posts={currentItems} />
      <ReactPaginate
        breakLabel="...."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={styles.paginate}
        activeClassName={styles.active}
      />
    </>
  )
}

export default Home