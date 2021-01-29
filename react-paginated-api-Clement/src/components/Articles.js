import React, { useEffect, useState } from 'react';
import axios from "axios";

const Articles = () => {
    const [counter, setCounter] = useState(0);
    const [nextPageNum, setNextPageNum] = useState(1);
    const [userInfos, setUserInfos] = useState([]);
    const [randomUserDataJSON, setRandomUserDataJSON] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [articles, setArticles] = useState([]);
    const link = 'https://jsonmock.hackerrank.com/api/articles?page=';

    const fetchRandomData = (pageNumber) => {
      return axios.get(`https://randomuser.me/api?page=${pageNumber}`)
        .then( ({ data }) => {
          console.log(data);
          return data;
        })
        .catch(err => {
          console.error(err);
        })
    }

    const getFullUserName = (userInfo) => {
      const {name: {first, last}} = userInfo;
      return `${first} ${last}`;
    }

    const apiCall = async (page) => {
      let url = link + page;
      let response = await fetch(url);
      let pageData = await response.json();

      let pages = pageData.total_pages;

      setTotalPages(pages);
      const filteredArticles = pageData.data.filter((item) => item.title);

      setArticles(filteredArticles);
    }

    const fetchNextUser = () => {
      fetchRandomData(nextPageNum).then(randomData => {
        setRandomUserDataJSON(JSON.stringify(randomData, null, 2) || 'No User');
        if(randomData === undefined) return;
        const newUserInfos = [
          ...userInfos,
          ...randomData.results,
        ]
        setUserInfos(newUserInfos);
        setNextPageNum(randomData.info.page + 1);
      })
    }

    useEffect( () => {
        apiCall(1);
        fetchNextUser();
    }, []);


    const handleClick = (e) => {
      let targetBtn = e.target.innerHTML;
      apiCall(targetBtn);
    }

    return (

      <React.Fragment>
        <div className="App">
          <h1>Hello React!</h1>
          <h2>This is comparison of two styles of React pagination!</h2>
          <p>
            {counter}
          </p>
          <button onClick={() => {
              setCounter(counter + 1)
            }}> Increase Counter
          </button>
          <button onClick={() => {
              fetchNextUser();
            }}> Fetch Next User
          </button>
          {
            userInfos.map((userInfo, idx) => (
              <div key={idx}>
                <p>
                  {getFullUserName(userInfo)}
                </p>
                <img src={userInfo.picture.thumbnail} alt='' />
              </div>
            ))
          }
          <pre>
              {randomUserDataJSON}
          </pre>
        </div>
        <div className="pagination">
          {Array(totalPages).fill().map((page, index) =>   {
            return (
              <button data-testid="page-button" key={"page-button-" + index} onClick={handleClick}>{index + 1}</button>
            )
          })
          }
        </div>

        <ul className="results">
          {articles.map((article, index) => {
            return (
              <li key={"title-" + index} data-testid="result-row">{article.title}</li>
            )
          })}
        </ul>
      </React.Fragment>
    );
}

export default Articles;
