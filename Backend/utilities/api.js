const api = (data, message, status) => {
  return {
    status: status || false,
    data: data || null,
    message: message || null,
    pagination: {
      next_page: null,
      next_max_id: null,
    },
  };
};
export default api;
