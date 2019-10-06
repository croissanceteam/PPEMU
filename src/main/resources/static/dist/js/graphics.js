var app=angular.module("app",[]);
var URL="http://obspemu.org:9898/mobile/api.php?date=true";
app.controller('dashboard',function ($scope,$http) {
    document.body.style.zoom = "80%";
    $scope.lastupdate;
    $http.get(URL).then(function(response){
        $scope.lastupdate=response.data.updated;
        console.log('Last Updated :',response.data)
    },function(error){
        console.error("Date Error :",error)
    })

$scope.lots=[
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10
];
    $scope.lotRange=[
                {
                    "country":"kinshasa"

                }
    ]
    $http.get('/api/realized/workalls').then(function(response){
        $scope.list=response.data;

        var ctrRep=0;
        var ctrRea=0;
        var ctrErr=0;
        var percentage_Rea=0;
        var percentage_Rep=0;
        var percentage_Err=0;
        var streets=[];
        var secteurs=[];
        var datasets=[];
        var currentDataSetRef=[];
        var currentDataSetRea=[];
        var currentDataSetErr=[];
        var streetCurrent='';
        var ctrRepGraph=0;
        var ctrReaGraph=0;
        var ctrErrGraph=0;
        $scope.fillDataSet=function(labelDatas,ref,rea,error,donutRep,donutRea,donutErr){

            $(function () {
                /* ChartJS
                 * -------
                 * Here we will create a few charts using ChartJS
                 */

                //--------------
                //- AREA CHART -
                //--------------

                // Get context with jQuery - using jQuery's .get() method.
                var areaChartCanvas = $('#areaChart').get(0).getContext('2d')
                // This will get the first returned node in the jQuery collection.
                var areaChart       = new Chart(areaChartCanvas)

                var areaChartData = {
                    labels  : labelDatas,
                    datasets: [
                        {
                            label               : 'Electronics',
                            fillColor           : 'rgba(240, 82, 63, 1)',
                            strokeColor         : 'rgba(240, 82, 63, 1)',
                            pointColor          : 'rgba(240, 82, 63, 1)',
                            pointStrokeColor    : '#c1c7d1',
                            pointHighlightFill  : '#fff',
                            pointHighlightStroke: 'rgba(240, 82, 63,1)',
                            data                : ref
                        },
                        {
                            label               : 'Référencement réalisé',
                            fillColor           : 'rgba(29,188,93,0.9)',
                            strokeColor         : 'rgba(29,188,93,0.8)',
                            pointColor          : '#3b8bba',
                            pointStrokeColor    : 'rgba(29,188,93,1)',
                            pointHighlightFill  : '#fff',
                            pointHighlightStroke: 'rgba(29,188,93,1)',
                            data                : rea
                        },
                        {
                            label               : 'Réalisation sans référencement',
                            fillColor           : 'rgba(234,169,88,0.9)',
                            strokeColor         : 'rgba(234,169,88,0.8)',
                            pointColor          : '#3b8bba',
                            pointStrokeColor    : 'rgba(234,169,88,1)',
                            pointHighlightFill  : '#fff',
                            pointHighlightStroke: 'rgba(234,169,88,1)',
                            data                : error
                        }
                    ]
                }

                var areaChartOptions = {
                    //Boolean - If we should show the scale at all
                    showScale               : true,
                    //Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines      : false,
                    //String - Colour of the grid lines
                    scaleGridLineColor      : 'rgba(0,0,0,.05)',
                    //Number - Width of the grid lines
                    scaleGridLineWidth      : 1,
                    //Boolean - Whether to show horizontal lines (except X axis)
                    scaleShowHorizontalLines: true,
                    //Boolean - Whether to show vertical lines (except Y axis)
                    scaleShowVerticalLines  : true,
                    //Boolean - Whether the line is curved between points
                    bezierCurve             : true,
                    //Number - Tension of the bezier curve between points
                    bezierCurveTension      : 0.3,
                    //Boolean - Whether to show a dot for each point
                    pointDot                : false,
                    //Number - Radius of each point dot in pixels
                    pointDotRadius          : 4,
                    //Number - Pixel width of point dot stroke
                    pointDotStrokeWidth     : 1,
                    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                    pointHitDetectionRadius : 20,
                    //Boolean - Whether to show a stroke for datasets
                    datasetStroke           : true,
                    //Number - Pixel width of dataset stroke
                    datasetStrokeWidth      : 2,
                    //Boolean - Whether to fill the dataset with a color
                    datasetFill             : true,
                    //String - A legend template
                    legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].lineColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
                    //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                    maintainAspectRatio     : true,
                    //Boolean - whether to make the chart responsive to window resizing
                    responsive              : true
                }

                //Create the line chart
                areaChart.Line(areaChartData, areaChartOptions)

                //-------------
                //- LINE CHART -
                //--------------
                //var lineChartCanvas          = $('#lineChart').get(0).getContext('2d')
                //var lineChart                = new Chart(lineChartCanvas)
                //var lineChartOptions         = areaChartOptions
                //lineChartOptions.datasetFill = false
                //lineChart.Line(areaChartData, lineChartOptions)
                //-------------
                //- PIE CHART -
                //-------------
                // Get context with jQuery - using jQuery's .get() method.
                var pieChartCanvas = $('#pieChart1').get(0).getContext('2d')
                var pieChart       = new Chart(pieChartCanvas)
                var PieData        = [
                    {
                        value    : donutRep,
                        color    : '#f56954',
                        highlight: '#f56954',
                        label    : 'Branchements non réalisés'
                    },
                    {
                        value    : donutRea,
                        color    : '#00a65a',
                        highlight: '#00a65a',
                        label    : 'Branchements réalisés'
                    },
                    {
                        value    : donutErr,
                        color    : '#f39c12',
                        highlight: '#f39c12',
                        label    : 'Branchements avec clé érroné'
                    }
                ]
                var pieOptions     = {
                    //Boolean - Whether we should show a stroke on each segment
                    segmentShowStroke    : true,
                    //String - The colour of each segment stroke
                    segmentStrokeColor   : '#fff',
                    //Number - The width of each segment stroke
                    segmentStrokeWidth   : 2,
                    //Number - The percentage of the chart that we cut out of the middle
                    percentageInnerCutout: 50, // This is 0 for Pie charts
                    //Number - Amount of animation steps
                    animationSteps       : 100,
                    //String - Animation easing effect
                    animationEasing      : 'easeOutBounce',
                    //Boolean - Whether we animate the rotation of the Doughnut
                    animateRotate        : true,
                    //Boolean - Whether we animate scaling the Doughnut from the centre
                    animateScale         : false,
                    //Boolean - whether to make the chart responsive to window resizing
                    responsive           : true,
                    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                    maintainAspectRatio  : true,
                    //String - A legend template
                    legendTemplate       : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
                }
                //Create pie or douhnut chart
                // You can switch between pie and douhnut using the method below.
                pieChart.Doughnut(PieData, pieOptions)



                  var pieChartCanvas = $('#pieChart2').get(0).getContext('2d')
                                var pieChart       = new Chart(pieChartCanvas)
                                var PieData        = [
                                    {
                                        value    : donutRep,
                                        color    : '#f56954',
                                        highlight: '#f56954',
                                        label    : 'Branchements non réalisés'
                                    },
                                    {
                                        value    : donutRea,
                                        color    : '#00a65a',
                                        highlight: '#00a65a',
                                        label    : 'Branchements réalisés'
                                    },
                                    {
                                        value    : donutErr,
                                        color    : '#f39c12',
                                        highlight: '#f39c12',
                                        label    : 'Branchements avec clé érroné'
                                    }
                                ]
                                var pieOptions     = {
                                    //Boolean - Whether we should show a stroke on each segment
                                    segmentShowStroke    : true,
                                    //String - The colour of each segment stroke
                                    segmentStrokeColor   : '#fff',
                                    //Number - The width of each segment stroke
                                    segmentStrokeWidth   : 2,
                                    //Number - The percentage of the chart that we cut out of the middle
                                    percentageInnerCutout: 50, // This is 0 for Pie charts
                                    //Number - Amount of animation steps
                                    animationSteps       : 100,
                                    //String - Animation easing effect
                                    animationEasing      : 'easeOutBounce',
                                    //Boolean - Whether we animate the rotation of the Doughnut
                                    animateRotate        : true,
                                    //Boolean - Whether we animate scaling the Doughnut from the centre
                                    animateScale         : false,
                                    //Boolean - whether to make the chart responsive to window resizing
                                    responsive           : true,
                                    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                                    maintainAspectRatio  : true,
                                    //String - A legend template
                                    legendTemplate       : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
                                }
                                //Create pie or douhnut chart
                                // You can switch between pie and douhnut using the method below.
                                pieChart.Doughnut(PieData, pieOptions)

                //-------------
                //- BAR CHART -
                //-------------
                var barChartCanvas                   = $('#barChart').get(0).getContext('2d')
                var barChart                         = new Chart(barChartCanvas)
                var barChartData                     = areaChartData
                barChartData.datasets[1].fillColor   = '#00a65a'
                barChartData.datasets[1].strokeColor = '#00a65a'
                barChartData.datasets[1].pointColor  = '#00a65a'
                var barChartOptions                  = {
                    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                    scaleBeginAtZero        : true,
                    //Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines      : true,
                    //String - Colour of the grid lines
                    scaleGridLineColor      : 'rgba(0,0,0,.05)',
                    //Number - Width of the grid lines
                    scaleGridLineWidth      : 1,
                    //Boolean - Whether to show horizontal lines (except X axis)
                    scaleShowHorizontalLines: true,
                    //Boolean - Whether to show vertical lines (except Y axis)
                    scaleShowVerticalLines  : true,
                    //Boolean - If there is a stroke on each bar
                    barShowStroke           : true,
                    //Number - Pixel width of the bar stroke
                    barStrokeWidth          : 2,
                    //Number - Spacing between each of the X value sets
                    barValueSpacing         : 5,
                    //Number - Spacing between data sets within X values
                    barDatasetSpacing       : 1,
                    //String - A legend template
                    legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
                    //Boolean - whether to make the chart responsive
                    responsive              : true,
                    maintainAspectRatio     : true
                }

                barChartOptions.datasetFill = false
                barChart.Bar(barChartData, barChartOptions)
            })

        }
        document.querySelector('#countReperage').innerHTML=$scope.list[0].done.length;
       // console.log('Size :',$scope.list[0].done);




        $scope.list.forEach(function (rep,index) {

            rep.done.forEach(function (d,i) {

                if (d.entreprise!=null){
                    ctrRea+=1;
                    ctrReaGraph+=1;
                } else{

                    ctrRep+=1;
                    ctrRepGraph+=1;
                }

                if (streetCurrent==''){
                    streetCurrent="Lot "+d.lot.toString().trim();
                    streets.push(streetCurrent);
                    if(d.secteur!=""){
                    	secteurs.push(d.secteur);
                    }
                    
                    console.log('1er Streer :',streetCurrent);

                }else {
                    if (streetCurrent!=("Lot "+d.lot.toString().trim())){

                        currentDataSetRef.push(ctrRepGraph);
                        currentDataSetRea.push(ctrReaGraph);
                       // datasets.push(currentDataSetRR);
                        ctrRepGraph=0;
                        ctrReaGraph=0;
                        //currentDataSetRR=[];
                        streetCurrent="Lot "+d.lot.toString().trim();
                        streets.push(streetCurrent);
                        secteurs.push(d.secteur);
                        console.log('Current Street :',streetCurrent)

                    }
                }


            });
            if (streets.length>currentDataSetRef.length && streets.length>currentDataSetRea.length){
                currentDataSetRef.push(ctrRepGraph);
                currentDataSetRea.push(ctrReaGraph);
              //  datasets.push(currentDataSetRR);
                ctrRepGraph=0;
                ctrReaGraph=0;
                //currentDataSetRR=[];
            }
            console.log('Streets :',streets);
            console.log('Datas Rep :',currentDataSetRef);
            console.log('Datas Rea :',currentDataSetRea);
            percentage_Rea=(ctrRea*100)/parseInt($scope.list[0].done.length);
            percentage_Rep=(ctrRep*100)/parseInt($scope.list[0].done.length);


            document.querySelector('#countRealized').innerHTML=ctrRea;
            document.querySelector('#percentRea').innerHTML=Math.round(percentage_Rea)+" %";
            document.querySelector('#countRepProgress').innerHTML=ctrRep
            document.querySelector('#percentRep').innerHTML=Math.round(percentage_Rep)+" %";
            var currentStreet='';
                rep.error.forEach(function(e,i){
                	//console.log("Error unit :",e);
                    if (e.idRep==null){

                        ctrErr+=1;
                        ctrErrGraph+=1;
                        console.log("Commune :",e.lot);
                        if (currentStreet==''){
                            currentStreet="Lot "+e.lot;
                        }else {
                            if (currentStreet!=("Lot "+e.lot.toString().trim())){
                                //currentDataSetErr.push(currentStreet);
                                currentDataSetErr.push(ctrErrGraph);
                                // datasets.push(currentDataSetRR);
                                ctrErrGraph=0;
                                //currentDataSetRR=[];
                                currentStreet=e.lot.toString().trim();

                            }
                        }
                    }
                });
            if (streets.length>currentDataSetErr.length){
                currentDataSetErr.push(ctrErrGraph);
                //  datasets.push(currentDataSetRR);
                ctrErrGraph=0;
                //currentDataSetRR=[];
            }
            if(currentDataSetRef.length>currentDataSetErr.length){
            	var iterator=currentDataSetRef.length-currentDataSetErr.length;
            	for(var i=0;i<iterator;i++){
            		currentDataSetErr.push(0);
            	}
            }
            console.log('Secteurs :',secteurs)
            console.log('DataSet ErrorS :',currentDataSetErr);

            percentage_Err=(ctrErr*100)/parseInt($scope.list[0].done.length);
            document.querySelector('#countError').innerHTML=ctrErr;
            document.querySelector('#percentErr').innerHTML=Math.round(percentage_Err)+" %";
            $http.get('/api/realized/allgraphics').then(function(data){
                    var tabDates=[];
                    var tabRep=[];
                    var tabRea=[];
                    var tabErr=[];
                    data.data[0].reperage.forEach(function(d,i){
                        console.log('Date :',d)
                        tabDates.push(d.ExportDate)
                        tabRep.push(d.ctr);
                        for(var x=0;x<data.data[0].realized.length;x++){
                            if(data.data[0].realized[x].ExportDate==d.ExportDate)
                                tabRea.push(data.data[0].realized[x].ctr);
                               // break;
                        }

                        for(var x=0;x<data.data[0].error.length;x++){
                                        if(data.data[0].error[x].ExportDate==d.ExportDate)
                                            tabErr.push(data.data[0].error[x].ctr);
                                           // break;
                        }
                    })
                    if (tabRep.length>0 && tabRea.length==0) {
                        for (var index = 0; index < tabRep.length; index++) {
                            tabRea.push(0);
                            
                        }
                    }
                    if (tabRep.length>0 && tabErr.length==0) {
                        for (var index = 0; index < tabRep.length; index++) {
                            tabErr.push(0);
                            
                        }
                    }
                    console.log('Series :',tabDates);
                    console.log("reperage :",tabRep)
                    console.log("Realisation :",tabRea)
                    console.log("Error :",tabErr)
                    console.log("Data donut rep :",data.data[0].reperagetodoLot[0].ctr);
                    var totalDonutRep=0;
                    var totalDonutRea=0;
                    var totalDonutErr=0;
                    data.data[0].reperagetodoLot.forEach(function(elt){
                        totalDonutRep+=elt.ctr;
                    })
                    data.data[0].realizedLot.forEach(function(elt){
                        totalDonutRea+=elt.ctr;
                    })
                    data.data[0].realizedErrorLot.forEach(function(elt){
                        totalDonutErr+=elt.ctr;
                    })
                    $scope.fillDataSet(
                    streets,
                    currentDataSetRef,
                    currentDataSetRea,
                    currentDataSetErr,
                    totalDonutRep,
                    totalDonutRea,
                    totalDonutErr
                    );
                    console.log("Select Month:",document.querySelector('#select_month').value);
                    $scope.filterMonth(tabDates,tabRep,tabRea,tabErr);
                },function(error){

                });

        })

    },function(error){
        console.error(error);
    })



    $scope.filterMonth=function(labelDatas,ref,rea,error){

                $(function () {
                    /* ChartJS
                     * -------
                     * Here we will create a few charts using ChartJS
                     */

                    //--------------
                    //- AREA CHART -
                    //--------------
                    var barChart;
                    var barChartData={};
                    var ChartContent = document.getElementById('contentChart');
                        ChartContent.innerHTML = '&nbsp;'
                    $('#contentChart').append('<canvas id="barChartMonth" style="height:330px;"></canvas>');
                    var barChartCanvas= $('#barChartMonth').get(0).getContext('2d');
                   if (labelDatas.length>0) {
                        barChartData = {
                        labels  : labelDatas,
                        datasets: [
                            {
                                label               : 'Référencements',
                                fillColor           : 'rgba(240, 82, 63, 1)',
                                strokeColor         : 'rgba(240, 82, 63, 1)',
                                pointColor          : 'rgba(240, 82, 63, 1)',
                                pointStrokeColor    : '#c1c7d1',
                                pointHighlightFill  : '#fff',
                                pointHighlightStroke: 'rgba(240, 82, 63,1)',
                                data                : ref
                            },
                            {
                                label               : 'Branchements réalisés',
                                fillColor           : 'rgba(29,188,93,0.9)',
                                strokeColor         : 'rgba(29,188,93,0.8)',
                                pointColor          : '#3b8bba',
                                pointStrokeColor    : 'rgba(29,188,93,1)',
                                pointHighlightFill  : '#fff',
                                pointHighlightStroke: 'rgba(29,188,93,1)',
                                data                : rea
                            },
                            {
                                label               : 'Branchements sans référencement',
                                fillColor           : 'rgba(234,169,88,0.9)',
                                strokeColor         : 'rgba(234,169,88,0.8)',
                                pointColor          : '#3b8bba',
                                pointStrokeColor    : 'rgba(234,169,88,1)',
                                pointHighlightFill  : '#fff',
                                pointHighlightStroke: 'rgba(234,169,88,1)',
                                data                : error
                            }
                        ]
                    }
                    var areaChartOptions = {
                        //Boolean - If we should show the scale at all
                        showScale               : true,
                        //Boolean - Whether grid lines are shown across the chart
                        scaleShowGridLines      : false,
                        //String - Colour of the grid lines
                        scaleGridLineColor      : 'rgba(0,0,0,.05)',
                        //Number - Width of the grid lines
                        scaleGridLineWidth      : 1,
                        //Boolean - Whether to show horizontal lines (except X axis)
                        scaleShowHorizontalLines: true,
                        //Boolean - Whether to show vertical lines (except Y axis)
                        scaleShowVerticalLines  : true,
                        //Boolean - Whether the line is curved between points
                        bezierCurve             : true,
                        //Number - Tension of the bezier curve between points
                        bezierCurveTension      : 0.3,
                        //Boolean - Whether to show a dot for each point
                        pointDot                : false,
                        //Number - Radius of each point dot in pixels
                        pointDotRadius          : 4,
                        //Number - Pixel width of point dot stroke
                        pointDotStrokeWidth     : 1,
                        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                        pointHitDetectionRadius : 20,
                        //Boolean - Whether to show a stroke for datasets
                        datasetStroke           : true,
                        //Number - Pixel width of dataset stroke
                        datasetStrokeWidth      : 2,
                        //Boolean - Whether to fill the dataset with a color
                        datasetFill             : true,
                        //String - A legend template
                        legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].lineColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
                        //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                        maintainAspectRatio     : true,
                        //Boolean - whether to make the chart responsive to window resizing
                        responsive              : true
                    }
                    //-------------
                    //- BAR CHART -
                    //-------------
                    
                    barChart                         = new Chart(barChartCanvas);          
                    barChartData.datasets[1].fillColor   = '#00a65a'
                    barChartData.datasets[1].strokeColor = '#00a65a'
                    barChartData.datasets[1].pointColor  = '#00a65a'
                    var barChartOptions                  = {
                        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                        scaleBeginAtZero        : true,
                        //Boolean - Whether grid lines are shown across the chart
                        scaleShowGridLines      : true,
                        //String - Colour of the grid lines
                        scaleGridLineColor      : 'rgba(0,0,0,.05)',
                        //Number - Width of the grid lines
                        scaleGridLineWidth      : 1,
                        //Boolean - Whether to show horizontal lines (except X axis)
                        scaleShowHorizontalLines: true,
                        //Boolean - Whether to show vertical lines (except Y axis)
                        scaleShowVerticalLines  : true,
                        //Boolean - If there is a stroke on each bar
                        barShowStroke           : true,
                        //Number - Pixel width of the bar stroke
                        barStrokeWidth          : 2,
                        //Number - Spacing between each of the X value sets
                        barValueSpacing         : 5,
                        //Number - Spacing between data sets within X values
                        barDatasetSpacing       : 1,
                        //String - A legend template
                        legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
                        //Boolean - whether to make the chart responsive
                        responsive              : true,
                        maintainAspectRatio     : true
                    }

                    barChartOptions.datasetFill = false
                    barChart.Bar(barChartData, barChartOptions)
                   }else{
                    var barChartCanvas                   = $('#barChartMonth').get(0).getContext('2d')
                    var barChart                         = new Chart(barChartCanvas)
                    barChart.Bar({
                        labels  : ['Pas des données disponible'],
                        datasets: [
                            {
                                label               : 'Référencements',
                                fillColor           : 'rgba(240, 82, 63, 1)',
                                strokeColor         : 'rgba(240, 82, 63, 1)',
                                pointColor          : 'rgba(240, 82, 63, 1)',
                                pointStrokeColor    : '#c1c7d1',
                                pointHighlightFill  : '#fff',
                                pointHighlightStroke: 'rgba(240, 82, 63,1)',
                                data                : [0]
                            },
                            {
                                label               : 'Branchements réalisés',
                                fillColor           : 'rgba(29,188,93,0.9)',
                                strokeColor         : 'rgba(29,188,93,0.8)',
                                pointColor          : '#3b8bba',
                                pointStrokeColor    : 'rgba(29,188,93,1)',
                                pointHighlightFill  : '#fff',
                                pointHighlightStroke: 'rgba(29,188,93,1)',
                                data                : [0]
                            },
                            {
                                label               : 'Branchements sans référencement',
                                fillColor           : 'rgba(234,169,88,0.9)',
                                strokeColor         : 'rgba(234,169,88,0.8)',
                                pointColor          : '#3b8bba',
                                pointStrokeColor    : 'rgba(234,169,88,1)',
                                pointHighlightFill  : '#fff',
                                pointHighlightStroke: 'rgba(234,169,88,1)',
                                data                : [0]
                            }
                        ]
                    }, barChartOptions).destroy();
                    
                   }
                
                   
                })
                document.querySelector('#barChart').style.display="block";
                document.querySelector('#pieChart1').style.display="block";
                document.querySelector('#pieChart2').style.display="block";
                document.querySelector('#barChartMonth').style.display="block";
                document.querySelector('#list-filter').style.display="block";
                document.querySelector('#cover-spin').style.display="none";
            }
        document.querySelector('#select_month').onchange=function(){

        var paramQuery='-'+document.querySelector('#select_month').value+'-';
        console.log(paramQuery);
        var linkSuccessMonth='/api/realized/counterwork/'+paramQuery;
        $http.get(linkSuccessMonth).then(function(success){
            $scope.labelDatasMonth=[];
            $scope.tabRepMonth=[];
            $scope.tabReaMonth=[];
            $scope.tabErrMonth=[];
            
            
            if (success.data[0].reperage.length>=success.data[0].realized.length && success.data[0].reperage.length>=success.data[0].error.length) {
                success.data[0].reperage.forEach(function(elt){
                    $scope.labelDatasMonth.push(elt.ExportDate);
            });
            }
            
            if (success.data[0].realized.length>=success.data[0].reperage.length && success.data[0].realized.length>=success.data[0].error.length) {
                $scope.labelDatasMonth=[];
                success.data[0].reperage.forEach(function(elt){
                    success.data[0].realized.forEach(function(elt){
                        $scope.labelDatasMonth.push(elt.ExportDate);
                });
                 });
            }

            if (success.data[0].error.length>=success.data[0].reperage.length && success.data[0].error.length>=success.data[0].realized.length) {
                $scope.labelDatasMonth=[];
                success.data[0].error.forEach(function(elt){
                    $scope.labelDatasMonth.push(elt.ExportDate);
            });
            }
            

           $scope.labelDatasMonth.forEach(function(d,i){
            try {
                if (success.data[0].reperage[i].ExportDate==d) {
                    $scope.tabRepMonth.push(success.data[0].reperage[i].ctr);
               } else {
                $scope.tabRepMonth.push(0);
               }
            } catch (err) {
                $scope.tabRepMonth.push(0);
            }
            
           })
           $scope.labelDatasMonth.forEach(function(d,i){
              try{
                    if (success.data[0].realized[i].ExportDate==d) {
                        $scope.tabReaMonth.push(success.data[0].realized[i].ctr);
                        } else {
                                $scope.tabReaMonth.push(0);
                    }
              }catch(e){
                $scope.tabReaMonth.push(0);
              }
        });
            $scope.labelDatasMonth.forEach(function(d,i){
                try {
                    if (success.data[0].error[i].ExportDate==d) {
                        $scope.tabErrMonth.push(success.data[0].error[i].ctr);
                   } else {
                        $scope.tabErrMonth.push(0);
                   }   
                } catch (e) {
                    $scope.tabErrMonth.push(0);
                }
            });
            console.log('Labels date :',$scope.labelDatasMonth);
            console.log('Rep date :',$scope.tabRepMonth);
            console.log('Rea date :',$scope.tabReaMonth);
            console.log('Err date :',$scope.tabErrMonth);
             $scope.filterMonth
             (
             $scope.labelDatasMonth,
             $scope.tabRepMonth,
             $scope.tabReaMonth,
             $scope.tabErrMonth
             );
        },function(error){
        })
    }
})