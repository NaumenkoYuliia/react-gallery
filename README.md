# React Gallery

Elegant gallery with swipe.

WORK IN PROGRESS many changes will be made to core function.

Check it out
[ferndopolis.github.io/react-gallery](http://ferndopolis.github.io/react-gallery/)

## Basic Usage

Pass any html to the `Gallery` as an array.

```jsx
const images = [
    { title: 'Basil', width: '800', height: '650' },
    { title: 'Lettuce', width: '1000', height: '1000'},
    { title: 'Tomatoes', width: '400', height: '650' },
    { title: 'Corn', width: '1000', height: '1000'},
    { title: 'Cheese', width: '1250', height: '860'}
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

<Gallery>
  {items}
</Gallery>
```

## Props

|Property|Type|Default|Description|
|--------|----|-------|-----------|
| loop | bool | false | inifinte loop through gallery |
| animate | string | null | optional animate style [ slideLR, slideUD, fade ] |


## Local Development

` npm install `
` npm test `
` npm start `
` npm watch `

Point browser to [`localhost:8080`](http://localhost:8080)
