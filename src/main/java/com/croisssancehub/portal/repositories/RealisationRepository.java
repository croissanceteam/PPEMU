package com.croisssancehub.portal.repositories;

import com.croisssancehub.portal.models.Realisation;
import com.croisssancehub.portal.models.ViewRepRea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface RealisationRepository extends JpaRepository<Realisation,Long> {

    List<Realisation> findByEntreprise(@Param("entreprise")  String name);
    List<Realisation> findByTown(@Param("town") String name);
    List<Realisation> findByCommune(@Param("street") String name);
    List<Realisation> findByLot(@Param("lot") int lot);
   // List<Realisation> findByDateExport(String date);
    List<Realisation> findByTypeBranche(@Param("branch") String tb);

    @Query("select rep.id as idRep,rep.nameClient as nameClient, rep.lat as latitude, rep.lng as longitude,\n" +
            "rep.refClient as ClientRep,rea.town as town,rea.entreprise as entreprise, rea.consultant as contractor,\n" +
            "rea.refClient as RefClient from Reperage  rep left join Realisation rea on rea.refClient=rep.refClient")
    List<Map<String,Object>> doneWork();

    @Query("select rep.id as idRep,rep.nameClient as nameClient, rea.lat as latitude, rea.lng as longitude,\n" +
            "rep.refClient as ClientRep,rea.town as town,rea.entreprise as entreprise, rea.consultant as contractor,\n" +
            "rea.refClient as RefClient from Realisation  rea left join Reperage rep on rea.refClient=rep.refClient")
    List<Map<String,Object>> doneWorkError();
}
