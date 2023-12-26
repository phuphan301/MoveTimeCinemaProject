package com.WebMovie.Entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name = "VOUCHER")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    private String NAME;
    private Integer DISCOUNT;
    @Temporal(TemporalType.DATE)
    private Date DATE_START;
    @Temporal(TemporalType.DATE)
    private Date DATE_END;
    private String DESCRIBE;
    private Boolean STATUS;

    @JsonIgnore
    @OneToMany(mappedBy = "ID_VOUCHER")
    private List<Pay> LIST_PAY;
}
