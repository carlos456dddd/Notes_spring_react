package com.notechallenge.backend.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateCategoryDTO {
    private String nombre;
    private Integer quantity;
}


