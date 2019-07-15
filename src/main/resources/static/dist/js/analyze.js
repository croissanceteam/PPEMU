var app=angular.module("app",[]);
app.controller('dashboard',function ($scope,$http) {
    var mymap = L.map('mapid').setView([-4.3269, 15.3061], 12);
    /*L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(mymap);

    */
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);
    var myIcon = L.divIcon({
      //  className: 'map-icon map-icon-point-of-interest',
        iconSize: [10, 10],

    });
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
                var marker=L.marker([d.latitude, d.longitude],{icon:myIcon}).addTo(mymap)

                if (d.entreprise!=null){
                    marker.valueOf()._icon.style.backgroundColor = 'darkgreen';
                    marker.bindPopup("Numéro du client :<b>"+d.RefClient+"</b><br/>Nom du client :<b>"+d.nameClient+"</b>");
                    ctrRea+=1;
                } else{
                    marker.valueOf()._icon.style.backgroundColor = 'darkred';
                    marker.bindPopup("Nom du client :<b>"+d.nameClient+"</b>");
                    ctrRep+=1;
                }

                marker.valueOf()._icon.style.borderRadius ='2em';
                marker.valueOf()._icon.style.boxShadow ='0.5px 0.5px 0.5px 0.5px white';
            });
            percentage_Rea=(ctrRea*100)/parseInt($scope.list[0].done.length);
            percentage_Rep=(ctrRep*100)/parseInt($scope.list[0].done.length);

            document.querySelector('#countRealized').innerHTML=ctrRea;
            document.querySelector('#percentRea').innerHTML=parseInt(percentage_Rea)+" %";
            document.querySelector('#countRepProgress').innerHTML=ctrRep
            document.querySelector('#percentRep').innerHTML=parseInt(percentage_Rep)+" %";
            rep.error.forEach(function(e,i){
                if (e.idRep==null){
                    var marker=L.marker([e.latitude, e.longitude],{icon:myIcon}).addTo(mymap)
                    marker.valueOf()._icon.style.backgroundColor = 'darkorange';
                    marker.bindPopup("Numéro du client :<b>"+e.RefClient+"</b><br/>Nom du client :<b>"+e.nameClient+"</b>");
                    marker.valueOf()._icon.style.borderRadius ='2em';
                    marker.valueOf()._icon.style.boxShadow ='0.5px 0.5px 0.5px 0.5px white';
                    ctrErr+=1;
                }
            });
            percentage_Err=(ctrErr*100)/parseInt($scope.list[0].done.length);
            document.querySelector('#countError').innerHTML=ctrErr;
            document.querySelector('#percentErr').innerHTML=parseInt(percentage_Err)+" %";

        })

    },function(error){
        console.error(error);
    })
})