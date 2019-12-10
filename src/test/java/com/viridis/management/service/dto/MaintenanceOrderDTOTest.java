package com.viridis.management.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.viridis.management.web.rest.TestUtil;

public class MaintenanceOrderDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaintenanceOrderDTO.class);
        MaintenanceOrderDTO maintenanceOrderDTO1 = new MaintenanceOrderDTO();
        maintenanceOrderDTO1.setId(1L);
        MaintenanceOrderDTO maintenanceOrderDTO2 = new MaintenanceOrderDTO();
        assertThat(maintenanceOrderDTO1).isNotEqualTo(maintenanceOrderDTO2);
        maintenanceOrderDTO2.setId(maintenanceOrderDTO1.getId());
        assertThat(maintenanceOrderDTO1).isEqualTo(maintenanceOrderDTO2);
        maintenanceOrderDTO2.setId(2L);
        assertThat(maintenanceOrderDTO1).isNotEqualTo(maintenanceOrderDTO2);
        maintenanceOrderDTO1.setId(null);
        assertThat(maintenanceOrderDTO1).isNotEqualTo(maintenanceOrderDTO2);
    }
}
