import makeApiCall from "../../../lib/make-api-call";

async function deployProject(gitURL: string) {
  const url = "https://vercel-api-server-d0e855b95552.herokuapp.com/project";

  return await makeApiCall({ body: { gitURL }, method: "POST", url });
}

export { deployProject };
