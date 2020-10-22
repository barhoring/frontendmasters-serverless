const { query } = require("./util/hasura");

async function addMovie(event) {
  const { id, title, tagline, poster } = JSON.parse(event.body);

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

  //   console.log("result:", result);

  //   const { _id, _title, _tagline, _poster } = insert_movies.returning;

  //   console.log(Object.keys(result["insert_movies"]["returning"]));

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}

exports.handler = addMovie;
