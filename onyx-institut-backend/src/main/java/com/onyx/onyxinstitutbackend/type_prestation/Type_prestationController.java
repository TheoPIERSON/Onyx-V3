package com.onyx.onyxinstitutbackend.type_prestation;

import com.onyx.onyxinstitutbackend.customer.Customers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
        @GetMapping("/{id}")
        public ResponseEntity<Type_prestation> getTypePretationById (@PathVariable("id") Long id_type_prestation){
            Type_prestation type_prestation = Type_prestationService.findById(id_type_prestation);
            return new ResponseEntity<>(type_prestation, HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Type_prestation> updateTypePrestation(@RequestBody Type_prestation typePrestation){
        Type_prestation updateTypePrestation = Type_prestationService.updateTypePrestation(typePrestation);
        return new ResponseEntity<>(updateTypePrestation, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTypePrestation(@PathVariable("id") Long id_type_prestation){
        Type_prestationService.deleteTypePrestation(id_type_prestation);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

