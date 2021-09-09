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
      tooltip: '<strong>Overall score:</strong> this considers all the factors in the table and ranks the state based on how easy it is for the pest to thrive.',
    },
    {
      name: "Average<br>temperature (°F)",
      icon: "./images/Icons/thermometer.svg",
      propName: "Average Temperature (°F) ranking",
      rankProp: "Average Temperature (°F) ranking",
      tooltip: '<strong>Average Temperature:</strong> the higher the temperature, the better for pests to thrive.'
    },
    {
      name: "Household<br>Income",
      icon: "./images/Icons/dollar-symbol.svg",
      propName: "Poverty ranking",
      rankProp: "Poverty ranking",
      tooltip: '<strong>Household income:</strong> research suggests that the lower the income, the higher the cockroach likelihood.',
    },
    {
      name: "Landfill<br>Sites",
      icon: "./images/Icons/garbage-can.svg",
      propName: "Landifills ranking",
      rankProp: "Landifills ranking",
      tooltip: '<strong>Landfill Sites:</strong> the more landfills, the more chance cockroaches have of finding food and surviving.'
    },
    {
      name: "Google Searches<br>for cockroaches",
      icon: "./images/Icons/magnifying-glass-search.svg",
      propName: "cockroach search Volume ranking",
      rankProp: "cockroach search Volume ranking",
      tooltip: '<strong>Google Searches for cockroaches:</strong> the number of Google searches associated with cockroaches. The higher the volume, the worse the problem!'
    },
    {
      name: "Companies fighting cockroaches",
      icon: "./images/Icons/pesticide.svg",
      propName: "number of pest companies ranking",
      rankProp: "number of pest companies ranking",
      tooltip: '<strong>Companies fighting cockroaches:</strong> the number of pest control companies in a state; the lower, the easier it is for the pest to spread',
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
      tooltip: '<strong>Overall score:</strong> this considers all the factors in the table and ranks the state based on how easy it is for the pest to thrive.'
    },
    {
      name: "Access to<br>restaurants",
      icon: "./images/Icons/restaurant.svg",
      propName: "Restaurants Ranking",
      rankProp: "Restaurants Ranking",
      tooltip: '<strong>Access to restaurants:</strong> the more restaurants, the easier it is for rats to access waste.'
    },
    {
      name: "Access to<br>fruit farms",
      icon: "./images/Icons/fruit.svg",
      propName: "Ranking fruit farms",
      rankProp: "Ranking fruit farms",
      tooltip: '<strong>Fruit Farms:</strong> the more fruit farms, the better the source of food, making it easy for rats to thrive.'
    },
    {
      name: "Landfill<br>Sites",
      icon: "./images/Icons/garbage-can.svg",
      propName: "Landifills ranking",
      rankProp: "Landifills ranking",
      tooltip: '<strong>Landfill Sites:</strong> the more landfills, the more chance rodents have of finding food and surviving.'
    },
    {
      name: "Google Searches<br>for rats",
      icon: "./images/Icons/magnifying-glass-search.svg",
      propName: "Rats Search Volume Ranking",
      rankProp: "Rats Search Volume Ranking",
      tooltip: '<strong>Google Searches for rats:</strong> the number of Google searches associated with rats. The higher the volume, the worse the problem!'
    },
    {
      name: "Companies fighting rats",
      icon: "./images/Icons/pesticide.svg",
      propName: "number of pest companies ranking",
      rankProp: "number of pest companies ranking",
      tooltip: '<strong>Companies fighting rats:</strong> the number of pest control companies in a state; the lower, the easier it is for the pest to spread.'
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
      tooltip: '<strong>Overall score:</strong> this considers all the factors in the table and ranks the state based on how easy it is for the pest to thrive.'
    },
    {
      name: "Water area (sq mil)",
      icon: "./images/Icons/drop.svg",
      propName: "Water area (sq mil) ranking",
      rankProp: "Water area (sq mil) ranking",
      tooltip: '<strong>Access to Water:</strong> mosquitoes also love water; the more water in a state, the more likely they are to reproduce.'
    },
    {
      name: "Average temperature (°F)",
      icon: "./images/Icons/thermometer.svg",
      propName: "Average Temperature ranking",
      rankProp: "Average Temperature ranking",
      tooltip: '<strong>Average Temperature:</strong> the higher the temperature, the better it is for pests to thrive.'
    },
    {
      name: "Forest Acres ('000)",
      icon: "./images/Icons/pine.svg",
      propName: "Forest Acres ('000) ranking",
      rankProp: "Forest Acres ('000) ranking",
      tooltip: '<strong>Access to Forests:</strong> mosquitoes love forest areas, the more a state is covered in forests, the more likely mosquitoes are to live and thrive.'
    },
    {
      name: "Google Searches<br>for mosquitoes",
      icon: "./images/Icons/magnifying-glass-search.svg",
      propName: "Mosquitoes Search Volume ranking",
      rankProp: "Mosquitoes Search Volume ranking",
      tooltip: '<strong>Google Searches for mosquitoes:</strong> the number of Google searches associated with mosquitoes. The higher the volume, the worse the problem!'
    },
    {
      name: "Companies fighting mosquitos",
      icon: "./images/Icons/pesticide.svg",
      propName: "Number of pest companies ranking",
      rankProp: "Number of pest companies ranking",
      tooltip: '<strong>Companies fighting mosquitoes:</strong> the number of pest control companies in a state; the lower, the easier it is for the pest to spread.'
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
      tooltip: '<strong>Overall score:</strong> this considers all the factors in the table and ranks the state based on how easy it is for the pest to thrive.'
    },
    {
      name: "Average<br>temperature (°F)",
      icon: "./images/Icons/thermometer.svg",
      propName: "Average Temperature ranking",
      rankProp: "Average Temperature ranking",
      tooltip: '<strong>Average Temperature:</strong> the higher the temperature, the better the environment for pests to thrive.'
    },
    {
      name: "Pet ownership<br>ranking",
      icon: "./images/Icons/pawprints.svg",
      propName: "Pet Ownership Ranking",
      rankProp: "Pet Ownership Ranking",
      tooltip: '<strong>Pet Ownership:</strong> this refers to the percentage of families who have pets, the higher the percentage the more likely ticks are to thrive.'
    },
    {
      name: "National<br>Park ranking",
      icon: "./images/Icons/landscape.svg",
      propName: "National Park Coverage ranking",
      rankProp: "National Park Coverage ranking",
      tooltip: '<strong>Access to National Parks:</strong> ticks love the great outdoors, the more a state is covered in national parks, the more likely they are to live.'
    },
    {
      name: "Google Searches<br>for ticks",
      icon: "./images/Icons/magnifying-glass-search.svg",
      propName: "Ticks Search Volume ranking",
      rankProp: "Ticks Search Volume ranking",
      tooltip: '<strong>Google Searches for ticks:</strong> the number of Google searches associated with ticks. The higher the volume, the worse the problem!'
    },
    {
      name: "Companies fighting ticks",
      icon: "./images/Icons/pesticide.svg",
      propName: "number of pest companies ranking",
      rankProp: "number of pest companies ranking",
      tooltip: '<strong>Companies fighting ticks:</strong> the number of pest control companies in a state; the lower, the easier it is for the pest to spread'
    },
  ],
};

function headerTemplate() {
  const name = this.name;
  const icon = this.icon;
  const tooltip = this.tooltip;
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
