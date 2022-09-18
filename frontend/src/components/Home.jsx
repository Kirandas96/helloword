import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";

export const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(false);

  window.onscroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight
    ) {
      if (!limit) {
        setPage(page + 1);
      }
    }
  };
  useEffect(() => {
    let timer1 = setTimeout(() => fetchData(page), 200);
      return () => {
        clearTimeout(timer1);
      };
    
  }, [page]);
  const fetchData = (page) => {
    axios
      .get(`https://dummyjson.com/products?limit=${9 + 5 * page}`)
      .then((res) => {
        setData(res.data.products);

        if (res.data.products.length == res.data.total) {
          setLimit(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
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
