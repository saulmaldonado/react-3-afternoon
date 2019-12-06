import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      displayedPosts: [],
      search: ''
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.filterText = this.filterText.bind( this )
    this.handleChange = this.handleChange.bind(this)

    
  }
  
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then(results => {
      this.setState({posts: results.data})
      this.setState({displayedPosts: [...this.state.posts]})
  })
      
}
  

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text}).then(results => {
      this.setState({posts: results.data})
      this.filterText()

    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(results => {
      this.setState({posts: results.data})
      this.filterText()

    })
  }

  createPost( text ) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( results => {
      this.setState({ posts: results.data });
      this.filterText()
    });
  }

  filterText(){
    this.setState({displayedPosts: this.state.posts.filter(val => encodeURI(val.text).includes(this.state.search))})
  }


  handleChange(input){
    this.setState({search: input}, this.filterText)

  }

  componentDidUpdate(){
    console.log(this.state.search)
  }



  render() {
    const { displayedPosts } = this.state;

    return (
      <div className="App__parent">
        <Header filterText={this.filterText} handleChange={this.handleChange} />

        <section className="App__content">

        <Compose createPostFn={ this.createPost } />
          {displayedPosts.map(post => {return <Post key={ post.id }text={ post.text } date={ post.date } id={ post.id } updatePostFn={this.updatePost} deletePostFn={this.deletePost}/> })}
          
        </section>
      </div>
    );
  }
}

export default App;
