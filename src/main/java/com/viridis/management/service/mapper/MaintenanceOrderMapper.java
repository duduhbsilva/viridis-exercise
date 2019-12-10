package com.viridis.management.service.mapper;

import com.viridis.management.domain.*;
import com.viridis.management.service.dto.MaintenanceOrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link MaintenanceOrder} and its DTO {@link MaintenanceOrderDTO}.
 */
@Mapper(componentModel = "spring", uses = {EquipmentMapper.class})
public interface MaintenanceOrderMapper extends EntityMapper<MaintenanceOrderDTO, MaintenanceOrder> {

    @Mapping(source = "equipment.id", target = "equipmentId")
    MaintenanceOrderDTO toDto(MaintenanceOrder maintenanceOrder);

    @Mapping(source = "equipmentId", target = "equipment")
    MaintenanceOrder toEntity(MaintenanceOrderDTO maintenanceOrderDTO);

    default MaintenanceOrder fromId(Long id) {
        if (id == null) {
            return null;
        }
        MaintenanceOrder maintenanceOrder = new MaintenanceOrder();
        maintenanceOrder.setId(id);
        return maintenanceOrder;
    }
}
