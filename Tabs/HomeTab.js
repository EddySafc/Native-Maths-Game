import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import { auth } from "../firebase";
import { useContext, useState, createContext } from "react";
import { useEffect } from "react";
import { getUsers, postUser, getUserById, patchUserScore } from "../Requests";
import { allUsersContext, logInContext } from "../Screens/LoginScreen";

export const userScoreContext = createContext("Zero");

function HomeTab() {
  const { loggedInUser, setLoggedInUser } = useContext(logInContext);
  const { userScore, setUserScore } = useContext(userScoreContext);
  const { allUsers, setAllUsers } = useContext(allUsersContext);
  const [user, setUser] = useState([]);
  const [answer, setAnswer] = useState("");
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);

  useEffect(() => {
    console.log(allUsers, allUsers !== undefined);
    if (allUsers !== undefined) {
      console.log("in: first if statement");
      setUser(
        allUsers.filter(
          (single_user) => single_user.user_name === loggedInUser
        )[0]
      );
      if (
        allUsers.filter(
          (single_user) => single_user.user_name === loggedInUser
        )[0] !== undefined
      ) {
        console.log("in: second if statement");
        setUserScore(
          allUsers.filter(
            (single_user) => single_user.user_name === loggedInUser
          )[0]["score"]
        );
      }
    }

    setNumberOne(Math.floor(Math.random() * 100));
    setNumberTwo(Math.floor(Math.random() * 100));

    console.log("---------------use effect test for home---------------------");
    console.log("Logged In User:", loggedInUser);
    console.log("all users:", allUsers, "length:", allUsers.length);
    console.log("User:", user);
    console.log("UserScore:", userScore);
  }, [loggedInUser, allUsers]);

  if (allUsers === undefined || allUsers.length === 0 || loggedInUser === "") {
    return (
      <View style={styles.container}>
        <Text>Not Logged In.</Text>
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome:</Text>
        <Text style={styles.text}>{loggedInUser}</Text>
        <Text style={styles.text}>
          Your Score is: {user !== undefined ? userScore : null}
        </Text>
        <Text></Text>
        <Text>
          {numberOne} + {numberTwo} =
        </Text>
        <TextInput
          placeholder="Answer here..."
          value={answer}
          onChangeText={(text) => {
            setAnswer(text);
          }}
        />
        <View style={styles.button}>
          <Button
            title="Submit Answer"
            color="green"
            onPress={() => {
              console.log(
                numberOne + numberTwo,
                answer,
                answer == numberOne + numberTwo
              );
              if (user !== undefined && answer == numberOne + numberTwo) {
                patchUserScore(user["user_id"], 1);
                setUserScore((currentUserScore) => currentUserScore + 1);
                setAnswer("");
                setNumberOne(Math.floor(Math.random() * 100));
                setNumberTwo(Math.floor(Math.random() * 100));
              }
            }}
          ></Button>
        </View>
      </View>
    );
}

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  text: {
    margin: 15,
    fontSize: 15,
  },
  button: {
    margin: 50,
  },
});
