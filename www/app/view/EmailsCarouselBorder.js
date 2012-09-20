Ext.define('AE.view.EmailsCarouselBorder', {
    extend: 'Ext.Carousel',
    xtype : 'emailscarouselborder',
    requires: [
        'AE.view.EmailPanel',
        'Ext.Img'
    ],

    config: {
        padding: '10 0 0 0'
    },

    setOffset: function(offset) {

        var orderedCarouselItems = this.orderedCarouselItems,
            bufferSize = this.getBufferSize(),
            activeItem = orderedCarouselItems[bufferSize],
            itemLength = this.itemLength,
            axis = this.currentAxis,
            nextItem, previousItem, distance, i;

        this.offset = offset;

        offset += this.itemOffset;

        if (activeItem) {
            activeItem.translateAxis(axis, offset);

            for (i = 1,distance = 0; i <= bufferSize; i++) {
                previousItem = orderedCarouselItems[bufferSize - i];

                if (previousItem) {
                    distance += itemLength;
                    previousItem.translateAxis(axis, offset - distance);
                }
            }

            for (i = 1,distance = 0; i <= bufferSize; i++) {
                nextItem = orderedCarouselItems[bufferSize + i];

                if (nextItem) {
                    distance += itemLength;
                    nextItem.translateAxis(axis, offset + distance);
                }
            }
        }

        return this;
    },

    setOffsetAnimated: function(offset) {

        var activeCarouselItem = this.orderedCarouselItems[this.getBufferSize()],
            indicator = this.getIndicator();

        if (indicator) {
            indicator.setActiveIndex(this.getActiveIndex() - this.animationDirection);
        }


        this.offset = ((offset == 0) ? (AE.config.emailsCarouselBorder.itemOffset / 2) : offset);
        offset += this.itemOffset;

        if (activeCarouselItem) {
            this.isAnimating = true;

            activeCarouselItem.getTranslatable().on(this.animationListeners);
            activeCarouselItem.translateAxis(this.currentAxis, offset, this.getAnimation());
        }

        return this;
    },

    updateBufferSize: function(size) {

        var ItemClass = Ext.carousel.Item,
            total = size * 2 + 1,
            isRendered = this.isRendered(),
            innerElement = this.innerElement,
            items = this.carouselItems,
            ln = items.length,
            itemConfig = this.getItemConfig(),
            itemLength = this.getItemLength(),
            direction = this.getDirection(),
            setterName = direction === 'horizontal' ? 'setWidth' : 'setHeight',
            i, item,
            // ELI
            contactsListResizeLevel = AE.app.getController('UI').contactsListResizeLevel,
            configOffset = AE.config.emailsCarouselBorder.itemOffset;

        for (i = ln; i < total; i++) {
            item = Ext.factory(itemConfig, ItemClass);

            if (itemLength) {
                item[setterName].call(item, itemLength);
            }

            // Sets the width and height of Carousel items
            // I need to find the container width and height.
            item['setHeight'].call(item, Ext.Viewport.getWindowHeight() - 40);
            item['setWidth'].call(item, Ext.Viewport.getWindowWidth() - (contactsListResizeLevel + ((configOffset * 2) + 10)));

            items.push(item);
            innerElement.append(item.renderElement);

            if (isRendered && item.setRendered(true)) {
                item.fireEvent('renderedchange', this, item, true);
            }
        }
    },

    refreshSizing: function() {

        var element = this.element,
            itemLength = this.getItemLength(),
            itemOffset, containerSize,
            // ELI
            configOffset = AE.config.emailsCarouselBorder.itemOffset;

        if (this.getDirection() === 'horizontal') {
            containerSize = element.getWidth() - configOffset;
        }
        else {
            containerSize = element.getHeight() - configOffset;
        }

        // Eli
        this.hiddenTranslation = -containerSize - configOffset;

        if (itemLength === null) {
            itemLength = containerSize - configOffset;
            itemOffset = 0;
        }
        else {
            itemOffset = (containerSize - itemLength - configOffset) / 2;
        }
//orignal
//        this.itemLength = itemLength;

        this.itemLength = containerSize - (configOffset / 2);

        this.itemOffset = itemOffset + configOffset + 5;

    },

    refreshCarouselItems: function() {

        var items = this.carouselItems,
            contactsListResizeLevel = AE.app.getController('UI').contactsListResizeLevel,
            heightPadding = (AE.app.getController('UI').device.bottomControls ? 57 : 40),
            i, ln, item,
            // ELI
            configOffset = AE.config.emailsCarouselBorder.itemOffset;

        for (i = 0,ln = items.length; i < ln; i++) {
            item = items[i];

            // ELI
            item['setHeight'].call(item, Ext.Viewport.getWindowHeight() - heightPadding);
            item['setWidth'].call(item, Ext.Viewport.getWindowWidth() - (contactsListResizeLevel + ((configOffset * 2) + 10)));
            // ELI end
            item.getTranslatable().refresh();
        }

        this.refreshInactiveCarouselItems();
    }
});