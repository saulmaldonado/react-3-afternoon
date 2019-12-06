import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

function Search(props){
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={event => props.handleChange(encodeURI(event.target.value))}  />

          <SearchIcon id="Search__icon" />
        </div>
        
      </section>
    )
  }

  export default Search