import React from "react";
import API from "../../utils/API";
import "./style.css";

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            savedArticles: [],
            title: "",
            startYear: "",
            endYear: ""
        };
    };

    componentDidMount() {
        this.loadSavedArticles()
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleFormSubmit = event => {
        event.preventDefault();
        API.getArticles(this.state.title, this.state.startYear, this.state.endYear)
            .then(res => this.setState({ articles: res.data }))
    };

    saveArticle = (title, date, url) => {
        API.saveArticle({
            title: title,
            date: date,
            url: url
        })
            .then(res => this.loadSavedArticles())
    };

    loadSavedArticles = () => {
        API.savedArticles()
            .then(res => this.setState({ savedArticles: res.data }))
    };

    deleteArticle = id => {
        API.deleteArticle(id)
            .then(res => this.loadSavedArticles())
    }

    render() {
        
    }
}

export default Articles;