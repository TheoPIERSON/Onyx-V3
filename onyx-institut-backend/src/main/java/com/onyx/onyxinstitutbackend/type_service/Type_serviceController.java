package com.onyx.onyxinstitutbackend.type_service;

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
@RequestMapping("/type-service")
public class Type_serviceController {
        @Autowired
        private Type_serviceService typeServiceService;

        @GetMapping("/all")
        public ResponseEntity<List<Type_service>> getAllTypeService (){
            List<Type_service> typeService = (List<Type_service>) typeServiceService.getAllTypeService();
            return new ResponseEntity<>(typeService, HttpStatus.OK);
        }
        @PostMapping("/add")
        public ResponseEntity<Type_service> addTypeService(@RequestBody Type_service typeService){
            Type_service newTypeService = typeServiceService.addTypeService(typeService);
            return new ResponseEntity<>(newTypeService, HttpStatus.CREATED);
        }
}

