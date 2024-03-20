package com.onyx.onyxinstitutbackend.appointment;

import com.onyx.onyxinstitutbackend.appointment.Appointment;
import com.onyx.onyxinstitutbackend.type_prestation.Type_prestation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Appointment findAppointmentById(Long id);

}
