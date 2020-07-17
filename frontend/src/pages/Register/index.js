import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

import { Link } from 'react-router-dom'
import { Button, Card, CardHeader, CardBody, CardFooter, Form, FormGroup, Input } from 'reactstrap'

import useKeyPress from 'hooks/useKeyPress'
import authActions from 'redux/auth/actions'
import { roles as ROLES } from 'utils/constants'

import style from './style.module.scss'

const Register = ({ error, register }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(ROLES.ADMIN)
  const keyEvent = useKeyPress()
  const { addToast } = useToasts()

  useEffect(() => {
    if (error) {
      console.log(error)
      addToast('Email is already in use', { appearance: 'error' })
    }
  }, [error])

  useEffect(() => {
    if (keyEvent && keyEvent.key === 'Enter') {
      handleSubmit()
    }
    //eslint-disable-next-line
  }, [keyEvent])

  const isValidEmail = () => {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email)
  }

  const isValidPassword = () => {
    return password.length > 5 && password.length < 128
  }

  const isValidForm = () => {
    if (!email || !password) return false
    if (isValidEmail() && isValidPassword()) return true
    return false
  }

  const handleSubmit = () => {
    if (isValidForm()) {
      register({ email, password, role })
    }
  }

  return (
    <div className={style.container}>
      <Card className={style.card}>
        <CardHeader className={style.cardHeader}>
          <h3>Register</h3>
        </CardHeader>

        <CardBody className={style.cardBody}>
          <Form>
            <FormGroup className={style.formField}>
              <Input type="text" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} />
              {email && !isValidEmail() && <span>Email address is invalid.</span>}
            </FormGroup>

            <FormGroup className={style.formField}>
              <Input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
              {password && !isValidPassword() && <span>Password length should be more than 5 and less than 128.</span>}
            </FormGroup>

            <FormGroup className={style.formField}>
              <Input type="select" onChange={e => setRole(e.target.value)}>
                {Object.values(ROLES).map((role, index) => <option key={index}>{role}</option>)}
              </Input>
            </FormGroup>

            <FormGroup>
              <Button disabled={!isValidForm()} className={style.submit} onClick={handleSubmit}>Register</Button>
            </FormGroup>
          </Form>
        </CardBody>

        <CardFooter className={style.cardFooter}>
          Already have an account? <Link to="/login">Login</Link>
        </CardFooter>
      </Card>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.Auth.user,
  error: state.Auth.error,
})

const mapDispatchToProps = {
  register: authActions.signupRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
