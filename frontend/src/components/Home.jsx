import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";

export const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchData(page);
    window.addEventListener("scroll", handleScroll);
  }, [page]);
  const fetchData = (page) => {
    axios
      .get(`https://dummyjson.com/products?limit=${9 + 5 * page}`)
      .then((res) => {
        setData(res.data.products);
      });
  };
  const handleScroll = () => {
    // console.log("window.scrollY", window);
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;
    if (userScrollHeight >= windowBottomHeight) {
      setPage(page + 1);
      setTimeout = () => {
        fetchData(page), 2000;
      };
    }
  };

  return (
    <div className={styles.container} onScroll={handleScroll}>
      {data.map((el, index) => {
        return (
          <div key={index} className={styles.product}>
            <div>
              <img src={el.images[0]} alt="" />
              <h5>{el.title}</h5>
            </div>
          </div>
        );
      })}
    </div>
  );
};
