package com.viridis.management.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.viridis.management.web.rest.TestUtil;

public class MaintenanceOrderTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaintenanceOrder.class);
        MaintenanceOrder maintenanceOrder1 = new MaintenanceOrder();
        maintenanceOrder1.setId(1L);
        MaintenanceOrder maintenanceOrder2 = new MaintenanceOrder();
        maintenanceOrder2.setId(maintenanceOrder1.getId());
        assertThat(maintenanceOrder1).isEqualTo(maintenanceOrder2);
        maintenanceOrder2.setId(2L);
        assertThat(maintenanceOrder1).isNotEqualTo(maintenanceOrder2);
        maintenanceOrder1.setId(null);
        assertThat(maintenanceOrder1).isNotEqualTo(maintenanceOrder2);
    }
}
