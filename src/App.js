import React from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import PagesList from "./components/PagesList";
import "./components/style.css";
import PageContent from "./components/PageContent";

class App extends React.Component {
  state = { pages: [], errorMessage: "", pageNumber: null };

  checkError = (response) => {
    if (response.data.Pages) {
      for (let index = 0; index < response.data.Pages.length; index++) {
        const page = response.data.Pages[index];
        if (!("title" in page && "bodyText" in page)) {
          this.setState({
            pages: [],
            errorMessage:
              "ERROR : Schema of JSON file returned by the URL is not as expected as first key is not title or second key is not bodyText",
          });
          return;
        }
      }
    } else {
      this.setState({
        pages: [],
        errorMessage:
          "ERROR : Schema of JSON file returned by the URL is not as expected as it does not contain Pages object",
      });
    }
  };

  onSearchSubmit = async (term) => {
    var response = null;
    try {
      response = await axios.get(term);
      this.setState({ pages: response.data.Pages, errorMessage: "" });
      this.checkError(response);
    } catch (err) {
      this.setState({ pages: [], errorMessage: err.message });
    }
  };

  onTitleClicked = (number) => {
    this.setState({ pageNumber: number });
  };

  renderBodyText() {
    if (this.state.pageNumber !== null) {
      return (
        <PageContent
          page={this.state.pages[this.state.pageNumber]}
        ></PageContent>
      );
    }
  }

  renderContent() {
    if (this.state.pages.length !== 0) {
      return (
        <div className="grid-container">
          <div className="content">
            <h3>Menu</h3>
            <PagesList
              pages={this.state.pages}
              onClicked={this.onTitleClicked}
              pageClicked={this.state.pageNumber}
            ></PagesList>
          </div>
          <div>{this.renderBodyText()}</div>
        </div>
      );
    }
    return <></>;
  }

  render() {
    return (
      <div>
        <div className="ui container" style={{ marginTop: "10px" }}>
          <SearchBar onSubmit={this.onSearchSubmit} />
        </div>
        {this.state.errorMessage ? (
          <div className="error-style">
            <p>{this.state.errorMessage}</p>
          </div>
        ) : (
          <></>
        )}
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
