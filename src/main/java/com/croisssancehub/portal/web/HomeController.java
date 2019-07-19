package com.croisssancehub.portal.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String welcome(){

        return "index";
    }

    @GetMapping("/viewcharts")
    public String chartsView(){

        return "pages/chart";
    }
}
