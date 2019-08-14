package com.croisssancehub.portal.repositories;

import com.croisssancehub.portal.models.Reperage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ReperageRepository extends JpaRepository<Reperage,Long> {

    List<Reperage> findByLot(@Param("lot") int id);
    @Query("select r from Reperage r where r.date_export=:date")
    List<Reperage> findByDateExport(@Param("date") String date);
    List<Reperage> findByTown(@Param("town") String town);
    List<Reperage> findByCommune(@Param("commune") String commune);
    List<Reperage> findByCategory(@Param("category") String category);
    @Query("select rep.secteur as secteur ,rep.nameClient as nameClient,rep.id as idRep" +
            ", rep.lat as latitude, rep.lng as longitude,rep.refClient as ClientRep,rep.avenue as avenue,rep.numHome as numHome,rep.commune as street,rep.category as category" +
            " ,rep.town as town ,rep.submission_time as submission_time,rep.pointVente as pointVente from Reperage rep")
    List<Map<String,Object>> getReperage();

    @Query("select rep.secteur as secteur ,rep.nameClient as nameClient,rep.id as idRep" +
            ", rep.lat as latitude, rep.lng as longitude,rep.refClient as ClientRep,rep.avenue as avenue,rep.numHome as numHome,rep.commune as street,rep.category as category" +
            " ,rep.town as town ,rep.submission_time as submission_time,rep.pointVente as pointVente,rep.controller_name as controller_name from Reperage rep " +
            "where rep.refClient not in (select r.refClient from Realisation r)")
    List<Map<String,Object>> getReperageToDo();
}
