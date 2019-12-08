package com.croisssancehub.portal.repositories;

import java.util.List;
import java.util.Map;

import com.croisssancehub.portal.models.ReferenceImport;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 * ReferenceImportRepository
 */
public interface ReferenceImportRepository extends CrudRepository<ReferenceImport,Long>{

    @Query("select ref.refClient as refClient, ref.nameClient as nameClient, ref.secteur as secteur, ref.controller_name as controlleur, ref.lot as lot, ref.submission_time as submission_time,ref.lat as latitude,ref.lng as longitude from ReferenceImport ref")
     List<Map<String,Object>> getHomes();
    @Query("select ref.lot as lot,COUNT(ref) as stats from ReferenceImport ref group by ref.lot")
     List<Map<String,Object>> getReferencesByLot();
    
}