import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let{title,description,imageUrl,newsUrl,author,date,source}= this.props;
        return (
            <div className="my-3">
                <div className="card" >
                {/* style={{width: "18rem"}} */}
                    <img src={!imageUrl?"https://images.indianexpress.com/2021/11/gurgaon-namaz-1.jpg":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                      <h5 className="card-title">{title}...<span class="badge bg-success"> {author?author:"Unknown"}</span>
                      <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'88%', zIndex:"1"}}>{source}</span>
                      </h5>
                      <p className="card-text">{description}...</p>
                      <p className="card-text"><small className="text-muted"><span class="badge bg-light text-dark">{new Date(date).toGMTString()}</span> </small></p>
                      <a href={newsUrl} target="_blank" rel="noreferrer"className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
