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
      App.filter(window.location.hash.substring(1) || 'all');
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

      // Init triggers & listeners with empty sets
      App.cards.eachSynergieTypes(function(type) {
        App.cards.triggers[type] = [];
        App.cards.listeners[type] = [];
      });

      // Build triggers & listeners
      App.cards.eachSynergies(function(card, synergy) {
        (synergy.trigger || []).forEach(function(trigger) {
          App.cards.triggers[trigger].push(card);
        });
        (synergy.listen || []).forEach(function(listen) {
          App.cards.listeners[listen].push(card);
        });
      });

      // Build links
      App.cards.eachSynergieTypes(function(type) {
        App.cards.triggers[type].forEach(function(source) {
          App.cards.listeners[type].forEach(function(target) {
            if (source.id != target.id) {
              App.cards.links.push({source: source, target: target, type: type});
            }
          })
        })
      });
    },

    dom: function() {
      // Build legend
      App.cards.eachSynergieTypes(function(type) {
        $('#legend')
          .append($('<li></li>')
            .addClass(type)
            .html("<a>— " + type.replace('_', ' ') + "</a>")
          );
      });

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
        App.thumbnail(false);
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

      // Create 3 groups to prevent ovelapping
      App.d3.svg.append('g').attr('class', 'paths');
      App.d3.svg.append('g').attr('class', 'circles');
      App.d3.svg.append('g').attr('class', 'texts');

      // D3 force layout
      App.d3.force = d3.layout.force()
        .nodes([])
        .links([])
        .linkDistance(150)
        .charge(-3000)
        .gravity(0.5)
        // .size([width, height])
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
          .attr("refY", -1)
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("orient", "auto")
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
    circles: null,
    texts: null,

    refresh: function() {
      // Select paths
      App.d3.paths = App.d3.svg.select(".paths")
        .selectAll("path.link")
        .data(App.d3.force.links(), function(d) { return d.source.id + "-" + d.target.id; });

      // Add new paths
      App.d3.paths.enter().append("path")
        .attr("marker-end", function(d) { return "url(#" + d.type + ")"; })
        .attr("class", function(d) { return "link " + d.type; });

      // Remove unused paths
      App.d3.paths.exit().remove();

      // Select circles
      App.d3.circles = App.d3.svg.select(".circles")
        .selectAll("circle")
        .data(App.d3.force.nodes(), function(d) { return d.id;});

      // Add new circles
      App.d3.circles.enter().append("circle")
        .attr("r", 7)
        .attr("class", function(d) { return "circle " + d.class + " " + d.quality; })
        .on("click", App.d3.onCardClick)
        .on("mouseover", App.d3.onCardMouseOver)
        .on("mouseout", App.d3.onCardMouseOut)
        .call(App.d3.drag);

      // Remove unused circles
      App.d3.circles.exit().remove();

      // Selection texts
      App.d3.texts = App.d3.svg.select('.texts')
        .selectAll("text")
        .data(App.d3.force.nodes(), function(d) { return d.id;});

      // Add new texts
      App.d3.texts.enter().append("text")
        .attr("x", 15)
        .attr("y", ".35em")
        .attr("class", function(d) { return "text " + d.quality; })
        .on("click", App.d3.onCardClick)
        .on("mouseover", App.d3.onCardMouseOver)
        .on("mouseout", App.d3.onCardMouseOut)
        .text(function(d) { return d.name; });

      // Remove unused texts
      App.d3.texts.exit().remove();

      // Start rendering
      App.d3.force.start();
    },

    tick: function() {
      App.d3.paths.attr("d", App.d3.linkArc);
      App.d3.circles.attr("transform", App.d3.transform);
      App.d3.texts.attr("transform", App.d3.transform);
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

    onCardMouseOver: function(d) {
      App.thumbnail(d);
    },

    onCardMouseOut: function() {
      App.thumbnail(false);
    },

    onZoom: function() {
      App.d3.svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    },

    onDragStart: function() {
      d3.event.sourceEvent.stopPropagation();
    },

    onWindowResize: function() {
      var margin = 0;
      var width = parseInt($("#app").parent().width()) - margin*2;
      var height = parseInt($("#app").parent().outerHeight()) - margin*2;

      $('#app').attr('width', width).attr('height', height);
      App.d3.force.size([width, height])
    }
  },

  filter: function(query) {
    $('#classes li.active').removeClass('active');

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
      App.thumbnail(card);

    // Selection of cards
    } else if (query.match(/^\d+,/)) {
      var ids = d3.set(query.match(/(\d+)/g).map(function(id) {
        return parseInt(id);
      }));
      var nodes = d3.set(ids);
      var links = [];
      App.cards.links.forEach(function(link) {
        if (ids.has(link.source.id) || ids.has(link.target.id)) {
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
      App.thumbnail(false);

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
    App.d3.refresh();
  },

  thumbnail: function(card) {
    if (card) {
      // Display the card
      $('#thumbnail').attr('src', card.image);
      $('#thumbnail').parent().css('visibility', 'visible');
    } else {
      // Hide the card
        if (window.location.hash.match(/^#\d+(-|$)/)) {
          var id = parseInt(window.location.hash.substring(1));
          // But if the #hash is an id, display the card
          App.thumbnail(App.cards.ids[id]);
        } else {
          // Really hide the thumbnail
          $('#thumbnail').parent().css('visibility', 'hidden');
          $('#thumbnail').attr('src', '');
        }
      
    }
  }

};
