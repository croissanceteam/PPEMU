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
    });
    
    $scope.growingPlugs=function(URL,callback){
        $http.get(URL).then(function(result){
            $(function () {
                $('#tableSuccess').DataTable({
                    data:result.data,
                    columns: [
                       // { data: "sector" },
                         { "mData":null,
                            "bSortable":false,
                            "mRender":function(data){
                                var dataRename='';
                                switch (data.typeBranche) {
                                    case "Appropriation_":
                                            dataRename="Appropriations"
                                        break;
                                    case "branchement_so":
                                            dataRename="Branchements Sociaux"
                                         break;
                                    case "pose_compteur":
                                            dataRename="Pose compteur"
                                         break; 
                                
                                    default:
                                        dataRename="Nothings"
                                        break;
                                }
                                 return dataRename;
                              }
                       },
                       { "mData":null,
                       "bSortable":false,
                       "mRender":function(data){
                            var blockHTML;
                            if(data.stats<500){
                                var blockHTML='<span class="badge bg-red">'+data.stats+'</span>'
                            }else{
                                var blockHTML='<span class="badge bg-green">'+data.stats+'</span>'
                            }

                                          return blockHTML;
                         }
                  }
                   
                    ],
                    'paging'      : true,
                    'lengthChange': false,
                    'searching'   : true,
                    'ordering'    : false,
                    'info'        : true,
                    'autoWidth'   : false,
                    'loading'     : true
                })
            })
            callback({value:true});
        },function(error){
            callback({value:false});
        })
    }
    $scope.growingPlugs('/api/kobotoolbox/plugs',function(response){

        if(response.value==true){
            
        }else{
            alert('Connexion is bad')
        }
    })
    $scope.DrawingGraph=function(appro,bsociaux,pcmpt){
        console.log("Appro Graph :",appro)
        var pieChartCanvas = $('#pieChart1').get(0).getContext('2d')
        var pieChart       = new Chart(pieChartCanvas)
        var PieData        = [
            {
                value    : appro,
                color    : '#00BFFF',
                highlight: '#00BFFF',
                label    : 'APPROPRIATIONS'
            },
            {
                value    : bsociaux,
                color    : '#00a65a',
                highlight: '#00a65a',
                label    : 'BRANCHEMENTS SOCIAUX'
            },
            {
                value    : pcmpt,
                color    : '#FFA500',
                highlight: '#FFA500',
                label    : 'POSE COMPTEURS'
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
    }
   $scope.synthesisData=function(URL,callback){
     $http.get(URL).then(function(result){
         let arrayType=['appropriation_','branchement_so','pose_compteur'];
         let approCtr=0;
         let branchsoCtr=0;
         let pose_compteurCtr=0;

         let data=result.data;
            data.forEach(e=>{
                if (e.typeBranche=='appropriation_') {
                    approCtr+=e.stats;
                }
                if (e.typeBranche=='branchement_so') {
                    branchsoCtr+=e.stats
                }
                if (e.typeBranche=='pose_compteur') {
                    pose_compteurCtr+=e.stats;
                }
            })
            let synthesisElement={
                appropriation:approCtr,
                branchement_so:branchsoCtr,
                pose_compteur:pose_compteurCtr
            }

         $scope.list=result.data;
        console.log('Count Appro :',synthesisElement.appropriation)
        console.log('Count Branch :',synthesisElement.branchement_so)
        console.log('Count pose :',synthesisElement.pose_compteur)
        callback({
            status:true,
            appro:synthesisElement.appropriation,
            brnch:synthesisElement.branchement_so,
            poscmptr:synthesisElement.pose_compteur
        });
     },function(error){
        callback({status:false});
     })
   }
   $scope.synthesisData('/api/kobotoolbox/datajoin',function(response){
       if (response.status==true) {
            document.querySelector('#countAppro').innerHTML=response.appro;
            document.querySelector('#countBranch').innerHTML=response.brnch;
            document.querySelector('#countPoseCompteur').innerHTML=response.poscmptr;
            document.querySelector('#countTotal').innerHTML=(
                response.appro+response.brnch+response.poscmptr
            );
            $scope.DrawingGraph(response.appro,response.brnch,response.poscmptr);
            document.querySelector('#cover-spin').style="display:none;";
       } else {
          document.querySelector('#cover-spin').style="display:none;";
          alert("Connexion error")
       }
   })
  
   $scope.realizationEntrepriseCallback=function(url,callback){

    $http.get(url).then(function(result) {
        
        $(function () {
            $('#tableEntreprise').DataTable({
                data:result.data,
                columns: [
                   // { data: "sector" },
                     { "mData":null,
                        "bSortable":false,
                        "mRender":function(data){
                             return (data.entreprise==""?"NoThing":data.entreprise);
                          }
                   },
                   { "mData":null,
                   "bSortable":false,
                   "mRender":function(data){
                        var blockHTML;
                        if(data.stats<500){
                            var blockHTML='<span class="badge bg-red">'+data.stats+'</span>'
                        }else{
                            var blockHTML='<span class="badge bg-green">'+data.stats+'</span>'
                        }

                                      return blockHTML;
                     }
              }
               
                ],
                'paging'      : true,
                'lengthChange': false,
                'searching'   : true,
                'ordering'    : false,
                'info'        : true,
                'autoWidth'   : false,
                'loading'     : true
            })
        })
        callback({value:result.data,status:true});
        
    },function(error){



    });
   }
   $scope.realizationEntrepriseCallback('/api/kobotoolbox/entreprise',function(response){});

    $scope.realizationCtrlCallback=function(url,callback){
        $http.get(url).then(function(result){
            $(function () {
                $('#tableControllers').DataTable({
                    data:result.data,
                    columns: [
                       // { data: "sector" },
                         { "mData":null,
                            "bSortable":false,
                            "mRender":function(data){
                                 return (data.consultant==""?"Nothings":data.consultant);
                              }
                       },
                       { "mData":null,
                       "bSortable":false,
                       "mRender":function(data){
                            var blockHTML;
                            if(data.stats<100){
                                var blockHTML='<span class="badge bg-red">'+data.stats+'</span>'
                            }else{
                                var blockHTML='<span class="badge bg-green">'+data.stats+'</span>'
                            }

                                          return blockHTML;
                         }
                  }
                   
                    ],
                    'paging'      : true,
                    'lengthChange': false,
                    'searching'   : true,
                    'ordering'    : false,
                    'info'        : true,
                    'autoWidth'   : false,
                    'loading'     : true
                })
            })
            callback({value:result.data,status:true});

        },function(error){
            callback({value:error,status:false})
           // console.log(error)
        })
    }
    $scope.realizationCtrlCallback('/api/kobotoolbox/controller',function(response){});


    $scope.realizationLotCallback=function(url,callback){
        $http.get(url).then(function(result){
            let data=result.data;
            console.log("Url data :",result.data)
            let dataRaw=[];
            for(let i=1;i<=10;i++){
                let dataFormatted={};
                result.data.forEach(element => {
                    if (element.lot==i) {
                        if (element.typeBranche=="appropriation_") {
                
                            dataFormatted.appropriation_=element.stats;
                        }
                        
                        if (element.typeBranche=="branchement_so") {
                            dataFormatted.branchement_so=element.stats;
                        }

                        if (element.typeBranche=="pose_compteur") {
                            dataFormatted.pose_compteur=element.stats;
                        }
                        dataFormatted.lot=element.lot;
                    }
                });
                if (dataFormatted.appropriation_==undefined) {
                    dataFormatted.appropriation_=0;
                }

                if (dataFormatted.branchement_so==undefined) {
                    dataFormatted.branchement_so=0;
                }

                if (dataFormatted.pose_compteur==undefined) {
                    dataFormatted.pose_compteur=0;
                }
                dataRaw.push(dataFormatted);
            }
            $(function () {
                $('#tableRealiz').DataTable({
                    data:dataRaw,
                    columns: [
                       // { data: "sector" },
                         { "mData":null,
                            "bSortable":false,
                            "mRender":function(data){
                                 return "Lot "+data.lot
                              }
                       },
                       { "mData":null,
                       "bSortable":false,
                       "mRender":function(data){
                            var blockHTML;
                            if(data.appropriation_<500){
                                var blockHTML='<span class="badge bg-red">'+data.appropriation_+'</span>'
                            }else{
                                var blockHTML='<span class="badge bg-green">'+data.appropriation_+'</span>'
                            }

                                          return blockHTML;
                         }
                  },
                  { "mData":null,
                  "bSortable":false,
                  "mRender":function(data){
                       var blockHTML;
                       if(data.branchement_so<500){
                           var blockHTML='<span class="badge bg-red">'+data.branchement_so+'</span>'
                       }else{
                           var blockHTML='<span class="badge bg-green">'+data.branchement_so+'</span>'
                       }

                                     return blockHTML;
                    }
             },
             { "mData":null,
             "bSortable":false,
             "mRender":function(data){
                  var blockHTML;
                  if(data.pose_compteur<500){
                      var blockHTML='<span class="badge bg-red">'+data.pose_compteur+'</span>'
                  }else{
                      var blockHTML='<span class="badge bg-green">'+data.pose_compteur+'</span>'
                  }

                                return blockHTML;
               }
        }
                   
                    ],
                    'paging'      : true,
                    'lengthChange': false,
                    'searching'   : true,
                    'ordering'    : false,
                    'info'        : true,
                    'autoWidth'   : false,
                    'loading'     : true
                })
            })
            console.log("Data cleaned :",dataRaw)
            callback({value:data})
        },function(error){

        })
       

    }

    $scope.realizationLotCallback('/api/kobotoolbox/datajoin',function(dataCallback){

        if (dataCallback.status==true) {
            console.log("Grouping by Lot rea:",dataCallback.value)
        }else{
            console.log(dataCallback.value);
        }
    })
    
      
})