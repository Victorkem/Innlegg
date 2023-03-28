package com.example.innleggogkommentarer;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Innlegg {

    private String parentId;
    private String innleggId;
    private String navn;
    private String innhold;
    private Date dato;

    private List<Innlegg> kommentarer = new ArrayList<>();



    public Innlegg(String parentId, String innleggId, String navn, String innhold, List<Innlegg> kommentarer, Date dato){
        this.parentId = parentId;
        this.innleggId = innleggId;
        this.navn = navn;
        this.innhold = innhold;
        this.kommentarer.add(null);
        this.dato = dato;
    }
    public Innlegg(){};

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getInnleggId() {
        return innleggId;
    }

    public void setInnleggId(String innleggId) {
        this.innleggId = innleggId;
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public String getInnhold() {
        return innhold;
    }

    public void setInnhold(String innhold) {
        this.innhold = innhold;
    }

    public List<Innlegg> getKommentarer() {
        return kommentarer;
    }

    public void setKommentarer(List<Innlegg> kommentarer) {
        this.kommentarer = kommentarer;
    }

    public void leggTilKommentar(Innlegg kommentar){
        kommentarer.add(kommentar);
    }

    public Date getDato() {
        return dato;
    }

    public void setDato(Date dato) {
        this.dato = dato;
    }
}
