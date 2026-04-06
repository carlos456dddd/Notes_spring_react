package com.notechallenge.backend.dto;


import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Builder
public class CategoryNotesDTO {

    private String name;
    private List<NoteDTO> notes;
}
