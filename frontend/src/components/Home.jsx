import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";

export const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  window.onscroll=()=>{
    if(window.innerHeight + window.scrollY>=document.documentElement.offsetHeight){
        setPage(page + 1);
        setTimeout = () => {
          fetchData(page), 100;
        }
    }
  
}
  useEffect(() => {
    fetchData(page);
  }, [page]);
  const fetchData = (page) => {
    axios
      .get(`https://dummyjson.com/products?limit=${9 + 5 * page}`)
      .then((res) => {
        setData(res.data.products);
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
