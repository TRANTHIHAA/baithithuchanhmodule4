package com.example.module4.repository;
import com.example.module4.model.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProvinceRepository extends JpaRepository<Province, Long> {


}
