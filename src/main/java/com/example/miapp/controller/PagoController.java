package com.example.miapp.controller;

import com.example.miapp.model.Orden;
import com.example.miapp.model.Pago;
import com.example.miapp.repository.OrdenRepository;
import com.example.miapp.repository.PagoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "*")
public class PagoController {

    private final PagoRepository pagoRepository;
    private final OrdenRepository ordenRepository;

    public PagoController(PagoRepository pagoRepository, OrdenRepository ordenRepository) {
        this.pagoRepository = pagoRepository;
        this.ordenRepository = ordenRepository;
    }
    @PostMapping("/procesar")
    public Pago procesarPago(@RequestBody Pago pago) {
        if (pago.getOrden() == null || pago.getOrden().getId() == null) {
            throw new RuntimeException("El pago debe estar asociado a una orden válida.");
        }

        Orden orden = ordenRepository.findById(pago.getOrden().getId())
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        pago.setTransactionId(UUID.randomUUID().toString());
        pago.setStatus("APROBADO");
        
        pago.setOrden(orden);
        orden.setStatus("PAGADO");
        ordenRepository.save(orden); 
        return pagoRepository.save(pago);
    }
    
    @GetMapping("/{id}")
    public Pago getPagoById(@PathVariable Long id) {
        return pagoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado"));
    }
}