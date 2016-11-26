class Material {
    constructor(dom) {
        var self = this;
        self.dom = dom;

        // box
        var box = this.materialBox = document.createElement('div');
        box.className = 'material-box';
        var boxWidth = Math.max(dom.clientHeight, dom.clientWidth);
        box.style.width = box.style.height = boxWidth + 'px';
        box.style.width = box.style.height = boxWidth + 'px';
        box.style.margin = -boxWidth / 2 + 'px';

        //div
        var div = this.material = document.createElement('div');
        box.appendChild(this.material);
        self.canHide = true;
        self.doHide = false;
        div.className = 'material';
        dom.appendChild(box);

        //
        setTimeout(function () {
            self.canHide = false;
            self.show();
            setTimeout(function () {
                self.canHide = true;
                if (self.doHide) {
                    self.hide();
                }
            }, 300);
        });
    }

    show() {
        this.material.className = 'material active';
    }

    hide() {
        if (this.canHide == false) {
            this.doHide = true;
            return;
        }
        var self = this;
        this.material.className = 'material finished';
        setTimeout(function () {
            self.materialBox.remove();
        }, 300);
    }
}

// for animate
var amimates = [];
document.addEventListener('mousedown', function (e) {
    var dom = e.target;
    while (dom) {
        if (/material-ani/.test(dom.className)) {
            amimates.push(new Material(dom));
            break;
        }
        dom = dom.parentElement;
    }
});

window.addEventListener('mouseup', function (e) {
    for (var i in amimates) {
        amimates[i].hide();
    }
});