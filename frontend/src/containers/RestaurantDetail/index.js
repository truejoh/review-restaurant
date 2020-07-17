import React, { useState } from 'react'
import { connect } from 'react-redux'

import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import Rating from 'react-rating'
import DetailView from './components/Details'
import Reviews from './components/Reviews'

import restaurantActions from 'redux/restaurant/actions'
import { hasReview } from 'utils/review'
import { roles as ROLES } from 'utils/constants'

const {
  createFeedbackRequest,
  deleteFeedbackRequest,
  updateFeedbackRequest,
  createReplyRequest,
  deleteReplyRequest,
  updateReplyRequest,
} = restaurantActions

const RestaurantDetail = props => {
  const {
    me,
    restaurant,
    onBack,
    createFeedback,
    deleteFeedback,
    updateFeedback,
    createReply,
    deleteReply,
    updateReply,
  } = props
  const [isOpenCreateReview, setIsOpenCreateReview] = useState(false)
  const [isOpenEditReview, setIsOpenEditReview] = useState(false)
  const [isOpenCreateReply, setIsOpenCreateReply] = useState(false)
  const [isOpenEditReply, setIsOpenEditReply] = useState(false)
  const [rating, setRating] = useState(1)
  const [comment, setComment] = useState('')
  const [editRating, setEditRating] = useState(1)
  const [editComment, setEditComment] = useState('')
  const [editRestId, setEditRestId] = useState('')
  const [reply, setReply] = useState('')
  const [editReply, setEditReply] = useState('')
  const [replyReviewId, setReplyReviewId] = useState('')

  const isRegular = me.role === ROLES.REGULAR
  const isAdmin = me.role === ROLES.ADMIN
  const isOwner = me.role === ROLES.OWNER

  const onOpenEditFeedbackModal = (rating, comment, reviewId) => {
    setEditRating(rating)
    setEditComment(comment)
    setEditRestId(reviewId)
    setIsOpenEditReview(true)
  }

  const openCreateReplyModal = reviewId => {
    setReplyReviewId(reviewId)
    setIsOpenCreateReply(true)
  }

  const openEditReplyModal = (reply, reviewId) => {
    setEditReply(reply)
    setReplyReviewId(reviewId)
    setIsOpenEditReply(true)
  }

  const onLeaveFeedback = () => {
    const data = {
      rating: rating.toString(),
      comment,
      to: restaurant._id,
    }
    setIsOpenCreateReview(false)
    createFeedback({ restaurantId: restaurant._id, data })
  }

  const handleDeleteFeedback = reviewId => {
    deleteFeedback({ restaurantId: restaurant._id, reviewId })
  }

  const onUpdateFeedback = () => {
    const data = {
      to: restaurant._id,
      rating: editRating,
      comment: editComment,
    }
    updateFeedback({
      restaurantId: restaurant._id,
      reviewId: editRestId,
      data,
    })
    setIsOpenEditReview(false)
  }

  const onCreateReply = () => {
    const data = {
      reply,
      restaurantId: restaurant._id,
    }
    setReply('')
    setIsOpenCreateReply(false)
    createReply({
      restaurantId: restaurant._id,
      reviewId: replyReviewId,
      data,
    })
  }

  const handleDeleteReply = reviewId => {
    const data = {
      restaurantId: restaurant._id,
    }

    deleteReply({ restaurantId: restaurant._id, reviewId, data })
  }

  const onUpdateReply = () => {
    const data = {
      reply: editReply,
      restaurantId: restaurant._id,
    }
    setIsOpenEditReply(false)
    updateReply({
      restaurantId: restaurant._id,
      reviewId: replyReviewId,
      data,
    })
  }

  return (
    <div>
      <Button color="link" onClick={onBack}>
        Back to list
      </Button>

      <DetailView
        restaurant={restaurant}
        isRegularUser={isRegular}
        hasReview={hasReview(restaurant, me.email)}
        onAddReview={() => setIsOpenCreateReview(true)}
      />

      <Reviews
        restaurant={restaurant}
        isAdmin={isAdmin}
        isOwner={isOwner}
        me={me}
        onEditReview={({ rating, comment, _id }) => onOpenEditFeedbackModal(rating, comment, _id)}
        onDeleteReview={handleDeleteFeedback}
        onClickCreateReply={openCreateReplyModal}
        onClickEditReply={openEditReplyModal}
        onClickDeleteReply={handleDeleteReply}
      />

      <Modal
        isOpen={isOpenCreateReview}
        toggle={() => setIsOpenCreateReview(false)}
      >
        <ModalHeader>Leave Feedback</ModalHeader>
        <ModalBody>
          <div className="rating-wrapper">
            <h5>Rating:</h5>
            <Rating
              initialRating={rating}
              onChange={value => setRating(value)}
              className="rating-container"
            />
          </div>
          <Input
            placeholder="Enter comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => setIsOpenCreateReview(false)}>
            Cancel
          </Button>
          <Button color="success" onClick={onLeaveFeedback}>
            Leave Feedback
          </Button>
        </ModalFooter>
      </Modal>
      
      <Modal
        isOpen={isOpenEditReview}
        toggle={() => setIsOpenEditReview(false)}
      >
        <ModalHeader>Update Feedback</ModalHeader>
        <ModalBody>
          <div className="rating-wrapper">
            <h5>Rating:</h5>
            <Rating
              initialRating={editRating}
              onChange={value => setEditRating(value)}
              className="rating-container"
            />
          </div>
          <Input
            placeholder="Enter comment"
            value={editComment}
            onChange={e => setEditComment(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => setIsOpenEditReview(false)}>
            Cancel
          </Button>
          <Button color="success" onClick={onUpdateFeedback}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={isOpenCreateReply}
        toggle={() => setIsOpenCreateReply(false)}
      >
        <ModalHeader>Add Reply</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Enter reply"
            value={reply}
            onChange={e => setReply(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => setIsOpenCreateReply(false)}>
            Cancel
          </Button>
          <Button color="success" onClick={onCreateReply}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={isOpenEditReply}
        toggle={() => setIsOpenEditReply(false)}
      >
        <ModalHeader>Edit Reply</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Enter reply"
            value={editReply}
            onChange={e => setEditReply(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => setIsOpenEditReply(false)}>
            Cancel
          </Button>
          <Button color="success" onClick={onUpdateReply}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  me: state.Auth.user,
})

const mapDispatchToProps = {
  createFeedback: createFeedbackRequest,
  deleteFeedback: deleteFeedbackRequest,
  updateFeedback: updateFeedbackRequest,
  createReply: createReplyRequest,
  deleteReply: deleteReplyRequest,
  updateReply: updateReplyRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetail)
