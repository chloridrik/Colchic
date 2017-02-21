Colchic = function(root) {
    this.mediaQuery = null;
    this.root = root || this;
    this.cols = 16;
    this.gutterWidth = "10px";
    this.lineSpace = "10px";
    this.container = "";
    this.generation = 0;

    this.columns = [];


};

Colchic.prototype.constructor = Colchic;

Colchic.create = function(container, cols, gutterWidth, lineSpace) {
    var colchic = new Colchic();
    colchic.cols = cols;
    colchic.gutterWidth = gutterWidth;
    colchic.lineSpace = lineSpace;
    colchic.container = container;
    colchic.generation = 0;
    colchic.build();
    return colchic;
};

Colchic.prototype.media = function(mediaQuery, cols, gutterWidth, lineSpace) {
    var colchic = new Colchic(this.root);
    colchic.mediaQuery = mediaQuery;
    colchic.cols = cols;
    colchic.gutterWidth = gutterWidth;
    colchic.lineSpace = lineSpace;
    colchic.generation = this.generation + 1;
    colchic.build();
    return colchic;
};


Colchic.prototype.build = function() {

    var css = "";

    if (this.root === this) {
        this.indexColumns();
        this.addTotalClass();
        css += this.buildRoot();
    }

    this.addLastOfLine()

    //  if (this === this.root) 




    if (this.mediaQuery !== null) css += "@media " + this.mediaQuery + "{\n";

    var colWidth = Math.floor(100 / this.cols * 100) / 100;
    var rootCols = this.root.cols;
    for (var i = 1; i < rootCols + 1; i++) {
        var widthPercent = Math.min(colWidth * i, 100);


        css += this.root.container + " .col-" + i + "{width:" + widthPercent + "%;";
        css += "}\n";

        if (i % this.cols == 0) {
            css += this.root.container + " .total-" + i + "{padding-right:0}\n";
        } else {
            css += this.root.container + " .total-" + i + "{padding-right:" + this.gutterWidth + "}\n";
        }
    }

    css += this.root.container + " > .line > [class*='col-'] > * {margin-bottom:" + this.lineSpace + "}\n";

    if (this.generation > 0) css += this.root.container + " > .line > .last-line-0 > *:last-child {margin-bottom:" + this.lineSpace + "}\n";
    css += this.root.container + " > .line > .last-line-" + this.generation + " > *:last-child {margin-bottom:0}\n";


    if (this.mediaQuery !== null) css += "}\n";

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);

};


Colchic.prototype.indexColumns = function() {
    var lines = document.querySelectorAll(this.root.container + " > .line");
    for (var i = 0; i < lines.length; i++) {
        var cols = lines[i].querySelectorAll("[class*='col-']");
        for (var j = 0; j < cols.length; j++) {
            var col = cols[j];
            if (col.parentNode === lines[i]) {
                if (this.columns[i] == null) this.columns[i] = [];
                this.columns[i].push(col);

            }
        }
        console.log("indexed cols : ", this.columns);
    }

};


Colchic.prototype.buildRoot = function() {
    var css = "";
    css += this.root.container + ", " + this.root.container + " *, " + this.root.container + " *:after, " + this.root.container + " *:before {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}";
    css += this.root.container + " > .line:after{content:'';display: table;clear: both;}";
    css += this.root.container + " > .line > [class*='col-']{float:left;}\n";
    return css;
};


Colchic.prototype.addTotalClass = function() {
    for (var i = 0; i < this.root.columns.length; i++) {
        var cols = this.root.columns[i];
        var totalSize = 0;
        for (var j = 0; j < cols.length; j++) {

            var size = this.extractColSize(cols[j].className);
            totalSize += size;
            cols[j].className += " total-" + totalSize;
        }
    }
};

Colchic.prototype.addLastOfLine = function() {
    var totalSize = 0;
    for (var i = this.root.columns.length - 1; i >= 0; i--) {
        var cols = this.root.columns[i];

        for (var j = cols.length - 1; j >= 0; j--) {

            var size = this.extractColSize(cols[j].className);
            totalSize += size;
            if (totalSize <= this.cols) {
                cols[j].className += " last-line-" + this.generation;
            }
            //cols[j].className += " total-" + totalSize;
        }
    }
};

/*
Colchic.prototype.addTotal = function() {
    var container = document.querySelector(this.root.container);
    if (container === null) return;
    var lines = container.querySelectorAll(".line");
    for (var i = 0; i < lines.length; i++) {
        var cols = lines[i].querySelectorAll("[class*='col-']");

        var totalSize = 0;
        for (var c = 0; c < cols.length; c++) {
            if (cols[c].parentNode.parentNode != container) continue;
            var size = this.extractColSize(cols[c].className);
            totalSize += size;
            cols[c].className += " total-" + totalSize;
            //  console.log("size : ", size);
        }
    }
};
*/



Colchic.prototype.extractColSize = function(classes) {
    var spl = classes.split(" ");
    for (var i = 0; i < spl.length; i++) {
        var val = spl[i];
        if (val.indexOf("col-") > -1) {
            return parseInt(val.substr(4));
        }
    }
    return 0;
};