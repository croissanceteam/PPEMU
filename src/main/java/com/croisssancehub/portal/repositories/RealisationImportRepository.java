package com.croisssancehub.portal.repositories;

import java.util.List;
import java.util.Map;

import com.croisssancehub.portal.models.RealisationImport;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 * RealisationImportRepository
 */ 
public interface RealisationImportRepository extends CrudRepository<RealisationImport,Long>{

    @Query("select rea.refClient as refClient, rea.client as client, rea.entreprise as entreprise, rea.consultant as consultant, rea.lot as lot, rea.submission_time as submission_time, rea.lat as latitude,rea.lng as longitude,rea.secteur as secteur from RealisationImport rea")
    List<Map<String,Object>> getHomeWorkDo();

    @Query("select rea.lot as lot,COUNT(rea) as stats from RealisationImport rea group by rea.lot")
    List<Map<String,Object>> getRealizationsByLot();

    @Query("select rea.typeBranche as typeBranche, count(rea) as stats from RealisationImport rea group by rea.typeBranche")
    List<Map<String,Object>> getTypePlugs();

    @Query("select rea.entreprise as entreprise, count(rea) as stats from RealisationImport rea group by rea.entreprise")
    List<Map<String,Object>> getWorkByEntreprise();

    @Query("select rea.consultant as consultant, count(rea) as stats from RealisationImport rea group by rea.consultant")
    List<Map<String,Object>> getWorkByController();

    @Query("select count(rea) as stats, lot as lot,LOWER(typeBranche) as typeBranche from RealisationImport rea group by rea.lot,rea.typeBranche")
    List<Map<String,Object>> getDataByTypeJoin();

    @Query("select rea.refClient as refClient,rea.client as client,rea.town as town,rea.entreprise as entreprise,rea.consultant as consultant,rea.lot as lot,rea.secteur as secteur from RealisationImport rea where rea.typeBranche=:plug")
    List<Map<String,Object>> getDataByTypePlugs(@Param("plug") String plug);
    
}