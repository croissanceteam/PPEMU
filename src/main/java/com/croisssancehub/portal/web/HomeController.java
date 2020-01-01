package com.croisssancehub.portal.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    /*
    @GetMapping("/")
    public String welcome(){

        return "map-kobotoolbox";
    }
*/
    @GetMapping("/")
    public String welcome(){
        return "pages/pivotTables";
    }
    
    @GetMapping("/map")
    public String secondaryMap(){

        return "index";
    }

    @GetMapping("/viewpivots")
    public String TablePivots(){

        return "pages/pivotTables"; 
    }
    @GetMapping("/viewkoborealized")
    public String TablePivotsRealization(){

        return "pages/pivotTables-realization"; 
    }


    @GetMapping("/viewkoboreperage")
    public String TablePivotsReperage(){

        return "pages/pivotTables-reperage"; 
    }

    @GetMapping("/viewcharts")
    public String chartsView(){

        return "pages/chart";
    }

    @GetMapping(value={"/plugs/appropriation","/plugs/bsociaux","/plugs/pcompt"})
    public String viewTypePlugs(){
        return "pages/pivotTables-type-plugs";
    }

    @GetMapping("/viewtables/{name}")
    public String tablesView(@PathVariable String name){
        String viewpage="index";
        switch (name){
            case "errors":
                    viewpage="pages/error_realization";
                break;
            case "realized":
                viewpage="pages/success_realization";
                break;
            case "tasks":
                viewpage="pages/referencement";
                break;
            default:
                viewpage="pages/exceptions/errors-404";
                break;
        }
        return viewpage;
    }

    @GetMapping("/contractors")
    public String contractorPerformance(){
        return "pages/contractor_performance";
    }

    @GetMapping("/entreprise")
    public  String entreprisePerformance(){
        return "pages/performance_entreprise";
    }

    @GetMapping("/exports")
    public  String getExports(){
        return "pages/exports";
    }

    /*
    @GetMapping("/viewtables")
    public String tablesViews(){
      return "pages/error_realization";
    }
    */

}
