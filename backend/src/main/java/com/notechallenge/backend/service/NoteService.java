package com.notechallenge.backend.service;

import com.notechallenge.backend.dto.NoteCreateDTO;
import com.notechallenge.backend.dto.NoteDTO;
import com.notechallenge.backend.exception.NotFoundException;
import com.notechallenge.backend.mapper.Mapper;
import com.notechallenge.backend.model.Note;
import com.notechallenge.backend.model.Users;
import com.notechallenge.backend.repository.NoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NoteService implements INoteService {

    NoteRepository repository;

    public NoteService(NoteRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<NoteDTO> findNote(Users user) {
        return repository.findByPropiertary(user)
                .stream()
                .map(Mapper::NDTO)
                .toList();
    }

    @Override
    public NoteDTO createNote(NoteCreateDTO dto, Users user) {
        Note note = Mapper.toEntity(dto);
        note.setPropiertary(user);
        return Mapper.NDTO(repository.save(note));
    }

    @Override
    public NoteDTO editNote(Long id, NoteCreateDTO dto, Users user) {
        Note note = repository.findByIdAndPropiertary(id, user)
                .orElseThrow(() -> new NotFoundException("Note not found or not yours"));

        note.setTittle(dto.getTittle());
        note.setContent(dto.getContent());
        note.setArchivead(dto.isArchivead());

        return Mapper.NDTO(repository.save(note));
    }

    @Override
    public void deleteNote(Long id, Users user) {
        if (!repository.existsByIdAndPropiertary(id, user))
            throw new NotFoundException("Note not found or not yours");
        repository.deleteById(id);
    }

    @Transactional
    @Override
    public void ArchivedNotes(List<Long> ids, boolean option, Users user) {
        List<Note> notes = repository.findAllByIdInAndPropiertary(ids, user);
        if (notes.size() != ids.size())
            throw new NotFoundException("Some notes not found or not yours");
        notes.forEach(n -> n.setArchivead(option));
        repository.saveAll(notes);
    }

    @Override
    public List<NoteDTO> findAllArchived(boolean option, Users user) {



        List<Note> notes = repository.findByPropiertary(user);
        return notes.stream().filter(a -> option == a.isArchivead()).toList().stream().map(Mapper::NDTO).toList();


    }
}
