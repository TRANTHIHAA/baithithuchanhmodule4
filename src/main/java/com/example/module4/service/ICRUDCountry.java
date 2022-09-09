package com.example.module4.service;


import com.example.module4.model.Country;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface ICRUDCountry  {
    Country save(Country e);

    void delete(Long id);

    Optional<Country> findById(Long id);

    List<Country> findAll();

}
