// var dataset = [];
// var colFlag1 = false;
// var colFlag2 = false;
// var colFlag3 = false;
// var largeArrayLength = 320105;
// var largeArray = [];
// var largeArrayIndex = [];
// var search;
// var tempArray = [];
// var tempArray_all = [];
// var location_find = [];
// output2 = [];
// tempArray2 = [];

// d3.csv("Building_Permits_v2.csv", function cb(mydata){
//     for (var i = 0; i < mydata.length; i++){
//         tempArray_all.splice(i,1,mydata[i]);
//         var flag = true;
//         if(mydata[i].B1_PER_TYPE == "Commercial"){
//             tempArray2.splice(i,1,"#f4e04d");
//         }
//         else if(mydata[i].B1_PER_TYPE == "Residential"){
//             tempArray2.splice(i,1,"#016fb9");
//         }
//         else if(mydata[i].B1_PER_TYPE == "Multi_Family"){
//             tempArray2.splice(i,1,"#61e786");
//         }
//         else if(mydata[i].B1_PER_TYPE == "Demolition"){
//             tempArray2.splice(i,1,"#f06543");
//         } 
//         else if(mydata[i].B1_PER_TYPE == "1,2,3 Family"){
//             tempArray2.splice(i,1,"#6d66ba");
//         }
//         else{
//             flag = false;
//         }
//         if(flag){
//             tempArray.splice(i,1,mydata[i].LSN);
//         }
//     }
//     search = Wade(tempArray);
// });

var idk = d3.select("#search2").append("svg")
    .attr("width", 2000)
    .attr("height", 30)
    .append("text")
    .attr("id", "mytext");
 
var idk2 = d3.select("#search2").append("svg")
    .attr("width", 2000)
    .attr("height", 30)
    .append("text")
    .attr("id", "mytext2");

var idk3 = d3.select("#search2").append("svg")
    .attr("width", 2000)
    .attr("height", 30)
    .append("text")
    .attr("id", "mytext3");

var marker1;
var marker2;
var marker3;
// var marker1 = mapLayer.append("circle")
//     .attr("cx", projection([location_find[0].X, location_find[0].Y])[0])
//     .attr("cy", projection([location_find[0].X, location_find[0].Y])[1])
//     .attr("r", "3px")
//     .attr("stroke-width", 0)
//     .attr('fill', 'red')
//     .style("visibility", "hidden");

// var marker2 = mapLayer.append("circle")
//     .attr("cx", projection([location_find[1].X, location_find[1].Y])[0])
//     .attr("cy", projection([location_find[1].X, location_find[1].Y])[1])
//     .attr("r", "3px")
//     .attr("stroke-width", 0)
//     .attr('fill', 'red')
//     .style("visibility", "hidden");

// var marker3 = mapLayer.append("circle")
//     .attr("cx", projection([location_find[2].X, location_find[2].Y])[0])
//     .attr("cy", projection([location_find[2].X, location_find[2].Y])[1])
//     .attr("r", "3px")
//     .attr("stroke-width", 0)
//     .attr('fill', 'red')
//     .style("visibility", "hidden");
var txt1 = idk
    .on("mouseover", function(d) {
        if(!colFlag1){
            d3.select(this).style('fill', output2[0]);
        }
    })
    .on("mouseout", function(d, i) {
        if(!colFlag1){
            d3.select(this).style('fill', 'black');
        }
    })
    .on("click", function(d,i){
        if(!colFlag1){
            d3.selectAll("text").style('fill', 'black');
            d3.select(this).style('fill', 'red');
            marker1.style("visibility", "visible");
            colFlag1 = true;
            colFlag2 = false;
            colFlag3 = false;
        }
        else{
             d3.select(this).style('fill', 'black');
             marker1.style("visibility", "hidden");
            colFlag1 = false;
        }
        clicked_search(location_find[0]);
    });


var txt2 = idk2
    .on("mouseover", function(d) {
        if(!colFlag2){
            d3.select(this)
            .style('fill', output2[1]);
        }
    })
    .on("mouseout", function(d, i) {
        if(!colFlag2){
            d3.select(this)
            .style('fill', 'black');
        }
     })
    .on("click", function(d,i){
        if(!colFlag2){
            d3.selectAll("text").style('fill', 'black');
            d3.select(this).style('fill', 'red');
            marker2.style("visibility", "visible");
            colFlag2 = true;
            colFlag1 = false;
            colFlag3 = false;
        }
        else{
             d3.select(this).style('fill', 'black');
             marker2.style("visibility", "hidden");
            colFlag2 = false;
        }
        clicked_search(location_find[1]);
    });

var txt3 = idk3
    .on("mouseover", function(d) {
        if(!colFlag3){
            d3.select(this)
            .style('fill', output2[2]);
        }
    })
    .on("mouseout", function(d, i) {
        if(!colFlag3){
            d3.select(this)
            .style('fill', 'black');
        }
     })
    .on("click", function(d,i){
        clicked_search(location_find[2]);
        if(!colFlag3){
            d3.selectAll("text").style('fill', 'black');
            d3.select(this).style('fill', 'red');
            marker3.style("visibility", "visible");
            colFlag3 = true;
            colFlag2 = false;
            colFlag1 = false;
        }
        else{
            d3.select(this).style('fill', 'black');
            marker3.style("visibility", "hidden");
            colFlag3 = false;
        }
    });

