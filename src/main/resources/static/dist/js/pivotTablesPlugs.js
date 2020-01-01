var app=angular.module("app",[]);
var get_param_url=window.location.href.split('/')[4];
var URL="http://obspemu.org:9898/mobile/api.php?date=true";

app.controller('dashboard',function ($scope,$http) {
    $scope.linkDecoration=function(param){
        switch (get_param_url) {
            case 'appropriation':
                document.querySelector('#lnk_appro').style="position:absolute;top:5em;display:none;";
                document.querySelector('#lnk_appro_download').style="position:absolute;top:5em;";

                document.querySelector('#lnk_bsociaux').style="position:absolute;top:5em;";
                document.querySelector('#lnk_bsociaux_download').style="position:absolute;top:5em;display:none";

                document.querySelector('#lnk_pcompt').style="position:absolute;top:5em;";
                document.querySelector('#lnk_pcompt_download').style="position:absolute;top:5em;display:none;";
                break;
            case 'bsociaux':
                    document.querySelector('#lnk_appro').style="position:absolute;top:5em;";
                    document.querySelector('#lnk_appro_download').style="position:absolute;top:5em;display:none";

                    document.querySelector('#lnk_bsociaux').style="position:absolute;top:5em;display:none";
                    document.querySelector('#lnk_bsociaux_download').style="position:absolute;top:5em;";

                    document.querySelector('#lnk_pcompt').style="position:absolute;top:5em;";
                    document.querySelector('#lnk_pcompt_download').style="position:absolute;top:5em;display:none;";
                break;
            case 'pcompt':
                document.querySelector('#lnk_appro').style="position:absolute;top:5em;";
                document.querySelector('#lnk_appro_download').style="position:absolute;top:5em;display:none;";

                document.querySelector('#lnk_bsociaux').style="position:absolute;top:5em;";
                document.querySelector('#lnk_bsociaux_download').style="position:absolute;top:5em;display:none";

                document.querySelector('#lnk_pcompt').style="position:absolute;top:5em;display:none;";
                document.querySelector('#lnk_pcompt_download').style="position:absolute;top:5em;";
                break;
            default:
                break;
        }
    }
    switch (get_param_url) {
        case 'appropriation':
                $scope.typeplug='appropriations';
                $scope.linkDecoration('appropriation')
            break;
        case 'bsociaux':
                $scope.typeplug='branchements sociaux';
                $scope.linkDecoration('bsociaux')
            break;
        case 'pcompt':
                $scope.typeplug='pose compteur';
                $scope.linkDecoration('pcompt')
            break;
        default:
            break;
    }
    document.body.style.zoom = "80%";
    $scope.lastupdate;
   $http.get(URL).then(function(response){
        $scope.lastupdate=response.data.updated;
        console.log('Last Updated :',response.data)
    },function(error){
        console.error("Date Error :",error)
    });

    $scope.synthesisDataDash=function(URL,callback){
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
      $scope.synthesisDataDash('/api/kobotoolbox/datajoin',function(response){
        if (response.status==true) {
             document.querySelector('#countAppro').innerHTML=response.appro;
             document.querySelector('#countBranch').innerHTML=response.brnch;
             document.querySelector('#countPoseCompteur').innerHTML=response.poscmptr;
             document.querySelector('#countTotal').innerHTML=(
                 response.appro+response.brnch+response.poscmptr
             );
             document.querySelector('#cover-spin').style="display:none;";
        } else {
           document.querySelector('#cover-spin').style="display:none;";
           alert("Connexion error")
        }
    })
   $scope.synthesisData=function(URL,callback){
     $http.get(URL).then(function(result){
         $scope.list=result.data;
        callback({
            status:true,
            data:$scope.list
        });
     },function(error){
        callback({status:false});
     })
   }
   $scope.synthesisData('/api/kobotoolbox/dataplugs/'+get_param_url,function(response){
       if (response.status==true) {
            console.log("Data Printable :",response.data)
            document.querySelector('#cover-spin').style="display:none;";
            $(function () {
                $('#tableRealization').DataTable({
                    data:response.data,
                    columns: [
                       // { data: "sector" },
                         { "mData":null,
                            "bSortable":false,
                            "mRender":function(data){
                                
                                 return data.refClient;
                              }
                       },
                       { "mData":null,
                       "bSortable":false,
                       "mRender":function(data){
                            return data.client.toString().toUpperCase();
                         }
                  },
                  { "mData":null,
                  "bSortable":false,
                  "mRender":function(data){
                       return "Lot "+data.lot;
                    }
             },
             { "mData":null,
             "bSortable":false,
             "mRender":function(data){
                  return data.consultant.toString().toUpperCase();
               }
        },
        { "mData":null,
        "bSortable":false,
        "mRender":function(data){
             return data.entreprise;
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

            $(function () {
                $('#tableRealizationPrint').DataTable({
                    data:response.data,
                    columns: [
                       // { data: "sector" },
                         { "mData":null,
                            "bSortable":false,
                            "mRender":function(data){
                                
                                 return data.refClient;
                              }
                       },
                       { "mData":null,
                       "bSortable":false,
                       "mRender":function(data){
                            return data.client.toString().toUpperCase();
                         }
                  },
                  { "mData":null,
                  "bSortable":false,
                  "mRender":function(data){
                       return "Lot "+data.lot;
                    }
             },
             { "mData":null,
             "bSortable":false,
             "mRender":function(data){
                  return data.consultant.toString().toUpperCase();
               }
        },
        { "mData":null,
        "bSortable":false,
        "mRender":function(data){
             return data.entreprise;
          }
   }
    
         
              
                   
                    ],
                    'paging'      : false,
                    'lengthChange': false,
                    'searching'   : true,
                    'ordering'    : false,
                    'info'        : true,
                    'autoWidth'   : false,
                    'loading'     : true
                })
            })
       } else {
          document.querySelector('#cover-spin').style="display:none;";
          alert("Connexion error")
       }
   })

})