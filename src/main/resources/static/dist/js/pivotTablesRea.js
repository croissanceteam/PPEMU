var app=angular.module("app",[]);
var URL="/api/realized/whenupdate";

app.controller('dashboard',function ($scope,$http) {
    document.body.style.zoom = "80%";
    $scope.formatDate=function(dateToChange){
        var months=[
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Decembre'
        ];
        jjmmyy=dateToChange.split('-');
        month=parseInt(jjmmyy[1]);
        return jjmmyy[2]+' '+months[month-1]+' '+jjmmyy[0];
    }

    document.body.style.zoom = "80%";
    $scope.lastupdate;
   $http.get(URL).then(function(response){
        $scope.lastupdate=$scope.formatDate(response.data.dt2);
        console.log('Last Updated :',response.data.dt2)
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
             //document.querySelector('#cover-spin').style="display:none;";
        } else {
           //document.querySelector('#cover-spin').style="display:none;";
           alert("Connexion error")
        }
    })
   $scope.synthesisData=function(URL,callback){
     $http.get(URL).then(function(result){
         $scope.list=result.data;
        callback({
            status:true,
            data:$scope.list.realized
        });
     },function(error){
        callback({status:false});
     })
   }
   $scope.synthesisData('/api/kobotoolbox/readata',function(response){
       if (response.status==true) {
            console.log("Data Printable :",response.data)
            
            $(function () {
                $('#tableRealization').DataTable({
                    data:response.data,
                    processing: true,
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
   },
   { "mData":null,
   "bSortable":false,
   "mRender":function(data){
        return data.secteur;
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
   },
   { "mData":null,
   "bSortable":false,
   "mRender":function(data){
        return data.secteur;
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
            document.querySelector('#cover-spin').style="display:none;";
       } else {
          document.querySelector('#cover-spin').style="display:none;";
          alert("Connexion error")
       }
   })
})