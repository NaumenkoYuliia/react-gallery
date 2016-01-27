jest.dontMock('../lib/Gallery');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Gallery = require('../lib/Gallery');

describe("Gallery", () => {
    var gallery, galleryWithLoop;

    var items = [
        <div key='foo'>Foo</div>,
        <div key='bar'>Bar</div>,
        <div key='baz'>Baz</div>,
    ];

    beforeEach(() => {
        gallery = TestUtils.renderIntoDocument(
            <Gallery>
              {items}
            </Gallery>
        );

        galleryWithLoop = TestUtils.renderIntoDocument(
            <Gallery loop={true}>
              {items}
            </Gallery>
        );
    });

    it("initial state", () => {
        expect(gallery.props.loop).toBe(false);
        expect(gallery.state.currentImg).toBe(0);
    });

    describe("hasPrevItem()", () => {
        it("when first item return false", () => {
            expect(gallery.hasPrevItem()).toBe(false);
        });
        it("when last item return true", () => {
            gallery.state.currentImg = 2
            expect(gallery.hasPrevItem()).toBe(true);
        });
    });

    describe("hasNextItem()", () => {
        it("when first item return true", () => {
            expect(gallery.hasNextItem()).toBe(true);
        });
        it("when last item return false", () => {
            gallery.state.currentImg = 2
            expect(gallery.hasNextItem()).toBe(false);
        });
    });

    describe("galleryLength()", () => {
        it("should return gallery item count", () => {
            expect(gallery.galleryLength()).toBe(3);
        });
    });

    describe("isAcitve()", () => {
        it("should return true when currentImg", () => {
            gallery.state.currentImg = 2
            expect(gallery.isActive(2)).toBe(true);
        });
        it("should return false when not currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isActive(2)).toBe(false);
        });
    });

    describe("isNext()", () => {
        it("should return true when item follows directly after currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isNext(2)).toBe(true);
        });
        it("should return false when not follows directly after currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isNext(0)).toBe(false);
        });
        it("should return false on currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isNext(1)).toBe(false);
        });
        describe("when loop is true", () => {
            it("should return true only on first item when current item is last", () => {
                galleryWithLoop.state.currentImg = 2
                expect(galleryWithLoop.isNext(0)).toBe(true);
            });
            it("should return false on other item when current item is last", () => {
                gallery.state.currentImg = 2
                expect(gallery.isNext(1)).toBe(false);
            });
            it("should return false on current item ", () => {
                gallery.state.currentImg = 2
                expect(gallery.isNext(2)).toBe(false);
            });
        });
    });

    describe("isPrev()", () => {
        it("should return true when item follows directly before currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isPrev(0)).toBe(true);
        });
        it("should return false when does not follows directly before currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isPrev(2)).toBe(false);
        });
        it("should return false on currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isPrev(1)).toBe(false);
        });
        describe("when loop is true", () => {
            it("should return true only on last item when current item is first", () => {
                galleryWithLoop.state.currentImg = 0
                expect(galleryWithLoop.isPrev(2)).toBe(true);
            });
            it("should return false on other item when current item is first", () => {
                gallery.state.currentImg = 0
                expect(gallery.isPrev(1)).toBe(false);
            });
            it("should return false on current item ", () => {
                gallery.state.currentImg = 2
                expect(gallery.isPrev(2)).toBe(false);
            });
        });
    });

    describe("click next item", () => {

        it("should move to the next item", () => {
            TestUtils.Simulate.click(
                TestUtils.findRenderedDOMComponentWithClass(gallery, 'icon--right')
            );
            expect(gallery.state.currentImg).toBe(1);
        });

        it("when last item should not change state", () => {
            gallery.state.currentImg = 2
            TestUtils.Simulate.click(
                TestUtils.findRenderedDOMComponentWithClass(gallery, 'icon--right')
            );
            expect(gallery.state.currentImg).toBe(2);
        });

        describe("when loop is true", () => {
            it("on last item should loop to first", () => {
                galleryWithLoop.state.currentImg = 2
                TestUtils.Simulate.click(
                    TestUtils.findRenderedDOMComponentWithClass(galleryWithLoop, 'icon--right')
                );
                expect(galleryWithLoop.state.currentImg).toBe(0);
            });
        });
    });

    describe("click prev item", () => {

        it("should move to the prev item", () => {
            gallery.state.currentImg = 1
            TestUtils.Simulate.click(
                TestUtils.findRenderedDOMComponentWithClass(gallery, 'icon--left')
            );
            expect(gallery.state.currentImg).toBe(0);
        });

        it("when first item should not change state", () => {
            TestUtils.Simulate.click(
                TestUtils.findRenderedDOMComponentWithClass(gallery, 'icon--left')
            );
            expect(gallery.state.currentImg).toBe(0);
        });

        describe("when loop is true", () => {
            it("on first item should loop to last", () => {
                TestUtils.Simulate.click(
                    TestUtils.findRenderedDOMComponentWithClass(galleryWithLoop, 'icon--left')
                );
                expect(galleryWithLoop.state.currentImg).toBe(2);
            });
        });
    });
});
