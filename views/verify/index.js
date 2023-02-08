(async () => {
  // console.log(window.location.pathname.split('/'));
  const id = window.location.pathname.split('/')[2];
  const token = window.location.pathname.split('/')[3];
  // console.log(id, token);

  const { data } = await axios.patch(`/api/users/${id}/${token}`);
  console.log(data);

  if (!data) {
    window.location.pathname = '/signup';
  } else {
    window.location.pathname = '/login';
  }



})();