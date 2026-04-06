package com.notechallenge.backend.security;

import com.notechallenge.backend.model.Users;
import com.notechallenge.backend.repository.UsersRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@RequiredArgsConstructor
public class UserSecurity {

    private final UsersRepository userRepository;

    public Users getCurrentUser(HttpServletRequest request) {
        String id = request.getHeader("X-User-Id");
        if (id == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        return userRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
    }
}