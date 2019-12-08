var app=angular.module("app",[]);
var URL_MAP='/api/kobotoolbox/refs';
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
  $scope.popupHTML=function(name,id,date,entreprise,controller,pointType){
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
    $scope. mymap = L.map('mapid').setView([-4.35496, 15.285152],12);
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
        id: 'mapbox.light'
    }).addTo($scope. mymap);
    var myIcon = L.divIcon({
      //  className: 'map-icon map-icon-point-of-interest',
        iconSize: [7, 7],

    });
    $scope.fillTowns=function(){

    }
         var info=L.control();
            info.onAdd = function (map) {
            	this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            	this.update();
            	return this._div;
            };
            info.update = function (props,ref,rea,error,todo) {
            	this._div.innerHTML = '<h4>Travaux effectués</h4>' +  (props ?
            		'<b>' + props.NAME_2 + '</b><br /><br/> <b>Point collectés</b> :' + ref + '<br/><br/>'+
            		'<b>Branchements</b> : '+rea
            		: 'Passez le curseur une ville');
            };

       info.addTo($scope. mymap);
       $scope.zoomBase=5;
    function highlightFeature(e) {
    	var layer = e.target;
           console.log('Object :',e.target)
           if(e.target.feature.properties.NAME_2.toLowerCase()=="kinshasa"){
            info.update
            (
            layer.feature.properties,
            $scope.list.reperage.length,
            $scope.list.realized.length
            );
           }else{
            info.update(layer.feature.properties,0,0,0,0);
           }

          // L.tooltip(e.target.feature.properties.NAME_2);
/*
               switch(e.target.feature.properties.NAME_2.toLowerCase().trim()){
                                       case 'kinshasa':
                                       layer.setStyle({
                                           		fillOpacity: 1
                                           	});
                                     //  return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                           break;
                                       case 'haut-lomami':
                                       layer.setStyle({
                                           		fillOpacity: 1
                                           	});
                                                 // return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                              break;
                                        case 'haut-shaba':
                                        layer.setStyle({
                                            		fillOpacity: 1
                                            	});
                                            //  return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                             break;
                                        case 'kolwezi':
                                        layer.setStyle({
                                            		fillOpacity: 1
                                            	});
                                                 // return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                               break;
                                        case 'lualaba':
                                        layer.setStyle({
                                            		fillOpacity: 1
                                            	});
                                                 // return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                                break;
                                        case 'lubumbashi':
                                        layer.setStyle({
                                            		fillOpacity: 1
                                            	});
                                                 // return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                                break;
                                        case 'tanganika':
                                        layer.setStyle({
                                            		fillOpacity: 1
                                            	});
                                                  //return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                                break;
                                        case 'bas-fleuve':
                                        layer.setStyle({
                                            		fillOpacity: 1
                                            	});
                                                // return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                              break;
                                        case 'boma':
                                        layer.setStyle({
                                            		fillOpacity: 1
                                            	});
                                                  // return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                               break;
                                        case 'cataractes':
                                        layer.setStyle({
                                            		fillOpacity: 1
                                            	});
                                                  // return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                                break;
                                         case 'lukaya':
                                         layer.setStyle({
                                             		fillOpacity: 1
                                             	});
                                                    //return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                             break;
                                         case 'Matadi':
                                                layer.setStyle({
                                                    		fillOpacity: 1
                                                    	});
                                              break;

                                   }
*/

    	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    		layer.bringToFront();
    	}

    }
    function resetHighlight(e) {
        info.update();
      //  var geojson=L.geoJson(shapefile);
    	//geojson.resetStyle(e.target);
    }
    function zoomToFeature(e) {
    	$scope.mymap.fitBounds(e.target.getBounds());
    	$scope.zoomBase+=1;
       // $scope.mymap.setView([e.latlng.lat,e.latlng.lng],$scope.zoomBase)
    	console.log('Bounds :',e.latlng.lat,e.latlng.lng)
    }
    function onEachFeature(feature, layer) {
    	layer.on({
    		mouseover: highlightFeature,
    		mouseout: resetHighlight,
    		click: zoomToFeature
    	});
    }

    L.geoJson(shapefile,{
            style:function(feature){
                        switch(feature.properties.NAME_2.toLowerCase().trim()){
                            case 'kinshasa':
                            return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                break;
                            case 'haut-lomami':
                                       return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                   break;
                             case 'haut-shaba':
                                   return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                  break;
                             case 'kolwezi':
                                       return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                    break;
                             case 'lualaba':
                                       return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                     break;
                             case 'lubumbashi':
                                       return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                     break;
                             case 'tanganika':
                                       return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                     break;
                             case 'bas-fleuve':
                                      return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                   break;
                             case 'boma':
                                        return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                    break;
                             case 'cataractes':
                                        return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                     break;
                              case 'lukaya':
                                         return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                  break;
                              case 'Matadi':
                                       return {color:'#2975b8',fillColor:'#2975b8',fillOpacity:0.4,strokeWidth:0.1}
                                   break;
                            default:
                                return {color:'silver'}
                                break;
                        }
            },
            onEachFeature:onEachFeature
    }).addTo($scope. mymap);


    $scope.filterTown=function(){
        console.log('Actual Town :',$scope.filter);
        $scope.townsGeocode.forEach(function(d,i){
            if(d.name==$scope.filter.toString().trim().toLowerCase()){
                console.log('Object :',d);

            }
        })

    }
    $scope.actionOnMap=function(url,callback) {
        
        $http.get(url).then(function(response){
            $scope.list=response.data;
    
            var ctrRep=0;
            var ctrRea=0;
            var ctrErr=0;
            var percentage_Rea=0;
            var percentage_Rep=0;
            var percentage_Err=0;
            document.querySelector('#countReperage').innerHTML=$scope.list.reperage.length;
      
            
            if($scope.list.realized!=undefined){
                $scope.list.realized.forEach(function(d,i){
                    var marker=L.marker([d.latitude, d.longitude],{icon:myIcon}).addTo($scope. mymap)
                     marker.valueOf()._icon.style.backgroundColor = 'darkgreen';
                     marker.bindPopup("Numéro du client :<b>"+d.RefClient+"</b><br/>Nom du client :<b>"+d.nameClient+"</b>");
                     marker.bindPopup($scope.popupHTML(d.client,d.refClient,d.submission_time,d.entreprise,d.consultant,'green'),{maxWidth:300});
                     marker.valueOf()._icon.style.borderRadius ='2em';
                     marker.valueOf()._icon.style.boxShadow ='0.5px 0.5px 0.5px 0.5px white';
                });
            }
    
            
            document.querySelector('#countRealized').innerHTML=$scope.list.realized.length;

            callback(true)
        },function(error){
            console.error(error);
            callback(false);
        })
    }
    $scope.actionOnMap(URL_MAP,function(result) {
        if (result==true) {
            document.querySelector('#cover-spin').style.display="none";
            document.querySelector('#wrapper').style="visibility:visible";
        } else {
            alert("Probleme de connexion")
        }
    })
})