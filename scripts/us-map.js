function USMap(params) {
  var attrs = Object.assign(
    {
      width: window.innerWidth,
      height: window.innerHeight,
      margin: {
        top: 5,
        left: 5,
        bottom: 5,
        right: 5,
      },
      data: {},
      geojson: null,
      container: document.body,
      smallStates: [
        "Delaware",
        "Vermont",
        "New Hampshire",
        "Massachusetts",
        "New Jersey",
        "Maryland",
        "Rhode Island",
        "Connecticut",
        "District of Columbia",
      ],
      colors: [],
      hideLabels: true,
      onStateMouseOver: () => {},
      onStateMouseOut: () => {},
      onStateClick: () => {},
      tooltipContent: () => {},
    },
    params
  );

  var container,
    svg,
    transitionTime = 500,
    chart,
    chartInner,
    mapContainer,
    labelsContainer,
    stateLabels,
    stateFeatures,
    states,
    chartWidth,
    chartHeight,
    path,
    projection,
    colorScale,
    zoom = d3.zoom().on("zoom", zoomed);

  function main() {
    if (!attrs.container || !document.querySelector(attrs.container)) {
      return console.error("Please provide a container element!");
    }

    container = d3.select(attrs.container);

    setDimensions();

    // convert topoJSON to geoJSON features
    states = topojson.feature(attrs.geojson, attrs.geojson.objects.states);

    projection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);

    // state path generator
    path = d3.geoPath();

    setColorScale();

    //Add svg
    svg = container
      .patternify({
        tag: "svg",
        selector: "chart-svg",
      })
      .attr("viewBox", "0 0 975 710")
      .attr("width", attrs.width)
      .attr("height", attrs.height)
      .call(zoom)
      .on("wheel.zoom", null)
      .on("dblclick.zoom", null);

    //Add chart group
    chart = svg
      .patternify({
        tag: "g",
        selector: "chart",
      })
      .attr(
        "transform",
        `translate(${attrs.margin.left}, ${attrs.margin.top})`
      );

    //Add chart inner group
    chartInner = chart.patternify({
      tag: "g",
      selector: "chart-inner",
    });

    //Add map container
    mapContainer = chartInner.patternify({
      tag: "g",
      selector: "map-container",
    });

    //Add group for state codes
    labelsContainer = chartInner.patternify({
      tag: "g",
      selector: "state-labels",
    });

    // marker = chartInner
    //   .patternify({
    //     tag: "g",
    //     selector: "marker-container",
    //   })
    //   .attr("pointer-events", "none");

    // const size = globals.isMobile ? 50 : 30;
    // marker.patternify({
    //         tag: 'image',
    //         select: 'marker-image'
    //     })
    //     .attr('href', './images/marker.svg')
    //     .attr('width', size)
    //     .attr('height', size)
    //     .attr('x', -size / 2)
    //     .attr('y', -size / 2 - 10)
    //     .attr('pointer-events', 'none')

    drawStates();
  }

  function drawStates() {
    //Render states
    stateFeatures = mapContainer
      .patternify({
        tag: "path",
        selector: "state",
        data: states.features,
      })
      .attr("stroke", "#051C34")
      .attr("fill", (d, i) => {
        var value = attrs.data[d.properties.name];
        if (value) {
          if (isNaN(value)) {
            return "#ccc";
          }
          return colorScale(value);
        }
        return "#fff";
      })
      .attr("d", path)
      .on("mouseover", function (e, d) {
        attrs.onStateMouseOver(d.properties);
        highlight(d.properties.name);
      })
      .on("mouseout", function (e, d) {
        attrs.onStateMouseOut(d.properties);
        highlight(null);
      })
      .on("click", function (e, d) {
        attrs.onStateClick(d.properties);
        highlight(d.properties.name);
      });

    stateLabels = labelsContainer
      .patternify({
        tag: "text",
        selector: "state-label",
        data: states.features,
      })
      .attr("x", (d) => {
        return path.centroid(d)[0];
      })
      .attr("y", (d) => {
        return path.centroid(d)[1];
      })
      .attr("dy", "0.35em")
      .attr("font-size", getLabelSize())
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none")
      .attr("user-select", "none")
      .text((d) => {
        return d.properties.name;
      })
      .attr("opacity", (d) => {
        if (attrs.hideLabels) {
          return 0;
        }

        if (attrs.smallStates.indexOf(d.properties.name) > -1) {
          return 0;
        }
        return 1;
      });

    appendTooltips();
  }

  function appendTooltips() {
    stateLabels.each(function (d) {
      if (this._tippy) {
        this._tippy.destroy();
      }

      const content = attrs.tooltipContent(d.properties);

      if (content) {
        tippy(this, {
          content,
          allowHTML: true,
          arrow: false,
          maxWidth: 250,
          trigger: "manual",
          theme: "light",
          duration: 0,
          placement: "top",
          hideOnClick: true,
          popperOptions: {
            modifiers: [
              {
                name: "computeStyles",
                options: {
                  gpuAcceleration: false, // true by default
                },
              },
            ],
          },
        });
      }
    });
  }

  function highlight(stateName) {
    stateLabels.each(function () {
      if (this._tippy) this._tippy.hide();
    });

    if (stateName) {
      stateLabels
        .filter((d) => d.properties.name === stateName)
        .each(function (d) {
          if (this._tippy) {
            this._tippy.show();
          }
        //   const centroid = path.centroid(d);
        //   marker.attr("transform", `translate(${centroid})`);
        });
    }
  }

  function getLabelSize() {
    var font = 12;

    if (window.innerWidth < 576) {
      font = 19;
    } else if (window.innerWidth < 768) {
      font = 15;
    }

    return font + "px";
  }

  function setDimensions() {
    var containerRect = container.node().getBoundingClientRect();

    if (containerRect.width > 0) {
      attrs.width = containerRect.width;
    }

    if (globals.isMobile) {
      if (window.innerWidth < 576) {
        attrs.height = 250;
      } else {
        attrs.height = 420;
      }
    } else {
      attrs.height = 540;
    }

    chartWidth = attrs.width - attrs.margin.right - attrs.margin.left;
    chartHeight = attrs.height - attrs.margin.bottom - attrs.margin.top;
  }

  function setColorScale() {
    const [min, max] = d3.extent(Object.values(attrs.data));

    // color linear scale
    colorScale = d3
      .scaleLinear()
      .domain([min, min + (max - min) / 3, min + (2 * (max - min)) / 3, max])
      .range(attrs.colors)
      .clamp(true);
  }

  function zoomed(e) {
    var transform = e.transform;
    chartInner.attr("transform", transform);
  }

  function resetZoom() {
    svg.transition().duration(1000).call(zoom.transform, d3.zoomIdentity);
  }

  function scaleOnly(scale) {
    svg
      .transition()
      .duration(300)
      .call(zoom.scaleTo, scale, [chartWidth / 2, chartHeight / 2]);
  }

  //////////////////////////////////////////////////////
  ///////////////// instance methods ///////////////////
  //////////////////////////////////////////////////////

  main.zoom = function (scale) {
    scaleOnly(scale);
  };
  main.resetZoom = resetZoom;
  main.highlight = highlight;
  main.colorScale = () => colorScale;

  main.render = function () {
    main();
    return main;
  };

  return main;
}
