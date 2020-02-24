export default (userService) => {
  const salute = (req, res) => {
    const result = userService.salute();

    return res.status(200).json({ result });
  };

  const echo = (req, res) => res.status(200).json(req.query);

  return {
    salute,
    echo,
  };
};
