import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEquipment } from 'app/shared/model/equipment.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './equipment.reducer';

export interface IEquipmentDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EquipmentDeleteDialog extends React.Component<IEquipmentDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.equipmentEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { equipmentEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>Excluir Equipamento</ModalHeader>
        <ModalBody id="managementApp.equipment.delete.question">Tem certeza de que deseja excluir este equipamento?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp; Cancelar
          </Button>
          <Button id="jhi-confirm-delete-equipment" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp; Excluir
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ equipment }: IRootState) => ({
  equipmentEntity: equipment.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentDeleteDialog);
