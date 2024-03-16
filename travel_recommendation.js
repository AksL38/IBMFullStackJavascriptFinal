fetch('./travel_recommendation_api.json')
  .then((data) => data.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
