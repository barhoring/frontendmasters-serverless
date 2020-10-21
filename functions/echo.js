// example: http://localhost:8888/.netlify/functions/echo?text=front%20end%20masters

exports.handler = async (event) => {
  const { text } = event.queryStringParameters;
  return {
    statusCode: 200,
    body: `you said ${text}`,
  };
};
