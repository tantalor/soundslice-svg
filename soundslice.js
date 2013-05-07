var paper = Raphael('demo');

function createHead() {
  var set = paper.set();
  var diamond = paper.path("M10,0L20,10L10,20L0,10L10,0");
  diamond.attr('stroke', 'rgb(163,71,24)');
  diamond.attr('fill', 'rgb(232,129,61)');
  diamond.attr('cursor', 'pointer');
  set.push(diamond);

  var line = paper.path("M10,20L10,600");
  line.attr('stroke', 'rgb(232,129,61)');
  line.attr('stroke-width', 2);
  set.push(line);
  
  var glow = set.glow({
    swidth: 8,
    fill: true,
    color: 'rgb(232,129,61)'});
  glow.hide();
  set.push(glow);
  
  // Drag events.
  var x0 = 10, y0 = 10, dx0 = 0, xmin = 10;
  set.drag(onmove, onstart)
  function onmove(dx, dy, x, y) {
    dx0 = dx;
    update();
  };
  function onstart() {
    x0 += dx0;
    dx0 = 0;
  };
  function update() {
    var x = Math.max(x0 + dx0, xmin);
    set.transform('T' + x + ',' + y0);
  };
  
  // Hover events.
  diamond.hover(hoverin, hoverout);
  function hoverin() {
    glow.show();
  };
  function hoverout() {
    glow.hide();
  };
  
  update();
  return set;
};

var head = createHead();
