package com.croisssancehub.portal.repositories;

import com.croisssancehub.portal.models.Reperage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReperageRepository extends JpaRepository<Reperage,Long> {

    List<Reperage> findByLot(@Param("lot") int id);
    @Query("select r from Reperage r where r.date_export=:date")
    List<Reperage> findByDateExport(@Param("date") String date);
    List<Reperage> findByTown(@Param("town") String town);
    List<Reperage> findByCommune(@Param("commune") String commune);
    List<Reperage> findByCategory(@Param("category") String category);

}
