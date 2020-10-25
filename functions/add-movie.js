const { query } = require("./util/hasura");

async function addMovie(event, context) {
  const { id, title, tagline, poster } = JSON.parse(event.body);

  const { user } = context.clientContext;

  const isLoggedIn = user && user.app_metadata;
  const roles = user.app_metadata.roles || [];

  if (!isLoggedIn || !roles.includes("admin")) {
    return {
      statusCode: "401",
      body: "Unauthorized",
    };
  }

  const result = await query({
    query: `mutation ($id: String = "", $poster: String = "", $tagline: String = "", $title: String = "") {
        insert_movies(objects: {id: $id, poster: $poster, tagline: $tagline, title: $title}) {
          returning {
            id
            poster
            tagline
            title
          }
        }
      }`,
    variables: { id, title, tagline, poster },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}

exports.handler = addMovie;
