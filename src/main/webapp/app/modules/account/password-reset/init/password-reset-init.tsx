import React from 'react';

import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Alert, Col, Row } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { handlePasswordResetInit, reset } from '../password-reset.reducer';

export type IPasswordResetInitProps = DispatchProps;

export class PasswordResetInit extends React.Component<IPasswordResetInitProps> {
  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handlePasswordResetInit(values.email);
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1>Redefina sua senha</h1>
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvField
                name="email"
                label="E-mail"
                placeholder={'E-mail'}
                type="email"
                validate={{
                  required: { value: true, errorMessage: 'Este campo é obrigatório.' },
                  minLength: { value: 5, errorMessage: 'É necessário que seu e-mail tenha no mínimo 5 caracteres.' },
                  maxLength: { value: 254, errorMessage: 'O seu e-mail não pode ter mais de 50 caracteres.' }
                }}
              />
              <Button color="primary" type="submit">
                Redefinir senha
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = { handlePasswordResetInit, reset };

type DispatchProps = typeof mapDispatchToProps;

export default connect(
  null,
  mapDispatchToProps
)(PasswordResetInit);
