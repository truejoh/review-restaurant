export const calcAvgRating = restaurants =>
  restaurants.map(data => {
    const { reviews } = data
    let avgRating = 0

    if (reviews.length === 0) {
      avgRating = 0
    } else {
      let total = 0
      reviews.forEach(review => {
        total += Number(review.rating)
      })
      avgRating = Math.abs(total / reviews.length)
    }
    return { ...data, avgRating }
  })

export const hasReview = (restaurant, myEmail) => {
  const { reviews } = restaurant
  const res = reviews.find(review => review.from.email === myEmail)
  return res !== undefined
}

export const sortRestaurant = restaurants =>
  restaurants.sort((a, b) => b.avgRating - a.avgRating)

export const getFilteredRestaurants = (restaurants, filter) => {
  if (filter === 0) return restaurants
  return restaurants.filter(
    item => item.avgRating >= filter && item.avgRating < filter + 1,
  )
}

export const addReplyToState = (restaurants, restaurantId, reviewId, reply) => {
  return restaurants.map(data => {
    if (data._id === restaurantId) {
      const { reviews } = data
      const newReviews = reviews.map(review => {
        if (review._id === reviewId) {
          const newData = Object.assign({}, review, { reply })
          return newData
        }
        return review
      })
      const newData = Object.assign({}, data, { reviews: newReviews })
      return newData
    }
    return data
  })
}

export const deleteReplyToState = (restaurants, restaurantId, reviewId) =>
  restaurants.map(data => {
    if (data._id === restaurantId) {
      const { reviews } = data
      const newReviews = reviews.map(review => {
        if (review._id === reviewId) {
          const newData = Object.assign({}, review, { reply: '' })
          return newData
        }
        return review
      })
      const newData = Object.assign({}, data, { reviews: newReviews })
      return newData
    }
    return data
  })
