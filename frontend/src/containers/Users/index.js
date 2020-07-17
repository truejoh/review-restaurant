import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
  Button,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table
} from 'reactstrap'


import usersActions from 'redux/users/actions'
import { roles as ROLES } from 'utils/constants'

import style from './style.module.scss'

const {
  getAllUsersRequest,
  updateUserRequest,
  deleteUserRequest,
} = usersActions

const User = props => {
  const { me, users, getAllUsers, updateUser, deleteUser } = props
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  const openModal = (id, email, role) => {
    setUserId(id)
    setUserEmail(email)
    setUserRole(role)
    setOpen(true)
  }

  const onUpdateUser = () => {
    updateUser({ userId, data: { email: userEmail, role: userRole } })
    setOpen(false)
  }

  const onDeleteUser = userId => {
    deleteUser({ userId })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const filteredUser = users.filter(u => u.email !== me.email)

  return (
    <div className={style.container}>
      <Modal isOpen={open} toggle={handleClose}>
        <ModalHeader>Update User</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input
              id="email"
              type="email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className={style.roleSelect}>
            <Input type="select" value={userRole} onChange={e => setUserRole(e.target.value)}>
              {Object.values(ROLES).map((role, index) => <option key={index}>{role}</option>)}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose} color="danger">
            Cancel
          </Button>
          <Button onClick={onUpdateUser} color="success" autoFocus>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      <Table className={style.table} bordered>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUser.length > 0 ? (
            filteredUser.map(row => (
              <tr key={row.email}>
                <td>{row.email}</td>
                <td>{row.role}</td>
                <td>
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => openModal(row._id, row.email, row.role)}
                  >
                    Edit
                    </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => onDeleteUser(row._id)}
                  >
                    Delete
                    </Button>
                </td>
              </tr>
            ))
          ) : (
              <td align="center">
                No Data
              </td>
            )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = state => ({
  me: state.Auth.user,
  users: state.Users.users,
})

const mapDispatchToProps = {
  getAllUsers: getAllUsersRequest,
  updateUser: updateUserRequest,
  deleteUser: deleteUserRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
