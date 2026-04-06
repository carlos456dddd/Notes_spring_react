package com.notechallenge.backend.dto;


import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArchivedNoteDTO {

    private List<Long> id;
    private boolean option;
}
