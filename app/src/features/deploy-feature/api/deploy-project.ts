import makeApiCall from "../../../lib/make-api-call";

async function deployProject(gitURL: string) {
  const url = `${import.meta.env.VITE_SERVER_ENDPOINT}/project`;

  return await makeApiCall({ body: { gitURL }, method: "POST", url });
}

export { deployProject };
