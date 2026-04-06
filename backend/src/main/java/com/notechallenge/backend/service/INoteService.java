package com.notechallenge.backend.service;

import com.notechallenge.backend.dto.NoteCreateDTO;
import com.notechallenge.backend.dto.NoteDTO;
import com.notechallenge.backend.model.Note;
import com.notechallenge.backend.model.Users;

import java.util.Collection;
import java.util.List;

public interface INoteService {

    List<NoteDTO> findNote(Users user);
    NoteDTO createNote(NoteCreateDTO note, Users user);
    NoteDTO editNote(Long id, NoteCreateDTO note,Users user);
    void deleteNote(Long id,Users user);
    void ArchivedNotes(List<Long> id, boolean option,Users user);
    ;
    List<NoteDTO> findAllArchived(boolean option,Users user);




}
