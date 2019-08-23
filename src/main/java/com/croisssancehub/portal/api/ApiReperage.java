package com.croisssancehub.portal.api;

import com.croisssancehub.portal.models.Reperage;
import com.croisssancehub.portal.repositories.ReperageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reperage/")
public class ApiReperage {
    @Autowired
    private ReperageRepository reperageRepository;

    @GetMapping("/list")
    public List<Reperage> getList(){
        return (List<Reperage>)reperageRepository.findAll();
    }

    @GetMapping("/unique/{id}")
    public Optional<Reperage> getReperage(@PathVariable long id){
        return reperageRepository.findById(id);
    }
    @GetMapping("/lot/{id}")
    public List<Reperage> getReperageByLot(@PathVariable int id){
        return reperageRepository.findByLot(id);
    }

    @GetMapping("/exportation/{dt}")
    public List<Reperage> getReperageByDateExport(@PathVariable String dt){
        return reperageRepository.findByDateExport(dt);
    }

    @GetMapping("/town/{town}")
    public List<Reperage> getReperageByTown(@PathVariable String town){
        return reperageRepository.findByTown(town);
    }

    @GetMapping("/street/{street}")
    public List<Reperage> getReperageByStreet(@PathVariable String street){
        return reperageRepository.findByCommune(street);
    }

    @GetMapping("/category/{category}")
    public List<Reperage> getReperageByCategory(@PathVariable String category){
        return reperageRepository.findByCategory(category);
    }

    @GetMapping("all")
    public List<Map<String,Object>> getAll(){
        return reperageRepository.getReperage();
    }

    @GetMapping("todogroupdate")
    public List<Map<String,Object>> getReperageGroupByDate(){
        return reperageRepository.doneWorkToDoGroupingByDateDefault();
    }


    @GetMapping("todo")
    public List<Map<String,Object>> getAllToDo(){
        return reperageRepository.getReperageToDo();
    }
}
