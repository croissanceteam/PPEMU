package com.croisssancehub.portal.api;

import com.croisssancehub.portal.repositories.RealisationRepository;
import com.croisssancehub.portal.repositories.ReperageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/performance/")
public class ApiPerformance {

    @Autowired
    private RealisationRepository realisationRepository;

    @Autowired
    private ReperageRepository reperageRepository;

    @GetMapping("contractors")
    public List<Map<String,Object>> getPerformanceContractors(){
        return realisationRepository.doneContractors();
    }

    @GetMapping("contractorworry")
    public List<Map<String,Object>> getPerformanceContractorsWorry(){
        return realisationRepository.doneContractorsError();
    }
    @GetMapping("contractoralls")
    public List<Map<String,List<Map<String,Object>>>> getAllPerformanceContractors(){
        List<Map<String,List<Map<String,Object>>>> tabs=new ArrayList<>();
        Map<String,List<Map<String,Object>>> tabUnique=new HashMap<>();
        tabUnique.put("done",realisationRepository.doneContractors());
        tabUnique.put("error",realisationRepository.doneContractorsError());
        tabUnique.put("ref",reperageRepository.doneContractorRef());
        tabs.add(tabUnique);
        return tabs;
    }

    @GetMapping("refcontractor")
    public List<Map<String,Object>> getAllReferenceByContractor(){
        return  reperageRepository.doneContractorRef();
    }
}
