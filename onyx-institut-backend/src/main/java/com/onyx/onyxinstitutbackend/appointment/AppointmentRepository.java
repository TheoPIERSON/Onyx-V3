package com.onyx.onyxinstitutbackend.appointment;

import com.onyx.onyxinstitutbackend.appointment.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {
}
