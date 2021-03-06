var App = {
  start: function() {
    // Build internat data structures
    App.build.data();
    $(function() {
      // Build the DOM
      App.build.dom();
      // Build the DOM for D3.js
      App.build.d3();
      // Filter regarding the #hash or #all if not specified
      App.filter();
    })
  },

  cards: {
    list: require('cards'),
    ids: {},
    classes: d3.set([]),
    links: [],
    synergieTypes: {},
    synergies: {},
    triggers: {},
    listeners: {},
    affinities: {},

    eachSynergieTypes: function(fn) {
      for (var id in App.cards.synergieTypes) {
        fn.call(null, id);
      }
    },

    eachSynergies: function(fn) {
      for (var id in App.cards.synergies) {
        fn.call(null, App.cards.ids[id], App.cards.synergies[id]);
      }
    }
  },

  build: {

    data: function() {
      // Build classes & ids
      App.cards.list.forEach(function(card) {
        App.cards.ids[card.id] = card;
        App.cards.classes.add(card.class);
      });

      // Init triggers & listeners & affinities with empty sets
      App.cards.eachSynergieTypes(function(type) {
        App.cards.triggers[type] = [];
        App.cards.listeners[type] = [];
        App.cards.affinities[type] = [];
      });

      // Build triggers & listeners & affinities
      App.cards.eachSynergies(function(card, synergy) {
        (synergy.trigger || []).forEach(function(trigger) {
          App.cards.triggers[trigger].push(card);
        });
        (synergy.listen || []).forEach(function(listen) {
          App.cards.listeners[listen].push(card);
        });
        (synergy.affinity || []).forEach(function(affinity) {
          App.cards.affinities[affinity].push(card);
        });
      });

      // Build links
      App.cards.eachSynergieTypes(function(type) {
        App.cards.triggers[type].forEach(function(source) {

          // trigger -> listen
          App.cards.listeners[type].forEach(function(target) {
            if (source.id != target.id && source.class == target.class ||
                source.class == 'neutral' || target.class == 'neutral') {
              App.cards.links.push({
                source: source, target: target, type: type, affinity: false
              });
            }
          });

          // trigger -> affinity
          App.cards.affinities[type].forEach(function(target) {
            if (source.id != target.id && source.class == target.class ||
                source.class == 'neutral' || target.class == 'neutral') {
              App.cards.links.push({
                source: source, target: target, type: type, affinity: true
              });
            }
          });

        })
      });
    },

    colors: {
      'orange': ['#e80000', '#ff7f0e', '#ffba00', '#ffd800', '#f6af8c', '#ffd38a'],
      'green': ['#627331', '#009b21', '#96bc0d', '#c6e300', '#e5ff36', '#c4c200', '#a5e779'],
      'pink': ['#961d56', '#c60089', '#ea66af', '#e7a6aa', '#f4ca9d', '#f09b71', '#e4b6ec'],
      'violet': ['#50229d', '#a353d1', '#796dd4', '#aa8ce7', '#b9b7e2', '#c5a6eb', '#d3ade1'],
      'blue': ['#0074df', '#078d93', '#2ac2dd', '#7bbaf7', '#c3e1ff', '#94dfe9', '#b7c1e2'],
      'grey': ['#101010', '#444444', '#888888', '#aaaaaa', '#cccccc', '#222222', '#666666']
    },

    dom: function() {

      // Build legend
      var css = "";
      var color_i = 0;
      var color_group = 0;

      App.cards.eachSynergieTypes(function(type) {
        $('#legend')
          .append($('<li></li>')
            .addClass(type)
            .html("<a>" + type.replace('_', ' ') + "</a>")
            .click(function(e) {
              if (e.altKey || e.shiftKey) {
                $("#legend li").addClass('disabled');
                $(this).removeClass('disabled');
              } else {
                $(this).toggleClass('disabled');
              }
              App.filter();
            }).hover(function() {
              var css = $('body style.legend');
              var type = $(this).attr('class').split(' ')[0];
              if (css.length == 0) {
                css = $('<style class="legend">' +
                        "svg ." + type + " {stroke-width: 3px; }\n" +
                        '</style>');
              }
              $('body').append(css);
            }, function() {
              $('body style.legend').remove();
            })
          );
          color = App.build.colors[Object.keys(App.build.colors)[color_group]][color_i];
          css += "svg ." + type + " { stroke: " + color + "; }\n";
          css += "svg #" + type + " { fill: " + color + "; }\n";
          css += "#legend ." + type+ " a { color: " + color + "; }\n";
          color_group++;
          if (color_group >= Object.keys(App.build.colors).length) {
            color_group = 0;
            color_i++;
          }
      });
      $('body').append("<style>\n" + css + '</style>\n');

      // Build left menu
      App.cards.classes.forEach(function(klass) {
        if (klass != 'neutral') {
          var title = klass.charAt(0).toUpperCase() + klass.slice(1);
          var a = $('<a>')
          .text(title)
          .attr('href', '#' + klass)
          .attr('class', klass)
          $("#classes").append($("<li></li>").append(a));
        }
      })

      // When click on the left menu
      $(window).on('hashchange', function() {
        var klass = window.location.hash.substring(1);
        App.filter(klass);
      });

    },

    d3: function() {
      // Zoom behavior
      App.d3.zoom = d3.behavior.zoom()
        .scaleExtent([0.3, 2])
        .on("zoom", App.d3.onZoom);

      // Main SVG object
      App.d3.svg = d3.select("#app")
        .call(App.d3.zoom)
        .on("dblclick.zoom", null)
        .append('g');

      // Create 2 groups to prevent ovelapping
      App.d3.svg.append('g').attr('class', 'paths');
      App.d3.svg.append('g').attr('class', 'cards');

      // D3 force layout
      App.d3.force = d3.layout.force()
        .nodes([])
        .links([])
        .linkDistance(150)
        .charge(-2000)
        .gravity(0.5)
        .on('tick', App.d3.tick);

      // Drag behavior
      App.d3.drag = App.d3.force.drag()
        .on("dragstart", App.d3.onDragStart);

      // Build the arrow
      App.d3.svg.append("svg:defs").selectAll("marker")
          .data(Object.keys(App.cards.synergieTypes))
          .enter().append("svg:marker")
          .attr("id", String)
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", 17)
          .attr("refY", -0.5)
          .attr("markerWidth", 9)
          .attr("markerHeight", 9)
          .attr("orient", "auto")
          .attr("markerUnits", "userSpaceOnUse")
          .append("svg:path")
          .attr("d", "M0,-5L10,0L0,5");

      App.d3.onWindowResize();
      window.onresize = App.d3.onWindowResize;
    }
  },

  d3: {
    svg: null,
    zoom: null,
    drag: null,
    force: null,
    paths: null,
    cards: null,

    refresh: function() {
      // Stop rendering
      App.d3.force.stop();

      // Select paths
      App.d3.paths = App.d3.svg.select(".paths")
        .selectAll("path.link")
        .data(App.d3.force.links(), function(d) { return d.source.id + "-" + d.target.id; });

      // Add new paths
      App.d3.paths.enter().append("path")
        .attr("marker-end", function(d) { return "url(#" + d.type + ")"; })
        .attr("class", function(d) { return "link " + d.type + (d.affinity ? " affinity" : ""); });

      // Remove unused paths
      App.d3.paths.exit().remove();

      // Cards = Circles & Texts
      App.d3.cards = App.d3.svg.select(".cards")
        .selectAll('g.card')
        .data(App.d3.force.nodes(), function(d) { return d.id;});

      var g = App.d3.cards.enter().append('g')
        .attr("card", function(d) {return d.id; })
        .attr("class", function(d) { return "new card " + d.quality; })
        .on("click", App.d3.onCardClick)
        .call(App.d3.drag);

      g.append("circle")
        .attr("r", 7);

      g.append("text")
        .text(function(d) { return d.name; })
        .attr("x", 12)
        .attr("y", ".35em");

      // Remove unused cards
      App.d3.cards.exit().remove();

      // Start rendering
      App.d3.force.start();

      // Quicky find a good position
      for (var i=0; i<20; i++) { App.d3.force.tick() };

      // Zoom to fit
      App.zoomTofit();

      // Tooltips
      $('svg g.card.new').tooltipster({
        offsetX: -8,
        offsetY: 0,
        onlyOne: true,
        interactive: true,
        position: 'bottom',
        functionInit: App.onTooltip
      }).attr('class', function(i, attr) {
        // .removeClass seems not working :/
        return attr.replace("new ", "");
      })

    },

    tick: function() {
      App.d3.paths.attr("d", App.d3.linkArc);
      App.d3.cards.attr("transform", App.d3.transform);
    },

    linkArc: function(d) {
      var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    },

    transform: function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    },

    onCardClick: function(d) {
      if (d3.event.defaultPrevented) return; // click suppressed
      window.location = '#' + d.id + "-" + d.name.replace(/\s+/, '-');
    },

    onZoom: function() {
      App.d3.svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    },

    onDragStart: function() {
      d3.event.sourceEvent.stopPropagation();
    },

    onWindowResize: function() {
      var margin = 4;
      var width = parseInt($("#app").parent().width()) - margin;
      var height = parseInt($("#app").parent().outerHeight()) - margin;

      $('#app').attr('width', width).attr('height', height);
      App.d3.force.size([width, height]);
      App.d3.zoom.size([width, height]);
    }
  },

  filter: function(query) {
    query = query || window.location.hash.substring(1) || 'all';
    $('#classes li.active').removeClass('active');
    $('.rightbar').hide();

    // Only show a card
    if (query.match(/^\d+(-|$)/)) {
      var id = parseInt(query);
      var card = App.cards.ids[id];
      var nodes = d3.set([id]);
      var links = [];
      App.cards.links.forEach(function(link) {
        if (link.source.id == id || link.target.id == id) {
          nodes.add(link.source.id);
          nodes.add(link.target.id);
          links.push(link);
        }
      });
      App.d3.force.nodes(nodes.values().map(function(id) {
        return App.cards.ids[id];
      }));
      App.d3.force.links(links);

    // Selection of cards
    } else if (query.match(/^\d+,/)) {
      var ids = d3.set(query.match(/(\d+)/g).map(function(id) {
        return parseInt(id);
      }));
      var nodes = d3.set(ids.values());
      var links = [];
      App.cards.links.forEach(function(link) {
        if (ids.has(link.source.id) && ids.has(link.target.id)) {
          nodes.add(link.source.id);
          nodes.add(link.target.id);
          if (link.source.id != link.target.id) {
            links.push(link);
          }
        }
      });
      App.d3.force.nodes(nodes.values().map(function(id) {
        return App.cards.ids[id];
      }));
      App.d3.force.links(links);
      $('#deck').empty();
      ids.values().forEach(function(id) {
        var card = App.cards.ids[id];
        var a = $('<a></a>')
          .attr('href', '#' + card.id)
          .text(card.name);
        var li = $('<li></li>')
          .attr('card', id)
          .append(a)
          .tooltipster({
            onlyOne: true,
            interactive: true,
            position: 'left',
            functionInit: App.onTooltip
          });
        $('#deck').append(li);
        $('.rightbar').show();
      });

    // Highlight the corresponding lest meny entry
    } else {
      $('#classes li a.' + query).parent().addClass('active');

      // Show all classes
      if (query == 'all') {
        App.d3.force.nodes(App.cards.list.filter(function(card) {
          return App.cards.synergies[card.id];
        }));
        App.d3.force.links(App.cards.links);

      } else {
        // Show only a class
        App.d3.force.nodes(App.cards.list.filter(function(card) {
          return App.cards.synergies[card.id] && (card.class == query || card.class == 'neutral');
        }));
        App.d3.force.links(App.cards.links.filter(function(link) {
          return (link.source.class == query || link.source.class == 'neutral') &&
          (link.target.class == query || link.target.class == 'neutral');
        }));
      }
    }

    // Disabled links
    var disabled = [];
    $("#legend .disabled").each(function() {
      disabled.push($(this).attr('class').split(' ')[0]);
    });
    if (disabled.length > 0) {
      App.d3.force.links(App.d3.force.links().filter(function(link) {
        return disabled.indexOf(link.type) == -1;
      }));
    }

    // Refresh
    App.d3.refresh();
  },

  onTooltip: function() {
    var id = parseInt($(this).attr('card'));
    if (id > 0) {
      var card = App.cards.ids[id];
      var div = $('<div></div>');
      div.append($('<em></em>').text('#' + id));
      div.append($('<img>')
        .attr('src', card.image)
        .attr('width', '200')
        .attr('height', '303'));
      div.append($('<button type="button" class="btn btn-primary btn-block">Add to deck</button>'));
      return div;
    }
  },

  zoomTofit: function() {
    var outside = {
      width: $('#app').width(), 
      height: $('#app').height() - $('#legend').height()
    };
    var inside = App.d3.svg[0][0].getBBox();
    var scale = .8 / Math.max(inside.width / outside.width, inside.height / outside.height);
    scale = Math.max(App.d3.zoom.scaleExtent()[0], scale);
    scale = Math.min(App.d3.zoom.scaleExtent()[1], scale);
    var x = inside.x + inside.width / 2;
    var y = inside.y + inside.height / 2;
    var translate = [outside.width / 2 - scale * x, outside.height / 2 - scale * y];

    App.d3.zoom.scale(scale).translate(translate);
    App.d3.zoom.event(App.d3.svg.transition().duration(1000));
  }

};
