import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const  [articles, setarticles] = useState([])
  const  [loading, setLoading] = useState(true)
  const  [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  


 const capitalizeFirstLetter = (str) => {

    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }

 const updateNews = async (page) => {
    
    setLoading(true)
    props.setProgress(20)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.APIkey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(50)
    let parsedData = await data.json();
    props.setProgress(70)
    
    setarticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    setPage(page+1)

    props.setProgress(100)
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
    updateNews(page - 1);
  },[])


 const handlePrevClick = async () => {
    setPage(page - 1 );
    updateNews(page - 1);
  }
  
 const fetchMoreData = async() => {
   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.APIkey}&page=${page+1}&pageSize=${props.pageSize}`;
   setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();

    setarticles

    setarticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

 const handleNextClick = async () => {
  setPage(page+1)
    console.log(page);
    updateNews(page + 1);
  }

    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop:'90px' }}>News Monkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {/* {loading && <Spinner/>} */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
              {/* !loading && */}

              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem source={element.source.name} title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} author={element.author} publishDate={element.publishedAt} imageUrl={!element.urlToImage ? "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg" : element.urlToImage} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        </>
    );
}

export default News;

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general',
  totalResults:0
}

News.propsType = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  APIkey: PropTypes.string
}
