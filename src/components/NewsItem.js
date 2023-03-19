import React from "react";

const NewsItem = (props) => {

     let { title, description, imageUrl, newsUrl, author, publishDate, source } = props;
    return (
      <div className="my-3">
        <div className="card" >
          <div>
            <span className="badge rounded-pill bg-danger" style={{ display: 'flex',justifyContent: 'flex-end', position: 'absolute',right: '0'}}>
              {source}
            </span>
          </div>
          <img className="card-img-top" src={imageUrl} alt="No Image" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(publishDate).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
