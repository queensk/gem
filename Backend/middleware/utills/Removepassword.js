const removePassword = async (data) => {
  const dataWithoutPassword = data.map((item) => {
    const dataCopy = { ...item };
    delete dataCopy.Password;
    return dataCopy;
  });
  return dataWithoutPassword;
};

export default removePassword;
