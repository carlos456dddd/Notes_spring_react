package com.notechallenge.backend.repository;

import com.notechallenge.backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByUsernameAndPassword(String username, String  password);
}
