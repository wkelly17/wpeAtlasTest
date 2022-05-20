export default async function handler(req, res) {
  let str = `${process.env.WP_GRAVITY_USERNAME}:${process.env.WP_GRAVITY_APP_PASSWORD}`;
  let val = Buffer.from(str).toString('base64');

  process.env.WP_GRAVITY_USERNAME;
  const response = await fetch(
    'https://bpwpeatlastes1.wpengine.com/wp-json/gf/v2/forms/1',
    {
      headers: {
        Authorization: `Basic ${val}`,
      },
    }
  );
  // console.log(response);
  let json = await response.json();
  res.status(200).send(json);
}
