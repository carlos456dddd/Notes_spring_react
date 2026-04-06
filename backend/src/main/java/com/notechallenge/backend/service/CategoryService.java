package com.notechallenge.backend.service;

import com.notechallenge.backend.dto.*;
import com.notechallenge.backend.exception.NotFoundException;
import com.notechallenge.backend.mapper.Mapper;
import com.notechallenge.backend.model.Categoria;
import com.notechallenge.backend.model.Note;
import com.notechallenge.backend.model.Users;
import com.notechallenge.backend.repository.CategoryRepository;
import com.notechallenge.backend.repository.NoteRepository;
import com.notechallenge.backend.repository.UsersRepository;
import com.notechallenge.backend.security.UserContext;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


@Service
public class CategoryService implements ICategoryService {

    CategoryRepository Category;
    NoteRepository Note;
    UserContext UsersP;

    public CategoryService(CategoryRepository Category, NoteRepository Note, UserContext UsersP) {

        this.Category = Category;
        this.Note = Note;
        this.UsersP = UsersP;

    }


    @Override
    @Transactional
    public CategoryNotesDTO addNotesCategory(Long id, CategoryAddDTO categoryAddDTO, Users user) {



        Categoria cat = Category.findByIdAndPropiertary(id, user)
                .orElseThrow(() -> new NotFoundException("Category not found"));


        List<Note> notes = Note.findAllByIdInAndPropiertary(categoryAddDTO.getIds_notes(), user);
        if (notes.size() != categoryAddDTO.getIds_notes().size())
            throw new NotFoundException("Some notes not found or not yours");

        cat.getNotes().addAll(notes);

        List<NoteDTO> list = notes.stream()
                .map(Mapper::NDTO)
                .toList();
        return new CategoryNotesDTO(cat.getNombre(), list);
    }

    @Override
    @Transactional
    public CategoryNotesDTO deleteNotesCategory(Long id, CategoryAddDTO dto, Users user) {
        Categoria cat = Category.findByIdAndPropiertary(id, user)
                .orElseThrow(() -> new NotFoundException("Category not found"));

        List<Note> notes = Note.findAllByIdInAndPropiertary(dto.getIds_notes(), user);
        notes.forEach(cat.getNotes()::remove);

        List<NoteDTO> remaining = cat.getNotes()
                .stream()
                .map(Mapper::NDTO)
                .toList();
        return new CategoryNotesDTO(cat.getNombre(), remaining);
    }
    @Override
    public List<NoteDTO> getAllNotesOfCategory(Long id, Users user) {
        Categoria cat = Category.findByIdAndPropiertary(id, user)
                .orElseThrow(() -> new NotFoundException("Category not found"));

        return cat.getNotes()
                .stream()
                .filter(n -> n.getPropiertary().equals(user))
                .map(Mapper::NDTO)
                .toList();
    }

    @Override
    public CategoryDTO createCategory(CreateCategoryDTO dto, Users user) {
        Categoria cat = Categoria.builder()
                .nombre(dto.getNombre())
                .quantity(dto.getQuantity())
                .propiertary(user)
                .build();
        Category.save(cat);
        return Mapper.CDTO(cat);
    }

    @Override
    public List<CategoryDTO> getAllCategory(Users user) {
        return Category.findByPropiertary(user).stream().map(Mapper::CDTO).toList();
    }

    @Override
    @Transactional
    public void deleteCategory(Long id, Users user) {
        Categoria categoria = Category.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));

        if (!categoria.getPropiertary().getId().equals(user.getId())) {
            throw new RuntimeException("No tienes permiso para eliminar esta categoría");
        }

        categoria.getNotes().clear();
        Category.delete(categoria);
    }


}
