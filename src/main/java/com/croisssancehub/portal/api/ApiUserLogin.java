package com.croisssancehub.portal.api;

import com.croisssancehub.portal.models.UserLogin;
import com.croisssancehub.portal.repositories.UserLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/userlogin/")
public class ApiUserLogin {

    @Autowired
    private UserLoginRepository userLoginRepository;

    @GetMapping("get/{id}")
    public UserLogin getUser(@PathVariable int id){
        return userLoginRepository.findById(id).get();
    }
}
