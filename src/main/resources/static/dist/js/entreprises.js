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
    
      $scope.dataDone=[];
         $scope.dataDone2=[1,2,3];

      $(function(){
          $http.get('/api/realized/workalls').then(function(response){
              $scope.list=response.data;

              var ctrRep=0;
              var ctrRea=0;
              var ctrErr=0;
              var percentage_Rea=0;
              var percentage_Rep=0;
              var percentage_Err=0;
              document.querySelector('#countReperage').innerHTML=$scope.list[0].done.length;
            //  console.log('Size :',$scope.list[0].done.length);
              $scope.list.forEach(function (rep,index) {

                  rep.done.forEach(function (d,i) {
                      if (d.entreprise!=null){
                          ctrRea+=1;
                      } else{
                          ctrRep+=1;
                      }

                  });
                  percentage_Rea=(ctrRea*100)/parseInt($scope.list[0].done.length);
                  percentage_Rep=(ctrRep*100)/parseInt($scope.list[0].done.length);

                  document.querySelector('#countRealized').innerHTML=ctrRea;
                  document.querySelector('#percentRea').innerHTML=Math.round(percentage_Rea)+" %";
                  document.querySelector('#countRepProgress').innerHTML=ctrRep
                  document.querySelector('#percentRep').innerHTML=Math.round(percentage_Rep)+" %";
                  $scope.errorList=[];

                  rep.error.forEach(function(e,i){
                      if (e.idRep==null){
                          ctrErr+=1;
                         // console.log(e);
                          $scope.errorList.push(e);
                      }
                  });
                 // console.log("Tab :",$scope.errorList)

                  percentage_Err=(ctrErr*100)/parseInt($scope.list[0].done.length);
                  document.querySelector('#countError').innerHTML=ctrErr;
                  document.querySelector('#percentErr').innerHTML=Math.round(percentage_Err)+" %";

              })

          },function(error){
              console.error(error);
          })


          $http.get('/api/realized/entreprisesuccessrate').then(function(response){
                  console.log("Data Success :",response.data);
                  $(function () {
                                                         $('#tableSuccess').DataTable({
                                                             data:response.data,
                                                             columns: [
                                                                 { data: "entreprise" },
                                                                // { data: "sector" },
                                                                  { "mData":null,
                                                                     "bSortable":false,
                                                                     "mRender":function(data){
                                                                          var blockHTML;
                                                                          if(data.ctr<1750){
                                                                              var blockHTML='<span class="badge bg-red">'+data.ctr+'</span>'
                                                                          }else{
                                                                              var blockHTML='<span class="badge bg-green">'+data.ctr+'</span>'
                                                                          }

                                                                                        return blockHTML;
                                                                       }
                                                                },
                                                                { "mData":null,
                                                                  "bSortable":false,
                                                                  "mRender":function(data){
                                                                                var blockHTML;
                                                                                var blockHTML='<span class="badge bg-green">5000</span>'
                                                                                    return blockHTML;
                                                                           }
                                                                 },
                                                                { "mData":null,
                                                                  "bSortable":false,
                                                                  "mRender":function(data){
                                                                          var blockHTML;
                                                                          if(data.percentage<50){
                                                                              var blockHTML='<span class="badge bg-red">'+data.percentage+'%</span>'
                                                                          }else{
                                                                              var blockHTML='<span class="badge bg-green">'+data.percentage+'%</span>'
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
          },function(error){
              console.error("Error success rate :",error);
          })

          $http.get('/api/realized/entrepriseserrorrate').then(function(response){
                      console.log("Data Success :",response.data);
                      $(function () {
                                                             $('#tableError').DataTable({
                                                                 data:response.data,
                                                                 columns: [
                                                                     { data: "entreprise" },
                                                                    // { data: "sector" },
                                                                      { "mData":null,
                                                                         "bSortable":false,
                                                                         "mRender":function(data){
                                                                              var blockHTML;
                                                                              if(data.ctr>175){
                                                                                  var blockHTML='<span class="badge bg-red">'+data.ctr+'</span>'
                                                                              }else{
                                                                                  var blockHTML='<span class="badge bg-green">'+data.ctr+'</span>'
                                                                              }

                                                                                            return blockHTML;
                                                                           }
                                                                    },
                                                                    { "mData":null,
                                                                      "bSortable":false,
                                                                      "mRender":function(data){
                                                                                    var blockHTML;
                                                                                    var blockHTML='<span class="badge bg-green">5000</span>'
                                                                                        return blockHTML;
                                                                               }
                                                                     },
                                                                    { "mData":null,
                                                                      "bSortable":false,
                                                                      "mRender":function(data){
                                                                              var blockHTML;
                                                                              if(data.percentage>6){
                                                                                  var blockHTML='<span class="badge bg-red">'+data.percentage+'%</span>'
                                                                              }else{
                                                                                  var blockHTML='<span class="badge bg-green">'+data.percentage+'%</span>'
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

              },function(error){
                  console.error("Error success rate :",error);
              })
            document.querySelector('#cover-spin').style.display="none";
      })

})