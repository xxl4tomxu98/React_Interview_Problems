import React from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = "Sorting Articles";

const { useState, useEffect } = React;

function App({articles}) {


    const [ articleList, setArticleList ] = useState(articles);

    function sortBy(key) {
        let newList = [];
        Object.assign(newList, articleList);
        newList.sort((a, b) => {
          if (key === 'upvotes') {
            if (a.upvotes > b.upvotes) {
              return -1;
            }
            if (a.upvotes < b.upvotes) {
              return 1;
            }
            return 0;
          } else {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            if (aDate > bDate) {
              return -1;
            }
            if (aDate < bDate) {
              return 1;
            }
            return 0;
          }
        });
        setArticleList(newList);
    };

    useEffect(() => {
      sortBy('upvotes');
    }, [])

    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
                <button data-testid="most-upvoted-link" className="small" onClick = {() => {
                    sortBy('upvotes');
                }}>Most Upvoted</button>
                <button data-testid="most-recent-link" className="small" onClick = {() => {
                    sortBy('date');
                }}>Most Recent</button>
            </div>
            <Articles articles={articleList}/>
        </div>
    );

}

export default App;
