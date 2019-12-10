import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';

export interface IUserPasswordProps extends StateProps, DispatchProps {}

export const PasswordPage = (props: IUserPasswordProps) => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    props.reset();
    props.getSession();
    return () => props.reset();
  }, []);

  const handleValidSubmit = (event, values) => {
    props.savePassword(values.currentPassword, values.newPassword);
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="password-title">Senha do usuário {props.account.login}</h2>
          <AvForm id="password-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="currentPassword"
              label="Senha Atual"
              placeholder={'Senha Atual'}
              type="password"
              validate={{
                required: { value: true, errorMessage: 'Este campo é obrigatório.' }
              }}
            />
            <AvField
              name="newPassword"
              label="Nova Senha"
              placeholder={'Nova Senha'}
              type="password"
              validate={{
                required: { value: true, errorMessage: 'Este campo é obrigatório.' },
                minLength: { value: 4, errorMessage: 'Sua senha deve ter pelo menos 4 caracteres.' },
                maxLength: { value: 50, errorMessage: 'Sua senha não pode ter mais de 50 caracteres.' }
              }}
              onChange={updatePassword}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="confirmPassword"
              label="Confirmar Nova Senha"
              placeholder="Confirmar Nova Senha"
              type="password"
              validate={{
                required: {
                  value: true,
                  errorMessage: 'Este campo é obrigatório.'
                },
                minLength: {
                  value: 4,
                  errorMessage: 'É necessário que sua senha de confirmação tenha no mínimo 4 caracteres.'
                },
                maxLength: {
                  value: 50,
                  errorMessage: 'Sua senha de confirmação não pode ter mais de 50 caracteres.'
                },
                match: {
                  value: 'newPassword',
                  errorMessage: 'A senha e sua confirmação não coincidem!'
                }
              }}
            />
            <Button color="success" type="submit">
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

const mapDispatchToProps = { getSession, savePassword, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordPage);
