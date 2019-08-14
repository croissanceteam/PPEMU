var app=angular.module("app",[]);
app.controller('dashboard',function ($scope,$http) {

  $scope.popupHTML=function(name,id,category,date,street,entreprise,controller,pointType){
    var tabTime=date.toString().split('T');
    var dateF=tabTime[0].split('-')[2]+'-'+tabTime[0].split('-')[1]+'-'+tabTime[0].split('-')[0];
    var chunkEntreprise='';
    var styleBorder='';
        switch(pointType){
            case 'red':
                   styleBorder='style="border:4px solid darkred;"';
                break;
            case 'green':
                  styleBorder='style="border:4px solid darkgreen;"';
                break;
            default:
                    styleBorder='style="border:4px solid darkorange;"';
                break;
        }
    var contentHTML='<div class="box box-primary" style="width:250px;">'+
                                         '<div class="box-body box-profile">'+
                                           '<img class="profile-user-img img-responsive img-circle" '+styleBorder+' src="../../dist/img/avatar.png" alt="User profile picture">'+
                                           '<h3 class="profile-username text-center">'+name+'</h3>'+

                                           '<p class="text-muted text-center">'+id+'</p>'+

                                           '<ul class="list-group list-group-unbordered">'+
                                             '<li class="list-group-item">'+
                                               '<b>'+(pointType=='red'?'Date REF.':'Date REA.')+'</b> <a class="pull-right">'+dateF+'</a>'+
                                             '</li>'+
                                             '<li class="list-group-item">'+
                                               '<b>Secteur</b> <a class="pull-right">'+(street==''?'<i>AUCUN</i>':'<i>'+street+'</i>')+'</a>'+
                                             '</li>'+
                                             '<li class="list-group-item">'+
                                               '<b>Categorie</b> <a class="pull-right">'+category+'</a>'+
                                             '</li>'+
                                             '<li class="list-group-item">'+
                                                 '<b>Controlleur </b> <a class="pull-right">'+controller+'</a>'+
                                               '</li>';
                                                if(pointType!='red'){
                                                chunkEntreprise='<li class="list-group-item">'+
                                                     '<b>Entreprise</b> <a class="pull-right">'+entreprise+'</a>'+
                                                  '</li>';
                                                }
                                          contentHTML+= chunkEntreprise+'</ul>'+

                                         // ' <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a>'+
                                         '</div>'+
                                       '</div>';
                                       return contentHTML;
  }
  $scope.townsGeocode=[
            {
                name:"kinshasa",
                latitude:-4.3269,
                longitude:15.3061,
                geopoint:[-4.3269, 15.3061]
            },
            {
                name:"kongo-central",
                latitude:-5.181630,
                longitude:14.233230,
                geopoint:[-5.181630,14.233230]
            }
            ,
             {
                 name:"katanga",
                 latitude:-4.965110,
                 longitude:22.108700,
                 geopoint:[-4.965110,22.108700]
             }
    ];
    $scope. mymap = L.map('mapid').setView([-4.3269, 15.3061], 15);
    /*L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(mymap);

    */
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 25,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo($scope. mymap);
    var myIcon = L.divIcon({
      //  className: 'map-icon map-icon-point-of-interest',
        iconSize: [7, 7],

    });
    L.geoJson(shapefile).addTo($scope. mymap);
    $http.get('/api/realized/workalls').then(function(response){
        $scope.list=response.data;

        var ctrRep=0;
        var ctrRea=0;
        var ctrErr=0;
        var percentage_Rea=0;
        var percentage_Rep=0;
        var percentage_Err=0;
        document.querySelector('#countReperage').innerHTML=$scope.list[0].reperage.length;
        console.log("Datas :",$scope.list[0].realized)
        $scope.list[0].realized.forEach(function(d,i){
            var marker=L.marker([d.latitude, d.longitude],{icon:myIcon}).addTo($scope. mymap)
             marker.valueOf()._icon.style.backgroundColor = 'darkgreen';
             marker.bindPopup("Numéro du client :<b>"+d.RefClient+"</b><br/>Nom du client :<b>"+d.nameClient+"</b>");
             marker.bindPopup($scope.popupHTML(d.nameClient,d.RefClient,d.category,d.submissiontime,d.secteur,d.entreprise,d.controller_name,'green'),{maxWidth:300});
             marker.valueOf()._icon.style.borderRadius ='2em';
             marker.valueOf()._icon.style.boxShadow ='0.5px 0.5px 0.5px 0.5px white';
        });
        $scope.list[0].realizederrors.forEach(function(e,i){
             var marker=L.marker([e.latitude, e.longitude],{icon:myIcon}).addTo($scope. mymap)
              marker.valueOf()._icon.style.backgroundColor = 'darkorange';
              marker.bindPopup($scope.popupHTML(e.client,e.RefClient,e.category,e.submissiontime,e.secteur,e.entreprise,e.contractor,'yellow'),{maxWidth:300});
              marker.valueOf()._icon.style.borderRadius ='2em';
              marker.valueOf()._icon.style.boxShadow ='0.5px 0.5px 0.5px 0.5px white';

        });
        $scope.list[0].reperagetodo.forEach(function(d,i){
            var marker=L.marker([d.latitude, d.longitude],{icon:myIcon}).addTo($scope. mymap)
                marker.valueOf()._icon.style.backgroundColor = 'darkred';
                marker.bindPopup($scope.popupHTML(d.nameClient,d.ClientRep,d.category,d.submission_time,d.secteur,null,d.controller_name,'red'),{maxWidth:300});
                marker.valueOf()._icon.style.borderRadius ='2em';
                marker.valueOf()._icon.style.boxShadow ='0.5px 0.5px 0.5px 0.5px white';
        })
        percentage_Rea=($scope.list[0].realized.length*100)/parseInt($scope.list[0].reperage.length);
         percentage_Rep=(($scope.list[0].reperage.length-$scope.list[0].realized.length)*100)/parseInt($scope.list[0].reperage.length);
        document.querySelector('#countRealized').innerHTML=$scope.list[0].realized.length;
        document.querySelector('#percentRea').innerHTML=Math.round(percentage_Rea)+" %";
        document.querySelector('#countRepProgress').innerHTML=$scope.list[0].reperage.length-$scope.list[0].realized.length;
       document.querySelector('#percentRep').innerHTML=Math.round(percentage_Rep)+" %";

                    percentage_Err=($scope.list[0].realizederrors.length*100)/parseInt($scope.list[0].reperage.length);
                   document.querySelector('#countError').innerHTML=$scope.list[0].realizederrors.length;
                   document.querySelector('#percentErr').innerHTML=Math.round(percentage_Err)+" %";
/*
        $scope.list.forEach(function (rep,index) {

            rep.done.forEach(function (d,i) {
                var marker=L.marker([d.latitude, d.longitude],{icon:myIcon}).addTo($scope. mymap)

                if (d.entreprise!=null){

                } else{
                    marker.valueOf()._icon.style.backgroundColor = 'darkred';
                 //  marker.bindPopup("Nom du client :<b>"+d.nameClient+"</b>");
                   marker.bindPopup($scope.popupHTML(d.nameClient,d.ClientRep,d.category,d.submissiontimerep,d.secteur,null,d.controller_name,'red'),{maxWidth:300});
                    ctrRep+=1;

                }


            });



            rep.error.forEach(function(e,i){
                if (e.idRep==null){
                    //console.log('Error :',e);

                    ctrErr+=1;
                }
            });



        }) */

    },function(error){
        console.error(error);
    })

    $scope.filterTown=function(){
        console.log('Actual Town :',$scope.filter);
        $scope.townsGeocode.forEach(function(d,i){
            if(d.name==$scope.filter.toString().trim().toLowerCase()){
                console.log('Object :',d);

            }
        })

    }
})