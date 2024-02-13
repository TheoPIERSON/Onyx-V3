package com.onyx.onyxinstitutbackend.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/customer")
public class CustomersController {

    @Autowired
    private CustomersService customersService;

    @GetMapping("/all")
    public ResponseEntity<List<Customers>> getAllCustomers (){
        List<Customers> customers = (List<Customers>) customersService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Customers> getCustomerById (@PathVariable("id") Long id_customer){
        Customers customers = customersService.findCustomerById(id_customer);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }



    @PostMapping("/add")
    public ResponseEntity<Customers> addCustomer(@RequestBody Customers customer){
        Customers newCustomer = customersService.addCustomer(customer);
        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Customers> updateCustomer(@RequestBody Customers customer){
        Customers updateCustomer = customersService.updateCustomer(customer);
        return new ResponseEntity<>(updateCustomer, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable("id") Long id_customer){
        customersService.deleteCustomer(id_customer);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
