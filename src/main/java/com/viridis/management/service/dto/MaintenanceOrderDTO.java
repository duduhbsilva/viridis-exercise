package com.viridis.management.service.dto;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.viridis.management.domain.MaintenanceOrder} entity.
 */
public class MaintenanceOrderDTO implements Serializable {

    private Long id;

    @NotNull
    private ZonedDateTime scheduledDate;


    private Long equipmentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(ZonedDateTime scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public Long getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(Long equipmentId) {
        this.equipmentId = equipmentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MaintenanceOrderDTO maintenanceOrderDTO = (MaintenanceOrderDTO) o;
        if (maintenanceOrderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), maintenanceOrderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MaintenanceOrderDTO{" +
            "id=" + getId() +
            ", scheduledDate='" + getScheduledDate() + "'" +
            ", equipment=" + getEquipmentId() +
            "}";
    }
}
