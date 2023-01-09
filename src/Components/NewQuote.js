import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

function randomRGB() {
  var o = Math.round, r = Math.random, s = 200;
  return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

const FADE_DURATION = 1000;

class NewQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: [],
      author: '',
      color: '',
      fadeTransition: null,
      fadeState: "fade-in"
    };
    this.fetchQuote = this.fetchQuote.bind(this);
  }

  componentDidMount() {
    console.log("NewQuote Component was mounted")
    this.fetchQuote();
  }

  fetchQuote() {
    var category = 'happiness'
    const options = {
      method: 'GET',
      headers: { 'X-Api-Key': 'drrwJnR3nL44nlp9a5qy8w==NrYw1j2QRyH28Giq'}
    };

    fetch('https://api.api-ninjas.com/v1/quotes?category=' + category, options)
      .then(response => response.json())
      .then((data) => this.setState({
        quote: data[0]['quote'],
        author: data[0]['author']
      })
      )
      // .catch(err => console.error(err));

    this.setState({
      color: randomRGB()
    })
  }

  handleClick() {
    // After current quote faded out, fetch
    // next quote and display
    const timeout = setTimeout(() => {
      this.fetchQuote();

      this.setState({
        // Apply additional state to control
        // fading transition
        fadeTransition: null,
        fadeState: "fade-in"
      })

    }, FADE_DURATION);

    // Stop any existing transition
    clearTimeout(this.state.fadeTransition);

    // Update state to perform the fade out from
    // current quote
    this.setState({
      fadeState: "fade-out",
      fadeTransition: timeout
    });
  }

  render() {
    const link = "https://twitter.com/intent/tweet?&text=" + encodeURIComponent('"' + this.state.quote + '" -'  + this.state.author);
    document.body.style.backgroundColor = this.state.color;
    return (
    <div id="quote-box">
      <div
        className={`fade-wrapper ${this.state.fadeState}`}
        style={{ transitionDuration: `${FADE_DURATION}ms` }}
      >
        <div id="text" style={{color: this.state.color}}>
          <FontAwesomeIcon icon={faQuoteLeft} /> {this.state.quote}
        </div>
        <div id="author" style={{color: this.state.color}}>
          - {this.state.author}
        </div>
      </div>
      <div id="buttons">
        <a href={link} target="_top" id="tweet-quote" style={{color: this.state.color}}>
          <FontAwesomeIcon icon={faTwitterSquare} />
        </a>
        <button id="new-quote" onClick = {this.handleClick.bind(this)} style={{backgroundColor: this.state.color}}>New quote</button>
      </div>
    </div>
    )
  }
}

export default NewQuote;
