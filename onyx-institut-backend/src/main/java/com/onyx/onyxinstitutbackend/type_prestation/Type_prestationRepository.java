package com.onyx.onyxinstitutbackend.type_prestation;

import com.onyx.onyxinstitutbackend.customer.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Type_prestationRepository extends JpaRepository<Type_prestation, Long> {
    Type_prestation findTypePrestationById(Long id);

}
