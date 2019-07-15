package com.croisssancehub.portal.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "t_users")
public class UserLogin implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;

    @Column(name = "fullname")
    private String fullname;

    public UserLogin(String username, String password, String fullname) {
        this.username = username;
        this.password = password;
        this.fullname = fullname;
    }
    public  UserLogin(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
}
