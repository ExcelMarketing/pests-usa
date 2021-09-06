const pestTypes = {
  cockroaches: "cockroaches",
  rodents: "rodents",
  mosquitoes: "mosquitoes",
  ticks: "ticks",
};

const columnConf = {
  [pestTypes.cockroaches]: [
    {
      name: "COCKROACH PEST<br>RANKING",
      icon: "./images/Icons/cockroach.svg",
      propName: "STATE",
      rankProp: "STATE",
    },
    {
      name: "Overall<br>Score",
      icon: "./images/Icons/speedometer.svg",
      propName: "Overall",
      rankProp: "Overall",
    },
    {
      name: "Average<br>temperature (°F)",
      icon: "./images/Icons/thermometer.svg",
      propName: "Average Temperature (°F) ranking",
      rankProp: "Average Temperature (°F) ranking",
    },
    {
      name: "Poverty<br>per capita",
      icon: "./images/Icons/dollar-symbol.svg",
      propName: "Poverty ranking",
      rankProp: "Poverty ranking",
    },
    {
      name: "Landfills<br>ranking",
      icon: "./images/Icons/garbage-can.svg",
      propName: "Landifills ranking",
      rankProp: "Landifills ranking",
    },
    {
      name: "Cockroach<br>search volume",
      icon: "./images/Icons/magnifying-glass-search.svg",
      propName: "cockroach search Volume ranking",
      rankProp: "cockroach search Volume ranking",
    },
    {
      name: "No. of pest<br>services companies",
      icon: "./images/Icons/pesticide.svg",
      propName: "number of pest companies ranking",
      rankProp: "number of pest companies ranking",
    },
  ],
  [pestTypes.rodents]: [
    {
      name: "Rodents Pest<br>Ranking",
      icon: "./images/Icons/rat-silhouette.svg",
      propName: "STATE",
      rankProp: "STATE",
    },
    {
      name: "Overall<br>Score",
      icon: "./images/Icons/speedometer.svg",
      propName: "Overall",
      rankProp: "Overall",
    },
    {
      name: "Access to<br>restaurants",
      icon: "./images/Icons/restaurant.svg",
      propName: "Restaurants Ranking",
      rankProp: "Restaurants Ranking",
    },
    {
      name: "Access to<br>fruit farms",
      icon: "./images/Icons/fruit.svg",
      propName: "Ranking fruit farms",
      rankProp: "Ranking fruit farms",
    },
    {
      name: "Landfills<br>ranking",
      icon: "./images/Icons/garbage-can.svg",
      propName: "Landifills ranking",
      rankProp: "Landifills ranking",
    },
    {
      name: "Rats<br>search volume",
      icon: "./images/Icons/magnifying-glass-search.svg",
      propName: "Rats Search Volume Ranking",
      rankProp: "Rats Search Volume Ranking",
    },
    {
      name: "No. of pest<br>services companies",
      icon: "./images/Icons/pesticide.svg",
      propName: "number of pest companies ranking",
      rankProp: "number of pest companies ranking",
    },
  ],
  [pestTypes.mosquitoes]: [
    {
      name: "Mosquitoes<br>Pest Ranking",
      icon: "./images/Icons/mosquito.svg",
      propName: "STATE",
      rankProp: "STATE",
    },
    {
      name: "Overall<br>Score",
      icon: "./images/Icons/speedometer.svg",
      propName: "Overall",
      rankProp: "Overall",
    },
    {
      name: "Water area (sq mil)",
      icon: "./images/Icons/drop.svg",
      propName: "Water area (sq mil) ranking",
      rankProp: "Water area (sq mil) ranking",
    },
    {
      name: "Average temperature (°F)",
      icon: "./images/Icons/thermometer.svg",
      propName: "Average Temperature ranking",
      rankProp: "Average Temperature ranking",
    },
    {
      name: "Forest Acres ('000)",
      icon: "./images/Icons/pine.svg",
      propName: "Forest Acres ('000) ranking",
      rankProp: "Forest Acres ('000) ranking",
    },
    {
      name: "Mosquito search volume",
      icon: "./images/Icons/magnifying-glass-search.svg",
      propName: "Mosquitoes Search Volume ranking",
      rankProp: "Mosquitoes Search Volume ranking",
    },
    {
      name: "No. of Pest Service companies",
      icon: "./images/Icons/pesticide.svg",
      propName: "Number of pest companies ranking",
      rankProp: "Number of pest companies ranking",
    },
  ],
  [pestTypes.ticks]: [
    {
      name: "Ticks Pest<br>Ranking",
      icon: "./images/Icons/tick.svg",
      propName: "STATE",
      rankProp: "STATE",
    },
    {
      name: "Overall<br>Score",
      icon: "./images/Icons/speedometer.svg",
      propName: "Overall",
      rankProp: "Overall",
    },
    {
      name: "Average<br>temperature (°F)",
      icon: "./images/Icons/thermometer.svg",
      propName: "Average Temperature ranking",
      rankProp: "Average Temperature ranking",
    },
    {
      name: "Pet ownership<br>ranking",
      icon: "./images/Icons/pawprints.svg",
      propName: "Pet Ownership Ranking",
      rankProp: "Pet Ownership Ranking",
    },
    {
      name: "National<br>Park ranking",
      icon: "./images/Icons/landscape.svg",
      propName: "National Park Coverage ranking",
      rankProp: "National Park Coverage ranking",
    },
    {
      name: "Ticks search volume",
      icon: "./images/Icons/magnifying-glass-search.svg",
      propName: "Ticks Search Volume ranking",
      rankProp: "Ticks Search Volume ranking",
    },
    {
      name: "No. of Pest Service companies",
      icon: "./images/Icons/pesticide.svg",
      propName: "number of pest companies ranking",
      rankProp: "number of pest companies ranking",
    },
  ],
};

function headerTemplate() {
  const name = this.name;
  const icon = this.icon;
  return new Promise((res) => {
    res(`<div class="header-icon">
        <img src="${icon}" class="icon"/>
      </div>
      <div class="header-text">
        ${name}
      </div>`);
  });
}

function cellTemplate(d) {
  const propName = this.propName;
  if (isNaN(d[propName]) || d[propName] === null) {
    return 'N/A';
  }
  return `${ordinal_suffix_of(d[propName])}`;
}

function mainCellTemplate(d, i, isSame = false) {
  const propName = this.propName;
  const rank = d.Overall;
  return `${isSame ? '=' : ''} ${rank}. ${d[propName]}`;
}

function getHeaders(type, allData) {
  const columns = columnConf[type];
  const grouped = d3.group(allData, d => d.Overall);

  if (!columns) return;

  return columns.map((d, i) => {
    const isMainColumn = i === 0;
    const tmplt = isMainColumn ? mainCellTemplate : cellTemplate;

    return {
      id: i,
      isMainColumn,
      cellTemplate: function(m, ind) {
        const isSame = grouped.get(m.Overall).length > 1;
        return tmplt.bind(this)(m, ind, isSame)
      },
      headerTemplate,
      order: i === 1 ? "asc" : null,
      ...d,
    };
  });
}
