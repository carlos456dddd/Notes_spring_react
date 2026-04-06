package com.notechallenge.backend.security;

import com.notechallenge.backend.exception.NotFoundException;
import com.notechallenge.backend.model.Users;
import com.notechallenge.backend.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserContext {
    private final UsersRepository repository;

    public Users getCurrentUser(){
        return repository.findById(1L).orElseThrow(() -> new NotFoundException("Error 8"));
    }
}
