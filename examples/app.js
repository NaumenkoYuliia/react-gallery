require("./app.less")

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Gallery from '../lib/Gallery'

class App extends Component {
    constructor () {
        super();
        var images = [
            { title: 'Basil', width: '800', height: '650' },
            { title: 'Lettuce', width: '1000', height: '1000'},
            { title: 'Tomatoes', width: '400', height: '650' },
            { title: 'Corn', width: '1000', height: '1000'},
            { title: 'Cheese', width: '1250', height: '860'}
        ]
        this.items = images.map(( item, i ) => {
            var src = "https://unsplash.it/" + item.width + "/" + item.height + "/?random";
            return (
                <div key={i}>
                    <h3 className="image-title">{item.title}</h3>
                    <img className="centered" src={src} />
                </div>
            )
        })

        this.items.push(
            <div key={'foo'}>
                <div className="centered">
                    <h1>Some Random Text</h1>
                    <p>Sociis risus nisi lorem, sed! Et nunc diam odio nisi dolor porta et in, rhoncus amet, magnis scelerisque proin? Auctor lacus et et etiam proin turpis cum? Ac scelerisque quis ridiculus urna, placerat tristique augue aenean facilisis augue massa dignissim, lundium purus? Eu est, odio dignissim scelerisque urna scelerisque purus pulvinar est aliquam dictumst. Integer?</p>
                </div>
            </div>
        )

        this.items.push(
            <div key={'vimeo'} className={'vimeo-embed'}>
                <div className="centered">
                    <iframe src="//player.vimeo.com/video/148626927" width="640px" height="420px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <Gallery renderNav={true} loop={true}>
                   {this.items}
                </Gallery>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('example'));
