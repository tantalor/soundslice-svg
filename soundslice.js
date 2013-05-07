var paper = Raphael('demo');

function Head() {
  this.set = paper.set();
  var diamond = paper.path("M10,0L20,10L10,20L0,10L10,0");
  diamond.attr('stroke', 'rgb(163,71,24)');
  diamond.attr('fill', 'rgb(232,129,61)');
  diamond.attr('cursor', 'pointer');
  this.set.push(diamond);
  this.diamond = diamond;

  var line = paper.path("M10,20L10,600");
  line.attr('stroke', 'rgb(232,129,61)');
  line.attr('stroke-width', 2);
  this.set.push(line);
  this.line = line;
  
  var glow = this.set.glow({
    swidth: 8,
    fill: true,
    color: 'rgb(232,129,61)'});
  glow.hide();
  this.set.push(glow);
  this.glow = glow;
  
  // Drag events.
  this.x = 10;
  this.y0 = 10;
  this.dx = 0;
  this.xmin = 10;
  this.xmax = 770;
  this.set.drag(this.onmove.bind(this), this.onstart.bind(this));
  
  // Hover events.
  diamond.hover(this.hoverin.bind(this), this.hoverout.bind(this));
  
  this.update();
};

Head.prototype = {
  onmove: function(dx, dy, x, y) {
    this.dx = dx;
    this.update();
  },
  onstart: function() {
    this.x += this.dx;
    this.dx = 0;
  },
  update: function() {
    var x = Math.min(Math.max(this.x + this.dx, this.xmin), this.xmax);
    this.set.transform('T' + x + ',' + this.y0);
  },
  hoverin: function() {
    this.glow.show();
  },
  hoverout: function() {
    this.glow.hide();
  }
};

var head = new Head();

// Animation.
var animating = false;
document.getElementById('animate').onclick = function() {
  animating = !animating;
};

var dx = 10;
function animate() {
  requestAnimationFrame(animate); 
  if (!animating) return;
  head.dx += dx;
  if (head.x + head.dx > head.xmax || head.x + head.dx < head.xmin) dx *= -1;
  head.update();
};
animate();