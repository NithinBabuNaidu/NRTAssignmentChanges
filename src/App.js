import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import { Form, Card, Image, Icon, Grid, FormInput } from "semantic-ui-react";
import "./App.css";
import imageSrc from "./github.png";
import errorImg from "./error.png";

function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [repos, setRepos] = useState("");
  const [org, setOrg] = useState("");
  const [image, setImage] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const [bool, setBool] = useState(true);
  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({ name, login, public_repos, company, avatar_url }) => {
    setName(name);
    setUserName(login);
    setRepos(public_repos);
    setOrg(company);
    setImage(avatar_url);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
          setError(null);
        }
      });
    setBool(false);
  };

  return (
    <div>
      <div className="navbar">Github Details</div>
      <Grid columns="equal" verticalAlign="middle" centered>
        <Grid.Column
          style={{
            paddingBottom: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
          }}
        >
          <div className="card1">
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <input
                  placeholder="Enter the username"
                  name="user"
                  onChange={handleSearch}
                />
              </Form.Field>
              <Form.Field>
                <Form.Button content="Search" type="submit" />
              </Form.Field>
            </Form>
          </div>
        </Grid.Column>
        <Grid.Column
          style={{
            paddingBottom: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
          }}
          width={12}
        >
          {bool ? (
            <div className="card2">
              <Card style={{ height: "fit-content" }}>
                <Image src={imageSrc} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Please enter a username to proceed</Card.Header>
                </Card.Content>
              </Card>
            </div>
          ) : error ? (
            <div className="card2">
              {" "}
              <Card style={{ height: "fit-content" }}>
                <Image src={errorImg} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Oops!</Card.Header>
                  <Card.Header>Username {error}</Card.Header>
                  <Card.Description>
                    Looks like you have entered a wrong username. Please try
                    again.
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>
          ) : (
            <div className="card2">
              <Card style={{ height: "fit-content" }}>
                <Image src={image} wrapped ui={false} />
                <Card.Content style={{ height: "fit-content" }}>
                  <Card.Header>{name}</Card.Header>
                  <Card.Meta>{userName}</Card.Meta>
                  <Card.Description />
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="briefcase" />
                    Organisation: {org ? org : "Organisation Not Found"}
                  </a>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="github" />
                    Repositories: {repos ? repos : "No Repositories Found"}
                  </a>
                </Card.Content>
              </Card>
            </div>
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
