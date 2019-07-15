package com.croisssancehub.portal.api;

import com.croisssancehub.portal.models.ViewRepRea;
import com.croisssancehub.portal.repositories.ViewRepReaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/view/")
public class ApiViewRepRea {

    @Autowired
    private ViewRepReaRepository viewRepReaRepository;

    @GetMapping("/alls")
    public List<ViewRepRea> getViews(){
        return (List< ViewRepRea >)viewRepReaRepository.findAll();
    }
}
