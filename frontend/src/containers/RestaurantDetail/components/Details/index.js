import React from 'react'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap'
import Rating from 'react-rating'

import style from './style.module.scss'

const Details = ({ restaurant, isRegularUser, hasReview, onAddReview }) => {
  return (
    <div>
      <Card className={style.detailContainer}>
        <CardHeader className={style.cardHeader}>
          <h6>Restaurant Details</h6>

          {isRegularUser && !hasReview && (
              <Button
                color="primary"
                size="sm"
                className={style.btnLeaveReview}
                onClick={onAddReview}
              >
                Leave Review
              </Button>
            )}
        </CardHeader>
        <CardBody className={style.cardBody}>
          <p>
            <b>Name: </b>
            {restaurant.name}
          </p>
          <p>
            <b>Owner: </b>
            {restaurant.owner.email}
          </p>
          <div className="rating-wrapper">
            <h5><b>Overall rating: </b></h5>

            <Rating
              readonly
              initialRating={restaurant.avgRating}
              className="rating-container"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Details
