package com.viridis.management.repository;
import com.viridis.management.domain.MaintenanceOrder;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MaintenanceOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaintenanceOrderRepository extends JpaRepository<MaintenanceOrder, Long> {

}
