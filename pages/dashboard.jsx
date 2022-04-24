import React, {useState, useEffect} from "react";
import { Card } from "../components/dashboard/Card";
import { NavbarLanding } from "../components/navbar/NavbarLanding";
import { useRouter } from 'next/router'
import { getAuth } from "firebase/auth"
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { Box } from "@chakra-ui/react";

export default function App() {
  const router = useRouter()
  const auth = getAuth();
  const db = getFirestore();
  const [email, setEmail] = useState("");
  const [alphabetPoints, setAlphabetPoints] = useState(0);
  const [numberPoints, setNumberPoints] = useState(0);
  const [alphabetScores, setAlphabetScores] = useState([]);
  const [numberScores, setNumberScores] = useState([]);

  const calculateLevel = (points) => {
    let count = 0;
    let temp = 0;

    while (temp <=  points){
      temp += 200 + count * 20
      count += 1
    }

    return count;
  }

  const calculateRemaining = (points) => {
    let count = 0;
    let temp = 0;

    while (temp <=  points){
      temp += 200 + count * 20
      count += 1
    }

    return [(200 + 20 * (count - 1)) - (temp - points),  200 + 20 * (count - 1)]
  }

  useEffect(() => {
    
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        router.push("/login")
      }
      else {
        setEmail(user.email);
        const q = query(collection(db, "users"), where("email", "==", user.email));
        getDocs(q).then((result) => {
            let data = {};
            result.forEach((doc) => {
              data = doc.data();
            });
            
            setAlphabetPoints(data.points.alphabets)
            setNumberPoints(data.points.numbers)

            const q1 = query(collection(db, "scores"), where("email", "==", user.email), where("type", "==", "alphabet"), where("number", ">", data.lastQuiz.alphabets - 5));
            getDocs(q1).then((result) => {
              let data1 = []
              result.forEach((doc) => {
                data1.push(doc.data())
              })

              data1.sort(function(a, b){
                if (a.number > b.number) {
                  return 1
                }
                else if (a.number < b.number) {
                  return -1
                }
                else {
                  return 0
                }
              })

              let final = [];

              data1.map(x => {
                final.push(x.score);
              })

              setAlphabetScores(final);
            })

            const q2 = query(collection(db, "scores"), where("email", "==", user.email), where("type", "==", "number"), where("number", ">", data.lastQuiz.numbers - 5));
            getDocs(q2).then((result) => {
              let data2 = []
              result.forEach((doc) => {
                data2.push(doc.data())
              })

              data2.sort(function(a, b){
                if (a.number > b.number) {
                  return 1
                }
                else if (a.number < b.number) {
                  return -1
                }
                else {
                  return 0
                }
              })

              

              let final = [];

              data2.map(x => {
                final.push(x.score);
              })

              setNumberScores(final);
            })

          }).catch((error) => {
            console.log(error)
          })
      }
    });
  }, [])
  return (
    <Box bg="gray.50" minHeight="100vh" h="full" pb="7">
      <NavbarLanding />
      
      <Card redirect="/alphabets" scores={alphabetScores} level={calculateLevel(alphabetPoints)} remaining={calculateRemaining(alphabetPoints)} heading="Alphabets in ISL" subheading="Start your journey by learning the fundamental building blocks of Indian Sign Language. This lesson will cover all 26 alphabets."/>
      {/* <Card redirect="/numbers" scores={numberScores} level={calculateLevel(numberPoints)} remaining={calculateRemaining(numberPoints)} heading="Numbers in ISL" subheading="Numbers are a vital part of any language and ISL is no exception. You will learn to sign 0-9 as well as construct larger numbers."/> */}
      
      
      
    </Box>
  );
}
