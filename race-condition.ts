import axios, { AxiosResponse } from "axios";

// Please excuse the sorry state of this script, it's a quick and dirty modification of some ChatGPT output

// Function to make the POST request
async function postApiRequest(url: string, data: any, headers: any): Promise<AxiosResponse | undefined> {
  try {
    const response = await axios.post(url, data, { headers });
    return response;
  } catch (error: any) {
    return undefined;
  }
}

// Function to make the GET request
async function getApiRequest(url: string, headers: any) {
  try {
    const response = await axios.get(url, { headers });
    return response;
  } catch (error: any) {
    return undefined;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Function to perform the requests in a loop N times
async function performRequestsInLoop(start: number, stop: number) {
  const headers = {
    "Content-Type": "application/json",
  };

  for (let i = start; i < stop; i++) {
    const response = await postApiRequest(
      "http://localhost:4242/workflows",
      {},
      headers
    );

    const workflowId = response?.data.workflowId;

    await sleep(100);

    await postApiRequest(
      "http://localhost:4242/workflows/" + workflowId,
      { type: "SUBMIT" },
      headers
    );

    await sleep(100);

    // Make GET request
    const getRequest = await getApiRequest(
      "http://localhost:4242/workflows/" + workflowId,
      headers
    );
    if (getRequest?.data.persistedState.value !== "PENDING") {
      console.error("Error: intermediate saved state is not PENDING");
    }

    await postApiRequest(
      "http://localhost:4242/workflows/" + workflowId,
      { type: "APPROVE" },
      headers
    );

    await sleep(100);

    // Make GET request
    const getRequestTwo = await getApiRequest(
      "http://localhost:4242/workflows/" + workflowId,
      headers
    );

    if (getRequestTwo?.data.persistedState.value !== "APPROVED") {
      console.error("Error: final saved state is not APPROVED");
    }
  }
}

// Perform the requests in a loop N times

(async function run() {
  let args = process.argv;
  await performRequestsInLoop(Number(args[2]), Number(args[3]));
  console.log("Completed all requests!");
})();
