package com.talan.spring.login.models;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.io.*;
import java.util.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DossierCandidature implements Serializable {


    /**
     *
     */
    private static final long serialVersionUID = 1L;
    public String intitule;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDossier;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateCreation = new Date(System.currentTimeMillis());

    private String description;

    @Enumerated(EnumType.STRING)
    private State statut = State.valueOf("En_attente");

    @ManyToOne
    @JoinColumn(name = "candidat", referencedColumnName = "idCandidat")
    private Candidat candidat;

    @ManyToOne
    @JoinColumn(name = "user", referencedColumnName = "id")
    private User user;

    public DossierCandidature(int idDossier, String intitule) {
        this.idDossier = idDossier;
        this.intitule = intitule;
    }


}
