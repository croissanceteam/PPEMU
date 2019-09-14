var app=angular.module("app",[]);
app.controller('dashboard',function ($scope,$http) {
    $scope.URL_DOWNLOAD="http://obspemu.org:9898/storage/liste_referencement.csv";
    $http.get('/api/realized/workalls').then(function(response){
        $scope.list=response.data;

        var ctrRep=0;
        var ctrRea=0;
        var ctrErr=0;
        var percentage_Rea=0;
        var percentage_Rep=0;
        var percentage_Err=0;
        $scope.tasksList=[];

        document.querySelector('#countReperage').innerHTML=$scope.list[0].done.length;
        console.log('Size :',$scope.list[0].done.length);
        $scope.list.forEach(function (rep,index) {

            rep.done.forEach(function (d,i) {
                if (d.entreprise!=null){
                    ctrRea+=1;
                } else{
                    ctrRep+=1;
                    $scope.tasksList.push(d);


                }

            });
            percentage_Rea=(ctrRea*100)/parseInt($scope.list[0].done.length);
            percentage_Rep=(ctrRep*100)/parseInt($scope.list[0].done.length);

            document.querySelector('#countRealized').innerHTML=ctrRea;
            document.querySelector('#percentRea').innerHTML=Math.round(percentage_Rea)+" %";
            document.querySelector('#countRepProgress').innerHTML=ctrRep
            document.querySelector('#percentRep').innerHTML=Math.round(percentage_Rep)+" %";


            rep.error.forEach(function(e,i){
                if (e.idRep==null){
                    ctrErr+=1;
                   // console.log(e);

                }
            });
            console.log("Tab :",$scope.errorList)
            $(function () {
                $('#dataTablesErrors').DataTable({
                    data:$scope.tasksList,
                    dom: 'Bfrtip',
                            buttons: [
                                 { "extend": 'pdf', "text":'<i class="fa fa-file-pdf-o"></i>',"className": 'btn btn-danger' },
                                 { "extend": 'excel', "text":'<i class="fa fa-file-excel-o"></i>',"className": 'btn btn-danger' },
                                 { "extend": 'print', "text":'<i class="fa fa-print"></i>',"className": 'btn btn-danger'}
                            ],
                    columns: [
                        { data: "ClientRep" },
                        { data: "nameClient" },
                        { "mData":null,
                          "bSortable":false,
                           "mRender":function(data){
                                if(data.secteur!=""){
                                         return data.secteur;
                                }
                                return "NULL"

                            }
                        },
                        { data: "controller_name" },
                        { "mData":null,
                                                  "bSortable":false,
                                                  "mRender":function(data){
                                                            return " Lot"+data.lot;
                                                  }
                        },
                        { "mData":null,
                           "bSortable":false,
                           "mRender":function(data){
                                if(data.submissiontimerep!=null){
                                var tabData=data.submissiontimerep.toString().split('T')
                                                                 var tabDate=tabData[0].split('-');
                                                                 var dateFormat=tabDate[2]+"-"+tabDate[1]+"-"+tabDate[0];
                                                              return dateFormat;
                                }
                                return "-";

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
                })
            })
            percentage_Err=(ctrErr*100)/parseInt($scope.list[0].done.length);
            document.querySelector('#countError').innerHTML=ctrErr;
            document.querySelector('#percentErr').innerHTML=Math.round(percentage_Err)+" %";

        })
        document.querySelector('#cover-spin').style.display="none";

    },function(error){
        console.error(error);
    })
})