package com.example.innleggogkommentarer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class InnleggOgKommentarerController {




    private List<Innlegg> innleggArray = new ArrayList<>();



    @PostMapping("/leggTil")
    public String leggTil(Innlegg innInnlegg){
        innleggArray.add(innInnlegg);
        System.out.println("lagt til nytt innlegg");
        return "lagt til innlegg";
    }
    @PostMapping("/leggTilKommentar")
    public String leggTilKommentar(Innlegg innKommentar){
        for (Innlegg i : innleggArray){
            if(i.getInnleggId().equals(innKommentar.getParentId())){
                i.leggTilKommentar(innKommentar);
            }
        }
        return "lagt til kommentar";
    }


    @GetMapping("/hentAlleInnlegg")
    public List<Innlegg> hentAlleInnlegg(){
        System.out.println("returnert alle innlegg");
        return innleggArray;
    }



}
