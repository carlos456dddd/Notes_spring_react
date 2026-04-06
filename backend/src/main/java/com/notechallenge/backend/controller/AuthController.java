package com.notechallenge.backend.controller;

import com.notechallenge.backend.dto.LoginRequestDTO;
import com.notechallenge.backend.model.Users;
import com.notechallenge.backend.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final UsersRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginRequestDTO req) {
        Users user = userRepository
                .findByUsernameAndPassword(req.getUsername(), req.getPassword())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        return ResponseEntity.ok()
                .header("X-User-Id", user.getId().toString())
                .build();
    }
}
