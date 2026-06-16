async function check_status(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      console.log(`${url} is UP and running!`);
      return true;
    } else {
      console.log(`${url} responded with status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`${url} is DOWN or unreachable.`, error);
    return false;
  }
}

