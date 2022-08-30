import React from 'react';
import axios from 'axios';
import SearchBar from "./components/SearchBar";
import PagesList from './components/PagesList';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './components/style.css';

class App extends React.Component {

  state = { pages: [], errorMessage: "", pageNumber : null};

  checkError = (response) =>{
    if(response.data.Pages){
      for (let index = 0; index < response.data.Pages.length; index++) {
        const keys = Object.keys(response.data.Pages[index]);
        if (keys[0] !== "title" || keys[1] !== "bodyText") {
            this.setState({pages: [], errorMessage: "Schema of JSON file returned by the URL is not as expected as first key is not title or second key is not bodyText"});
        }
      }
    }else{
      this.setState({pages: [], errorMessage: "Schema of JSON file returned by the URL is not as expected as it does not contain Pages object"});
    }
  }

  onSearchSubmit = async (term) => {
    var response = null;
    try {
      response = await axios.get(term);
      console.log(response.data.Pages);
      this.setState({ pages: response.data.Pages, errorMessage: "" });
      this.checkError(response);
      
    } catch (err) {
      console.log(err.message);
      this.setState({pages: [], errorMessage: err.message});
    }    
  };

  onTitleClicked = (number) =>{
    let statement = `Page number ${number} Clicked`
    console.log(statement);
    this.setState({pageNumber: number});    
  }

  renderContent(){
    if (this.state.errorMessage) {
      return <div className='error-style'><p>{this.state.errorMessage}</p></div>;
    }else{
      let pn;
      if (this.state.pageNumber !== null) {
        pn = this.state.pageNumber
        console.log(pn);
        return(
          <div className='grid-container'>
            <div className='content'>
                <PagesList pages = {this.state.pages} onClicked = {this.onTitleClicked}></PagesList>
            </div>
            <div className='body-text'>
              <div className='content'>
                <h1 className='h1'>{this.state.pages[pn].title}</h1>
              </div>
              <div className='content'>
                <ReactMarkdown children={this.state.pages[pn].bodyText} remarkPlugins={[remarkGfm]} />
              </div>
            </div>
        </div>
        )
      }else{
        return (
          <div className='grid-container'>
            <div className='content'>
              <PagesList pages = {this.state.pages} onClicked = {this.onTitleClicked}></PagesList>
            </div>
            <div></div>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div>
          <div className="ui container" style={{ marginTop: "10px" }}>
            <SearchBar onSubmit={this.onSearchSubmit} />
          </div>
          {this.renderContent()}
      </div>
      
    );
  }
}

export default App;  