package com.WebMovie.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "CINEMAS")
public class Cinemas {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;

	private String NAME;

	private String ADDRESS;

	@JsonIgnore
	@OneToMany(mappedBy = "ID_CINEMAS")
	private List<Room> List_Room;
}
