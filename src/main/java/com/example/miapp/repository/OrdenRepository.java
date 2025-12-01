package com.example.miapp.repository;

import com.example.miapp.model.Orden;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrdenRepository extends JpaRepository<Orden, Long> {
    List<Orden> findByCustomerEmail(String customerEmail);
}