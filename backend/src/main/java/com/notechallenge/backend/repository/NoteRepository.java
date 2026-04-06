package com.notechallenge.backend.repository;

import com.notechallenge.backend.model.Note;
import com.notechallenge.backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findAllByIdInAndPropiertary(Collection<Long> ids, Users user);
    List<Note> findByPropiertary(Users user);



    Optional<Note> findByIdAndPropiertary(Long id, Users user);

    boolean existsByIdAndPropiertary(Long id, Users user);



}
