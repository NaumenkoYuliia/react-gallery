# React Gallery

Elegant gallery with swipe.

Check it out
[ferndopolis.github.io/react-gallery](http://ferndopolis.github.io/react-gallery/)

## Basic Usage

Pass items to `Gallery` as an array.

```jsx
import React, {Component} from 'react'
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
            <p>Sociis risus nisi ridiculus urn?</p>
        </div>
    </div>
)

// add embeded video
items.push(
    <div key={'video'} className={'video-embed'}>
        <div className="centered">
            <iframe src="//player.vimeo.com/video/148626927" width="640px" height="420px" frameBorder="0"
              webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
        </div>
    </div>
)

class App extends Component {
    render() {
        return (
            <div className="container">
                <Gallery renderNav={true} loop={true} animate='slideLR'>
                   {items}
                </Gallery>
            </div>
        )
    }
}
```

## Props

|Property|Type|Default|Description|
|--------|----|-------|-----------|
| loop | bool | false | inifinte loop through gallery |
| animate | string | null | optional animate style [ 'slideLR', 'slideUD', 'fade' ] |


## Local Development

` npm install `
` npm test ` run test.
` npm start ` start development server.
` npm run watch ` watch and build bundle.

Point browser to [`localhost:8080`](http://localhost:8080)
