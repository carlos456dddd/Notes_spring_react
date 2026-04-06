package com.notechallenge.backend.dto;

import jakarta.persistence.Entity;
import lombok.*;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteDTO {
    private Long id;
    private String tittle;
    private String content;
    private boolean archivead;;
}
