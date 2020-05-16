import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import Form from "./styles/Form";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = () => {
  const [email, setEmail] = useState("");
  const [reset, { loading, error, called }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: { email }
    }
  );

  const saveToState = event => {
    const { value } = event.target;
    setEmail(value);
  };
  return (
    <div>
      <Form
        method="POST"
        onSubmit={async e => {
          e.preventDefault();
          await reset();
          setEmail("");
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Request a password reset</h2>
          <Error error={error} />
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              plaeholder="enter your email here"
              value={email}
              onChange={saveToState}
            />
          </label>
          <button className="button"> Request Reset</button>
        </fieldset>
      </Form>
    </div>
  );
};

export default RequestReset;
