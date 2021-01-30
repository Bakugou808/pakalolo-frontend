// export const continueTour = () => ({
//   type: "CONTINUE_TOUR",
//   payload: true,
// });

export const endTour = () => ({
  type: "END_TOUR",
});

export const activateTour = (tourId) => ({
  type: "ACTIVATE_TOUR",
  tourId: tourId,
});

export const deactivateTour = (tourId) => ({
  type: "DEACTIVATE_TOUR",
  tourId: tourId,
});
