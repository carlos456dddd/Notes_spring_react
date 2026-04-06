package com.notechallenge.backend.service;

import com.notechallenge.backend.dto.*;

import com.notechallenge.backend.model.Users;

import java.util.List;



public interface ICategoryService {


    CategoryNotesDTO addNotesCategory(Long id, CategoryAddDTO category, Users user);
    CategoryNotesDTO deleteNotesCategory(Long id, CategoryAddDTO categoryDE, Users user);
    List<NoteDTO> getAllNotesOfCategory(Long id, Users user);
    CategoryDTO createCategory(CreateCategoryDTO categoria, Users user);
    List<CategoryDTO> getAllCategory(Users user);
    void deleteCategory(Long id, Users user);


}