function handleClick(event){
        var output = [];
            var count = 0;
            var input = document.getElementById("myTextArea").value.toUpperCase();
            if(search(input)[count].score >= .5){
                output.splice(count,1,tempArray[search(input)[count].index]);
                output2.splice(count,1,tempArray2[search(input)[count].index]);
                count++;
                lookup(count,count, input, output, output2);
                count++;
                lookup(count,count, input, output, output2);
                match_name(output, location_find)
            }
            else{
                output.splice(1,1," ");
                output.splice(2,1," ");
                output.splice(3,1," ");
            }
        //  d3.csv("Building_Permits.csv", function cb(mydata){
        //    // console.log(mydata.length);
        //     var output = []; 
        //     var input = document.getElementById("myVal").value;
        //     var length = input.length;
        //     var count = 0;
        //     for (var i = 0; i < mydata.length; i++){
        //         if (mydata[i].LSN.includes(input.toUpperCase())){
        //             var flag = true;
        //             for (var j = count; j > 0; j--){
        //                 if(output[j-1] == mydata[i].LSN)
        //                     flag = false;
        //             }    
        //             if(flag){
        //                 output.splice(count,1,mydata[i].LSN);
        //                 count++;
        //                 console.log(mydata[i].X);
        //                 //store location
        //                 location_find.splice(count, 1, (projection([mydata[i].X, mydata[i].Y])));
        //                 console.log(location_find);
        //             }
                    
        //         }
        //         if (count == 3){
        //                 break;
        //         }
                
        //     }
        //     console.log(output); 

        
            idk.text( function (d) {return output[0]; })
                .attr("x", function(d) { return 0; })
                .attr("y", function(d) { return 15; })
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .attr("fill", "black");

            idk2.text( function (d) {return output[1]; })
                .attr("x", function(d) { return 0; })
                .attr("y", function(d) { return 15; })
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .attr("fill", "black");
            idk3.text( function (d) {return output[2]; })
                .attr("x", function(d) { return 0; })
                .attr("y", function(d) { return 15; })
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .attr("fill", "black");
            marker1 = mapLayer.append("circle")
                .attr("cx", projection([location_find[0].X, location_find[0].Y])[0])
                .attr("cy", projection([location_find[0].X, location_find[0].Y])[1])
                .attr("r", "3px")
                .attr("stroke-width", 0)
                .attr('fill', 'red')
                .style("visibility", "hidden");
            
            marker2 = mapLayer.append("circle")
                .attr("cx", projection([location_find[1].X, location_find[1].Y])[0])
                .attr("cy", projection([location_find[1].X, location_find[1].Y])[1])
                .attr("r", "3px")
                .attr("stroke-width", 0)
                .attr('fill', 'red')
                .style("visibility", "hidden");
            
            marker3 = mapLayer.append("circle")
                .attr("cx", projection([location_find[2].X, location_find[2].Y])[0])
                .attr("cy", projection([location_find[2].X, location_find[2].Y])[1])
                .attr("r", "3px")
                .attr("stroke-width", 0)
                .attr('fill', 'red')
                .style("visibility", "hidden");
        // });
        // draw(document.getElementById("myVal").value)
        return false;
}
 
function draw(val){
         d3.select("body").select("ul").append("li");
         dataset.push(val);
         var p = d3.select("body").selectAll("li")
         .data(dataset)
         .text(function(d,i){return i + ": " + d;})
}
function clicked_search(d) {
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
    var centroid=projection([d.X, d.Y]);
    x = centroid[0];
    y = centroid[1];
    k = 8;
    g.transition()
        .duration(750)
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
    
    myText.text("0.25 miles");

}

function lookup(count, outcount, input, output, output2 ){
    var flag = true;
    for (var j = outcount; j > 0; j--){
                       if(output[j-1] == tempArray[search(input)[count].index])
                           flag = false;
    }    
    if(flag){
       if(search(input)[count].score == 1){
           output.splice(outcount,1,tempArray[search(input)[count].index]);
           output2.splice(outcount,1,tempArray2[search(input)[count].index]);
           count++;
       }
       else{
           output.splice(outcount,1," ");
           return;
       }
    }
    else{
        lookup(count + 1, count, input, output, output2);
    }
}
function match_name(input, output){
    for (var i=0; i<tempArray_all.length; i++){
        for (var j=0; j<3; j++){
            if (tempArray_all[i].LSN == input[j]){
                output[j] = tempArray_all[i]
            }
        }
    }
}

// function lookup_all(count, outcount, input, output ){
//     var flag = true;
//     for (var j = outcount; j > 0; j--){
//                        if(output[j-1] == tempArray_all[search(input)[count].index])
//                            flag = false;
//     }
//     if(flag){
//        if(search(input)[count].score == 1){
//            output.splice(outcount,1,tempArray_all[search(input)[count].index]);
//            count++;
//        }
//        else{
//            output.splice(outcount,1," ");
//            return;
//        }
//     }
//     else{
//         lookup_all(count + 1, count, input, output);
//     }
// }
function initialize() {
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById('street-view'),
        {
          position: {lat: 39.9612, lng: -83.0000},
          pov: {heading: 165, pitch: 0},
          zoom: 1
        });
  }
