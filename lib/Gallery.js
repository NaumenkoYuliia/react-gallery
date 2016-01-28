require("./styles.less")

import classnames from 'classnames'
import React, {Component} from 'react'
import Icon from './icons/icon'

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImg: 0
        }

        this.handleKeyboardInput = (e) => {
            if (e.keyCode === 37) {
                this.handleLeftClick();
            } else if (e.keyCode === 39) {
                this.handleRightClick();
            } else {
                return false;
            }
        }
    }

    componentDidMount() {
        var el = this.refs.itemList;
        el.addEventListener('touchstart', this.onSwipeStart.bind(this));
        el.addEventListener('touchmove', this.onSwipeMove.bind(this));
        el.addEventListener('touchend', this.onSwipeEnd.bind(this));
        window.addEventListener('keydown', this.handleKeyboardInput);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyboardInput);
    }

    galleryLength() {
        return this.props.children.length
    }

    hasPrevItem() {
        return this.state.currentImg > 0
    }

    handleLeftClick () {
        if ( this.hasPrevItem() ) {
            this.setState({
                currentImg: this.state.currentImg - 1
            })
        } else {
            if ( this.props.loop ) {
                this.setState({ currentImg: this.galleryLength() - 1 })
            }
        }
    }

    hasNextItem() {
        return this.state.currentImg < this.galleryLength() - 1
    }

    handleRightClick () {
        if ( this.hasNextItem() ) {
            this.setState({ currentImg: this.state.currentImg + 1 })
        } else {
            // has hit the upper limit
            if ( this.props.loop ) {
                // go back to first image
                this.setState({ currentImg: 0})
            }
        }
    }

    isActive(i) {
        if ( i == this.state.currentImg ) {
            return true
        } else {
            return false
        }
    }

    isNext(i) {
        if ( i == this.state.currentImg ) {
            return false;
        }

        if ( i == this.state.currentImg + 1 ) {
            return true
        } else if (this.props.loop && this.state.currentImg == this.galleryLength() -1 && i == 0) {
            return true
        } else {
            return false
        }
    }

    isPrev(i) {
        // false if current item
        if ( i == this.state.currentImg ) {
            return false;
        }

        if ( i == this.state.currentImg - 1 ) {
            return true
        } else if (this.props.loop && this.state.currentImg == 0 && i == this.galleryLength() - 1)  {
            return true
        } else {
            return false
        }
    }

    onSwipeStart (e) {
        this.setState({
            touchStart: e.touches[0].pageX,
            swiping: true
        })
    }

    onSwipeMove (e) {
        e.preventDefault()
        var delta = e.touches[0].pageX - this.state.touchStart;
        var swipeThreshold = 10
        if (this.state.swiping) {
            if ( delta < -swipeThreshold) {
                // slide to Next
                this.setState({ swiping: false })
                this.handleRightClick()
            } else if ( delta > swipeThreshold ) {
                //slide to Prev
                this.setState({ swiping: false })
                this.handleLeftClick()
            }
        }

    }

    onSwipeEnd (e) {
        this.setState({
            touchStart: null,
            swiping: false
        })
    }

    renderNav() {
        if (this.props.renderNav) {
            var self = this
            return (
                <div className='gallery__nav'>
                    <button onClick={self.handleLeftClick.bind(self)} className='gallery__navIcon gallery__navIcon--prev'>
                      <Icon type="angleLeft"/>
                    </button>
                    <button onClick={self.handleRightClick.bind(self)} className='gallery__navIcon gallery__navIcon--next'>
                      <Icon type="angleRight"/>
                    </button>
                </div>
            )
        } else {
            return null
        }
    }

    render() {
        var self = this
        var items = []

        this.props.children.forEach( (item, i) => {
            var classArg = {}

            var itemClasses = classnames({
                'gallery__item': true,
                //'show': this.isActive(i),
                //'hide': !this.isActive(i)
                //'fade-in': this.isActive(i),
                //'fade-out': !this.isActive(i),
                'gallery__item--active': this.isActive(i),
                'gallery__item--next': this.isNext(i),
                'gallery__item--prev': this.isPrev(i)
            })

            items.push(
                <li key={i} className={itemClasses}>
                   {item}
                </li>
            )
        })

        return (
            <div className='gallery'>
                <ul className='gallery__items' ref="itemList">{ items }</ul>
                {this.renderNav()}
            </div>
        )
    }
}

Gallery.propTypes = {
    loop: React.PropTypes.bool,
    renderNav: React.PropTypes.bool,
    animate: React.PropTypes.string,
    children: React.PropTypes.array.isRequired
}

Gallery.defaultProps = {
    loop: false,
    animate: null,
    renderNav: true
}

module.exports = Gallery
