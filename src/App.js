import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri:
    "http://localhost:5001/graphql",
  cache: new InMemoryCache()
});

const DataList = () => {
  const users = gql`
    query{
      getUsers {
        id
        name
      }
    }
  `;
  const { loading, error, data } = useQuery(users);
  if (loading) return<p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
  <div>
    <h3>data</h3>
    {data && 
      data?.getUsers?.map((i)=>
        <p key={i.id}>
          {i.name}
        </p>
      )
    }
  </div>
  )
}



function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>React + GraphQL</h2>
        <DataList />
      </div>
    </ApolloProvider>
  );
}

export default App;
