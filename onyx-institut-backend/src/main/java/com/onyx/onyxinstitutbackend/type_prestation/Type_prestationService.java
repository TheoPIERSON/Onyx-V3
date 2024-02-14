package com.onyx.onyxinstitutbackend.type_prestation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Type_prestationService {
    @Autowired
    private Type_prestationRepository Type_prestationRepository;
    public Iterable<Type_prestation> getAllTypePrestations(){
        return Type_prestationRepository.findAll();
    }
    public Type_prestation addTypePrestation(Type_prestation typePrestation){
        return Type_prestationRepository.save(typePrestation);
    }
    public Type_prestation updateTypePrestation(Type_prestation typePrestation){
        return Type_prestationRepository.save(typePrestation);
    }
    public void deleteTypePrestation(Long id){
        Type_prestationRepository.deleteById(id);
    }
}
