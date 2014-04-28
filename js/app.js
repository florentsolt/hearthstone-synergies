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
            if (source.id != target.id && source.class == target.class ||
                source.class == 'neutral' || target.class == 'neutral') {
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
        .charge(-3000)
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
    cards: null,

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
    App.d3.refresh();
  },

  onTooltip: function() {
    var id = parseInt($(this).attr('card'));
    if (id > 0) {
      var card = App.cards.ids[id];
      var div = $('<div></div>');
      div.append($('<img>')
        .attr('src', card.image)
        .attr('width', '200')
        .attr('height', '303'));
      div.append($('<button type="button" class="btn btn-primary btn-block">Add to deck</button>'));
      return div;
    }
  }

};
