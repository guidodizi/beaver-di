export default (userService) => {
  const salute = (req, res) => {
    const salute = userService.salute();

    return res.status(200).json({ salute });
  };

  return {
    salute,
  };
};
