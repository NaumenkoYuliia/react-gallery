require("./app.less")

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Gallery from '../lib/Gallery'

const images = [
    { title: 'Image-1', width: '800', height: '650' },
    { title: 'Image-2', width: '1000', height: '1000'},
    { title: 'Image-3', width: '400', height: '650' }
]

const items = images.map(( item, i ) => {
    var src = "https://unsplash.it/" + item.width + "/" + item.height + "/?random";
    return (
        <div key={'image-'+i}>
            <h3 className="image-title">{item.title}</h3>
            <img className="centered" src={src} />
        </div>
    )
})

// add content to items
items.push(
    <div key={'content'}>
        <div className="centered">
            <h1>Some Random Text</h1>
            <p>Sociis risus nisi lorem, sed! Et nunc diam odio nisi dolor porta et in, rhoncus amet, magnis scelerisque proin? Auctor lacus et et etiam proin turpis cum? Ac scelerisque quis ridiculus urna, placerat tristique augue aenean facilisis augue massa dignissim, lundium purus? Eu est, odio dignissim scelerisque urna scelerisque purus pulvinar est aliquam dictumst. Integer?</p>
        </div>
    </div>
)

// add embeded video
items.push(
    <div key={'video'} className={'video-embed'}>
        <div className="centered">
            <iframe src="//player.vimeo.com/video/148626927" width="640px" height="420px" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
        </div>
    </div>
)

class App extends Component {
    constructor () {
        super();
    }
    render() {
        return (
            <div className="site">
                <div className="container">
                    <h1>Slide</h1>
                    <Gallery renderNav={true} loop={true} animate='slideLR'>
                       {items}
                    </Gallery>
                </div>
                <div className="container">
                    <h1>Fade</h1>
                    <Gallery renderNav={true} loop={true} animate='fade'>
                       {items}
                    </Gallery>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('example'));
