package com.notechallenge.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class NoteCreateDTO {
    private String tittle;
    private String content;
    private boolean archivead;
}
