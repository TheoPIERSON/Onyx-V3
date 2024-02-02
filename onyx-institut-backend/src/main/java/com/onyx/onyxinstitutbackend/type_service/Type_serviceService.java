package com.onyx.onyxinstitutbackend.type_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Type_serviceService {
    @Autowired
    private Type_serviceRepository typeServiceRepository;
    public Iterable<Type_service> getAllTypeService(){
        return typeServiceRepository.findAll();
    }
    public Type_service addTypeService(Type_service typeService){
        return typeServiceRepository.save(typeService);
    }
    public Type_service updateTypeService(Type_service typeService){
        return typeServiceRepository.save(typeService);
    }
    public void deleteTypeService(Long id){
        typeServiceRepository.deleteById(id);
    }
}
