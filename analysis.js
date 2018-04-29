let fileName = 'buildings_group.csv'

d3.csv(fileName, initiate, load_data);
console.log("heild")
function initiate(d){
	//X,Y,B1_PER_TYPE,ISSUED_YEAR
	result = {year: d['ISSUED_YEAR'],type: d['B1_PER_TYPE'], count:parseInt(d['count']), percent: parseFloat(d['percentage'])}	
				// incomeWithExpenditure.push(result);
	return result;	
} 
 
function loadingHighCharts(data1, data2){
	console.log(data2[0])
	Highcharts.chart('container', {
		chart:{
			type:'pie'
		},
		title:{
			text:'Buildings in Recent Years'
		},
	// subtitle: {
 //        text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
 //    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
    },

    "series": data1,

    "drilldown": {
    	"series":data2
    }
    
	})


}

function load_data(error,data){
	if (error) throw error;

	//Create a hash 
	buildingHash = {};

	// print the original data
	// console.log(data[0].count+1)
	//process the js data group by year first
	data.forEach(function(d,i){
		if (!(d.type in buildingHash)){
			// console.log(d.count)
			buildingHash[d.type] = d.count;
		}else{
			buildingHash[d.type] += d.count;
		}
	})	

	data1 = [];
	data2 = [];
	// console.log(buildingHash)
	// iterate over the key, building the objects
	for(var key in buildingHash){
		data1.push(
			{"name":key,
			"y": buildingHash[key],
			"drilldown": key
			}
		);
	}

	yearHash = {}
	for(key in buildingHash){
			yearHash[key] = []
			data.forEach(function(d,i){
				if(d.type==key){
					yearHash[key].push([d.year,d.count])
			}
		})
	}

	//
	console.log(data1[0])
	
	// build the data for the first layer
	dataByBuilding = [{
		"name":"Buildings",
		"colorByPoint":true,
		"data":data1 }]

	// console.log(dataByBuilding)

	for(key in buildingHash){
		data2.push(
		{"name":key,
		 "id": key,
		 "data":yearHash[key]
		})
	}
	// loading the high charts
	loadingHighCharts(dataByBuilding, data2)

	

}

// read the files
