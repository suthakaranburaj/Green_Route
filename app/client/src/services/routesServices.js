import { apiClient } from "@/helper/commonHelper";

export const optimizeRoute = (payload) => {
  return apiClient.post(`/optimize}`);
};

export const getRouteHistory = (userId, payload) => {
  return apiClient.get(`/history/${userId}`, payload);
};
export const getRouteById = (id) => {
  return apiClient.get(`/${id}}`);
};

export const getRouteAnalytics = (userId, payload) => {
  return apiClient.get(`/analytics/${userId}`, payload);
};
export const getCarbonSavings = (userId) => {
  return apiClient.get(`/carbon-savings/${userId}}`);
};

export const getFuelSavings = (userId, payload) => {
  return apiClient.get(`/fuel-savings/${userId}`, payload);
};
// router.post("/optimize", validate(optimizeRouteSchema), optimizeRoute);
// router.get("/history/:userId", validate(userIdParamSchema), getRouteHistory);
// router.get("/:id", validate(routeIdParamSchema), getRouteById);
// router.get(
//   "/analytics/:userId",
//   validate(userIdParamSchema),
//   getRouteAnalytics
// );
// router.get(
//   "/carbon-savings/:userId",
//   validate(userIdParamSchema),
//   getCarbonSavings
// );
// router.get(
//   "/fuel-savings/:userId",
//   validate(userIdParamSchema),
//   getFuelSavings
// );
