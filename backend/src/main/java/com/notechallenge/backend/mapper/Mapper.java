package com.notechallenge.backend.mapper;

import com.notechallenge.backend.dto.CategoryDTO;
import com.notechallenge.backend.dto.NoteCreateDTO;
import com.notechallenge.backend.dto.NoteDTO;
import com.notechallenge.backend.model.Categoria;
import com.notechallenge.backend.model.Note;

public class Mapper {

    public static NoteDTO NDTO(Note note) {
        if (note == null) {return null; };

        return NoteDTO.builder()
                .id(note.getId())
                .tittle(note.getTittle())
                .content(note.getContent())
                .archivead(note.isArchivead())
                .build();


    }
    public static CategoryDTO CDTO (Categoria cate) {

        if (cate ==null) return null;
        return CategoryDTO.builder()
                .id(cate.getId())
                .nombre(cate.getNombre())
                .quantity(cate.getQuantity())
                .build();

    }
    public static Note toEntity(NoteCreateDTO dto) {
        return Note.builder()
                .tittle(dto.getTittle())
                .content(dto.getContent())
                .archivead(dto.isArchivead())
                .build();
    }

}
