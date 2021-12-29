import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: ''
    }
    this.displayQuote = this.displayQuote.bind(this);
  }

  componentDidMount() {
    this.displayQuote();
  }

  async fetchQuote() {
    let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async displayQuote() {
    let res = await this.fetchQuote();
    let randomNum = Math.floor(Math.random() * res.quotes.length)
    this.setState({
      quote: res.quotes[randomNum].quote,
      author: res.quotes[randomNum].author
    })
  }

  render() {
    let twitterURL = `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(this.state.quote + '\n- ' + this.state.author)}`;
    // let tweetLink = `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(this.state.currentQuote.quote + '\n - ' + this.state.currentQuote.author)}`;
    return (
      <div className="quote-wrapper">
        <div id="quote-box">
          <blockquote className="quote" id="text">
            <i className="fas fa-quote-left"></i> {this.state.quote + " "}
            <i className="fas fa-quote-right"></i>
            <p id="author">{this.state.author}</p>
          </blockquote>

          <div className="card-bottom">
            <a href={twitterURL} target="_blank" rel="noreferrer" id="tweet-quote">
              <div id="icon" title='Tweet this quote!'>
                <i className="fab fa-twitter"></i>
              </div>
            </a>
            <div className="btn">
              <button
                id="new-quote"
                onClick={this.displayQuote}
              >
                New Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
