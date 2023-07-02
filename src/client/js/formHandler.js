// function handleSubmit(event) {
//     event.preventDefault()

//     // check what text was put into the form field
//     let formText = document.getElementById('name').value
//     checkForName(formText)

//     console.log("::: Form Submitted :::")
//     fetch('http://localhost:8080/test')
//     .then(res => res.json())
//     .then(function(res) {
//         document.getElementById('results').innerHTML = res.message
//     })
// }

// export { handleSubmit }

import { checkUrl } from "./isValidUrl";

const handleSubmit = async (e) => {
  e.preventDefault();

  let url = document.getElementById("name").value;

  console.log("User's text input is: ", url);

  if (checkUrl(url) == true) {
    console.log("true");

    try {
      const response = await fetch("/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });
      const data = await response.json();
      updateUI(data);
    } catch (error) {
      console.log("Error", error);
    }
  } else {
    alert("Invalid URL! Please provide another one!");
  }
};

const updateUI = async (response) => {
  document.getElementById("polarity").innerHTML = checkPolarity(
    response.score_tag
  );
  document.getElementById("agreement").innerHTML = response.agreement;
  document.getElementById("subjectivity").innerHTML = response.subjectivity;
  document.getElementById("confidence").innerHTML = response.confidence;
  document.getElementById("irony").innerHTML = response.irony;
};

function checkPolarity(value) {
  switch (value) {
    case "P+":
      return "STRONG POSITIVE";
    case "P":
      return "POSITIVE";
    case "NEU":
      return "NEUTRAL";
    case "N":
      return "NEGATIVE";
    case "N+":
      return "STRONG NEGATIVE";
    case "NONE":
      return "WITHOUT SENTIMENT";
  }
}

export { handleSubmit, updateUI };
