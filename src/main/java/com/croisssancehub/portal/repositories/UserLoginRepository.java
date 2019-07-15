package com.croisssancehub.portal.repositories;

import com.croisssancehub.portal.models.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLoginRepository extends JpaRepository<UserLogin,Integer> {
}
