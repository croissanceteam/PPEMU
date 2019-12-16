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
   $scope.synthesisData=function(URL,callback){
     $http.get(URL).then(function(result){
         $scope.list=result.data;
        console.log('Count Rep :',$scope.list.reperage.length)
        console.log('Count Rea :',$scope.list.realized.length)
        callback({
            status:true,
            ref:$scope.list.reperage.length,
            rea:$scope.list.realized.length
        });
     },function(error){
        callback({status:false});
     })
   }
   $scope.synthesisData('/api/kobotoolbox/refs',function(response){
       if (response.status==true) {
            document.querySelector('#countReperage').innerHTML=response.ref;
            document.querySelector('#countRealized').innerHTML=response.rea;
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
    $scope.referenceLotCallback=function(url,callback){
        $http.get(url).then(function(result){
            $(function () {
                $('#tableError').DataTable({
                    data:result.data,
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
            callback({value:error,status:false})
           // console.log(error)
        })
    }

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
            callback({value:error,status:false})
           // console.log(error)
        })
    }
    $scope.realizationCtrlCallback('/api/kobotoolbox/controller',function(response){});


    $scope.realizationLotCallback=function(url,callback){
        $http.get(url).then(function(result){
            $(function () {
                $('#tableRealiz').DataTable({
                    data:result.data,
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
            callback({value:error,status:false})
           // console.log(error)
        })
    }


    $scope.referenceLotCallback('/api/kobotoolbox/reflot',function(dataCallback){

        if (dataCallback.status==true) {
            console.log("Grouping by Lot ref:",dataCallback.value)
        }else{
            console.log(dataCallback.value);
        }
    })

    $scope.realizationLotCallback('/api/kobotoolbox/realizedlot',function(dataCallback){

        if (dataCallback.status==true) {
            console.log("Grouping by Lot rea:",dataCallback.value)
        }else{
            console.log(dataCallback.value);
        }
    })
    
      $scope.dataDone=[];
         $scope.dataDone2=[1,2,3];
})