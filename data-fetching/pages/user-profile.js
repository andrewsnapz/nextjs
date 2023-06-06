export default function UserProfilePage({ username }) {
  return <h1>{username}</h1>;
}

// only executes on the server after deployment
// NOT statically generated
export async function getServerSideProps(context) {
  // node default req and res objects
  const { params, req, res } = context;

  return {
    props: {
      username: "Max",
    },
  };
}
