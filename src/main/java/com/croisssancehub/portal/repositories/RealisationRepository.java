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

    @Query("select rep.date_export as dateExport, rep.submission_time as submissiontimerep,rep.secteur as secteur, rep.lot as lot, rep.id as idRep,rep.nameClient as nameClient, rep.lat as latitude, rep.lng as longitude,\n" +
            "rep.refClient as ClientRep,rep.avenue as avenue,rep.numHome as numHome,rep.commune as street,rep.category as category,rep.town as town,rea.entreprise as entreprise, rea.consultant as contractor,\n" +
            "rea.refClient as RefClient,rea.submission_time as submissiontime,rep.controller_name as controller_name from Reperage  rep left join Realisation rea on rea.refClient=rep.refClient order by rep.lot,rep.secteur"
            + "")
    List<Map<String,Object>> doneWork();

    @Query("select rep.date_export as dateExport, rep.secteur as secteur, rea.lot as lot, rep.id as idRep,rep.nameClient as nameClient, rea.lat as latitude, rea.lng as longitude,\n" +
            "rep.refClient as ClientRep,rea.avenue as avenue,rea.numHome as numHome,rea.commune as street,rep.category as category,rea.town as town,rea.entreprise as entreprise, rea.consultant as contractor,\n" +
            "rea.refClient as RefClient,rea.submission_time as submissiontime,rea.typeBranche as branchement,rea.client as client from Realisation  rea left join Reperage rep on rea.refClient=rep.refClient "
            + " order by rea.lot,rep.secteur")
    List<Map<String,Object>> doneWorkError();


    @Query("select rea.consultant as contractor, count(rea) as ctr from Realisation  rea inner join Reperage rep on rea.refClient=rep.refClient "
                + " group by rea.consultant"+
                " order by count(rea) DESC")
    List<Map<String,Object>> doneContractors();

    @Query("select rea.consultant as contractor, count(rea) as ctr from Realisation  rea left join Reperage rep on rea.refClient=rep.refClient "
            +"where rep.id is null"
            + " group by rea.consultant"+
            " order by count(rea) DESC")
    List<Map<String,Object>> doneContractorsError();



    @Query("select rep.submission_time as submissiontimerep,rep.secteur as secteur, rep.lot as lot, rep.id as idRep,rep.nameClient as nameClient, rep.lat as latitude, rep.lng as longitude,\n" +
            "rep.refClient as ClientRep,rep.avenue as avenue,rep.numHome as numHome,rep.commune as street,rep.category as category,rep.town as town,rea.entreprise as entreprise, rea.consultant as contractor,\n" +
            "rea.refClient as RefClient,rea.submission_time as submissiontime,rep.controller_name as controller_name from Reperage  rep inner join Realisation rea on rea.refClient=rep.refClient order by rep.lot,rep.secteur"
            + "")
    List<Map<String,Object>> doneWorkRealized();

    @Query("select rep.secteur as secteur, rea.lot as lot, rep.id as idRep,rep.nameClient as nameClient, rea.lat as latitude, rea.lng as longitude,\n" +
            "rep.refClient as ClientRep,rea.avenue as avenue,rea.numHome as numHome,rea.commune as street,rep.category as category,rea.town as town,rea.entreprise as entreprise, rea.consultant as contractor,\n" +
            "rea.refClient as RefClient,rea.submission_time as submissiontime,rea.typeBranche as branchement,rea.client as client from Realisation  rea left join Reperage rep on rea.refClient=rep.refClient "
           +" where rep.id is null"
            + " order by rea.lot,rep.secteur")
    List<Map<String,Object>> doneWorkRealizedError();

    @Query("select count(rea) as ctr,substring(rea.DateExport,1,10) as ExportDate from Realisation rea inner join Reperage rep " +
            "on rea.refClient=rep.refClient " +
            " where rea.DateExport like '%-07-%'"+
            "group by substring(rea.DateExport,1,10)")
    List<Map<String,Object>> doneWorkRealizedGroupingByDateDefault();

    @Query("select count(rea) as ctr,substring(rea.DateExport,1,10) as ExportDate from Realisation rea " +
            "where rea.refClient not in (select rep.refClient from Reperage rep) and rea.DateExport like '%-07-%' " +
            "group by substring(rea.DateExport,1,10)")
    List<Map<String,Object>> doneWorkErrorGroupingByDateDefault();

    @Query("select count(rea) as ctr,substring(rea.DateExport,1,10) as ExportDate from Realisation rea " +
            "where  rea.DateExport like %:month% and rea.refClient not in (select rep.refClient from Reperage rep) " +
            " group by substring(rea.DateExport,1,10)")
    List<Map<String,Object>> doneWorkErrorGroupingByDate(@Param("month") String month);

 @Query("select count(rep) as ctr,substring(rep.date_export,1,10) as ExportDate from Reperage rep " +
         "where  rep.date_export like %:month% and rep.refClient not in (select rea.refClient from Realisation rea) " +
         " group by substring(rep.date_export,1,10)")
 List<Map<String,Object>> doneWorkReperageGroupingByDate(@Param("month") String month);

    @Query("select count(rea) as ctr,substring(rea.DateExport,1,10) as ExportDate from Realisation rea inner join Reperage rep " +
            "on rea.refClient=rep.refClient " +
            " where rea.DateExport like %:month% "+
            "group by substring(rea.DateExport,1,10)")
    List<Map<String,Object>> doneWorkRealizedGroupingByDate(@Param("month") String month);

    @Query("select count(rea) as ctr,rea.entreprise as entreprise,((count(rea)*100)/5000) as percentage" +
            " from Realisation rea inner join Reperage rep " +
            "on rea.refClient=rep.refClient " +
            "group by rea.entreprise")
    List<Map<String,Object>> doneWorkRealizedByEntreprise();


 @Query("select count(rea) as ctr,rea.entreprise as entreprise,((count(rea)*100)/5000) as percentage from Realisation rea " +
         "where rea.refClient not in (select rep.refClient from Reperage rep) " +
         "group by rea.entreprise")
 List<Map<String,Object>> doneWorkErrorRealizedByEntreprise();

 @Query("select count(rep) as ctr,rep.town as town from Reperage rep group by rep.town")
 List<Map<String,Object>> doneLotAndTownReperageGroupingDefault();

 @Query("select count(rea.refClient) as ctr,rea.town as town,rea.lot as lot from Reperage rep inner join Realisation rea " +
         "ON rep.refClient=rea.refClient " +
         "group by rea.town,rea.lot")
 List<Map<String,Object>> doneLotAndTownRealizationGroupingDefault();


 @Query("select count(rea.refClient) as ctr,rea.town as town,rea.lot as lot from Realisation rea " +
               "where rea.refClient not in (select rep.refClient from Reperage rep) " +
               "group by rea.town,rea.lot")
 List<Map<String,Object>> doneLotAndTownRealizationErrorGroupingDefault();

 @Query("select count(rep.refClient) as ctr,rep.town as town,rep.lot as lot from Reperage rep " +
         "where rep.refClient not in (select rea.refClient from Realisation rea) " +
         "group by rep.town,rep.lot")
 List<Map<String,Object>> todoLotAndTownReperageGroupingDefault();

 @Query(" select substring(rea.DateExport,1,10) as dt2 from RealisationImport rea where rea.id=(select max(r.id) as dt from RealisationImport r)")
 Map<String,Object> getDateUpDate();

}
