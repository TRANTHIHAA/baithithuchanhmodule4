package com.example.module4.controller;

import com.example.module4.model.Country;
import com.example.module4.model.Province;
import com.example.module4.service.ICRUDCountry;
import com.example.module4.service.ICRUDProvince;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/province")
public class ProvinceController {

    @Autowired
    private ICRUDProvince icrudProvince;

    @Autowired
    private ICRUDCountry icrudCountry;

//    @GetMapping
//    public ModelAndView get() {
//        return new ModelAndView("index");
//    }

    @GetMapping("/get")
    private ResponseEntity<List<Province>> display() {
        return new ResponseEntity<>(icrudProvince.findAll(), HttpStatus.OK);
    }

@GetMapping("/country")
private ResponseEntity<List<Country>> displayCountry() {
    return new ResponseEntity<>(icrudCountry.findAll(), HttpStatus.OK);
}

    @GetMapping("/{id}")
    private ResponseEntity<Province> findById(@PathVariable("id") Long id) {
        Optional<Province> province = icrudProvince.findById(id);
        if (province.isPresent()) {
            return new ResponseEntity<>(province.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping
    private ResponseEntity<Province> update(@RequestBody Province province) {
        Optional<Province> optionalProvince = icrudProvince.findById(province.getId());
        if (optionalProvince.isPresent()) {
            return new ResponseEntity<>(icrudProvince.save(province), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PostMapping
    public ResponseEntity<Province> createProvince(@RequestBody Province province) {
        return new ResponseEntity<>(icrudProvince.save(province), HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    private ResponseEntity<Province> delete(@PathVariable("id") Long id) {
        Optional<Province> optionalProduct = icrudProvince.findById(id);
        if (optionalProduct.isPresent()) {
            icrudProvince.delete(id);
            return new ResponseEntity<>(optionalProduct.get(), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
