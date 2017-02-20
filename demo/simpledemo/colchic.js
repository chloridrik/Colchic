Colchic = function(root) {
    this.mediaQuery = null;
    this.root = this;
    this.cols = 16;
    this.gutterWidth = "10px";
    this.lineSpace = "10px";
};

Colchic.prototype.constructor = Colchic;

Colchic.create = function(container, cols, gutterWidth, lineSpace) {
    var colchic = new Colchic();
    colchic.cols = cols;
    colchic.gutterWidth = gutterWidth;
    colchic.lineSpace = lineSpace;
    return colchic;
};

Colchic.prototype.media = function(mediaQuery, cols, gutterWidth, lineSpace) {
    var colchic = new Colchic(this.root);
    colchic.mediaQuery = mediaQuery;
    colchic.cols = cols;
    colchic.gutterWidth = gutterWidth;
    colchic.lineSpace = lineSpace;
    colchic.build();
    return colchic;
};


Colchic.prototype.build = function() {

};