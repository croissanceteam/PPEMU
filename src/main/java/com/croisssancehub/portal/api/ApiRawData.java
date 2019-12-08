package com.croisssancehub.portal.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.croisssancehub.portal.models.ReferenceImport;
import com.croisssancehub.portal.repositories.RealisationImportRepository;
import com.croisssancehub.portal.repositories.ReferenceImportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ApiRawData
 */
@RestController
@RequestMapping("/api/kobotoolbox/")
public class ApiRawData {

    @Autowired
    private ReferenceImportRepository referenceImportRepository;
    @Autowired
    private RealisationImportRepository realisationImportRepository;
    @GetMapping("refs")
    public Map<String,List<Map<String,Object>>> gets(){
        Map<String,List<Map<String,Object>>>map=new HashMap();
        map.put("reperage", referenceImportRepository.getHomes());
        map.put("realized",realisationImportRepository.getHomeWorkDo());
        return map;
    }

    @GetMapping("realizedlot")
    public List<Map<String,Object>> getRealizationByLot(){
        return realisationImportRepository.getRealizationsByLot();
    }

    @GetMapping("reflot")
    public List<Map<String,Object>> getReferenceLot(){
        return referenceImportRepository.getReferencesByLot();
    }

    @GetMapping("plugs")
    public List<Map<String,Object>> getGrowingPlugs(){
        return realisationImportRepository.getTypePlugs();
    }
}