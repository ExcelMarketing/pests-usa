//----------- PROTOTYPE FUNCTIONS  ----------------------
d3.selection.prototype.patternify = function (params) {
  var container = this;
  var selector = params.selector;
  var elementTag = params.tag;
  var data = params.data || [selector];

  // Pattern in action
  var selection = container.selectAll("." + selector).data(data, (d, i) => {
    if (typeof d === "object") {
      if (d.id) {
        return d.id;
      }
    }
    return i;
  });
  selection.exit().remove();
  selection = selection.enter().append(elementTag).merge(selection);
  selection.attr("class", selector);
  return selection;
};

function makeChain(attrs, main) {
  //Dynamic keys functions
  Object.keys(attrs).forEach((key) => {
    // Attach variables to main function
    return (main[key] = function (_) {
      var string = `attrs['${key}'] = _`;
      if (!arguments.length) {
        return eval(` attrs['${key}'];`);
      }
      eval(string);
      return main;
    });
  });
}

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

function triggerEvent(s, event) {
  if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, false, true);
    s.dispatchEvent(evt);
  } else {
    s.fireEvent("on" + event);
  }
}

function formatThousand(num) {
  if (typeof num === "number") {
    return d3.format(",")(num);
  }

  return num;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const globals = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
    if (window.innerWidth > 768) return false;

    return globals.Android() || 
      globals.BlackBerry() || 
      globals.iOS() || 
      globals.Opera() || 
      globals.Windows() || 
      window.innerWidth <= 768;
	},
	get isMobile() {
		return globals.any();
	}
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}