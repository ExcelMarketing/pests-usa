function App() {
  let pest = pestTypes.cockroaches;
  let map = null;
  let tableData = null;
  let mapJson = null;
  let table = null;
  let maxScale = 4;
  let minScale = 0.4;
  let currentScale = 1;
  let zoomStep = 0.2;

  const colors = {
    [pestTypes.cockroaches]: ["#4494D0", "#78B0DC", "#B7D5EC", "#DAE8F5"],
    [pestTypes.rodents]: ["#FDCC67", "#FCD78B", "#FEE8BE", "#FEF5E1"],
    [pestTypes.mosquitoes]: ["#16853E", "#5EA36E", "#A2C9AE", "#D2E6DA"],
    [pestTypes.ticks]: ["#E02129", "#EB6764", "#F5A5A4", "#FBD5D4"],
  }

  function loadData() {
    return Promise.all([
      d3.json("./data/map.json"),
      d3.csv("./data/cockroach.csv", d3.autoType),
      d3.csv("./data/rodents.csv", d3.autoType),
      d3.csv("./data/mosquitoes.csv", d3.autoType),
      d3.csv("./data/ticks.csv", d3.autoType),
    ]).then(([geojson, cockroach, rodents, mosquitoes, ticks]) => {
      return {
        geojson,
        [pestTypes.cockroaches]: cockroach,
        [pestTypes.rodents]: rodents,
        [pestTypes.mosquitoes]: mosquitoes,
        [pestTypes.ticks]: ticks,
      };
    });
  }

  function init() {
    loadData().then(({ geojson, ...rest }) => {
      mapJson = geojson;
      tableData = rest;

      initMap(pest);
      initTable(pest);
    });
  }

  function initMap(pest) {
    const data = {};
    tableData[pest].forEach(m => {
      data[m.STATE] = m.Overall;
    });

    map = USMap({
      container: "#map",
      height: 500,
      geojson: mapJson,
      data: data,
      colors: colors[pest],
      tooltipContent: ({ name }) => {
        const rank = data[name];

        return `
          <div class="tooltip-title">${isNaN(rank) ? 'N/A' : ordinal_suffix_of(rank)} - ${name}</div>
          <div class="tooltip-subtitle">${capitalizeFirstLetter(pest)} Pest Likelihood</div>
        `
      }
    }).render();
  }

  function initTable(pest) {
    table = Table({
      data: tableData[pest],
      headers: getHeaders(pest),
      container: "#table",
      pagination: false,
      sortable: false,
      cellHeight: 35,
    }).render();
  }

  function initSelect() {
    var select = document.querySelector('#pest_select');
  
    const choice = new Choices(select, {
      choices: [
        {
          label: pestTypes.cockroaches.toUpperCase(),
          value: pestTypes.cockroaches,
          selected: true
        },
        {
          label: pestTypes.rodents.toUpperCase(),
          value: pestTypes.rodents
        },
        {
          label: pestTypes.mosquitoes.toUpperCase(),
          value: pestTypes.mosquitoes
        },
        {
          label: pestTypes.ticks.toUpperCase(),
          value: pestTypes.ticks,
        }
      ],
      position: 'bottom',
      searchEnabled: false,
      shouldSort: false,
    });
  
    select.addEventListener(
      'change',
      function (event) {
        selectPest(event.detail.value);
      },
      false,
    );
  
    return choice;
  }
  

  function selectPest(p) {
    if (!pestTypes[p]) {
      return;
    }

    pest = p;
    d3.selectAll(".pest").classed("active", false);
    d3.select("." + p).classed("active", true);
    d3.select("#root").attr("class", "container").classed(p + '-selected', true);

    initMap(pest);
    initTable(pest);
  }

  initSelect();
  init();

  return {
    selectPest,
    zoomIn() {
      if (map) {
          const scale = Math.min(maxScale, currentScale + zoomStep);
          currentScale = scale;
          map.zoom(scale);
      }
    },
    zoomOut() {
      if (map) {
          const scale = Math.max(minScale, currentScale - zoomStep);
          currentScale = scale;
          map.zoom(scale);
      }
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  window.app = App();
});
