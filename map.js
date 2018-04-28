

function load() {
    return new Promise((resolve, reject) => d3.csv("Building_Permits.csv", function (error, data) {
        resolve(data);
    }));
}

async function show() {
    let data1 = await load();
    return data1;
}

    var width = 960,
        height = 700,
        centered;

    var color_back = d3.scaleLinear()
        .domain([1, 20])
        .clamp(true)
        .range(['#fff', '#409A99']);

    var color_hover = d3.scaleLinear()
        .domain([1, 20])
        .clamp(true)
        .range(['#190101', '#f78080']);

    let color_building = d3.scaleLinear()
        .domain([1, 20])
        .clamp(true)
        .range(['#42d9f4', '#040856']);


    var projection = d3.geoMercator()
        .scale(80000)
        .center([-83, 40])
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.select('#map').append('svg')
        .attr('width', width)
        .attr('height', height);

    var rec = svg.append('rect')
        .attr('class', 'background')
        .attr('width', width)
        .attr('height', height);

    var g = svg.append('g');

    var effectLayer = g.append('g')
        .classed('effect-layer', true);

    var mapLayer = g.append('g')
        .classed('map-layer', true);

    var tooltip = d3.select("#tip")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("font-weight", 'bold')
        .style("font-size", "18px")
        .style("border", "1px solid rgba(0,0,0,0.5)")
        .style('padding', '2px 6px')
        .style('background-color', 'rgba(128,128,128,0.5)');

show().then(function (data) {
    let data1 = data
    // console.log(data);
    rec.on('click', clicked);
    d3.json('zone-2.json', function (error, mapData) {
        var features = mapData.features;

        mapLayer.selectAll('path')
            .data(features)
            .enter().append('path')
            .attr('d', path)
            .attr('vector-effect', 'non-scaling-stroke')
            .style('fill', fillFn)

            .on("mouseover", function (d) {
                console.log(d.properties.GENERAL_ZONING_CATEGORY);
                d3.select(this).style('fill', "black");
                return tooltip.style("visibility", "visible")
                    .style("top", (d3.event.pageY - 10) + "px")
                    .style("left", (d3.event.pageX + 12) + "px")
                    .text("type: " + d.properties.GENERAL_ZONING_CATEGORY);
            })
            .on('mouseout', function (d) {
                mapLayer.selectAll('path')
                    .style('fill', function (d) { return centered && d === centered ? '#D5708B' : fillFn(d); });
                return tooltip.style("visibility", "hidden");
            })
            .on('click', clicked);

        mapLayer.selectAll("circle")
            .data(data1).enter()
            .append("circle")
            .attr("cx", function (d) { return projection([d.X, d.Y])[0]; })
            .attr("cy", function (d) { return projection([d.X, d.Y])[1]; })
            .attr("r", "0.5px")
            .attr("stroke-width", 0)
            .attr('fill', yearColor)
            .on('click', clicked_building);
    });
    // Get building color
    function yearColor(d) {
        var n = d.ISSUED_YEAR;
        return color_building((n - 2010) * 2)
    }
    // Get sector type
    function typeLength(d) {
        var n = d.properties.GENERAL_ZONING_CATEGORY;
        let len = n ? n.length : 0
        var res = len - 5
        return res;
    }
    // Get sector color
    function fillFn(d) {
        return color_back(typeLength(d));
    }

    function clicked(d) {
        var x, y, k;

        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }

        g.transition()
            .duration(750)
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
    }

    function clicked_building(d) {
        var x, y, k;
        document.getElementById('address-cell').textContent=d.LSN;
        document.getElementById('type-cell').textContent=d.B1_PER_TYPE;
        document.getElementById('sub-type-cell').textContent=d.B1_PER_SUB_TYPE;
        document.getElementById('category-cell').textContent=d.B1_PER_CATEGORY;
        document.getElementById('name-cell').textContent=d.APPLICANT_FULL_NAME;
        document.getElementById('bus-cell').textContent=d.APPLICANT_BUS_NAME;
        document.getElementById('permit-cell').textContent=d.PERMIT_STATUS;
        document.getElementById('year-cell').textContent=d.ISSUED_YEAR;
        panorama.setPosition(new google.maps.LatLng(d.Y, d.X));
        if (d && centered !== d) {
            var centroid = [d3.event.pageX, d3.event.pageY];
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
        } else {
            console.log("oops")
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }
        g.transition()
            .duration(750)
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
    }

    function mouseover(d) {
        d3.select(this).style('fill', 'orange');
    }

    function mouseout(d) {
        mapLayer.selectAll('path')
            .style('fill', function (d) { return centered && d === centered ? '#D5708B' : fillFn(d); });
    }
})
function initialize() {
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById('street-view'),
        {
          position: {lat: 39.9612, lng: -83.0000},
          pov: {heading: 165, pitch: 0},
          zoom: 1
        });
  }
