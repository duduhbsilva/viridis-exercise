import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IMaintenanceOrder } from 'app/shared/model/maintenance-order.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './maintenance-order.reducer';

export interface IMaintenanceOrderDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MaintenanceOrderDeleteDialog extends React.Component<IMaintenanceOrderDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.maintenanceOrderEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { maintenanceOrderEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Excluir Manutenção</ModalHeader>
        <ModalBody id="managementApp.maintenanceOrder.delete.question">Tem certeza de que deseja excluir esta manutenção?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp; Cancelar
          </Button>
          <Button id="jhi-confirm-delete-maintenanceOrder" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp; Excluir
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ maintenanceOrder }: IRootState) => ({
  maintenanceOrderEntity: maintenanceOrder.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaintenanceOrderDeleteDialog);
