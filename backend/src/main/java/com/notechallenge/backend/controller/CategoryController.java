package com.notechallenge.backend.controller;

import com.notechallenge.backend.dto.*;
import com.notechallenge.backend.model.Users;
import com.notechallenge.backend.security.UserContext;
import com.notechallenge.backend.security.UserSecurity;
import com.notechallenge.backend.service.ICategoryService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")

public class CategoryController {


    private final ICategoryService service;
    private final UserSecurity config;


    @PostMapping
    public ResponseEntity<CategoryDTO> addCategory(@RequestBody CreateCategoryDTO categoryAddDTO, HttpServletRequest request) {
        Users user = config.getCurrentUser(request);
        CategoryDTO cate = service.createCategory(categoryAddDTO, user);
        return ResponseEntity.created(URI.create("/api/category/" + cate.getId())).body(cate);
    }
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getCategory(HttpServletRequest request) {
        Users user = config.getCurrentUser(request);

        return ResponseEntity.ok(service.getAllCategory(user));
    }

    @PutMapping("/add/{id}")
    public ResponseEntity<CategoryNotesDTO> addNotesInCategory(@PathVariable Long id, @RequestBody CategoryAddDTO categoryAddDTO, HttpServletRequest request) {

        Users user = config.getCurrentUser(request);

        return ResponseEntity.ok(service.addNotesCategory(id, categoryAddDTO, user));
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<CategoryNotesDTO> deleteNotesInCategory(@PathVariable Long id, @RequestBody CategoryAddDTO categoryDeDTO, HttpServletRequest request){
        Users user = config.getCurrentUser(request);
        return ResponseEntity.ok(service.deleteNotesCategory(id,categoryDeDTO, user));
    }
    @GetMapping("{id}")
    public ResponseEntity<List<NoteDTO>> getNoteOfCategory(@PathVariable Long id, HttpServletRequest request) {
        Users user = config.getCurrentUser(request);
        return ResponseEntity.ok(service.getAllNotesOfCategory(id, user));
    }
    @PutMapping("/{catId}/notes/{noteId}")
    public ResponseEntity<Void> addNoteToCategory(@PathVariable Long catId,
                                                  @PathVariable Long noteId,
                                                  HttpServletRequest request) {
        Users user = config.getCurrentUser(request);
        service.addNotesCategory(catId, new CategoryAddDTO(List.of(noteId)), user);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{catId}/notes/{noteId}")
    public ResponseEntity<Void> removeNoteFromCategory(@PathVariable Long catId,
                                                       @PathVariable Long noteId,
                                                       HttpServletRequest request) {
        Users user = config.getCurrentUser(request);
        service.deleteNotesCategory(catId, new CategoryAddDTO(List.of(noteId)), user);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id, HttpServletRequest request) {
        Users user = config.getCurrentUser(request);
        service.deleteCategory(id, user);
        return ResponseEntity.noContent().build();
    }



}
