package com.notechallenge.backend.repository;

import com.notechallenge.backend.model.Categoria;
import com.notechallenge.backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Categoria,Long> {
    Optional<Categoria> findByIdAndPropiertary(Long id, Users user);
    List<Categoria> findByPropiertary(Users user);

}
