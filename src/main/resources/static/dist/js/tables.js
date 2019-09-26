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
    $http.get('/api/realized/workalls').then(function(response){
        $scope.list=response.data;

        var ctrRep=0;
        var ctrRea=0;
        var ctrErr=0;
        var percentage_Rea=0;
        var percentage_Rep=0;
        var percentage_Err=0;
        document.querySelector('#countReperage').innerHTML=$scope.list[0].done.length;
        console.log('Size :',$scope.list[0].done.length);
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
            console.log("Tab :",$scope.errorList)
            $(function () {
                $('#dataTablesErrors').DataTable({
                    data:$scope.errorList,
                    columns: [
                        { data: "RefClient" },
                        { data: "client" },
                        { data: "entreprise" },
                        { data: "contractor" },
                        { "mData":null,
                           "bSortable":false,
                           "mRender":function(data){
                                 var tabData=data.submissiontime.toString().split('T')
                                 var tabDate=tabData[0].split('-');
                                 var dateFormat=tabDate[2]+"-"+tabDate[1]+"-"+tabDate[0];
                              return dateFormat;
                            }
                         }
                    ],
                    'paging'      : true,
                    'lengthChange': false,
                    'searching'   : true,
                    'ordering'    : true,
                    'info'        : true,
                    'autoWidth'   : false,
                    'loading'     : true
                });

                $('#dataTablesErrorsExport').DataTable({
                    data:$scope.errorList,
                    columns: [
                        { data: "RefClient" },
                        { data: "client" },
                        { data: "entreprise" },
                        { data: "contractor" },
                        { "mData":null,
                           "bSortable":false,
                           "mRender":function(data){
                                 var tabData=data.submissiontime.toString().split('T')
                                 var tabDate=tabData[0].split('-');
                                 var dateFormat=tabDate[2]+"-"+tabDate[1]+"-"+tabDate[0];
                              return dateFormat;
                            }
                         }
                    ],
                    'paging'      : false,
                    'lengthChange': false,
                    'searching'   : false,
                    'ordering'    : false,
                    'info'        : false,
                    'autoWidth'   : false,
                    'loading'     : true
                });
            })
            percentage_Err=(ctrErr*100)/parseInt($scope.list[0].done.length);
            document.querySelector('#countError').innerHTML=ctrErr;
            document.querySelector('#percentErr').innerHTML=Math.round(percentage_Err)+" %";
            document.querySelector('#cover-spin').style.display="none";

        })

    },function(error){
        console.error(error);
    })
})