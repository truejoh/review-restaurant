import React from 'react'

import {
  Button,
  Card,
  CardBody,
  CardHeader
} from 'reactstrap'
import Rating from 'react-rating'

import style from './style.module.scss'

const Reviews = ({
  restaurant,
  isAdmin,
  isOwner,
  me,
  onEditReview,
  onDeleteReview,
  onClickCreateReply,
  onClickEditReply,
  onClickDeleteReply
}) => {
  return (
    <div className={style.container}>
      <Card className={style.reviewContainer}>
        <CardHeader className={style.cardHeader}>
          <h6>Reviews</h6>
        </CardHeader>
        {restaurant.reviews.length > 0 ? (
          restaurant.reviews.map(review => (
            <CardBody key={review._id} className={style.cardBody}>
              <div className={style.ratingContainer}>
                <div className="rating-wrapper">
                  <h5>Rating:</h5>
                  <Rating
                    readonly
                    className="rating-container"
                    initialRating={review.rating}
                  />
                </div>
                <div>
                  {(review.from.email === me.email || isAdmin) && (
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => onEditReview(review)}
                    >
                      Edit
                    </Button>
                  )}
                  {(review.from.email === me.email || isAdmin) && (
                    <Button color="danger" size="sm" onClick={() => onDeleteReview(review._id)}>
                      Delete
                    </Button>
                  )}
                </div>
              </div>
              <p>From: {review.from.email === me.email ? 'You' : review.from.email}</p>
              <p>Created At: {new Date(review.updatedAt).toString()}</p>
              <Card className={style.commentContainer}>
                <CardHeader className={style.cardHeader}>
                  <span>{review.comment}</span>
                  {
                    isOwner &&
                    review.reply.length === 0 && (
                      <Button
                        color="success"
                        size="sm"
                        onClick={() => onClickCreateReply(review._id)}
                      >
                        Reply
                      </Button>
                    )
                  }
                </CardHeader>
                {review.reply && (
                  <CardBody className={style.reply}>
                    <span>{review.reply}</span>
                    {
                      (isOwner || isAdmin) && (
                        <div>
                          <Button
                            size="sm"
                            color="success"
                            className={style.btnAction}
                            onClick={() => onClickEditReply(review.reply, review._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            className={style.btnAction}
                            onClick={() => onClickDeleteReply(review._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )
                    }
                  </CardBody>
                )}
              </Card>
            </CardBody>
          ))
        ) : (
            <CardBody className={style.noReview}>
              <h6>No Review</h6>
            </CardBody>
          )}
      </Card>
    </div>
  )
}

export default Reviews
