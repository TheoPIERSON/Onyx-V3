package com.onyx.onyxinstitutbackend.controller;

import com.onyx.onyxinstitutbackend.model.Customers;
import com.onyx.onyxinstitutbackend.service.CustomersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/customers")
public class CustomersController {

    @Autowired
    private CustomersService customersService;

    @GetMapping("/all")
    public ResponseEntity<List<Customers>> getAllCustomers (){
        List<Customers> customers = (List<Customers>) customersService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }
    @GetMapping("/{id_customer}")
    public ResponseEntity<Customers> getCustomerById (@PathVariable("id_customer") Long id_customer){
        Customers customers = customersService.findCustomerById(id_customer);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }



    @PostMapping("/add")
    public ResponseEntity<Customers> addCustomer(@RequestBody Customers customer){
        Customers newCustomer = customersService.addCustomer(customer);
        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id_customer}")
    public ResponseEntity<Customers> updateCustomer(@RequestBody Customers customer){
        Customers updateCustomer = customersService.updateCustomer(customer);
        return new ResponseEntity<>(updateCustomer, HttpStatus.OK);
    }


}
