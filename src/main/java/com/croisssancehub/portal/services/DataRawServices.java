package com.croisssancehub.portal.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.croisssancehub.portal.models.DataRaw;
import com.croisssancehub.portal.models.RealisationImport;
import com.croisssancehub.portal.models.ReferenceImport;
import com.croisssancehub.portal.repositories.RealisationImportRepository;
import com.croisssancehub.portal.repositories.ReferenceImportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * DataRawServices
 */
@Service
public class DataRawServices {
    @Autowired
    private ReferenceImportRepository referenceImportRepository;
    @Autowired
    private RealisationImportRepository realisationImportRepository;
    

    @Cacheable(cacheManager = "redisCacheManager", cacheNames="basedatarea")
    public List<RealisationImport> getRealization(){
        return (List<RealisationImport>) realisationImportRepository.findAll();
    }

    @Cacheable(cacheManager = "redisCacheManager", cacheNames="basedataref")
    public List<ReferenceImport> getReferencement(){
        return (List<ReferenceImport>) referenceImportRepository.findAll();
    }

    @Cacheable(cacheManager = "redisCacheManager", cacheNames="basedataref")
    public List<ReferenceImport> getRealisationByLot(){
        return (List<ReferenceImport>) referenceImportRepository.findAll();
    }
    
}