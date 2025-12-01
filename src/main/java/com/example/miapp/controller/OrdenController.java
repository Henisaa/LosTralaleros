package com.example.miapp.controller;

import com.example.miapp.model.Orden;
import com.example.miapp.model.Pago;
import com.example.miapp.repository.OrdenRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ordenes")
@CrossOrigin(origins = "*")
public class OrdenController {

    private final OrdenRepository ordenRepository;

    public OrdenController(OrdenRepository ordenRepository) {
        this.ordenRepository = ordenRepository;
    }

    @GetMapping
    public List<Orden> getAllOrdenes() {
        return ordenRepository.findAll();
    }

    @GetMapping("/usuario/{email}")
    public List<Orden> getOrdenesByUser(@PathVariable String email) {
        return ordenRepository.findByCustomerEmail(email);
    }

    @GetMapping("/{id}")
    public Orden getOrdenById(@PathVariable Long id) {
        return ordenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
    }

    @PostMapping
    public Orden createOrden(@RequestBody Orden orden) {
        if (orden.getItems() != null) {
            orden.getItems().forEach(item -> item.setOrden(orden));
        }


        if (orden.getPago() != null) {
            Pago pago = orden.getPago();
            
            //La "respuesta" del banco (estao)
            pago.setTransactionId(UUID.randomUUID().toString());
            pago.setStatus("APROBADO");
            pago.setPaymentDate(java.time.LocalDateTime.now());
            pago.setOrden(orden);
            

            orden.setStatus("PAGADO");
        } else {
            // Si el machucao no paga, se queda como pendiente
            if (orden.getStatus() == null) {
                orden.setStatus("PENDIENTE");
            }
        }
        return ordenRepository.save(orden);
    }
}