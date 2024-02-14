package com.onyx.onyxinstitutbackend.type_prestation;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Type_prestationRepository extends CrudRepository<Type_prestation, Long> {
}
