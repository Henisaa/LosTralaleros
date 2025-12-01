package com.example.miapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;


import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pagos")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String paymentMethod; 
    private String transactionId; 
    private String status;
    private LocalDateTime paymentDate;

    @OneToOne
    @JoinColumn(name = "orden_id")
    @ToString.Exclude
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Orden orden;

    @PrePersist
    protected void onCreate() {
        this.paymentDate = LocalDateTime.now();
    }
}