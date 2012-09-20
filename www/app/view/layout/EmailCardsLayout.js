Ext.define('Ext.view.layout.EmailCardsLayout', {
    extend: 'Ext.layout.Card',

    getTargetBox : function() {
        var target = this.getTarget(),
            size = target.getSize(),
            padding = {
                left: target.getPadding('l'),
                right: target.getPadding('r'),
                top: target.getPadding('t'),
                bottom: target.getPadding('b')
            },
            border = {
                left: target.getBorderWidth('l'),
                right: target.getBorderWidth('r'),
                top: target.getBorderWidth('t'),
                bottom: target.getBorderWidth('b')
            };

        return {
            width: size.width- padding.left - padding.right - border.left - border.right,
            height: size.height - padding.top - padding.bottom - border.top - border.bottom,
            x: 60,
            y: 20
        };
    },

    setItemBox : function(item, box) {
        if (item && box.height > 0) {
            box.width = 535;
            box.height = 750;
            item.setCalculatedSize(box);
            item.setPosition(box);
        }
    }

});