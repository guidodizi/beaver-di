export default (userService) => {
  const salute = (req, res) => {
    const salute = userService.salute();

    return res.status(200).json({ salute });
  };

  const echo = (req, res) => {
    return res.status(200).json(req.query);
  };

  return {
    salute,
    echo,
  };
};
