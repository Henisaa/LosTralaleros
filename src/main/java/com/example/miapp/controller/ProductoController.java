package com.example.miapp.controller;

import com.example.miapp.model.Producto;
import com.example.miapp.repository.ProductoRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*") 
public class ProductoController {

    private final ProductoRepository productoRepository;

    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @GetMapping
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }
    

    @PostMapping
    public Producto createProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }
    
    @PostMapping("/seed")
    public List<Producto> seedProductos(@RequestBody List<Producto> productos) {
        return productoRepository.saveAll(productos);
    }
}