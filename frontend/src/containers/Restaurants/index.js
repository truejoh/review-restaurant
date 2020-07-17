import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
  Button,
  Card,
  CardHeader,
  Container,
  Input,
  ListGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import Rating from 'react-rating'

import DetailView from '../RestaurantDetail'
import restaurantActions from 'redux/restaurant/actions'
import {
  calcAvgRating,
  sortRestaurant,
  getFilteredRestaurants,
} from 'utils/review'
import {
  roles as ROLES,
  filters as FILTERS,
  viewMode as VIEW_MODE,
} from 'utils/constants'

import style from './style.module.scss'

const {
  getAllRestaurantsRequest,
  createRestaurantRequest,
  deleteRestaurantRequest,
  editRestaurantRequest,
} = restaurantActions

const Restaurant = props => {
  const {
    me,
    restaurants: originRestaurants,
    getAllRestaurants,
    createRestaurant,
    deleteRestaurant,
    editRestaurant,
  } = props
  const [filter, setFilter] = useState(0)
  const [restName, setRestName] = useState('')
  const [editName, setEditName] = useState('')
  const [editId, setEditId] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [viewMode, setViewMode] = useState(VIEW_MODE.LIST)
  const [detailId, setDetailId] = useState(null)

  const restaurants = getFilteredRestaurants(
    sortRestaurant(calcAvgRating(originRestaurants)),
    filter,
  )

  const isOwner = me.role === ROLES.OWNER
  const isRegular = me.role === ROLES.REGULAR

  useEffect(() => {
    getAllRestaurants()
  }, [getAllRestaurants])

  const onCreateRestaurant = () => {
    createRestaurant({ name: restName })
    setRestName('')
    setShowCreateModal(false)
  }

  const handleClickEdit = (restaurantId, name) => {
    setEditId(restaurantId)
    setEditName(name)
    setShowEditModal(true)
  }

  const handleEditRestaurant = () => {
    editRestaurant({ restaurantId: editId, data: { name: editName } })
    setShowEditModal(false)
  }

  const handleDeleteRestaurant = restaurantId => {
    deleteRestaurant({ restaurantId })
  }

  const handleClickListItem = restaurantId => {
    setDetailId(restaurantId)
    setViewMode(VIEW_MODE.DETAILS)
  }

  if (viewMode === VIEW_MODE.DETAILS) {
    return (
      <DetailView
        restaurant={restaurants.find(item => item._id === detailId)}
        onBack={() => setViewMode(VIEW_MODE.LIST)}
      />
    )
  }

  return (
    <div className={style.container}>
      <Card className={style.card}>
        <CardHeader className={style.cardHeader}>
          <div>
            <Input type="select" onChange={e => setFilter(parseInt(e.target.value))}>
              {FILTERS.map(filter => (
                <option key={filter.id} value={filter.id}>
                  {filter.label}
                </option>
              ))}
            </Input>
            {isOwner && (
              <Button onClick={() => setShowCreateModal(true)}>
                Add New
              </Button>
            )}
          </div>
        </CardHeader>
        {!!restaurants.length ? (
          <ListGroup>
            {restaurants.map(item => (
              <div key={item._id} className={style.listItem}>
                <div>
                  <h5>{item.name}</h5>
                  <p>Owner: {item.owner.email}</p>
                  <Rating
                    readonly
                    initialRating={item.avgRating}
                    className="rating-container"
                  />
                </div>
                <div>
                  <Button color="info" size="sm" onClick={() => handleClickListItem(item._id)}>
                    View Details
                  </Button>
                  {!isRegular && (
                    <Button color="success" size="sm" onClick={() => handleClickEdit(item._id, item.name)}>
                      Edit
                    </Button>
                  )}
                  {!isRegular && (
                    <Button color="danger" size="sm" onClick={() => handleDeleteRestaurant(item._id)}>
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </ListGroup>
        ) : (
            <Container className={style.noData}>
              <span>No restaurant</span>
            </Container>
          )}
      </Card>

      <Modal
        isOpen={showEditModal}
        toggle={() => setShowEditModal(false)}
      >
        <ModalHeader>Edit Restaurant</ModalHeader>
        <ModalBody>
          <Input value={editName} onChange={e => setEditName(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button color="success" onClick={handleEditRestaurant}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={showCreateModal}
        toggle={() => setShowCreateModal(false)}
      >
        <ModalHeader id="create-modal-title">Create Restaurant</ModalHeader>
        <ModalBody>
          <Input value={restName} onChange={e => setRestName(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setShowCreateModal(false)}>Cancel</Button>
          <Button color="success" onClick={onCreateRestaurant}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  me: state.Auth.user,
  restaurants: state.Restaurants.restaurants,
})

const mapDispatchToProps = {
  getAllRestaurants: getAllRestaurantsRequest,
  createRestaurant: createRestaurantRequest,
  deleteRestaurant: deleteRestaurantRequest,
  editRestaurant: editRestaurantRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant)
