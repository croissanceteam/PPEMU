package com.croisssancehub.portal.api;

import com.croisssancehub.portal.models.Realisation;
import com.croisssancehub.portal.models.ViewRepRea;
import com.croisssancehub.portal.repositories.RealisationRepository;
import com.croisssancehub.portal.repositories.ReperageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.*;

@RestController
@RequestMapping("/api/realized/")
public class ApiRealisation {

    @Autowired
    private RealisationRepository realisationRepository;
    @Autowired
    ReperageRepository reperageRepository;

    @GetMapping("/list")
    public List<Realisation> getRealization(){
        return (List<Realisation>) realisationRepository.findAll();
    }

    @GetMapping("/list{id}")
    public Optional<Realisation> getRealizationById(@PathVariable long id){
        return realisationRepository.findById(id);
    }

    @GetMapping("/entreprise/{name}")
    public List<Realisation> getRealizationByEntreprise(@PathVariable String name){
        return realisationRepository.findByEntreprise(name);
    }

    @GetMapping("/town/{name}")
    public List<Realisation> getRealizationByTown(@PathVariable String name){
        return realisationRepository.findByTown(name);
    }

    @GetMapping("/street/{name}")
    public List<Realisation> getRealizationByStreet(@PathVariable String name){
        return realisationRepository.findByCommune(name);
    }

    @GetMapping("/lot/{code}")
    public List<Realisation> getRealizationByLot(@PathVariable int code){
        return realisationRepository.findByLot(code);
    }
    /*
    @GetMapping("/exportation/{date}")
    public List<Realisation> getRealizationByDateExportation(@PathVariable String date){
        return realisationRepository.findByDateExport(date);
    }

     */

    @GetMapping("/branch/{name}")
    public List<Realisation> getRealizationByBranch(@PathVariable String name){
        return realisationRepository.findByTypeBranche(name);
    }

    @GetMapping("/done")
    public List<Map<String,Object>> getReperageAndRealized(){
        return realisationRepository.doneWork();
    }

    @GetMapping("/error")
    public List<Map<String,Object>> getReperageAndRealizedError(){
        return realisationRepository.doneWorkError();
    }

    @GetMapping("/groupdate")
    List<Map<String,Object>> getRealizationGroupByDate(){
        return realisationRepository.doneWorkRealizedGroupingByDateDefault();
    }
    @GetMapping("/errorgroupdate")
    List<Map<String,Object>> getErrorRealizationGroupByDate(){
        return realisationRepository.doneWorkErrorGroupingByDateDefault();
    }
    @GetMapping("/workalls")
    public List<Map<String,List<Map<String,Object>>>> getReperageAndRealizedAlls(){
        List<Map<String,List<Map<String,Object>>>> tabs=new ArrayList<>();
        Map<String,List<Map<String,Object>>> tabUnique=new HashMap<>();
        tabUnique.put("done",realisationRepository.doneWork());
        tabUnique.put("error",realisationRepository.doneWorkError());

        tabs.add(tabUnique);
        return tabs;
    }

    @GetMapping("/workallsindex")
    public List<Map<String,List<Map<String,Object>>>> getReperageAndRealizedAllsIndex(){
        List<Map<String,List<Map<String,Object>>>> tabs=new ArrayList<>();
        Map<String,List<Map<String,Object>>> tabUnique=new HashMap<>();
        tabUnique.put("reperage",reperageRepository.getReperage());
        tabUnique.put("realized",realisationRepository.doneWorkRealized());
        tabUnique.put("realizederrors",realisationRepository.doneWorkRealizedError());
        tabUnique.put("reperagetodo",reperageRepository.getReperageToDo());

        tabs.add(tabUnique);
        return tabs;
    }

    @GetMapping("/allgraphics")
    public List<Map<String,List<Map<String,Object>>>> getReperageAndRealizedGraphics(){
        List<Map<String,List<Map<String,Object>>>> tabs=new ArrayList<>();
        Map<String,List<Map<String,Object>>> tabUnique=new HashMap<>();
        tabUnique.put("realized",realisationRepository.doneWorkRealizedGroupingByDateDefault());
        tabUnique.put("error",realisationRepository.doneWorkErrorGroupingByDateDefault());
        tabUnique.put("reperage",reperageRepository.doneWorkToDoGroupingByDateDefault());
        tabs.add(tabUnique);
        return tabs;
    }

    @GetMapping("/failed/{month}")
    public List<Map<String,Object>> getRealizationWithOutRefByMonth(@PathVariable("month") String month){
        return  realisationRepository.doneWorkErrorGroupingByDate(month);
    }
    @GetMapping("/success/{month}")
    public List<Map<String,Object>> getRealizationSuccessRefByMonth(@PathVariable("month") String month){
        return  realisationRepository.doneWorkRealizedGroupingByDate(month);
    }
    @GetMapping("/entreprisesuccessrate")
    public List<Map<String,Object>> getPercentageRealizationByEntreprise(){
        return realisationRepository.doneWorkRealizedByEntreprise();
    }

    @GetMapping("/entrepriseserrorrate")
    public List<Map<String,Object>> getPercentageErrorRealizationByEntreprise(){
        return realisationRepository.doneWorkErrorRealizedByEntreprise();
    }

}
