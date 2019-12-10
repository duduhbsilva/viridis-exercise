import React, { useEffect } from 'react';
import { Button, Col, Alert, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { AvForm, AvField } from 'availity-reactstrap-validation';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';

export interface IUserSettingsProps extends StateProps, DispatchProps {}

export const SettingsPage = (props: IUserSettingsProps) => {
  useEffect(() => {
    props.getSession();
    return () => {
      props.reset();
    };
  }, []);

  const handleValidSubmit = (event, values) => {
    const account = {
      ...props.account,
      ...values
    };

    props.saveAccountSettings(account);
    event.persist();
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">Configurações do usuário {props.account.login}</h2>
          <AvForm id="settings-form" onValidSubmit={handleValidSubmit}>
            {/* First name */}
            <AvField
              className="form-control"
              name="firstName"
              label="Nome"
              id="firstName"
              placeholder="Seu primeiro nome"
              validate={{
                required: { value: true, errorMessage: 'Este campo é obrigatório.' },
                minLength: { value: 1, errorMessage: 'É necessário que seu primeiro nome tenha pelo menos 1 caractere.' },
                maxLength: { value: 50, errorMessage: 'Seu primeiro nome não pode ter mais de 50 caracteres.' }
              }}
              value={props.account.firstName}
            />
            {/* Last name */}
            <AvField
              className="form-control"
              name="lastName"
              label="Sobrenome"
              id="lastName"
              placeholder="Seu último nome"
              validate={{
                required: { value: true, errorMessage: 'Este campo é obrigatório.' },
                minLength: { value: 1, errorMessage: 'É necessário que seu sobrenome tenha pelo menos 1 caractere.' },
                maxLength: { value: 50, errorMessage: 'Seu sobrenome não pode ter mais de 50 caracteres.' }
              }}
              value={props.account.lastName}
            />
            {/* Email */}
            <AvField
              name="email"
              label="E-mail"
              placeholder={'Seu e-mail'}
              type="email"
              validate={{
                required: { value: true, errorMessage: 'Este campo é obrigatório.' },
                minLength: { value: 5, errorMessage: 'É necessário que seu e-mail tenha no mínimo 5 caracteres.' },
                maxLength: { value: 254, errorMessage: 'O seu e-mail não pode ter mais de 50 caracteres.' }
              }}
              value={props.account.email}
            />
            <Button color="primary" type="submit">
              Salvar
            </Button>
          </AvForm>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, saveAccountSettings, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
