package com.onyx.onyxinstitutbackend.type_prestation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/type_prestation")
public class Type_prestationController {
        @Autowired
        private Type_prestationService Type_prestationService;

        @GetMapping("/all")
        public ResponseEntity<List<Type_prestation>> getAllTypePrestations (){
            List<Type_prestation> typePrestation = (List<Type_prestation>) Type_prestationService.getAllTypePrestations();
            return new ResponseEntity<>(typePrestation, HttpStatus.OK);
        }
        @PostMapping("/add")
        public ResponseEntity<Type_prestation> addTypePrestation(@RequestBody Type_prestation typePrestation){
            Type_prestation newTypePrestation = Type_prestationService.addTypePrestation(typePrestation);
            return new ResponseEntity<>(newTypePrestation, HttpStatus.CREATED);
        }
}

