import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'





export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize:8,
        category:'general'
      }
      static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
      }
     capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    
    constructor(props){
        super(props);
        console.log("hello I am a constructor from news component");
        this.state ={
            articles: [],
            loading: false,
            page:1

        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    async updateNews(){
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=a684ff19f9f74b028d4a4dd6b03a19e9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles : parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
    }
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=a684ff19f9f74b028d4a4dd6b03a19e9&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles : parsedData.articles,
            totalArticles:parsedData.totalResults,
            loading:false
        })
        // this.updateNews()
    }
    handlePrevious = async() =>{
        console.log("prev");
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=a684ff19f9f74b028d4a4dd6b03a19e9&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page : this.state.page -1,
            articles : parsedData.articles,
            loading:false

        })
        // this.setState({
        //     page:this.state.page - 1
        // })
        // this.updateNews()
        
    }
    
    handleNext = async()=>{
       
        if(! (this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize))) {
   
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=a684ff19f9f74b028d4a4dd6b03a19e9&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page : this.state.page +1,
                articles : parsedData.articles,
                loading:false
    
            })
        }
        // this.setState({
        //     page:this.state.page + 1
        // })
        // this.updateNews();
    
    }

    

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center"  style={{margin:'40px 30px'}}>NewsMonkey - Top  {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
               {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                    })}
                    
                </div>   
                <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page===1} type="button" className="btn btn-info" onClick={this.handlePrevious}>&larr; Previous</button>
                        <button disabled={this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize)}type="button" className="btn btn-info" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
