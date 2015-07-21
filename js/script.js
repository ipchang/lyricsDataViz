var parseDate = d3.time.format("%Y-%m-%d").parse,
    formatDate = d3.time.format("%b %d");

//id,date,rank,title,artist,classification,subjectivity,polarity,neg,pos
d3.csv("./data/polarity_final.csv", function(error, data){
    if (error) throw error;
    data.forEach(function(d){
        d.date = parseDate(d.date);
        d.id = +d.id,
        d.rank = +d.rank;
        d.subjectivity = +d.subjectivity;
        d.polarity = +d.polarity;
    });
    
    var width = 1000,
        height = 700,
        boxSize = 4,
        boxOffset = 1;

    var lyricsChart = d3.select('#chart').append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', '#FFFFFF')
        .selectAll('rect').data(data)
        .enter().append('rect')
            .style('fill', function (d,i) {
                if (d.polarity > 0) {
                    return 'rgba(0,0,255,'+d.subjectivity+')'
                } else {return 'rgba(255,0,0,'+d.subjectivity+')'};
            })
            .attr('width', boxSize)
            .attr('height', boxSize)
            .attr('x', function(d,i){
                var xx = Math.floor(d.id / 100)* boxSize;
                return xx;
            })
            .attr('y', function(d,i){
                var yy = (d.id%100) * boxSize;
                return yy;
            })
})