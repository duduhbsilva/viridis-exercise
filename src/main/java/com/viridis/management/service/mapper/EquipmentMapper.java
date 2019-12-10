package com.viridis.management.service.mapper;

import com.viridis.management.domain.*;
import com.viridis.management.service.dto.EquipmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Equipment} and its DTO {@link EquipmentDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EquipmentMapper extends EntityMapper<EquipmentDTO, Equipment> {



    default Equipment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Equipment equipment = new Equipment();
        equipment.setId(id);
        return equipment;
    }
}
