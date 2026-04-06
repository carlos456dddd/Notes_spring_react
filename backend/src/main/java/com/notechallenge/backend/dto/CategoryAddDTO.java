package com.notechallenge.backend.dto;


import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class CategoryAddDTO {

    private List<Long> ids_notes;
}
