package com.notechallenge.backend.controller;


import com.notechallenge.backend.dto.ArchivedNoteDTO;
import com.notechallenge.backend.dto.NoteCreateDTO;
import com.notechallenge.backend.dto.NoteDTO;
import com.notechallenge.backend.model.Users;
import com.notechallenge.backend.security.UserSecurity;
import com.notechallenge.backend.service.INoteService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final INoteService note_service;
    private final UserSecurity config;

    @GetMapping
    public ResponseEntity<List<NoteDTO>> getAllNotes(HttpServletRequest request) {
        Users user = config.getCurrentUser(request);
        return ResponseEntity.ok(note_service.findNote(user));
    }

    @GetMapping("/archived")
    public ResponseEntity<List<NoteDTO>> getNotes(@RequestParam(value = "archived") boolean option, HttpServletRequest request){
        Users user = config.getCurrentUser(request);
        return ResponseEntity.ok(note_service.findAllArchived(option,user));

    }

    @PostMapping
    public ResponseEntity<NoteDTO> postNote(@RequestBody NoteCreateDTO noteDTO, HttpServletRequest request) {
        Users user = config.getCurrentUser(request);
        NoteDTO note = note_service.createNote(noteDTO, user);
        return ResponseEntity.created(URI.create("/api/notes/" + note.getId())).body(note);

    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteDTO> editNote(@PathVariable Long id, @RequestBody NoteCreateDTO note, HttpServletRequest request) {

        Users user = config.getCurrentUser(request);
        return  ResponseEntity.ok(note_service.editNote(id, note, user));


    }
    @PatchMapping("/archived")
    public ResponseEntity<Void> archivedNote(@RequestBody ArchivedNoteDTO archived, HttpServletRequest request) {
        Users user = config.getCurrentUser(request);
        note_service.ArchivedNotes(archived.getId(), archived.isOption(),user);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id, HttpServletRequest request) {
        Users user = config.getCurrentUser(request);
        note_service.deleteNote(id, user);

        return ResponseEntity.noContent().build();

    }






}
